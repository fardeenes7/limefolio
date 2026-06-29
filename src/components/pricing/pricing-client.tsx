"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { CheckIcon, XIcon, SparkleIcon } from "@phosphor-icons/react";

export function PricingClient({ plans }: { plans: any[] }) {
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

  const gridCols = plans?.length === 1 ? "grid-cols-1" : plans?.length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3";

  return (
    <section id="pricing" className="relative z-10 py-24 bg-background">
      <div className="container px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24 mx-auto text-center">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-7xl font-medium tracking-tight mb-6 leading-[1.1]"
            >
                Fair pricing for <span className="italic pb-1">creatives</span>.
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10"
            >
                No hidden fees. No arbitrary limits. Just the tools you need to showcase your best work.
            </motion.p>
            
            {/* Toggle */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center gap-4"
            >
                <span className={`text-sm ${!isAnnual ? "font-medium text-foreground" : "text-muted-foreground"}`}>Monthly</span>
                <Switch 
                    checked={isAnnual} 
                    onCheckedChange={setIsAnnual} 
                    className="data-[state=checked]:bg-primary"
                />
                <span className={`text-sm flex items-center gap-2 ${isAnnual ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                    Annually <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none rounded-full px-3">Save 25%</Badge>
                </span>
            </motion.div>
        </div>

        <div className={`grid ${gridCols} gap-8 max-w-6xl mx-auto`}>
          {plans?.length > 0 ? plans.map((plan: any, i: number) => {
            const isPro = plan.tier === "pro";
            
            return (
                <motion.div 
                    key={plan.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative rounded-3xl p-8 md:p-10 flex flex-col transition-all duration-500 hover:shadow-2xl border ${isPro ? "bg-foreground text-background border-foreground shadow-xl lg:scale-105 z-10" : "bg-muted border-border/50 shadow-sm hover:border-primary/20"}`}
                >
                    {isPro && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                            <Badge className="bg-primary text-primary-foreground hover:bg-primary border-none rounded-full px-4 py-1 gap-1.5 shadow-lg">
                                <SparkleIcon weight="fill" className="w-4 h-4" />
                                Most popular
                            </Badge>
                        </div>
                    )}
                    
                    <div className="mb-8">
                        <h3 className="text-2xl font-medium tracking-tight mb-2">{plan.name}</h3>
                        <p className={isPro ? "text-background/70" : "text-muted-foreground"}>
                            {plan.tier === "free" ? "Perfect to get started." : plan.tier === "pro" ? "Everything you need for a serious portfolio." : "For teams and agencies."}
                        </p>
                        <div className="mt-6 flex items-baseline gap-1">
                            {plan.tier === "free" ? (
                                <span className="text-5xl md:text-6xl font-medium tracking-tight">$0</span>
                            ) : (
                                <>
                                    <span className="text-5xl md:text-6xl font-medium tracking-tight">{getPrice(plan)}</span>
                                    <span className={isPro ? "text-background/70" : "text-muted-foreground"}>/mo</span>
                                </>
                            )}
                        </div>
                        {isAnnual && plan.tier !== "free" && (
                            <div className={`text-sm mt-2 ${isPro ? "text-background/60" : "text-muted-foreground"}`}>
                                billed annually
                            </div>
                        )}
                    </div>

                    <ul className="space-y-4 mb-10 flex-1">
                        <li className="flex items-center gap-3">
                            <CheckIcon weight="bold" className={`w-5 h-5 shrink-0 ${isPro ? "text-background/50" : "text-primary"}`} />
                            <span className={isPro ? "text-background" : "text-foreground"}>
                                {plan.max_sites === -1 ? "Unlimited" : plan.max_sites} Sites
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckIcon weight="bold" className={`w-5 h-5 shrink-0 ${isPro ? "text-background/50" : "text-primary"}`} />
                            <span className={isPro ? "text-background" : "text-foreground"}>
                                {plan.max_projects === -1 ? "Unlimited" : plan.max_projects} Projects
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckIcon weight="bold" className={`w-5 h-5 shrink-0 ${isPro ? "text-background/50" : "text-primary"}`} />
                            <span className={isPro ? "text-background" : "text-foreground"}>
                                {plan.max_blogs === -1 ? "Unlimited" : plan.max_blogs} Blog Posts
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckIcon weight="bold" className={`w-5 h-5 shrink-0 ${isPro ? "text-background/50" : "text-primary"}`} />
                            <span className={isPro ? "text-background" : "text-foreground"}>
                                {plan.max_team_members} Team Member{plan.max_team_members > 1 ? "s" : ""}
                            </span>
                        </li>
                        
                        <li className="flex items-center gap-3">
                            {plan.allow_custom_domain ? (
                                <CheckIcon weight="bold" className={`w-5 h-5 shrink-0 ${isPro ? "text-background/50" : "text-primary"}`} />
                            ) : (
                                <XIcon weight="bold" className={`w-5 h-5 shrink-0 ${isPro ? "text-background/30" : "text-muted-foreground/40"}`} />
                            )}
                            <span className={plan.allow_custom_domain ? (isPro ? "text-background" : "text-foreground") : (isPro ? "text-background/50" : "text-muted-foreground")}>
                                Custom Domain
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            {plan.allow_remove_branding ? (
                                <CheckIcon weight="bold" className={`w-5 h-5 shrink-0 ${isPro ? "text-background/50" : "text-primary"}`} />
                            ) : (
                                <XIcon weight="bold" className={`w-5 h-5 shrink-0 ${isPro ? "text-background/30" : "text-muted-foreground/40"}`} />
                            )}
                            <span className={plan.allow_remove_branding ? (isPro ? "text-background" : "text-foreground") : (isPro ? "text-background/50" : "text-muted-foreground")}>
                                Remove Branding
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            {plan.allow_api_access ? (
                                <CheckIcon weight="bold" className={`w-5 h-5 shrink-0 ${isPro ? "text-background/50" : "text-primary"}`} />
                            ) : (
                                <XIcon weight="bold" className={`w-5 h-5 shrink-0 ${isPro ? "text-background/30" : "text-muted-foreground/40"}`} />
                            )}
                            <span className={plan.allow_api_access ? (isPro ? "text-background" : "text-foreground") : (isPro ? "text-background/50" : "text-muted-foreground")}>
                                API Access
                            </span>
                        </li>
                    </ul>

                    <Button 
                        size="lg"
                        className={`w-full rounded-full h-14 text-base transition-transform active:scale-[0.98] ${isPro ? "bg-background text-foreground hover:bg-background/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
                        onClick={() => handlePlanSelect(plan.tier)}
                    >
                        {plan.tier === "free" ? "Start free" : plan.tier === "pro" ? "Upgrade to Pro" : "Start Team Plan"}
                    </Button>
                </motion.div>
            );
          }) : (
              <div className="col-span-full py-24 text-center text-muted-foreground">
                  No pricing plans available at the moment. Please check back later.
              </div>
          )}
        </div>
      </div>
    </section>
  );
}
