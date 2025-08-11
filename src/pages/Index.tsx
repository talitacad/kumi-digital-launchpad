import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Code, Cloud, Shield, ChevronRight } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const glowRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!glowRef.current) return;
    const rect = glowRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.setProperty("--x", `${x}px`);
    glowRef.current.style.setProperty("--y", `${y}px`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    toast({
      title: "Thanks!",
      description: `${name ? name + ", " : ""}we'll be in touch shortly.`,
    });
    e.currentTarget.reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <nav className="container mx-auto flex items-center justify-between py-4">
          <a href="#home" className="flex items-center gap-3">
            <img
              src="/lovable-uploads/ac2d0f5f-7c53-4040-a503-e3c1000c94bf.png"
              alt="KUMI Digital logo"
              className="h-8 w-auto"
              loading="lazy"
            />
            <span className="font-semibold tracking-wide">KUMI Digital</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <div className="hidden md:block">
            <a href="#contact"><Button>Start a project</Button></a>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section id="home" onMouseMove={onMouseMove} className="relative overflow-hidden">
          <div ref={glowRef} aria-hidden className="pointer-events-none absolute inset-0" style={{
            background: `radial-gradient(600px 300px at var(--x,50%) var(--y,40%), hsl(var(--primary)/0.18), transparent 60%)`
          }} />
          <div className="container mx-auto grid md:grid-cols-12 gap-8 items-center py-24">
            <div className="md:col-span-7 space-y-6">
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
                KUMI Digital — modern tech consultancy for ambitious teams
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                We design, build, and scale cloud-native software that moves your business forward — fast, secure, and reliable.
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
                <ul className="space-y-3 text-sm">
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
          <div className="container mx-auto grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-6 space-y-4">
              <h2 className="text-3xl md:text-4xl font-semibold">About KUMI Digital</h2>
              <p className="text-muted-foreground">
                We are a boutique consultancy partnering with startups and enterprises to deliver elegant, scalable systems. Our experts bring deep experience in modern web, cloud platforms, and data engineering.
              </p>
            </div>
            <div className="md:col-span-6 grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-3xl font-semibold">99.9%</div>
                  <p className="text-sm text-muted-foreground">Uptime targets we engineer for</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-3xl font-semibold"><span className="text-primary">$</span>MM</div>
                  <p className="text-sm text-muted-foreground">Revenue scaled on our platforms</p>
                </CardContent>
              </Card>
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
                  <CardTitle className="flex items-center gap-3"><Code className="size-5 text-primary" /> Product Engineering</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Full-stack web and mobile apps with modern frameworks, CI/CD, and testing discipline.
                </CardContent>
              </Card>
              <Card className="hover:shadow-[var(--shadow-elevate)] transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3"><Cloud className="size-5 text-primary" /> Cloud & DevOps</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Cloud-native infrastructure, containerization, observability, and cost optimization.
                </CardContent>
              </Card>
              <Card className="hover:shadow-[var(--shadow-elevate)] transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3"><Shield className="size-5 text-primary" /> Security by Design</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Threat modeling, secure SDLC, and compliance-ready architectures from day one.
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
                    <Button type="submit">Send message</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="container mx-auto py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} KUMI Digital</div>
          <div className="flex items-center gap-6">
            <a href="#services" className="hover:text-primary">Services</a>
            <a href="#contact" className="hover:text-primary">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
