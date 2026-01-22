import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { updateUser, type User } from "./usersSlice";
import { Table } from "../../components/ui/Table";
import { Button } from "../../components/ui/Button";
import InviteUserModal from "./InviteUserModal";
import { Plus, UserCog } from "lucide-react";

export default function UsersList() {
  const { list, isLoading } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const toggleStatus = (id: string, currentStatus: string) => {
    if (
      confirm(
        `Are you sure you want to ${currentStatus === "ACTIVE" ? "deactivate" : "activate"} this user?`,
      )
    ) {
      dispatch(
        updateUser({
          id,
          status: currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE",
        }),
      );
    }
  };

  const toggleRole = (id: string, currentRole: string) => {
    dispatch(
      updateUser({ id, role: currentRole === "ADMIN" ? "USER" : "ADMIN" }),
    );
  };

  const columns = [
    {
      header: "Name",
      accessor: (u: User) => <span className="font-medium">{u.name}</span>,
    },
    { header: "Email", accessor: (u: User) => u.email },
    {
      header: "Role",
      accessor: (u: User) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${u.role === "ADMIN" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"}`}>
          {u.role}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: (u: User) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${u.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {u.status}
        </span>
      ),
    },
    { header: "Joined", accessor: (u: User) => u.joinedAt },
    {
      header: "Actions",
      accessor: (u: User) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => toggleRole(u.id, u.role)}
            title="Toggle Role">
            <UserCog size={16} />
          </Button>
          <Button
            size="sm"
            variant={u.status === "ACTIVE" ? "danger" : "secondary"}
            onClick={() => toggleStatus(u.id, u.status)}
            title={u.status === "ACTIVE" ? "Deactivate" : "Activate"}>
            {u.status === "ACTIVE" ? "Deactivate" : "Activate"}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <Button onClick={() => setIsInviteModalOpen(true)}>
          <Plus size={18} className="mr-2" />
          Invite User
        </Button>
      </div>

      <Table
        data={list}
        columns={columns}
        keyExtractor={(u) => u.id}
        isLoading={isLoading}
      />

      <InviteUserModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </div>
  );
}
