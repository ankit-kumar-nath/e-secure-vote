import { Link } from "react-router-dom";
import { Shield, Lock, Fingerprint, Vote, Users, CheckCircle, ArrowRight, Eye, FileText, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SecurityBadge } from "@/components/ui/security-badge";
import heroImage from "@/assets/hero-voting.jpg";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Every vote is immutably recorded on a distributed ledger, ensuring tamper-proof elections.",
    },
    {
      icon: Fingerprint,
      title: "Face Recognition",
      description: "Advanced biometric verification prevents impersonation and ensures one-person-one-vote.",
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "Your vote is encrypted from casting to counting, protecting your privacy completely.",
    },
    {
      icon: Eye,
      title: "Transparent Auditing",
      description: "Real-time verification while maintaining complete voter anonymity in results.",
    },
  ];

  const steps = [
    { number: "01", title: "Register", description: "Complete online registration with identity verification" },
    { number: "02", title: "Verify", description: "Your application is verified by election officials" },
    { number: "03", title: "Authenticate", description: "Login with Voter ID, OTP, and face recognition" },
    { number: "04", title: "Vote", description: "Cast your vote securely on the blockchain" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background" />
        
        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <div className="flex justify-center gap-3 mb-6">
              <SecurityBadge type="blockchain" />
              <SecurityBadge type="biometric" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Secure, Transparent
              <span className="block text-primary">Electronic Voting</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Exercise your democratic right with confidence. Our blockchain-powered voting system 
              ensures every vote is secure, verifiable, and counted accurately.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-govt-primary">
                <Link to="/register">
                  <Vote className="mr-2 h-5 w-5" />
                  Register to Vote
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="btn-govt-outline">
                <Link to="/login">
                  Login to Vote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 border-y bg-card">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/register"
              className="card-interactive p-6 flex items-center gap-4 group"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Users className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">New Voter Registration</h3>
                <p className="text-sm text-muted-foreground">Register for upcoming elections</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>

            <Link
              to="/track"
              className="card-interactive p-6 flex items-center gap-4 group"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10 text-warning group-hover:bg-warning group-hover:text-warning-foreground transition-colors">
                <FileText className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Track Application</h3>
                <p className="text-sm text-muted-foreground">Check registration status</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-warning transition-colors" />
            </Link>

            <Link
              to="/login"
              className="card-interactive p-6 flex items-center gap-4 group"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10 text-success group-hover:bg-success group-hover:text-success-foreground transition-colors">
                <Vote className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Cast Your Vote</h3>
                <p className="text-sm text-muted-foreground">Login to vote in active elections</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-success transition-colors" />
            </Link>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Government-Grade Security
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our multi-layered security architecture ensures the integrity of every election
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-elevated p-6 text-center animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-4">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A simple, secure process from registration to vote casting
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-primary/10 mb-4">{step.number}</div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-8 -right-4 h-6 w-6 text-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-card border-y">
        <div className="container">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100M+</div>
              <div className="text-sm text-muted-foreground">Registered Voters</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">System Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Security Breaches</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-6 w-6 text-success" />
                <span className="text-lg font-semibold">ISO 27001 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 govt-header text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make Your Voice Heard?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join millions of citizens who have already registered for secure electronic voting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/register">
                Register Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/track">
                Track Application
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
