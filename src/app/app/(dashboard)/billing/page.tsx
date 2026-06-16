"use client";

import { Suspense, useEffect, useState } from "react";
import { getSubscription, getBalance, cancelSubscription, reactivateSubscription } from "@/lib/actions/billing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { IconAlertCircle, IconCircle, IconClock } from "@tabler/icons-react";

function BillingDashboardContent() {
  const searchParams = useSearchParams();
  const successParam = searchParams.get("success");
  
  const [sub, setSub] = useState<any>(null);
  const [balance, setBalance] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [subRes, balRes] = await Promise.all([
            getSubscription(),
            getBalance()
        ]);
        
        if (subRes.ok) setSub(subRes.data);
        if (balRes.ok) setBalance(balRes.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCancel = async () => {
      if (!confirm("Are you sure you want to cancel your subscription?")) return;
      try {
          const res = await cancelSubscription();
          if (res.ok) {
              window.location.reload();
          } else {
              alert(res.data?.error || "Failed to cancel.");
          }
      } catch (e) {
          alert("Error cancelling.");
      }
  };

  const handleReactivate = async () => {
      try {
          const res = await reactivateSubscription();
          if (res.ok) {
              window.location.reload();
          } else {
              alert(res.data?.error || "Failed to reactivate.");
          }
      } catch (e) {
          alert("Error reactivating.");
      }
  };

  if (loading) return <div className="p-8">Loading billing data...</div>;

  const isGracePeriod = sub?.status === "grace_period";
  const isExpiringSoon = sub?.provider === "bkash" && sub?.current_period_end && 
                         new Date(sub.current_period_end).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
      </div>

      {successParam && (
        <Alert className="border-green-500 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-200">
          <IconCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle>Payment Successful</AlertTitle>
          <AlertDescription>Your subscription has been updated.</AlertDescription>
        </Alert>
      )}

      {isGracePeriod && (
          <Alert variant="destructive">
            <IconAlertCircle className="h-4 w-4" />
            <AlertTitle>Action Required</AlertTitle>
            <AlertDescription>
                Your Bkash subscription has expired. You are in a grace period until {format(new Date(sub.grace_period_end), 'PPP')}. Please renew to avoid losing access.
            </AlertDescription>
          </Alert>
      )}
      
      {isExpiringSoon && !isGracePeriod && (
          <Alert>
            <IconClock className="h-4 w-4" />
            <AlertTitle>Subscription Expiring Soon</AlertTitle>
            <AlertDescription>
                Your Bkash subscription expires on {format(new Date(sub.current_period_end), 'PPP')}.
            </AlertDescription>
          </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Manage your subscription and billing details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sub ? (
                <>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h3 className="text-2xl font-bold">{sub.plan_name}</h3>
                            <Badge variant={sub.status === "active" ? "default" : sub.status === "grace_period" ? "destructive" : "secondary"}>
                                {sub.status}
                            </Badge>
                            {sub.cancelled_at && <Badge variant="outline">Cancels at period end</Badge>}
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground capitalize">Provider: {sub.provider}</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mt-4 p-4 bg-muted/50 rounded-lg">
                        <div>
                            <p className="text-muted-foreground">Current Period Start</p>
                            <p className="font-medium">{sub.current_period_start ? format(new Date(sub.current_period_start), 'PPP') : 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Current Period End</p>
                            <p className="font-medium">{sub.current_period_end ? format(new Date(sub.current_period_end), 'PPP') : 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Total Seats</p>
                            <p className="font-medium">{sub.total_seats}</p>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center py-6">
                    <p className="text-muted-foreground mb-4">You are currently on the Free plan.</p>
                </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t border-border pt-4">
              <Link href="/pricing">
                  <Button variant="outline">Upgrade Plan</Button>
              </Link>
              
              {sub && sub.status !== "expired" && (
                  <div className="flex gap-2">
                      {(isGracePeriod || isExpiringSoon) && sub.provider === "bkash" && (
                           <Link href={`/checkout?plan=${sub.plan_tier}&interval=monthly`}>
                               <Button>Renew Now</Button>
                           </Link>
                      )}
                      
                      {sub.cancelled_at ? (
                          <Button variant="secondary" onClick={handleReactivate}>Reactivate</Button>
                      ) : (
                          <Button variant="destructive" onClick={handleCancel}>Cancel Subscription</Button>
                      )}
                  </div>
              )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>USD Balance</CardTitle>
            <CardDescription>Available credits for Polar payments.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">
                ${balance?.amount_usd ? parseFloat(balance.amount_usd).toFixed(2) : '0.00'}
            </div>
            <p className="text-sm text-muted-foreground">
                Automatically applied to your next Polar invoice. Cannot be withdrawn.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
          <CardHeader>
              <CardTitle>Invoice History</CardTitle>
              <CardDescription>View and download your past invoices.</CardDescription>
          </CardHeader>
          <CardContent>
              {/* Dummy data for now, ideally fetch from API */}
              <div className="text-center py-8 text-muted-foreground">
                  No invoices found.
              </div>
          </CardContent>
      </Card>
    </div>
  );
}

export default function BillingDashboard() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <BillingDashboardContent />
    </Suspense>
  );
}
