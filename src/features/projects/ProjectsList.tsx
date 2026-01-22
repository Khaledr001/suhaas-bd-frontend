import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  addProject,
  updateProject,
  deleteProject,
  type Project,
} from "./projectsSlice";
import { Button } from "../../components/ui/Button";
import { Table } from "../../components/ui/Table";
import ProjectFormModal from "./ProjectFormModal";
import { Plus, Edit2, Trash2, Folder } from "lucide-react";

export default function ProjectsList() {
  const { list } = useAppSelector((state) => state.projects);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const activeProjects = list.filter((p) => !p.deletedAt);
  const isAdmin = user?.role === "ADMIN";

  const handleCreate = (
    data: Omit<Project, "id" | "createdAt" | "createdBy" | "deletedAt">,
  ) => {
    dispatch(
      addProject({
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        createdAt: new Date().toISOString().split("T")[0],
        createdBy: user?.id || "unknown",
        deletedAt: null,
      }),
    );
  };

  const handleUpdate = (data: Partial<Project>) => {
    if (editingProject) {
      dispatch(updateProject({ id: editingProject.id, ...data }));
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      dispatch(deleteProject(id));
    }
  };

  const openCreateModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const columns = [
    {
      header: "Project Name",
      accessor: (p: Project) => (
        <span className="font-medium flex items-center gap-2">
          <Folder size={16} className="text-blue-500" /> {p.name}
        </span>
      ),
    },
    {
      header: "Description",
      accessor: (p: Project) => (
        <span
          className="text-gray-500 truncate max-w-xs block"
          title={p.description}>
          {p.description}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: (p: Project) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${p.status === "ACTIVE" ? "bg-green-100 text-green-800" : p.status === "COMPLETED" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}>
          {p.status}
        </span>
      ),
    },
    { header: "Created At", accessor: (p: Project) => p.createdAt },
    {
      header: "Actions",
      accessor: (p: Project) => (
        <div className="flex items-center gap-2">
          {isAdmin && (
            <>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => openEditModal(p)}
                title="Edit">
                <Edit2 size={16} />
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => handleDelete(p.id)}
                title="Delete">
                <Trash2 size={16} />
              </Button>
            </>
          )}
          {!isAdmin && <span className="text-xs text-gray-400">View Only</span>}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <Button onClick={openCreateModal}>
          <Plus size={18} className="mr-2" />
          New Project
        </Button>
      </div>

      <Table
        data={activeProjects}
        columns={columns}
        keyExtractor={(p) => p.id}
      />

      <ProjectFormModal
        key={editingProject?.id || (isModalOpen ? "new" : "closed")}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={editingProject ? handleUpdate : handleCreate}
        initialData={editingProject}
      />
    </div>
  );
}
