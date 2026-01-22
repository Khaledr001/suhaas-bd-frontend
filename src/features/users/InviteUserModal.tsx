import { useState, type FormEvent } from "react";
import { Modal } from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InviteUserModal({
  isOpen,
  onClose,
}: InviteUserModalProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // Simulate invite generation
      const token = Math.random().toString(36).substring(2, 15);
      const inviteLink = `${window.location.origin}/register?token=${token}`;

      alert(
        `Invite sent to ${email}\n\nLink (Simulated): ${inviteLink}\n\nNote: In a real app this would be emailed.`,
      );

      setIsLoading(false);
      setEmail("");
      onClose();
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invite New User">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-sm text-gray-500">
          Enter the email address of the person you want to invite. They will
          receive a link to complete their registration.
        </p>
        <Input
          label="Email Address"
          type="email"
          required
          placeholder="colleague@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Send Invitation
          </Button>
        </div>
      </form>
    </Modal>
  );
}
