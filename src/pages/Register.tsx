import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, User, MapPin, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { StepIndicator } from "@/components/ui/step-indicator";
import { SecurityBadge } from "@/components/ui/security-badge";

const steps = [
  { id: 1, label: "Personal Details" },
  { id: 2, label: "Constituency" },
  { id: 3, label: "Identity" },
  { id: 4, label: "Face Capture" },
  { id: 5, label: "Review" },
];

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [faceCapured, setFaceCaptured] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    state: "",
    district: "",
    constituency: "",
    address: "",
    pincode: "",
    idType: "",
    idNumber: "",
    acceptTerms: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Generate a mock tracking ID
    const trackingId = `SEC${Date.now().toString().slice(-8)}`;
    navigate(`/track?id=${trackingId}&success=true`);
  };

  const simulateFaceCapture = () => {
    setIsCameraActive(true);
    setTimeout(() => {
      setFaceCaptured(true);
      setIsCameraActive(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container max-w-3xl">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Voter Registration</h1>
            <p className="text-muted-foreground">Complete the form below to register for electronic voting</p>
            <div className="flex justify-center gap-2 mt-4">
              <SecurityBadge type="encrypted" size="sm" />
            </div>
          </div>

          {/* Step Indicator */}
          <div className="mb-8">
            <StepIndicator steps={steps} currentStep={currentStep} />
          </div>

          {/* Form Container */}
          <div className="card-elevated p-6 md:p-8">
            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Personal Details</h2>
                    <p className="text-sm text-muted-foreground">Enter your basic information</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="input-govt"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="input-govt"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className="input-govt"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                      <SelectTrigger className="input-govt">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Mobile Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="input-govt"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="input-govt"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Constituency Selection */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Constituency Selection</h2>
                    <p className="text-sm text-muted-foreground">Enter your residential address and constituency</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>State *</Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                      <SelectTrigger className="input-govt">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                        <SelectItem value="kerala">Kerala</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>District *</Label>
                    <Select value={formData.district} onValueChange={(value) => handleInputChange("district", value)}>
                      <SelectTrigger className="input-govt">
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bangalore-urban">Bangalore Urban</SelectItem>
                        <SelectItem value="bangalore-rural">Bangalore Rural</SelectItem>
                        <SelectItem value="mysore">Mysore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Constituency *</Label>
                  <Select value={formData.constituency} onValueChange={(value) => handleInputChange("constituency", value)}>
                    <SelectTrigger className="input-govt">
                      <SelectValue placeholder="Select constituency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bangalore-south">Bangalore South</SelectItem>
                      <SelectItem value="bangalore-central">Bangalore Central</SelectItem>
                      <SelectItem value="bangalore-north">Bangalore North</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Full Address *</Label>
                  <textarea
                    id="address"
                    placeholder="Enter your complete residential address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="w-full min-h-24 p-3 border-2 border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  />
                </div>

                <div className="space-y-2 max-w-xs">
                  <Label htmlFor="pincode">PIN Code *</Label>
                  <Input
                    id="pincode"
                    placeholder="6-digit PIN code"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => handleInputChange("pincode", e.target.value)}
                    className="input-govt"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Identity Details */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Identity Verification</h2>
                    <p className="text-sm text-muted-foreground">Provide your government-issued ID details</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>ID Type *</Label>
                  <Select value={formData.idType} onValueChange={(value) => handleInputChange("idType", value)}>
                    <SelectTrigger className="input-govt">
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                      <SelectItem value="pan">PAN Card</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="driving">Driving License</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number *</Label>
                  <Input
                    id="idNumber"
                    placeholder="Enter your ID number"
                    value={formData.idNumber}
                    onChange={(e) => handleInputChange("idNumber", e.target.value)}
                    className="input-govt"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Upload ID Document (Front) *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Drag and drop or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Supported formats: JPG, PNG, PDF (Max 5MB)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Face Capture */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Camera className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Face Capture</h2>
                    <p className="text-sm text-muted-foreground">Capture your face for biometric verification</p>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-warning" />
                    Instructions for Face Capture
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Ensure proper lighting on your face</li>
                    <li>Remove any glasses or face coverings</li>
                    <li>Look directly at the camera</li>
                    <li>Keep a neutral expression</li>
                  </ul>
                </div>

                <div className="face-capture-box relative">
                  {!isCameraActive && !faceCapured && (
                    <div className="text-center">
                      <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Camera preview will appear here</p>
                    </div>
                  )}
                  
                  {isCameraActive && (
                    <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 border-4 border-primary rounded-full mx-auto mb-4 animate-pulse" />
                        <p className="text-primary font-medium">Scanning face...</p>
                      </div>
                    </div>
                  )}

                  {faceCapured && (
                    <div className="absolute inset-0 bg-success/10 flex items-center justify-center">
                      <div className="text-center">
                        <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                        <p className="text-success font-medium">Face captured successfully!</p>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={simulateFaceCapture}
                  disabled={isCameraActive || faceCapured}
                  className="w-full btn-govt-primary"
                >
                  {faceCapured ? (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Face Captured
                    </>
                  ) : (
                    <>
                      <Camera className="mr-2 h-5 w-5" />
                      {isCameraActive ? "Capturing..." : "Start Face Capture"}
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Review & Submit</h2>
                    <p className="text-sm text-muted-foreground">Review your details before submission</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-3">Personal Details</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">Name:</div>
                      <div>{formData.firstName} {formData.lastName}</div>
                      <div className="text-muted-foreground">Date of Birth:</div>
                      <div>{formData.dateOfBirth || "Not provided"}</div>
                      <div className="text-muted-foreground">Phone:</div>
                      <div>{formData.phone || "Not provided"}</div>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-3">Constituency</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground">State:</div>
                      <div className="capitalize">{formData.state || "Not selected"}</div>
                      <div className="text-muted-foreground">Constituency:</div>
                      <div className="capitalize">{formData.constituency?.replace(/-/g, " ") || "Not selected"}</div>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-medium mb-3">Verification Status</h3>
                    <div className="flex items-center gap-2">
                      {faceCapured ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-success" />
                          <span className="text-success">Face captured successfully</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-5 w-5 text-warning" />
                          <span className="text-warning">Face not captured</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border rounded-lg">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                    I hereby declare that the information provided is true and accurate to the best of my knowledge. I understand that providing false information may result in legal action.
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              {currentStep < 5 ? (
                <Button onClick={nextStep} className="btn-govt-primary">
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.acceptTerms}
                  className="btn-govt-success"
                >
                  Submit Application
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
