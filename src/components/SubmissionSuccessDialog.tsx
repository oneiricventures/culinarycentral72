
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { CheckCircle } from 'lucide-react';

interface SubmissionSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubmissionSuccessDialog = ({ isOpen, onClose }: SubmissionSuccessDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <AlertDialogTitle>Thank You!</AlertDialogTitle>
            </div>
          </div>
          <AlertDialogDescription>
            Your inquiry has been submitted successfully. We've received your details and will get in touch with you soon to discuss your leasing requirements.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose} className="bg-purple-600 hover:bg-purple-700">
            Got it
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SubmissionSuccessDialog;
