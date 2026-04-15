import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import NotoEmoji from "@/components/NotoEmoji";
import kiboHappy from "@/assets/kibo-happy.png";
  visible: boolean;
}

const LoginSuccessOverlay = ({ visible }: LoginSuccessOverlayProps) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-card rounded-2xl p-8 border border-border shadow-2xl text-center max-w-xs mx-4"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <img
                src={kiboHappy}
                alt="Kibo celebrating"
                className="w-16 h-16 object-contain"
              />
              <div className="text-left">
                <h2 className="text-xl font-black text-foreground flex items-center gap-2">
                  You're logged in! <NotoEmoji name="party" size={24} />
                </h2>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-4">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Redirecting you to your courses...</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginSuccessOverlay;
