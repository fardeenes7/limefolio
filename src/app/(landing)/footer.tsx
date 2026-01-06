import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, X, Facebook, Linkedin, Github } from "lucide-react";
import { SiteConfig } from "@/lib/site-config";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="w-full bg-background dark:bg-gray-800 border-t">
            <div className="container mx-auto px-4 pt-12 md:pt-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image
                                src="/icon.svg"
                                alt={SiteConfig.title}
                                width={32}
                                height={32}
                                className="rounded-lg"
                            />

                            <span className="text-lg font-bold">
                                {SiteConfig.title}
                            </span>
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Empowering creatives to showcase their best work and
                            build their professional brand.
                        </p>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="#"
                                className="text-gray-500 hover:text-primary"
                            >
                                <X className="h-5 w-5" />

                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-500 hover:text-primary"
                            >
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link
                                href="https://www.linkedin.com/in/fardeenes7/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-primary"
                            >
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                            <Link
                                href="https://github.com/fardeenes7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-primary"
                            >
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm hover:underline"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm hover:underline"
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm hover:underline"
                                >
                                    Explore
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm hover:underline"
                                >
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm hover:underline"
                                >
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm hover:underline"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm hover:underline"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm hover:underline"
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Stay Updated</h3>
                        <form className="space-y-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                            />
                            <Button type="submit" className="w-full">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="mt-8 py-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                            © {new Date().getFullYear()} {SiteConfig.title}. All
                            rights reserved.
                        </p>
                        <p className="md:text-right text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            Made with{" "}
                            <Heart className="h-4 w-4 fill-red-500 text-red-500 mx-1" />{" "}
                            by{" "}
                            <Link
                                href="https://fardiin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mx-1.5 font-semibold text-gray-700 dark:text-gray-200 hover:underline"
                            >
                                Fardeen Ehsan
                            </Link>{" "}
                            in Bangladesh
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
