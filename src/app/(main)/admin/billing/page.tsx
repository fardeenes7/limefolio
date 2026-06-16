"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/fetcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AdminBillingPage() {
    // A full implementation would need endpoints for these.
    // For Phase 8, we build out the basic UI structure to connect to Admin APIs later.
    
    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl font-bold mb-8">Admin Billing Controls</h1>
            
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Providers</CardTitle>
                        <CardDescription>Enable or disable payment methods globally.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <h3 className="font-medium">Polar (USD)</h3>
                                <p className="text-sm text-muted-foreground">Credit card payments</p>
                            </div>
                            <Switch checked={true} />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <h3 className="font-medium">Bkash (BDT)</h3>
                                <p className="text-sm text-muted-foreground">Mobile money payments</p>
                            </div>
                            <Switch checked={true} />
                        </div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Promo Codes</CardTitle>
                        <CardDescription>Manage discount codes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-muted-foreground">Promo code management coming soon. Use Django Admin for now.</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Plan Pricing</CardTitle>
                        <CardDescription>Manage plan pricing (requires Django Admin for full editing).</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-muted-foreground">Pricing management coming soon. Use Django Admin for now.</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}