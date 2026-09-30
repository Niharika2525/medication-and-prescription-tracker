import { AlertCircle } from 'lucide-react';
import { Modal } from './Modal';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const variantColors = {
    danger: {
      icon: 'text-red-600',
      bg: 'bg-red-100',
      button: 'bg-red-600 hover:bg-red-700',
    },
    warning: {
      icon: 'text-orange-600',
      bg: 'bg-orange-100',
      button: 'bg-orange-600 hover:bg-orange-700',
    },
    info: {
      icon: 'text-blue-600',
      bg: 'bg-blue-100',
      button: 'bg-blue-600 hover:bg-blue-700',
    },
  };

  const colors = variantColors[variant];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-4">
        <div className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center`}>
          <AlertCircle className={`w-6 h-6 ${colors.icon}`} />
        </div>
        <p className="text-gray-600">{message}</p>
        <div className="flex gap-3 pt-4">
          <button
            onClick={handleConfirm}
            className={`flex-1 px-4 py-2 ${colors.button} text-white rounded-lg font-medium`}
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
