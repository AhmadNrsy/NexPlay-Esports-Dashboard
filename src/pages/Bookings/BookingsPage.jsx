import { useState, useEffect } from "react";
import bookingsService from "../../services/bookingsService";
import BookingTable from "../../components/bookings/BookingTable";
import BookingModal from "../../components/bookings/BookingModal";
import BookingForm from "../../components/bookings/BookingForm";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await bookingsService.getAllBookings();
      setBookings(response.data || response || []);
    } catch (err) {
      setError(err.message || "Failed to load bookings data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleOpenCreate = () => {
    setSelectedBooking(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handleSaveBooking = async (formData) => {
    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      if (selectedBooking) {
        await bookingsService.updateBooking(selectedBooking.booking_id, formData);
        setSuccess("Booking updated successfully!");
      } else {
        await bookingsService.createBooking(formData);
        setSuccess("Booking created successfully!");
      }

      handleCloseModal();
      fetchBookings();
    } catch (err) {
      const errorMsg =
        typeof err === "object" && err.messages
          ? Object.values(err.messages).join(", ")
          : err.message || "Failed to save booking.";
      alert(`Error: ${errorMsg}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    setError("");
    setSuccess("");
    try {
      await bookingsService.deleteBooking(id);
      setSuccess("Booking deleted successfully!");
      fetchBookings();
    } catch (err) {
      setError(err.message || "Failed to delete booking.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Bookings</h1>
          <p className="text-gray-600 text-sm">Manage user rentals and reservations</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchBookings}
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded shadow-sm text-sm font-medium transition-colors"
          >
            Refresh
          </button>
          <button
            onClick={handleOpenCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm text-sm font-medium transition-colors"
          >
            Add New Booking
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
          <div className="text-gray-500 font-medium">Loading bookings data...</div>
        </div>
      ) : (
        <BookingTable
          bookings={bookings}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteBooking}
        />
      )}

      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedBooking ? "Edit Booking" : "Add New Booking"}
      >
        <BookingForm
          initialData={selectedBooking}
          onSave={handleSaveBooking}
          onCancel={handleCloseModal}
          loading={isSaving}
        />
      </BookingModal>
    </div>
  );
};

export default BookingsPage;
