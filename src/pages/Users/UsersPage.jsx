import { useState, useEffect } from "react";
import usersService from "../../services/usersService";
import UserTable from "../../components/users/UserTable";
import UserModal from "../../components/users/UserModal";
import UserForm from "../../components/users/UserForm";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await usersService.getAllUsers();
      // CI4 usually wraps list in 'data' object
      setUsers(response.data || response || []);
    } catch (err) {
      setError(err.message || "Failed to load users data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenCreate = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveUser = async (formData) => {
    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload = { ...formData };

      if (selectedUser) {
        await usersService.updateUser(selectedUser.user_id, payload);
        setSuccess("User updated successfully!");
      } else {
        await usersService.createUser(payload);
        setSuccess("User created successfully!");
      }

      handleCloseModal();
      fetchUsers();
    } catch (err) {
      // Extract form validation errors if present (CI4 standard)
      const errorMsg =
        typeof err === "object" && err.messages
          ? Object.values(err.messages).join(", ")
          : err.message || "Failed to save user.";
      alert(`Error: ${errorMsg}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    setError("");
    setSuccess("");
    try {
      await usersService.deleteUser(id);
      setSuccess("User deleted successfully!");
      fetchUsers();
    } catch (err) {
      setError(err.message || "Failed to delete user.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Users</h1>
          <p className="text-gray-600 text-sm">Manage dashboard users and tiers</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchUsers}
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded shadow-sm text-sm font-medium transition-colors"
          >
            Refresh
          </button>
          <button
            onClick={handleOpenCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm text-sm font-medium transition-colors"
          >
            Add New User
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded text-sm">
          {success}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500 font-medium">Loading users data...</div>
        </div>
      ) : (
        <UserTable
          users={users}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteUser}
        />
      )}

      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedUser ? "Edit User" : "Add New User"}
      >
        <UserForm
          initialData={selectedUser}
          onSave={handleSaveUser}
          onCancel={handleCloseModal}
          loading={isSaving}
        />
      </UserModal>
    </div>
  );
};

export default UsersPage;
