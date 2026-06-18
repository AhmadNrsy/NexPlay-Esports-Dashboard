import { useState, useEffect } from "react";

const PaymentForm = ({ initialData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    booking_id: "",
    metode_bayar: "Cash",
    status_bayar: "Unpaid",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        booking_id: initialData.booking_id || "",
        metode_bayar: initialData.metode_bayar || "Cash",
        status_bayar: initialData.status_bayar || "Unpaid",
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
          Booking ID
        </label>
        <input
          type="number"
          name="booking_id"
          value={formData.booking_id}
          onChange={handleChange}
          required
          min="1"
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Payment Method
        </label>
        <select
          name="metode_bayar"
          value={formData.metode_bayar}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="Cash">Cash</option>
          <option value="QRIS">QRIS</option>
          <option value="Gopay">Gopay</option>
          <option value="OVO">OVO</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          name="status_bayar"
          value={formData.status_bayar}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="Unpaid">Unpaid</option>
          <option value="Paid">Paid</option>
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

export default PaymentForm;
