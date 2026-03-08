import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ExitGameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  gameName: string;
}

const ExitGameDialog = ({ open, onOpenChange, onConfirm, gameName }: ExitGameDialogProps) => (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent className="max-w-[320px] rounded-2xl">
      <AlertDialogHeader>
        <AlertDialogTitle className="text-foreground font-black text-lg">Leave {gameName}?</AlertDialogTitle>
        <AlertDialogDescription className="text-muted-foreground font-bold text-sm">
          Your progress will be lost and the game will reset if you leave now.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="flex-row gap-2.5">
        <AlertDialogCancel className="flex-1 mt-0 rounded-xl font-black">Keep Playing</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm} className="flex-1 rounded-xl font-black bg-destructive text-destructive-foreground hover:bg-destructive/90">
          Leave
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default ExitGameDialog;
