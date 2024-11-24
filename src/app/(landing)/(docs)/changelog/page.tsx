'use client';

import { useState } from 'react';
import V001 from './0.0.1.mdx';
import V002 from './0.0.2.mdx';
import {
  Moon,
  Sun,
  ChevronRight,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ChangelogEntry = {
  version: string;
  date: string;
  title: string;
  description: string;
  planned?: string[];
  expectations?: string[];
  status: 'released' | 'in-progress' | 'planned';
  content?: any;
};

export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const changelogEntries: ChangelogEntry[] = [
    {
      version: 'v0.0.2',
      date: 'Planned for January 2025',
      title: 'v0.0.2 - January 2025',
      description: '',
      status: 'planned',
      content: V002
    },
    {
      version: 'v0.0.1',
      date: 'Last updated November 14, 2023',
      title: 'First Release - November 2024',
      description:
        'Introducing the initial release of limefolio with basic features and components.',
      status: 'released',
      content: V001
    }
  ];

  const getStatusIcon = (status: ChangelogEntry['status']) => {
    switch (status) {
      case 'released':
        return <CheckCircle className="size-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="size-4 text-yellow-500" />;
      case 'planned':
        return <AlertCircle className="size-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: ChangelogEntry['status']) => {
    switch (status) {
      case 'released':
        return 'py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'in-progress':
        return 'py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'planned':
        return 'py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
    }
  };

  return (
    <div className="min-h-screen w-full mx-auto container">
      <div className=" bg-white dark:bg-gray-900 min-h-screen">
        <header className="border-b border-gray-200 dark:border-gray-700">
          <div className="mx-auto px-4 py-6 flex justify-between items-center">
            <h2 className="font-bold text-gray-900 dark:text-white">
              Changelog
            </h2>
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              aria-label={
                isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
              }
            >
              {isDarkMode ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </Button> */}
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="released">Released</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="planned">Planned</TabsTrigger>
            </TabsList>
            {['all', 'released', 'in-progress', 'planned'].map((tab) => (
              <TabsContent key={tab} value={tab}>
                <div className="space-y-8">
                  {changelogEntries
                    .filter((entry) => tab === 'all' || entry.status === tab)
                    .map((entry, index) => (
                      <Card
                        id={entry.version}
                        key={index}
                        className="dark:bg-gray-800"
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
                              <ChevronRight className="h-6 w-6 mr-2 text-blue-500" />
                              {entry.title}
                            </CardTitle>
                            <Badge className={getStatusColor(entry.status)}>
                              <span className="flex items-center">
                                {getStatusIcon(entry.status)}
                                <span className="ml-1 capitalize">
                                  {entry.status.replace('-', ' ')}
                                </span>
                              </span>
                            </Badge>
                          </div>
                          <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                            {entry.version} - {entry.date}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 dark:text-gray-300 mt-0 mb-4">
                            {entry.description}
                          </p>
                          {entry.content && <entry.content />}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </div>
    </div>
  );
}
