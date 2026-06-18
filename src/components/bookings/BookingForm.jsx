import { useState, useEffect } from "react";

const BookingForm = ({ initialData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    user_id: "",
    room_id: "",
    setup_id: "",
    waktu_mulai: "",
    waktu_selesai: "",
    total_harga: "",
    status_booking: "Pending",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        user_id: initialData.user_id || "",
        room_id: initialData.room_id || "",
        setup_id: initialData.setup_id || "",
        // Format datetime to fit datetime-local input if present
        waktu_mulai: initialData.waktu_mulai
          ? new Date(initialData.waktu_mulai).toISOString().slice(0, 16)
          : "",
        waktu_selesai: initialData.waktu_selesai
          ? new Date(initialData.waktu_selesai).toISOString().slice(0, 16)
          : "",
        total_harga: initialData.total_harga || "",
        status_booking: initialData.status_booking || "Pending",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare payload, format datetime back if needed, set optional IDs to null if empty
    const payload = {
      ...formData,
      room_id: formData.room_id || null,
      setup_id: formData.setup_id || null,
    };
    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          User ID
        </label>
        <input
          type="number"
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
          required
          min="1"
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Room ID (Optional)
          </label>
          <input
            type="number"
            name="room_id"
            value={formData.room_id}
            onChange={handleChange}
            min="1"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Setup ID (Optional)
          </label>
          <input
            type="number"
            name="setup_id"
            value={formData.setup_id}
            onChange={handleChange}
            min="1"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Time
          </label>
          <input
            type="datetime-local"
            name="waktu_mulai"
            value={formData.waktu_mulai}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Time
          </label>
          <input
            type="datetime-local"
            name="waktu_selesai"
            value={formData.waktu_selesai}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Total Price (Rp)
        </label>
        <input
          type="number"
          name="total_harga"
          value={formData.total_harga}
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
          name="status_booking"
          value={formData.status_booking}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="Pending">Pending</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
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

export default BookingForm;
