import { SignIn, SignUp } from "@clerk/clerk-react";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { ArrowLeft } from "lucide-react";

const AuthScreen = () => {
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const { setScreen } = useApp();

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-6 overflow-y-auto">
      <button
        onClick={() => setScreen("home")}
        className="self-start mb-4 flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="w-full max-w-md">
        {mode === "sign-in" ? (
          <SignIn
            routing="hash"
            signUpUrl="#sign-up"
            afterSignInUrl="/"
          />
        ) : (
          <SignUp
            routing="hash"
            signInUrl="#sign-in"
            afterSignUpUrl="/"
          />
        )}

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
      </div>
    </div>
  );
};

export default AuthScreen;
