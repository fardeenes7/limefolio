import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
        <div className={cn("flex flex-col w-full", className)} {...props}>
            <div className="text-center mb-10">
                <h1 className="text-3xl font-medium tracking-tight mb-3">Welcome back</h1>
                <p className="text-muted-foreground">
                    Sign in to your account to continue.
                </p>
            </div>
            
            <div className="flex flex-col gap-4">
                <form
                    action={async () => {
                        "use server";
                        await signIn("google", {
                            redirectTo: next || "/app",
                        });
                    }}
                >
                    <Button 
                        variant="outline" 
                        className="w-full h-12 text-base border-border/50 shadow-sm hover:shadow-md transition-all"
                    >
                        <GoogleIcon />
                        Continue with Google
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
                    <Button 
                        variant="outline" 
                        className="w-full h-12 text-base border-border/50 shadow-sm hover:shadow-md transition-all"
                    >
                        <GithubIcon/>
                        Continue with Github
                    </Button>
                </form>
            </div>

            {error && (
                <div className="mt-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                    <p className="text-destructive text-sm text-center font-medium">
                        Something went wrong. Please try again.
                    </p>
                </div>
            )}

            <p className="text-muted-foreground text-sm text-center mt-12 leading-relaxed">
                By clicking continue, you agree to our{" "}
                <Link href="/terms-of-service" className="underline hover:text-foreground transition-colors">
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="underline hover:text-foreground transition-colors">
                    Privacy Policy
                </Link>
                .
            </p>
        </div>
    );
}
