import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Vote, User, MapPin, Clock, AlertTriangle, CheckCircle, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SecurityBadge } from "@/components/ui/security-badge";
import { cn } from "@/lib/utils";

interface Candidate {
  id: string;
  name: string;
  party: string;
  partySymbol: string;
  partyColor: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const voterInfo = {
    name: "John Doe",
    voterId: "ABC1234567",
    constituency: "Bangalore South",
    state: "Karnataka",
    pollingBooth: "Government School, Jayanagar",
  };

  const electionInfo = {
    name: "General Elections 2024",
    type: "Lok Sabha",
    date: "April 15, 2024",
    timeRemaining: "2 hours 30 minutes",
  };

  const candidates: Candidate[] = [
    {
      id: "1",
      name: "Candidate A",
      party: "Democratic Alliance Party",
      partySymbol: "🌸",
      partyColor: "bg-pink-100 border-pink-300 hover:border-pink-400",
    },
    {
      id: "2",
      name: "Candidate B",
      party: "Progressive Union",
      partySymbol: "🌿",
      partyColor: "bg-green-100 border-green-300 hover:border-green-400",
    },
    {
      id: "3",
      name: "Candidate C",
      party: "National Front",
      partySymbol: "🔷",
      partyColor: "bg-blue-100 border-blue-300 hover:border-blue-400",
    },
    {
      id: "4",
      name: "Candidate D",
      party: "People's Party",
      partySymbol: "🌻",
      partyColor: "bg-yellow-100 border-yellow-300 hover:border-yellow-400",
    },
    {
      id: "5",
      name: "Independent Candidate",
      party: "Independent",
      partySymbol: "⭐",
      partyColor: "bg-gray-100 border-gray-300 hover:border-gray-400",
    },
    {
      id: "nota",
      name: "NOTA",
      party: "None of the Above",
      partySymbol: "✖️",
      partyColor: "bg-red-50 border-red-200 hover:border-red-300",
    },
  ];

  const handleCandidateSelect = (candidate: Candidate) => {
    if (!hasVoted) {
      setSelectedCandidate(candidate);
    }
  };

  const handleVoteSubmit = () => {
    setShowConfirmDialog(false);
    setHasVoted(true);
    setShowSuccessDialog(true);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container max-w-4xl">
          {/* Voter Info Bar */}
          <div className="card-elevated p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold">{voterInfo.name}</p>
                <p className="text-sm text-muted-foreground">Voter ID: {voterInfo.voterId}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <SecurityBadge type="verified" size="sm" />
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Election Info */}
          <div className="card-elevated p-6 mb-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">{electionInfo.name}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {voterInfo.constituency}, {voterInfo.state}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Time remaining: {electionInfo.timeRemaining}
                  </span>
                </div>
              </div>
              {!hasVoted && (
                <div className="flex items-center gap-2 text-primary">
                  <Shield className="h-5 w-5" />
                  <span className="text-sm font-medium">Your vote is secret and secure</span>
                </div>
              )}
            </div>
          </div>

          {/* Voting Section */}
          {!hasVoted ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Select Your Candidate</h2>
                <p className="text-sm text-muted-foreground">Click on a candidate to select</p>
              </div>

              {/* Candidates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {candidates.map((candidate) => (
                  <button
                    key={candidate.id}
                    onClick={() => handleCandidateSelect(candidate)}
                    className={cn(
                      "candidate-card text-left border-2 transition-all",
                      candidate.partyColor,
                      selectedCandidate?.id === candidate.id && "candidate-card-selected ring-2 ring-primary"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white text-3xl shadow-sm">
                        {candidate.partySymbol}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{candidate.name}</h3>
                        <p className="text-sm text-muted-foreground">{candidate.party}</p>
                      </div>
                      {selectedCandidate?.id === candidate.id && (
                        <CheckCircle className="h-6 w-6 text-primary" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button
                  size="lg"
                  onClick={() => setShowConfirmDialog(true)}
                  disabled={!selectedCandidate}
                  className="btn-govt-primary min-w-64"
                >
                  <Vote className="mr-2 h-5 w-5" />
                  Cast Your Vote
                </Button>
              </div>
            </div>
          ) : (
            /* Already Voted State */
            <div className="card-elevated p-8 text-center animate-fade-in">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10 text-success mx-auto mb-6">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Vote Cast Successfully!</h2>
              <p className="text-muted-foreground mb-6">
                Your vote has been securely recorded on the blockchain. Thank you for participating in the democratic process.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg inline-block">
                <p className="text-sm text-muted-foreground">Transaction ID</p>
                <p className="font-mono text-primary font-semibold">0x7f3a...b42c</p>
              </div>
              <div className="mt-6 flex justify-center gap-2">
                <SecurityBadge type="blockchain" />
                <SecurityBadge type="verified" />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Confirm Your Vote
            </DialogTitle>
            <DialogDescription>
              You are about to cast your vote. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedCandidate && (
            <div className="p-4 bg-muted/50 rounded-lg my-4">
              <p className="text-sm text-muted-foreground mb-2">You have selected:</p>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedCandidate.partySymbol}</span>
                <div>
                  <p className="font-semibold">{selectedCandidate.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedCandidate.party}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-destructive/10 p-3 rounded-lg flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">
              Once submitted, your vote cannot be changed or withdrawn. Please verify your selection before confirming.
            </p>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleVoteSubmit} className="btn-govt-success">
              <CheckCircle className="mr-2 h-4 w-4" />
              Confirm & Submit Vote
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10 text-success mx-auto mb-4 mt-4">
            <CheckCircle className="h-10 w-10" />
          </div>
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl">Vote Cast Successfully!</DialogTitle>
            <DialogDescription className="text-center">
              Your vote has been securely recorded on the blockchain and will be counted in the final tally.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-2 py-4">
            <SecurityBadge type="blockchain" />
          </div>
          <DialogFooter>
            <Button onClick={() => setShowSuccessDialog(false)} className="w-full btn-govt-primary">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Dashboard;
