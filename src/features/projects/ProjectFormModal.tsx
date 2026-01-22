import { useState, type FormEvent } from "react";
import { Modal } from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import type { Project } from "./projectsSlice";

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: Omit<Project, "id" | "createdAt" | "deletedAt" | "createdBy">,
  ) => void;
  initialData?: Project | null;
}

export default function ProjectFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: ProjectFormModalProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [status, setStatus] = useState<"ACTIVE" | "COMPLETED" | "On Hold">(
    initialData?.status || "ACTIVE",
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, status });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Project" : "Create New Project"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Project Name"
          required
          placeholder="e.g., Website Redesign"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
            rows={3}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "ACTIVE" | "On Hold" | "COMPLETED")
            }>
            <option value="ACTIVE">Active</option>
            <option value="On Hold">On Hold</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Update Project" : "Create Project"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
