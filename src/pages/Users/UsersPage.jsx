import { useState, useEffect } from "react";
import usersService from "../../services/usersService";
import UserTable, { UserTableSkeleton } from "../../components/users/UserTable";
import UserModal from "../../components/users/UserModal";
import UserForm from "../../components/users/UserForm";
import { Download, Plus, Filter } from "lucide-react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All Tiers");

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
      const data = response.data || response || [];
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      setError(err.message || "Failed to load users data.");
    } finally {
      // Fake delay sedikit biar skeleton-nya keliatan cakep (bisa dihapus nanti)
      setTimeout(() => setLoading(false), 600);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter Logic
  useEffect(() => {
    if (activeFilter === "All Tiers") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((u) => u.tier_member === activeFilter));
    }
  }, [activeFilter, users]);

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

  const filterTabs = ["All Tiers", "Radiant", "Gold", "Silver"];

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink-primary)] tracking-tight mb-1">
            User Management
          </h1>
          <p className="text-[var(--color-ink-muted)] text-sm">
            Manage player accounts, tiers, and access levels.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchUsers}
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 px-4 py-2.5 rounded-lg shadow-sm text-sm font-semibold transition-all"
          >
            <Download size={16} />
            Export
          </button>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white px-5 py-2.5 rounded-lg shadow-[var(--shadow-raised)] text-sm font-semibold transition-all transform hover:-translate-y-0.5"
          >
            <Plus size={18} />
            Add New User
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 bg-white p-1.5 rounded-xl border border-gray-100 shadow-sm w-fit">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeFilter === tab
                ? "bg-[var(--color-primary)] text-white shadow-md"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
        <div className="w-px h-6 bg-gray-200 mx-2"></div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
          <Filter size={16} />
          More Filters
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-sm shadow-sm animate-fade-in">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-r-lg text-sm shadow-sm animate-fade-in">
          {success}
        </div>
      )}

      {/* Table Area */}
      {loading ? (
        <UserTableSkeleton />
      ) : (
        <UserTable
          users={filteredUsers}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteUser}
        />
      )}

      {/* Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedUser ? "Edit User Account" : "Create New User"}
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
