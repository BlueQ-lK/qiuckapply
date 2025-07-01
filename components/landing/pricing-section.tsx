import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm mb-4">
            <span className="mr-2">💰</span>
            Pricing
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">100% Free for Individual Users</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start tracking your job applications today. No credit card required, no hidden fees.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-8 pt-8">
              <CardTitle className="text-3xl mb-4">Free Forever</CardTitle>
              <div className="mb-4">
                <span className="text-5xl font-bold">₹0</span>
                <span className="text-muted-foreground">/forever</span>
              </div>
              <p className="text-muted-foreground">Perfect for individual job seekers</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "Unlimited job applications",
                "Timeline and progress tracking",
                "Notes and attachments",
                "Auto reminders",
                "Privacy and stealth features",
                "Export your data anytime",
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
              <div className="pt-6">
                <Button className="w-full" size="lg" asChild>
                  <Link href="/signup">Get Started Free</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
