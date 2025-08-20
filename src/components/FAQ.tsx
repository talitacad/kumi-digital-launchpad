import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is KUMI Digital and what services do you provide?",
      answer: "KUMI Digital is a boutique tech consultancy specializing in custom software development for service-based businesses. We provide three main services: Discovery & Design (understanding your needs and creating strategic solutions), Development & Delivery (building custom platforms and websites), and Training & Support (ensuring your team can effectively use the new tools)."
    },
    {
      question: "Who is the ideal client for KUMI Digital?",
      answer: "Our ideal clients are service-based businesses struggling with operational chaos from manual processes. This includes language schools managing students and classes, fitness studios or gyms scheduling sessions and members, professional service providers like clinics or agencies juggling clients and appointments, and any business feeling stuck in a maze of spreadsheets."
    },
    {
      question: "How long does a typical KUMI Digital project take?",
      answer: "Project timelines vary based on complexity and scope. A simple professional website typically takes 2-4 weeks, while custom platform development usually ranges from 6-12 weeks. During our initial consultation, we provide detailed timelines based on your specific requirements and business needs."
    },
    {
      question: "What makes KUMI Digital different from other tech consultancies?",
      answer: "Unlike generic solutions or complex enterprise systems, we focus exclusively on service-based businesses. We build simple, tailor-made digital platforms that organize your operations from client tracking to daily tasks. Our approach prioritizes understanding your unique workflow over forcing you to adapt to existing software."
    },
    {
      question: "Do you provide ongoing support after project completion?",
      answer: "Yes, we provide comprehensive training and ongoing support. We don't just hand over the keys – we train your team to use the new tools effectively and provide continued support to ensure your success. This includes technical support, user training, and guidance on best practices."
    },
    {
      question: "How do I get started with KUMI Digital?",
      answer: "The best way to start is through our Project Wizard, which helps us understand your specific needs and challenges. This ensures we can have a productive first conversation tailored to your business requirements. You can also reach us directly at hello@wearekumi.com for general inquiries."
    },
    {
      question: "What industries does KUMI Digital serve?",
      answer: "We primarily serve service-based businesses including education (schools, courses), health and wellness (gyms, studios, clinics), professional services (agencies, consultancies), and any business relying heavily on client management and appointment scheduling."
    },
    {
      question: "What is the cost of working with KUMI Digital?",
      answer: "Project costs vary significantly based on scope, complexity, and specific requirements. Simple websites start at different price points than custom platform development. We provide detailed, transparent pricing during our discovery phase after understanding your specific needs and requirements."
    }
  ];

  return (
    <section id="faq" className="py-20 border-t border-border/60">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">
            Common questions about KUMI Digital's services, process, and approach to custom software development.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <Card>
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <CardHeader className="p-0">
                    <CardTitle className="text-left text-lg font-medium">
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <CardContent className="p-0">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* FAQ Structured Data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </section>
  );
};

export default FAQ;