import Header, { LevelBar } from "@/components/Header";
import HeroCard from "@/components/HeroCard";
import TrainingSection from "@/components/TrainingSection";
import LearningPath from "@/components/LearningPath";
import BottomNav from "@/components/BottomNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background max-w-[480px] mx-auto">
      <Header />
      <LevelBar />
      <HeroCard />
      <TrainingSection />
      <LearningPath />
      <BottomNav />
    </div>
  );
};

export default Index;
