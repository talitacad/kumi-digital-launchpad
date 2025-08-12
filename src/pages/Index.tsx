
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Code, Search, Rocket, ChevronRight, Menu } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useState } from "react";
const Index = () => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [industry, setIndustry] = useState("");
  const [challenge, setChallenge] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [clientVolume, setClientVolume] = useState("");
  const [contactMethod, setContactMethod] = useState<"Email" | "Phone" | "">("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactCompany, setContactCompany] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [bestTimeToCall, setBestTimeToCall] = useState("");
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [wizardSuccessMessage, setWizardSuccessMessage] = useState("");
  const totalSteps = 6;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const company = String(data.get("company") || "");
    const message = String(data.get("message") || "");

    if (!webhookUrl) {
      toast({
        title: "Webhook required",
        description: "Please enter your Zapier webhook URL to send the email.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          destination_email: "talitacad@gmail.com",
          name,
          email,
          company,
          message,
          triggered_from: window.location.origin,
        }),
      });

      toast({
        title: "Thanks!",
        description: `${name ? name + ", " : ""}we'll be in touch shortly.`,
      });
      form.reset();
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast({
        title: "Error",
        description: "Failed to send. Please check the webhook URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleWizardSubmit = async () => {
    // Basic validation
    if (!contactMethod) {
      toast({ title: "Select a contact method", description: "Choose Email or Phone to continue.", variant: "destructive" });
      return;
    }
    if (!contactName || !contactEmail || !contactCompany || (contactMethod === "Phone" && (!contactPhone || !bestTimeToCall))) {
      toast({ title: "Missing details", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    setIsSubmittingLead(true);
    const lead = {
      timestamp: new Date().toISOString(),
      source: "project_wizard",
      industry,
      challenge,
      teamSize,
      clientVolume,
      contactMethod,
      name: contactName,
      email: contactEmail,
      company: contactCompany,
      phone: contactPhone || undefined,
      bestTimeToCall: contactMethod === "Phone" ? bestTimeToCall : undefined,
    };

    try {
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "no-cors",
          body: JSON.stringify({ type: "Lead", ...lead }),
        });
      }

      const method = contactMethod;
      const successMsg = method === "Email"
        ? "Thank you! We've received your information and our team will contact you by email shortly with an initial analysis."
        : "Thank you! We've received your information and our team will contact you by phone shortly to schedule a conversation at your preferred time.";

      // Close popup and show success message
      setWizardOpen(false);
      setWizardStep(1);
      toast({ title: "Success", description: successMsg });

      // Reset wizard fields
      setIndustry("");
      setChallenge("");
      setTeamSize("");
      setClientVolume("");
      setContactMethod("");
      setContactName("");
      setContactEmail("");
      setContactCompany("");
      setContactPhone("");
      setBestTimeToCall("");
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast({ title: "Error", description: "Failed to submit lead. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmittingLead(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <nav className="container mx-auto flex items-center justify-between py-4">
          <a href="#home" className="flex items-center gap-3">
            <img
              src="/lovable-uploads/299973bd-a767-4410-9baf-43f1d318bd92.png"
              alt="KUMI Digital logo"
              className="h-12 w-auto"
              loading="lazy"
            />
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <div className="hidden md:block">
            <Button onClick={() => setWizardOpen(true)}>Start a project</Button>
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <nav className="mt-4 flex flex-col gap-2">
                  <a href="#home" className="py-2 border-b border-border">Home</a>
                  <a href="#about" className="py-2 border-b border-border">About</a>
                  <a href="#services" className="py-2 border-b border-border">Services</a>
                  <a href="#contact" className="py-2">Contact</a>
                  <SheetClose asChild>
                    <Button className="mt-2" onClick={() => setWizardOpen(true)}>Start a project</Button>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      {/* Project Wizard Dialog */}
      <Dialog
        open={wizardOpen}
        onOpenChange={(o) => {
          setWizardOpen(o);
          if (!o) setWizardStep(1);
        }}
      >
        <DialogContent className="w-[95vw] md:w-[92vw] max-w-6xl hero-light bg-[hsl(var(--surface-soft))] p-8 md:p-10 lg:p-12 rounded-2xl" >
          {wizardStep <= totalSteps && (
            <DialogHeader className="text-center sm:text-center">
              <DialogTitle>Project Wizard</DialogTitle>
              <DialogDescription>
                Answer a few quick questions to get started.
              </DialogDescription>
            </DialogHeader>
          )}

          <div className="mx-auto max-w-4xl space-y-8 text-center">
            <div className="mx-auto w-[640px] max-w-full"><Progress value={(wizardStep / totalSteps) * 100} /></div>

            <div className="min-h-[320px]">
              {wizardStep === 1 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground text-center">What industry is your business in?</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Button variant="secondary" onClick={() => { setIndustry("Services (Clinics, Salons)"); setWizardStep(2); }}>Services (Clinics, Salons)</Button>
                    <Button variant="secondary" onClick={() => { setIndustry("Education (Schools, Courses)"); setWizardStep(2); }}>Education (Schools, Courses)</Button>
                    <Button variant="secondary" onClick={() => { setIndustry("Health & Wellness (Gyms, Studios)"); setWizardStep(2); }}>Health & Wellness (Gyms, Studios)</Button>
                    <Button variant="secondary" onClick={() => { setIndustry("Other"); setWizardStep(2); }}>Other</Button>
                  </div>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground text-center">What is your biggest challenge today?</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Button variant="secondary" onClick={() => { setChallenge("Organizing customer data"); setWizardStep(3); }}>Organizing customer data</Button>
                    <Button variant="secondary" onClick={() => { setChallenge("Managing schedules and tasks"); setWizardStep(3); }}>Managing schedules and tasks</Button>
                    <Button variant="secondary" onClick={() => { setChallenge("Tracking performance (reports)"); setWizardStep(3); }}>Tracking performance (reports)</Button>
                    <Button variant="secondary" onClick={() => { setChallenge("Team communication"); setWizardStep(3); }}>Team communication</Button>
                  </div>
                </div>
              )}

              {wizardStep === 3 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground text-center">Approximately how many people are on your team?</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Button variant="secondary" onClick={() => { setTeamSize("It's just me"); setWizardStep(4); }}>It's just me</Button>
                    <Button variant="secondary" onClick={() => { setTeamSize("2-5 people"); setWizardStep(4); }}>2-5 people</Button>
                    <Button variant="secondary" onClick={() => { setTeamSize("6-15 people"); setWizardStep(4); }}>6-15 people</Button>
                    <Button variant="secondary" onClick={() => { setTeamSize("More than 15 people"); setWizardStep(4); }}>More than 15 people</Button>
                  </div>
                </div>
              )}

              {wizardStep === 4 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground text-center">On average, how many active clients do you serve per month?</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Button variant="secondary" onClick={() => { setClientVolume("Up to 50"); setWizardStep(5); }}>Up to 50</Button>
                    <Button variant="secondary" onClick={() => { setClientVolume("51 to 150"); setWizardStep(5); }}>51 to 150</Button>
                    <Button variant="secondary" onClick={() => { setClientVolume("151 to 300"); setWizardStep(5); }}>151 to 300</Button>
                    <Button variant="secondary" onClick={() => { setClientVolume("More than 300"); setWizardStep(5); }}>More than 300</Button>
                  </div>
                </div>
              )}

              {wizardStep === 5 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-center">Excellent! Almost there.</h3>
                  <p className="text-sm text-muted-foreground text-center">How do you prefer we make first contact?</p>

                  <div className="flex gap-2 justify-center">
                    <Button
                      variant={contactMethod === "Email" ? "default" : "secondary"}
                      onClick={() => { setContactMethod("Email"); setWizardStep(6); }}
                    >
                      Email
                    </Button>
                    <Button
                      variant={contactMethod === "Phone" ? "default" : "secondary"}
                      onClick={() => { setContactMethod("Phone"); setWizardStep(6); }}
                    >
                      Phone
                    </Button>
                  </div>
                </div>
              )}

              {wizardStep === 6 && (
                <section aria-labelledby="wizard-contact-title" className="mx-auto max-w-3xl w-full">
                  {contactMethod === "Phone" ? (
                    <div className="min-h-[320px] flex items-center justify-center">
                      <h3 id="wizard-contact-title" className="text-xl font-semibold text-center">Great! Please provide your details.</h3>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <h3 id="wizard-contact-title" className="text-lg font-semibold text-center">Great! Please provide your details.</h3>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="md:col-span-1">
                          <label className="text-sm mb-2 block" htmlFor="lead-name">Your Name</label>
                          <Input id="lead-name" placeholder="Your full name" value={contactName} onChange={(e) => setContactName(e.target.value)} />
                        </div>
                        <div className="md:col-span-1">
                          <label className="text-sm mb-2 block" htmlFor="lead-email">Your Email</label>
                          <Input id="lead-email" type="email" placeholder="you@company.com" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-sm mb-2 block" htmlFor="lead-company">Company Name</label>
                          <Input id="lead-company" placeholder="Company name" value={contactCompany} onChange={(e) => setContactCompany(e.target.value)} />
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <Button onClick={handleWizardSubmit} disabled={isSubmittingLead}>
                          {isSubmittingLead ? "Submitting..." : "Submit"}
                        </Button>
                      </div>
                    </div>
                  )}
                </section>
              )}
            </div>
          </div>

          {wizardStep <= totalSteps ? (
            <DialogFooter className="w-full sm:justify-between">
              <Button variant="ghost" onClick={() => setWizardOpen(false)}>Cancel</Button>
              <div className="ml-auto flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setWizardStep(Math.max(1, wizardStep - 1))}
                  disabled={wizardStep === 1}
                >
                  Back
                </Button>
                {wizardStep < totalSteps && (
                  <Button
                    onClick={() => {
                      if (wizardStep < totalSteps) setWizardStep(wizardStep + 1);
                    }}
                  >
                    Next
                  </Button>
                )}
              </div>
            </DialogFooter>
          ) : (
            <div className="flex justify-end">
              <Button onClick={() => { setWizardOpen(false); setWizardStep(1); }}>Close</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <main>
        {/* Hero */}
        <section id="home" className="hero-light relative overflow-hidden bg-background">
          <div className="container mx-auto grid md:grid-cols-12 gap-8 items-center py-24">
            <div className="md:col-span-7 space-y-6">
              <h1 className="font-playfair text-primary text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                Time to rise.
              </h1>
              <p className="font-montserrat text-lg md:text-xl text-primary max-w-2xl">
                We build custom digital systems that organize your operational chaos and prepare your business to grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact">
                  <Button className="group">
                    Get a consultation
                    <ChevronRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </a>
                <a href="#services">
                  <Button variant="secondary">Explore services</Button>
                </a>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 to-accent/10 p-8 shadow-[var(--shadow-glow)]">
                <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">Trusted outcomes</p>
                <ul className="space-y-3 text-sm text-foreground">
                  <li>• 10x faster delivery with modern tooling</li>
                  <li>• Battle-tested architectures</li>
                  <li>• Security-first by design</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-20 border-t border-border/60">
          <div className="container mx-auto grid md:grid-cols-12 gap-10 items-center">
            {/* Left: Branding logo */}
            <div className="md:col-span-5 flex justify-center">
              <img
                src="/lovable-uploads/ac2d0f5f-7c53-4040-a503-e3c1000c94bf.png"
                alt="KUMI Digital primary logo"
                className="w-48 sm:w-56 md:w-72 lg:w-80 xl:w-96 h-auto"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Right: Mission copy */}
            <div className="md:col-span-7 space-y-4 font-montserrat">
              <h2 className="font-playfair text-3xl md:text-4xl font-semibold">Our Mission is Your Growth.</h2>
              <p className="text-muted-foreground leading-relaxed">
                KUMI was born from a simple observation: growing businesses are often left behind by technology. Generic tools don't fit, and custom solutions are out of reach. Our mission is to fill this gap. We believe technology should adapt to human processes, not the other way around. Our team of strategists and engineers partners with you to build the exact solution your operation needs. The name KUMI comes from the ancient Aramaic word for 'Rise'. It's our promise to every client: to provide the foundation for your business to rise.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-20 border-t border-border/60">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold mb-10">Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-[var(--shadow-elevate)] transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3"><Search className="size-5 text-primary" /> Discovery & Strategy</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  We dive deep into your current operations to understand your unique challenges and map out a clear path for digital transformation.
                </CardContent>
              </Card>
              <Card className="hover:shadow-[var(--shadow-elevate)] transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3"><Code className="size-5 text-primary" /> Custom Development</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Our team builds your tailored platform using flexible and powerful technology, ensuring it fits your process perfectly.
                </CardContent>
              </Card>
              <Card className="hover:shadow-[var(--shadow-elevate)] transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3"><Rocket className="size-5 text-primary" /> Launch & Support</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  We handle the full implementation, train your team, and provide ongoing support to ensure your business continues to rise.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 border-t border-border/60">
          <div className="container mx-auto grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-semibold">Let's build something great</h2>
              <p className="text-muted-foreground">Tell us about your goals. We'll follow up within one business day.</p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Contact us</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                  <div className="md:col-span-2">
                    <label className="text-xs text-muted-foreground mb-2 block" htmlFor="webhook">Zapier Webhook URL (admin)</label>
                    <Input
                      id="webhook"
                      type="url"
                      placeholder="https://hooks.zapier.com/hooks/catch/..."
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="text-sm mb-2 block" htmlFor="name">Name</label>
                    <Input id="name" name="name" required placeholder="Your name" />
                  </div>
                  <div className="md:col-span-1">
                    <label className="text-sm mb-2 block" htmlFor="email">Email</label>
                    <Input id="email" name="email" type="email" required placeholder="you@company.com" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm mb-2 block" htmlFor="company">Company</label>
                    <Input id="company" name="company" placeholder="Company name" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm mb-2 block" htmlFor="message">Message</label>
                    <Textarea id="message" name="message" required placeholder="How can we help?" rows={5} />
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <Button type="submit" disabled={isSending}>{isSending ? "Sending..." : "Send message"}</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="container mx-auto py-10 flex flex-col items-center text-center">
          <img
            src="/lovable-uploads/299973bd-a767-4410-9baf-43f1d318bd92.png"
            alt="KUMI Digital — Where businesses rise. logo"
            className="h-12 w-auto md:h-14"
            loading="lazy"
            decoding="async"
          />
          <p className="mt-0.5 text-xs text-muted-foreground">© 2025 KUMI Digital LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
