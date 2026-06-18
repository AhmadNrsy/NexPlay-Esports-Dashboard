import { useState, useEffect } from "react";
import gamingRoomsService from "../../services/gamingRoomsService";
import GamingRoomTable from "../../components/gamingRooms/GamingRoomTable";
import GamingRoomModal from "../../components/gamingRooms/GamingRoomModal";
import GamingRoomForm from "../../components/gamingRooms/GamingRoomForm";

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
      // CI4 usually wraps list in 'data' object
      setRooms(response.data || response || []);
    } catch (err) {
      setError(err.message || "Failed to load gaming rooms data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

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
      const payload = { ...formData };

      if (selectedRoom) {
        await gamingRoomsService.updateRoom(selectedRoom.room_id, payload);
        setSuccess("Gaming room updated successfully!");
      } else {
        await gamingRoomsService.createRoom(payload);
        setSuccess("Gaming room created successfully!");
      }

      handleCloseModal();
      fetchRooms();
    } catch (err) {
      // Extract form validation errors if present (CI4 standard)
      const errorMsg =
        typeof err === "object" && err.messages
          ? Object.values(err.messages).join(", ")
          : err.message || "Failed to save gaming room.";
      alert(`Error: ${errorMsg}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteRoom = async (id) => {
    if (!window.confirm("Are you sure you want to delete this gaming room?")) return;

    setError("");
    setSuccess("");
    try {
      await gamingRoomsService.deleteRoom(id);
      setSuccess("Gaming room deleted successfully!");
      fetchRooms();
    } catch (err) {
      setError(err.message || "Failed to delete gaming room.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gaming Rooms</h1>
          <p className="text-gray-600 text-sm">Manage esports gaming rooms and pricing</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchRooms}
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded shadow-sm text-sm font-medium transition-colors"
          >
            Refresh
          </button>
          <button
            onClick={handleOpenCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm text-sm font-medium transition-colors"
          >
            Add New Room
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
          <div className="text-gray-500 font-medium">Loading gaming rooms data...</div>
        </div>
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
        title={selectedRoom ? "Edit Gaming Room" : "Add New Room"}
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
