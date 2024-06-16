export interface PasswordConfirmModalProps {
  open: boolean;
  onPasswordModalCancel: () => void;
  onPasswordModalConfirm: () => void;
  newPassword: string;
}
