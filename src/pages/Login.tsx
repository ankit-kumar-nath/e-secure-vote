import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Key, Smartphone, Camera, CheckCircle, RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { StepIndicator } from "@/components/ui/step-indicator";
import { SecurityBadge } from "@/components/ui/security-badge";

const loginSteps = [
  { id: 1, label: "Voter ID" },
  { id: 2, label: "Captcha" },
  { id: 3, label: "OTP" },
  { id: 4, label: "Face Recognition" },
];

const Login = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [voterId, setVoterId] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [otp, setOtp] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [faceVerified, setFaceVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const captchaCode = "X7K9P2";

  const handleVoterIdSubmit = () => {
    if (voterId.length >= 6) {
      setCurrentStep(2);
    }
  };

  const handleCaptchaSubmit = () => {
    if (captchaInput.toUpperCase() === captchaCode) {
      setCurrentStep(3);
    }
  };

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  const handleOtpSubmit = () => {
    if (otp.length === 6) {
      setCurrentStep(4);
    }
  };

  const handleFaceVerification = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setFaceVerified(true);
    }, 3000);
  };

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container max-w-lg">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Shield className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Secure Voter Login</h1>
            <p className="text-muted-foreground">Multi-factor authentication for secure voting</p>
            <div className="flex justify-center gap-2 mt-4">
              <SecurityBadge type="encrypted" size="sm" />
              <SecurityBadge type="biometric" size="sm" />
            </div>
          </div>

          {/* Step Indicator */}
          <div className="mb-8">
            <StepIndicator steps={loginSteps} currentStep={currentStep} />
          </div>

          {/* Login Form Container */}
          <div className="card-elevated p-6 md:p-8">
            {/* Step 1: Voter ID */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Key className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Enter Voter ID</h2>
                    <p className="text-sm text-muted-foreground">Your unique voter identification number</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voterId">Voter ID / EPIC Number</Label>
                  <Input
                    id="voterId"
                    placeholder="e.g., ABC1234567"
                    value={voterId}
                    onChange={(e) => setVoterId(e.target.value.toUpperCase())}
                    className="input-govt text-lg tracking-wider"
                    maxLength={12}
                  />
                  <p className="text-xs text-muted-foreground">
                    Your Voter ID is printed on your Voter ID card
                  </p>
                </div>

                <Button
                  onClick={handleVoterIdSubmit}
                  disabled={voterId.length < 6}
                  className="w-full btn-govt-primary"
                >
                  Continue
                </Button>
              </div>
            )}

            {/* Step 2: Captcha */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Security Verification</h2>
                    <p className="text-sm text-muted-foreground">Enter the captcha code shown below</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-4">
                    <div className="bg-muted px-6 py-4 rounded-lg select-none">
                      <span className="text-2xl font-mono font-bold tracking-widest text-primary"
                        style={{ 
                          textDecoration: "line-through",
                          textDecorationColor: "rgba(0,0,0,0.2)",
                          fontStyle: "italic"
                        }}
                      >
                        {captchaCode}
                      </span>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                      <RefreshCw className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="captcha">Enter Captcha</Label>
                    <Input
                      id="captcha"
                      placeholder="Enter the code above"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      className="input-govt text-center text-lg tracking-widest uppercase"
                      maxLength={6}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button
                    onClick={handleCaptchaSubmit}
                    disabled={captchaInput.length !== 6}
                    className="flex-1 btn-govt-primary"
                  >
                    Verify
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: OTP */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">OTP Verification</h2>
                    <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to your phone</p>
                  </div>
                </div>

                {!otpSent ? (
                  <div className="text-center space-y-4">
                    <p className="text-sm text-muted-foreground">
                      An OTP will be sent to your registered mobile number ending in ****1234
                    </p>
                    <Button onClick={handleSendOtp} className="btn-govt-primary">
                      Send OTP
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-success/10 text-success p-3 rounded-lg text-sm text-center">
                      OTP sent to ****1234. Valid for 5 minutes.
                    </div>

                    <div className="flex justify-center">
                      <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} className="w-12 h-14 text-xl" />
                          <InputOTPSlot index={1} className="w-12 h-14 text-xl" />
                          <InputOTPSlot index={2} className="w-12 h-14 text-xl" />
                          <InputOTPSlot index={3} className="w-12 h-14 text-xl" />
                          <InputOTPSlot index={4} className="w-12 h-14 text-xl" />
                          <InputOTPSlot index={5} className="w-12 h-14 text-xl" />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    <div className="text-center">
                      <button className="text-sm text-primary hover:underline">
                        Didn't receive OTP? Resend
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                    Back
                  </Button>
                  <Button
                    onClick={handleOtpSubmit}
                    disabled={otp.length !== 6}
                    className="flex-1 btn-govt-primary"
                  >
                    Verify OTP
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Face Recognition */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Camera className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Face Verification</h2>
                    <p className="text-sm text-muted-foreground">Final step: Verify your identity with face recognition</p>
                  </div>
                </div>

                <div className="face-capture-box relative">
                  {!isScanning && !faceVerified && (
                    <div className="text-center">
                      <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Position your face in the camera</p>
                    </div>
                  )}

                  {isScanning && (
                    <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                      <div className="text-center">
                        <div className="relative w-40 h-40 mx-auto mb-4">
                          <div className="absolute inset-0 border-4 border-primary rounded-lg animate-pulse" />
                          <div className="absolute inset-2 border-2 border-dashed border-primary/50 rounded animate-spin" style={{ animationDuration: "3s" }} />
                        </div>
                        <p className="text-primary font-medium">Verifying face...</p>
                        <p className="text-sm text-muted-foreground">Please hold still</p>
                      </div>
                    </div>
                  )}

                  {faceVerified && (
                    <div className="absolute inset-0 bg-success/10 flex items-center justify-center">
                      <div className="text-center">
                        <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                        <p className="text-success font-semibold text-lg">Identity Verified!</p>
                        <p className="text-sm text-muted-foreground mt-1">You can now proceed to vote</p>
                      </div>
                    </div>
                  )}
                </div>

                {!faceVerified && (
                  <Button
                    onClick={handleFaceVerification}
                    disabled={isScanning}
                    className="w-full btn-govt-primary"
                  >
                    {isScanning ? (
                      <>
                        <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Camera className="mr-2 h-5 w-5" />
                        Start Face Verification
                      </>
                    )}
                  </Button>
                )}

                {faceVerified && (
                  <Button onClick={handleLogin} className="w-full btn-govt-success">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Proceed to Voting Dashboard
                  </Button>
                )}

                {/* Warning */}
                <div className="bg-warning/10 p-3 rounded-lg flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    Face verification is mandatory to ensure one-person-one-vote. Your biometric data is encrypted and never stored in plain text.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
