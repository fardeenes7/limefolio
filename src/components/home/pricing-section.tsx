"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { IconCheck, IconX, IconSparkles } from "@tabler/icons-react";

export function PricingSection({ plans }: { plans: any[] }) {
  const [isAnnual, setIsAnnual] = useState(false);
  const router = useRouter();

  const handlePlanSelect = (tier: string) => {
    if (tier === "free") {
      router.push("/register");
    } else {
      router.push(`/checkout?plan=${tier}&interval=${isAnnual ? "annual" : "monthly"}`);
    }
  };

  const getPrice = (plan: any) => {
    const interval = isAnnual ? "annual" : "monthly";
    const price = plan.prices?.find((p: any) => p.interval === interval && p.provider === "polar");
    if (!price) return "N/A";
    
    let displayAmount = price.amount;
    if (isAnnual) {
      // Show monthly equivalent for annual plans
      displayAmount = (parseFloat(price.amount) / 12).toFixed(2);
    }
    return `$${displayAmount}`;
  };

  return (
    <section
        id="pricing"
        className="py-24 border-b border-border bg-muted/20"
    >
        <div className="container px-6">
            <div className="mb-16 text-center space-y-4">
                <Badge variant="secondary" className="gap-1.5">
                    <IconSparkles className="size-3" />
                    Pricing
                </Badge>
                <h2 className="text-4xl font-bold tracking-tight">
                    Simple, transparent pricing
                </h2>
                <p className="mx-auto max-w-xl text-muted-foreground">
                    Start for free. Upgrade when you&apos;re ready. No
                    hidden fees.
                </p>

                <div className="flex items-center justify-center gap-3 mt-8">
                  <span className={!isAnnual ? "font-semibold" : "text-muted-foreground"}>Monthly</span>
                  <Switch 
                    checked={isAnnual} 
                    onCheckedChange={setIsAnnual} 
                  />
                  <span className={isAnnual ? "font-semibold" : "text-muted-foreground"}>
                    Annually <Badge variant="secondary" className="ml-1 text-xs">Save up to 25%</Badge>
                  </span>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
                {plans.map((plan: any) => (
                  <Card key={plan.id} className={`flex flex-col ${plan.tier === "pro" ? "border-primary shadow-lg shadow-primary/10 ring-1 ring-primary/30" : ""}`}>
                    {plan.tier === "pro" && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <Badge className="gap-1 shadow-sm">
                                <IconSparkles className="size-3" />
                                Most popular
                            </Badge>
                        </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription>
                        {plan.tier === "free" ? "Perfect to get started" : 
                         plan.tier === "pro" ? "For professionals" : "For teams and agencies"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="mb-6">
                        {plan.tier === "free" ? (
                          <span className="text-4xl font-bold">$0</span>
                        ) : (
                          <>
                            <span className="text-4xl font-bold">{getPrice(plan)}</span>
                            <span className="text-muted-foreground">/mo</span>
                            {isAnnual && <div className="text-sm text-muted-foreground mt-1">billed annually</div>}
                          </>
                        )}
                      </div>

                      <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                          <IconCheck className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">{plan.max_sites === -1 ? "Unlimited" : plan.max_sites} Sites</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <IconCheck className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">{plan.max_projects === -1 ? "Unlimited" : plan.max_projects} Projects</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <IconCheck className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">{plan.max_blogs === -1 ? "Unlimited" : plan.max_blogs} Blog Posts</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <IconCheck className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">{plan.max_team_members} Team Member{plan.max_team_members > 1 ? "s" : ""}</span>
                        </li>
                        
                        <li className="flex items-center gap-2">
                          {plan.allow_custom_domain ? <IconCheck className="h-4 w-4 text-primary" /> : <IconX className="h-4 w-4 text-muted-foreground" />}
                          <span className={plan.allow_custom_domain ? "text-muted-foreground" : "text-muted-foreground/60"}>Custom Domain</span>
                        </li>
                        <li className="flex items-center gap-2">
                          {plan.allow_remove_branding ? <IconCheck className="h-4 w-4 text-primary" /> : <IconX className="h-4 w-4 text-muted-foreground" />}
                          <span className={plan.allow_remove_branding ? "text-muted-foreground" : "text-muted-foreground/60"}>Remove Branding</span>
                        </li>
                        <li className="flex items-center gap-2">
                          {plan.allow_api_access ? <IconCheck className="h-4 w-4 text-primary" /> : <IconX className="h-4 w-4 text-muted-foreground" />}
                          <span className={plan.allow_api_access ? "text-muted-foreground" : "text-muted-foreground/60"}>API Access</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        variant={plan.tier === "pro" ? "default" : "outline"}
                        size="lg"
                        onClick={() => handlePlanSelect(plan.tier)}
                      >
                        {plan.tier === "free" ? "Get Started" : plan.tier === "pro" ? "Upgrade to Pro" : "Start Team Plan"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
        </div>
    </section>
  );
}