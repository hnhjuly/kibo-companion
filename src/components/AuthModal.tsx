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
        // Login success overlay handles the rest
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

            <div className="flex items-center gap-3 my-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <button
              type="button"
              disabled={googleLoading}
              onClick={async () => {
                setGoogleLoading(true);
                try {
                  const result = await lovable.auth.signInWithOAuth("google", {
                    redirect_uri: window.location.origin,
                  });
                  if (result.error) {
                    toast({ title: "Error", description: String(result.error), variant: "destructive" });
                  }
                  if (result.redirected) return;
                  // Login success overlay handles the rest
                } catch (err: any) {
                  toast({ title: "Error", description: err.message, variant: "destructive" });
                } finally {
                  setGoogleLoading(false);
                }
              }}
              className="w-full py-3 bg-muted text-foreground rounded-xl font-extrabold text-sm border border-border hover:bg-accent transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {googleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              Continue with Google
            </button>

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
