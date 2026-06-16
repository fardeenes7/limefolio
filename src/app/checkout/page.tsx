"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getPlans, getBalance, validatePromoCode, createCheckoutSession } from "@/lib/actions/billing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { IconCircleCheck, IconChevronDown, IconCreditCard, IconAlertCircle } from "@tabler/icons-react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const planTier = searchParams.get("plan");
  const interval = searchParams.get("interval");
  const errorParam = searchParams.get("error");
  
  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [selectedPrice, setSelectedPrice] = useState<any>(null);
  
  const [promoCode, setPromoCode] = useState("");
  const [promoData, setPromoData] = useState<any>(null);
  const [promoError, setPromoError] = useState("");
  
  const [balance, setBalance] = useState<number>(0);
  const [useBalance, setUseBalance] = useState(false);
  
  const [selectedProvider, setSelectedProvider] = useState("polar");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [extraSeats, setExtraSeats] = useState(0);

  useEffect(() => {
    async function init() {
      if (!planTier || !interval) {
        router.push("/pricing");
        return;
      }
      
      try {
        // Fetch plans
        const plansData = await getPlans();
        setPlans(plansData);
        
        const plan = plansData.find((p: any) => p.tier === planTier);
        if (!plan) {
           router.push("/pricing");
           return;
        }
        setSelectedPlan(plan);
        
        // Initial price selection based on polar/USD
        const price = plan.prices.find((p: any) => p.interval === interval && p.provider === "polar");
        if (price) {
           setSelectedPrice(price);
           setSelectedProvider("polar");
        } else {
           // Fallback
           const fallbackPrice = plan.prices.find((p: any) => p.interval === interval);
           if (fallbackPrice) {
             setSelectedPrice(fallbackPrice);
             setSelectedProvider(fallbackPrice.provider);
           }
        }
        
        // Fetch user balance
        const balRes = await getBalance();
        if (balRes.ok && balRes.data) {
          setBalance(parseFloat(balRes.data.amount_usd));
        }
      } catch (e) {
        console.error("Initialization error", e);
      } finally {
        setInitialLoading(false);
      }
    }
    init();
  }, [planTier, interval, router]);

  // Update selected price if provider changes
  useEffect(() => {
    if (selectedPlan) {
       const price = selectedPlan.prices.find((p: any) => p.interval === interval && p.provider === selectedProvider);
       if (price) setSelectedPrice(price);
    }
    // Re-validate promo code on provider change to check currency match
    if (promoData && promoCode) {
        validatePromo();
    }
  }, [selectedProvider, selectedPlan, interval]);

  const validatePromo = async () => {
    if (!promoCode) return;
    setPromoError("");
    setPromoData(null);
    setLoading(true);
    
    try {
      const res = await validatePromoCode({
        code: promoCode,
        plan_tier: planTier,
        interval: interval,
        provider: selectedProvider,
        currency: selectedProvider === "polar" ? "USD" : "BDT"
      });
      
      if (res.ok && res.data.valid) {
        setPromoData(res.data);
      } else {
        setPromoError(res.data?.error || "Invalid promo code");
      }
    } catch (error) {
      setPromoError("Failed to validate promo code");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await createCheckoutSession({
        plan_tier: planTier,
        interval: interval,
        provider: selectedProvider,
        promo_code: promoData ? promoCode : undefined,
        use_balance: useBalance,
        extra_seats: extraSeats
      });
      
      if (res.ok && res.data.checkout_url) {
        window.location.href = res.data.checkout_url;
      } else {
        throw new Error(res.data?.error || "Checkout failed");
      }
    } catch (error: any) {
      console.error(error);
      alert(error.message || "An error occurred during checkout.");
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="flex justify-center py-20">Loading...</div>;
  }

  if (!selectedPlan || !selectedPrice) {
    return <div className="flex justify-center py-20">Invalid plan configuration.</div>;
  }

  const currencySymbol = selectedPrice.currency === "USD" ? "$" : "৳";
  let finalTotal = parseFloat(selectedPrice.amount);
  
  if (selectedPlan.tier === "team" && extraSeats > 0) {
      const seatPrice = selectedProvider === "polar" ? parseFloat(selectedPlan.price_per_extra_seat_usd) : parseFloat(selectedPlan.price_per_extra_seat_bdt);
      finalTotal += (extraSeats * seatPrice);
  }

  if (promoData && promoData.valid) {
      if (promoData.discount_type === "percentage") {
          finalTotal = finalTotal - (finalTotal * parseFloat(promoData.discount_value) / 100);
      } else {
          finalTotal = finalTotal - parseFloat(promoData.discount_value);
      }
  }

  if (finalTotal < 0) finalTotal = 0;
  
  let balanceApplied = 0;
  if (useBalance && selectedProvider === "polar" && balance > 0) {
      balanceApplied = Math.min(balance, finalTotal);
      finalTotal -= balanceApplied;
  }

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      {errorParam === "payment_failed" && (
        <Alert variant="destructive" className="mb-6">
          <IconAlertCircle className="h-4 w-4" />
          <AlertTitle>Payment Failed</AlertTitle>
          <AlertDescription>Your payment could not be processed. Please try again.</AlertDescription>
        </Alert>
      )}
      {errorParam === "payment_cancelled" && (
        <Alert variant="destructive" className="mb-6">
          <IconAlertCircle className="h-4 w-4" />
          <AlertTitle>Payment Cancelled</AlertTitle>
          <AlertDescription>You cancelled the payment. Your plan has not changed.</AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          
          <Card>
            <CardHeader>
              <CardTitle>Plan Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedPlan.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{interval} Billing</p>
                </div>
                <div className="text-xl font-bold">
                  {currencySymbol}{selectedPrice.amount}
                </div>
              </div>
              
              {selectedPlan.tier === "team" && (
                  <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Extra Seats ({currencySymbol}{selectedProvider === "polar" ? selectedPlan.price_per_extra_seat_usd : selectedPlan.price_per_extra_seat_bdt} each)</span>
                          <Input 
                              type="number" 
                              min="0" 
                              max="100" 
                              value={extraSeats} 
                              onChange={(e) => setExtraSeats(parseInt(e.target.value) || 0)}
                              className="w-20 h-8"
                          />
                      </div>
                  </div>
              )}

              <Collapsible className="mt-6 pt-4 border-t border-border">
                <CollapsibleTrigger className="flex items-center text-sm font-medium text-primary hover:underline">
                  Have a promo code? <IconChevronDown className="h-4 w-4 ml-1" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Enter code" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="secondary" onClick={validatePromo} disabled={loading || !promoCode}>
                      Apply
                    </Button>
                  </div>
                  {promoError && <p className="text-sm text-destructive mt-2">{promoError}</p>}
                  {promoData?.valid && (
                    <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
                      <IconCircleCheck className="h-4 w-4" />
                      Promo applied
                    </div>
                  )}
                </CollapsibleContent>
              </Collapsible>
              
              {balance > 0 && selectedProvider === "polar" && (
                <div className="mt-6 pt-4 border-t border-border flex items-center space-x-2">
                  <Checkbox 
                    id="use-balance" 
                    checked={useBalance} 
                    onCheckedChange={(c) => setUseBalance(!!c)} 
                  />
                  <label htmlFor="use-balance" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Apply ${balance.toFixed(2)} balance
                  </label>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Provider</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                className={`p-4 border rounded-lg cursor-pointer flex items-center gap-4 transition-all ${selectedProvider === 'polar' ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                onClick={() => setSelectedProvider('polar')}
              >
                <div className="h-4 w-4 rounded-full border border-primary flex items-center justify-center">
                    {selectedProvider === 'polar' && <div className="h-2 w-2 bg-primary rounded-full" />}
                </div>
                <div>
                  <h4 className="font-semibold flex items-center gap-2">Pay with Polar <Badge variant="secondary">USD</Badge></h4>
                  <p className="text-sm text-muted-foreground">Secure credit card payments</p>
                </div>
              </div>
              
              <div 
                className={`p-4 border rounded-lg cursor-pointer flex items-center gap-4 transition-all ${selectedProvider === 'bkash' ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                onClick={() => setSelectedProvider('bkash')}
              >
                <div className="h-4 w-4 rounded-full border border-primary flex items-center justify-center">
                    {selectedProvider === 'bkash' && <div className="h-2 w-2 bg-primary rounded-full" />}
                </div>
                <div>
                  <h4 className="font-semibold flex items-center gap-2">Pay with Bkash <Badge variant="secondary">BDT</Badge></h4>
                  <p className="text-sm text-muted-foreground">Local mobile money payments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>{selectedPlan.name} ({interval})</span>
                <span>{currencySymbol}{selectedPrice.amount}</span>
              </div>
              
              {selectedPlan.tier === "team" && extraSeats > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Extra Seats ({extraSeats})</span>
                  <span>{currencySymbol}{(extraSeats * (selectedProvider === "polar" ? parseFloat(selectedPlan.price_per_extra_seat_usd) : parseFloat(selectedPlan.price_per_extra_seat_bdt))).toFixed(2)}</span>
                </div>
              )}

              {promoData?.valid && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({promoCode})</span>
                  <span>-{currencySymbol}{promoData.discount_amount}</span>
                </div>
              )}
              
              {useBalance && selectedProvider === "polar" && balanceApplied > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Balance Applied</span>
                  <span>-${balanceApplied.toFixed(2)}</span>
                </div>
              )}
              
              <div className="border-t border-border pt-3 mt-3 flex justify-between font-bold text-lg">
                <span>Total Due</span>
                <span>{currencySymbol}{finalTotal.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" onClick={handleCheckout} disabled={loading}>
                {loading ? "Processing..." : `Pay ${currencySymbol}${finalTotal.toFixed(2)}`}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
