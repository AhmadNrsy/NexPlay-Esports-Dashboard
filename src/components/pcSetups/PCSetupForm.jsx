import { useState, useEffect } from "react";

const PCSetupForm = ({ initialData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    room_id: "",
    spek_cpu: "",
    spek_gpu: "",
    monitor: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        room_id: initialData.room_id || "",
        spek_cpu: initialData.spek_cpu || "",
        spek_gpu: initialData.spek_gpu || "",
        monitor: initialData.monitor || "",
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
          Room ID
        </label>
        <input
          type="number"
          name="room_id"
          value={formData.room_id}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          CPU Specs
        </label>
        <input
          type="text"
          name="spek_cpu"
          value={formData.spek_cpu}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          GPU Specs
        </label>
        <input
          type="text"
          name="spek_gpu"
          value={formData.spek_gpu}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Monitor
        </label>
        <input
          type="text"
          name="monitor"
          value={formData.monitor}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
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

export default PCSetupForm;
