import { Shield, Lock, CheckCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold">SecureVote</h3>
                <p className="text-xs text-primary-foreground/70">Blockchain E-Voting</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/70">
              A secure, transparent, and accessible electronic voting system powered by blockchain technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="/register" className="hover:text-primary-foreground transition-colors">Voter Registration</a></li>
              <li><a href="/track" className="hover:text-primary-foreground transition-colors">Track Application</a></li>
              <li><a href="/login" className="hover:text-primary-foreground transition-colors">Voter Login</a></li>
              <li><a href="/help" className="hover:text-primary-foreground transition-colors">Help & Support</a></li>
            </ul>
          </div>

          {/* Security Features */}
          <div>
            <h4 className="font-semibold mb-4">Security Features</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                End-to-end Encryption
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Blockchain Verification
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Face Recognition
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>Helpline: 1800-XXX-XXXX</li>
              <li>Email: support@securevote.gov.in</li>
              <li>Hours: 24/7 during elections</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/70">
            © 2024 Election Commission of India. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-primary-foreground/70">
            <a href="/privacy" className="hover:text-primary-foreground">Privacy Policy</a>
            <a href="/terms" className="hover:text-primary-foreground">Terms of Service</a>
            <a href="/accessibility" className="hover:text-primary-foreground">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
