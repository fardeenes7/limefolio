import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { GithubIcon, GoogleIcon } from "@/lib/icons";
import { signIn } from "@/auth";

export default async function LoginForm({
    searchParams,
    className,
    ...props
}: React.ComponentProps<"div"> & {
    searchParams: Promise<{ error?: string; next?: string }>;
}) {
    const { error, next } = await searchParams;
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>
                        Login with your Apple or Google account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <form
                            action={async () => {
                                "use server";
                                await signIn("google", {
                                    redirectTo: next || "/app",
                                });
                            }}
                        >
                            <Button variant="outline" className="w-full ">
                                <GoogleIcon />
                                Login with Google
                            </Button>
                        </form>
                        <form
                            action={async () => {
                                "use server";
                                await signIn("github", {
                                    redirectTo: next || "/app",
                                });
                            }}
                        >
                            <Button variant="outline" className="w-full">
                                <GithubIcon />
                                Login with Github
                            </Button>
                        </form>
                    </div>
                </CardContent>
                {error && (
                    <CardFooter>
                        <p className="w-full text-destructive text-sm text-center">
                            Something went wrong. Please try again.
                        </p>
                    </CardFooter>
                )}
            </Card>
            <p className="text-muted-foreground text-sm px-6 text-center">
                By clicking continue, you agree to our{" "}
                <Link href="/terms-of-service" className="underline">
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="underline">
                    Privacy Policy
                </Link>
                .
            </p>
        </div>
    );
}
