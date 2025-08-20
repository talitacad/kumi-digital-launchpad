import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Mail, Award } from "lucide-react";

const TrustSignals = () => {
  return (
    <section className="py-12 border-t border-border/60 bg-muted/30">
      <div className="container mx-auto">
        <h3 className="text-xl font-semibold text-center mb-8">Why Choose KUMI Digital</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Award className="size-8 text-primary mx-auto mb-3" />
              <h4 className="font-medium mb-2">Specialized Expertise</h4>
              <p className="text-sm text-muted-foreground">
                Focused exclusively on service-based business solutions since 2024
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Calendar className="size-8 text-primary mx-auto mb-3" />
              <h4 className="font-medium mb-2">Fast Turnaround</h4>
              <p className="text-sm text-muted-foreground">
                Most projects completed in 6-12 weeks with ongoing support
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <MapPin className="size-8 text-primary mx-auto mb-3" />
              <h4 className="font-medium mb-2">US-Based Team</h4>
              <p className="text-sm text-muted-foreground">
                Local expertise with understanding of American business practices
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Mail className="size-8 text-primary mx-auto mb-3" />
              <h4 className="font-medium mb-2">Direct Access</h4>
              <p className="text-sm text-muted-foreground">
                Work directly with experienced developers, not account managers
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <Badge variant="secondary">Custom Software Development</Badge>
            <Badge variant="secondary">Web Applications</Badge>
            <Badge variant="secondary">Database Design</Badge>
            <Badge variant="secondary">User Training</Badge>
            <Badge variant="secondary">Ongoing Support</Badge>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>Last Updated:</strong> January 2025 | 
              <strong className="ml-2">Founded:</strong> 2024 | 
              <strong className="ml-2">Contact:</strong> hello@wearekumi.com
            </p>
            <p>
              KUMI Digital LLC is a registered US-based technology consultancy specializing in custom software solutions for service-based businesses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;