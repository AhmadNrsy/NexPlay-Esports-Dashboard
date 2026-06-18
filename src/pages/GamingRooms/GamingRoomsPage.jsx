import { useState, useEffect, useMemo } from "react";
import gamingRoomsService from "../../services/gamingRoomsService";
import GamingRoomTable, {
  GamingRoomSkeleton,
} from "../../components/gamingRooms/GamingRoomTable";
import GamingRoomModal from "../../components/gamingRooms/GamingRoomModal";
import GamingRoomForm from "../../components/gamingRooms/GamingRoomForm";
import {
  Plus,
  LayoutGrid,
  CheckCircle2,
  MinusCircle,
  Wrench,
} from "lucide-react";

const GamingRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchRooms = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await gamingRoomsService.getAllRooms();
      setRooms(response.data || response || []);
    } catch (err) {
      setError(err.message || "Failed to load gaming rooms data.");
    } finally {
      setTimeout(() => setLoading(false), 500); // Smooth skeleton delay
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Calculate stats dynamically from DB data
  const stats = useMemo(() => {
    const total = rooms.length;
    const available = rooms.filter((r) => r.status_room === "Available").length;
    const maintenance = rooms.filter(
      (r) => r.status_room === "Maintenance",
    ).length;
    const occupied = total - available - maintenance;
    return { total, available, occupied, maintenance };
  }, [rooms]);

  const handleOpenCreate = () => {
    setSelectedRoom(null);
    setIsModalOpen(true);
  };
  const handleOpenEdit = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  const handleSaveRoom = async (formData) => {
    setIsSaving(true);
    setError("");
    setSuccess("");
    try {
      if (selectedRoom) {
        await gamingRoomsService.updateRoom(selectedRoom.room_id, formData);
        setSuccess("Gaming room updated successfully!");
      } else {
        await gamingRoomsService.createRoom(formData);
        setSuccess("Gaming room created successfully!");
      }
      handleCloseModal();
      fetchRooms();
    } catch (err) {
      const errorMsg =
        typeof err === "object" && err.messages
          ? Object.values(err.messages).join(", ")
          : err.message;
      alert(`Error: ${errorMsg}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteRoom = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    setError("");
    setSuccess("");
    try {
      await gamingRoomsService.deleteRoom(id);
      setSuccess("Gaming room deleted successfully!");
      fetchRooms();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink-primary)] tracking-tight mb-1">
            Gaming Rooms
          </h1>
          <p className="text-[var(--color-ink-muted)] text-sm">
            Manage reservations and monitor real-time status.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white px-5 py-2.5 rounded-lg shadow-[var(--shadow-raised)] text-sm font-semibold transition-all transform hover:-translate-y-0.5"
        >
          <Plus size={18} /> New Room
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)] flex items-center justify-center">
            <LayoutGrid size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Total Rooms
            </p>
            <h3 className="text-2xl font-bold text-gray-800">{stats.total}</h3>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Available
            </p>
            <h3 className="text-2xl font-bold text-gray-800">
              {stats.available}
            </h3>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
            <MinusCircle size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Occupied
            </p>
            <h3 className="text-2xl font-bold text-gray-800">
              {stats.occupied}
            </h3>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
            <Wrench size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Maintenance
            </p>
            <h3 className="text-2xl font-bold text-gray-800">
              {stats.maintenance}
            </h3>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-sm shadow-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-r-lg text-sm shadow-sm">
          {success}
        </div>
      )}

      {loading ? (
        <GamingRoomSkeleton />
      ) : (
        <GamingRoomTable
          rooms={rooms}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteRoom}
        />
      )}

      <GamingRoomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedRoom ? "Edit Room" : "Add New Room"}
      >
        <GamingRoomForm
          initialData={selectedRoom}
          onSave={handleSaveRoom}
          onCancel={handleCloseModal}
          loading={isSaving}
        />
      </GamingRoomModal>
    </div>
  );
};

export default GamingRoomsPage;
