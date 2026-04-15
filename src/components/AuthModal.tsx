import { useState } from "react";
import { X, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "@/hooks/use-toast";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "sign-up") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast({ title: "Check your email", description: "We sent you a verification link to confirm your account." });
        onClose();
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Welcome back!", description: "You're now signed in to Kibo." });
        onClose();
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative bg-card rounded-2xl p-6 w-full max-w-sm border border-border shadow-xl overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground z-10 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-5">
              <h2 className="text-xl font-black text-foreground">
                {mode === "sign-in" ? "Welcome back to Kibo" : "Join Kibo"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {mode === "sign-in"
                  ? "Sign in to continue learning"
                  : "Create your account to start learning"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-kibo-green text-primary-foreground rounded-xl font-extrabold text-sm kibo-shadow active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {mode === "sign-in" ? "Sign in" : "Create account"}
              </button>
            </form>

            <div className="text-center mt-4">
              {mode === "sign-in" ? (
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setMode("sign-up")}
                    className="text-primary font-medium hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    onClick={() => setMode("sign-in")}
                    className="text-primary font-medium hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
