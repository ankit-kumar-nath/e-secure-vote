import { Link } from "react-router-dom";
import { Shield, Lock, Fingerprint, Vote, Users, CheckCircle, ArrowRight, Eye, FileText, ChevronRight, Sparkles, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SecurityBadge } from "@/components/ui/security-badge";
import indiaFlagBg from "@/assets/india-flag-bg.jpg";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Every vote is immutably recorded on a distributed ledger, ensuring tamper-proof elections.",
      gradient: "from-blue-500/20 to-indigo-500/20",
    },
    {
      icon: Fingerprint,
      title: "Face Recognition",
      description: "Advanced biometric verification prevents impersonation and ensures one-person-one-vote.",
      gradient: "from-violet-500/20 to-purple-500/20",
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "Your vote is encrypted from casting to counting, protecting your privacy completely.",
      gradient: "from-emerald-500/20 to-teal-500/20",
    },
    {
      icon: Eye,
      title: "Transparent Auditing",
      description: "Real-time verification while maintaining complete voter anonymity in results.",
      gradient: "from-amber-500/20 to-orange-500/20",
    },
  ];

  const steps = [
    { number: "01", title: "Register", description: "Complete online registration with identity verification", icon: Users },
    { number: "02", title: "Verify", description: "Your application is verified by election officials", icon: CheckCircle },
    { number: "03", title: "Authenticate", description: "Login with Voter ID, OTP, and face recognition", icon: Fingerprint },
    { number: "04", title: "Vote", description: "Cast your vote securely on the blockchain", icon: Vote },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section - Fresh Modern Design with Indian Flag Background */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Indian flag background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${indiaFlagBg})` }}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background" />
        
        {/* Animated accent elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-success/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="container relative py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Floating badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full text-sm font-medium text-primary backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                Next-Gen Voting
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/5 border border-success/10 rounded-full text-sm font-medium text-success backdrop-blur-sm">
                <Zap className="h-4 w-4" />
                Blockchain Powered
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-info/5 border border-info/10 rounded-full text-sm font-medium text-info backdrop-blur-sm">
                <Globe className="h-4 w-4" />
                100M+ Voters
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-slide-up tracking-tight">
              Democracy,
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-success bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '100ms' }}>
              Exercise your democratic right with confidence. Our blockchain-powered platform 
              ensures every vote is secure, verifiable, and counted with absolute precision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Button asChild size="lg" className="h-14 px-8 text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                <Link to="/register">
                  <Vote className="mr-2 h-5 w-5" />
                  Register to Vote
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Link to="/login">
                  Start Voting
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Trust indicators inline */}
            <div className="flex flex-wrap justify-center gap-6 mt-12 pt-12 border-t border-border/50 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-success" />
                ISO 27001 Certified
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                256-bit Encryption
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4 text-primary" />
                Zero Breaches
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions - Glass morphism cards */}
      <section className="py-6 -mt-12 relative z-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { to: "/register", icon: Users, title: "New Voter Registration", desc: "Register for upcoming elections", color: "primary" },
              { to: "/track", icon: FileText, title: "Track Application", desc: "Check registration status", color: "warning" },
              { to: "/login", icon: Vote, title: "Cast Your Vote", desc: "Login to vote in active elections", color: "success" },
            ].map((item, index) => (
              <Link
                key={item.to}
                to={item.to}
                className="group relative p-6 bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${item.color}/10 text-${item.color} group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </div>
                <ChevronRight className={`absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-${item.color} group-hover:translate-x-1 transition-all duration-300`} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features - Modern cards with gradients */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full text-sm font-medium text-primary mb-4">
              <Shield className="h-4 w-4" />
              Enterprise Security
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Government-Grade
              <span className="block text-primary">Protection</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Multi-layered security architecture ensuring the integrity of every election
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 bg-card rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-500 animate-slide-up overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Timeline style */}
      <section className="py-24 bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/5 rounded-full text-sm font-medium text-success mb-4">
              <Zap className="h-4 w-4" />
              Simple Process
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Vote in
              <span className="text-primary"> 4 Easy Steps</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              From registration to vote casting, we've made democracy accessible
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Connection line */}
              <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
              
              {steps.map((step, index) => (
                <div key={index} className="relative text-center animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                  {/* Step circle */}
                  <div className="relative mx-auto mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto relative z-10 border-4 border-background">
                      <step.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Modern counters */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-background to-success/5">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "100M+", label: "Registered Voters", icon: Users },
              { value: "99.9%", label: "System Uptime", icon: Zap },
              { value: "0", label: "Security Breaches", icon: Shield },
              { value: "50+", label: "Elections Conducted", icon: Vote },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-4 opacity-60" />
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Gradient background */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        <div className="container relative text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Make Your
            <span className="block">Voice Heard?</span>
          </h2>
          <p className="text-primary-foreground/80 mb-10 max-w-xl mx-auto text-lg">
            Join millions of citizens who have already registered for secure electronic voting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="h-14 px-8 text-base shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/register">
                Register Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300">
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
