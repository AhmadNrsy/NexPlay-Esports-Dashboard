import { useState, useEffect } from "react";

const GamingRoomForm = ({ initialData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    nama_room: "",
    tipe_room: "Regular",
    harga_per_jam: "",
    status_room: "Available",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nama_room: initialData.nama_room || "",
        tipe_room: initialData.tipe_room || "Regular",
        harga_per_jam: initialData.harga_per_jam || "",
        status_room: initialData.status_room || "Available",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Room Name
        </label>
        <input
          type="text"
          name="nama_room"
          value={formData.nama_room}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Room Type
        </label>
        <select
          name="tipe_room"
          value={formData.tipe_room}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="Regular">Regular</option>
          <option value="VIP">VIP</option>
          <option value="VVIP">VVIP</option>
          <option value="Tournament">Tournament</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price per Hour (Rp)
        </label>
        <input
          type="number"
          name="harga_per_jam"
          value={formData.harga_per_jam}
          onChange={handleChange}
          required
          min="0"
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          name="status_room"
          value={formData.status_room}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="Available">Available</option>
          <option value="In Use">In Use</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center min-w-[80px]"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default GamingRoomForm;
