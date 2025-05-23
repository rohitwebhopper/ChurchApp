export interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
  size?: "small" | "medium" | "large" | "xlarge";
}

export interface AddEditInterface {
  open: boolean;
  close: () => void;
  data?: any;
}
