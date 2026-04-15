import { AppProvider, useApp } from "@/context/AppContext";
import OnboardingScreen from "@/screens/OnboardingScreen";
import { useEffect } from "react";

const OnboardingContent = () => {
  const { setScreen } = useApp();
  useEffect(() => { setScreen("onboarding"); }, []);
  return <div className="w-full h-dvh flex bg-background overflow-hidden max-w-3xl mx-auto"><OnboardingScreen /></div>;
};

const OnboardingPage = () => (
  <AppProvider>
    <OnboardingContent />
  </AppProvider>
);

export default OnboardingPage;
