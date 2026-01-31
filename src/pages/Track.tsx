import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, CheckCircle, Clock, FileText, UserCheck, AlertCircle, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SecurityBadge } from "@/components/ui/security-badge";
import { StatusBadge } from "@/components/ui/status-badge";

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
  date?: string;
  icon: React.ElementType;
}

const Track = () => {
  const [searchParams] = useSearchParams();
  const [trackingId, setTrackingId] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const id = searchParams.get("id");
    const success = searchParams.get("success");
    if (id) {
      setTrackingId(id);
      setIsSearched(true);
    }
    if (success === "true") {
      setShowSuccess(true);
    }
  }, [searchParams]);

  const timelineSteps: TimelineStep[] = [
    {
      id: 1,
      title: "Application Submitted",
      description: "Your application has been received and logged in the system",
      status: "completed",
      date: "Jan 28, 2024 - 10:30 AM",
      icon: FileText,
    },
    {
      id: 2,
      title: "Document Verification",
      description: "Your identity documents are being verified by election officials",
      status: "completed",
      date: "Jan 28, 2024 - 02:15 PM",
      icon: CheckCircle,
    },
    {
      id: 3,
      title: "Face Recognition Processing",
      description: "Biometric data is being processed and stored securely",
      status: "current",
      date: "In Progress",
      icon: UserCheck,
    },
    {
      id: 4,
      title: "Final Approval",
      description: "Awaiting final approval from constituency election officer",
      status: "pending",
      icon: CheckCircle,
    },
  ];

  const handleSearch = () => {
    if (trackingId.trim()) {
      setIsSearched(true);
      setShowSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container max-w-3xl">
          {/* Success Banner */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-start gap-3 animate-slide-up">
              <PartyPopper className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-success">Application Submitted Successfully!</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your registration application has been submitted. Save your tracking ID: <strong>{trackingId}</strong>
                </p>
              </div>
            </div>
          )}

          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Track Application</h1>
            <p className="text-muted-foreground">Enter your tracking ID to check your registration status</p>
          </div>

          {/* Search Box */}
          <div className="card-elevated p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="trackingId">Tracking ID</Label>
                <Input
                  id="trackingId"
                  placeholder="Enter your tracking ID (e.g., SEC12345678)"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="input-govt"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleSearch} className="btn-govt-primary w-full sm:w-auto">
                  <Search className="mr-2 h-4 w-4" />
                  Track Status
                </Button>
              </div>
            </div>
          </div>

          {/* Results */}
          {isSearched && (
            <div className="space-y-6 animate-fade-in">
              {/* Status Summary */}
              <div className="card-elevated p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Application ID</p>
                    <p className="text-xl font-bold text-primary">{trackingId || "SEC12345678"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status="processing" label="Under Verification" />
                    <SecurityBadge type="blockchain" size="sm" />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Applicant</p>
                    <p className="font-medium">John Doe</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">State</p>
                    <p className="font-medium">Karnataka</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Constituency</p>
                    <p className="font-medium">Bangalore South</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Submitted On</p>
                    <p className="font-medium">Jan 28, 2024</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="card-elevated p-6">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Application Timeline
                </h2>

                <div className="relative">
                  {timelineSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isLast = index === timelineSteps.length - 1;

                    return (
                      <div key={step.id} className="flex gap-4 pb-8 relative">
                        {/* Timeline Line */}
                        {!isLast && (
                          <div
                            className={`absolute left-5 top-10 w-0.5 h-full -translate-x-1/2 ${
                              step.status === "completed" ? "bg-success" : "bg-border"
                            }`}
                          />
                        )}

                        {/* Icon */}
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0 z-10 ${
                            step.status === "completed"
                              ? "bg-success text-success-foreground"
                              : step.status === "current"
                              ? "bg-primary text-primary-foreground animate-pulse-slow"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {step.status === "completed" ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : step.status === "current" ? (
                            <Icon className="h-5 w-5" />
                          ) : (
                            <Icon className="h-5 w-5" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3
                                className={`font-medium ${
                                  step.status === "pending" ? "text-muted-foreground" : "text-foreground"
                                }`}
                              >
                                {step.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                            </div>
                            {step.date && (
                              <span
                                className={`text-xs whitespace-nowrap ${
                                  step.status === "current" ? "text-primary font-medium" : "text-muted-foreground"
                                }`}
                              >
                                {step.date}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-sm">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    If your application has been pending for more than 7 days, please contact your local election office
                    or call our helpline at 1800-XXX-XXXX.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Track;
