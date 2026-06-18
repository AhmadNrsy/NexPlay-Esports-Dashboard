import { useState, useEffect } from "react";
import bookingsService from "../../services/bookingsService";
import BookingTable, {
  BookingTableSkeleton,
} from "../../components/bookings/BookingTable";
import BookingModal from "../../components/bookings/BookingModal";
import BookingForm from "../../components/bookings/BookingForm";
import { Plus, Timer, ChevronDown, MoreVertical } from "lucide-react";

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
      setTimeout(() => setLoading(false), 500);
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
        await bookingsService.updateBooking(
          selectedBooking.booking_id,
          formData,
        );
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
          : err.message;
      alert(`Error: ${errorMsg}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await bookingsService.deleteBooking(id);
      fetchBookings();
    } catch (err) {}
  };

  // Filter only active bookings for the top cards
  const activeBookings = bookings
    .filter((b) => b.status_booking === "Active")
    .slice(0, 3);

  return (
    <div className="max-w-[1600px] mx-auto animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink-primary)] tracking-tight mb-1">
            Active Bookings
          </h1>
          <p className="text-[var(--color-ink-muted)] text-sm">
            Manage and monitor ongoing gaming sessions.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white px-5 py-2.5 rounded-lg shadow-[var(--shadow-raised)] text-sm font-semibold transition-all"
        >
          <Plus size={18} /> New Booking
        </button>
      </div>

      {/* Active Session Cards (Live Monitoring UI) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Render dynamic active bookings */}
        {activeBookings.length > 0 ? (
          activeBookings.map((activeBooking) => (
            <div
              key={activeBooking.booking_id}
              className="bg-white rounded-2xl p-5 border border-red-100 shadow-sm relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold">
                  <Timer size={14} className="animate-pulse" /> Active Session
                </div>
              </div>
              <h3 className="font-bold text-gray-800 text-lg">
                {activeBooking.room_id
                  ? `Room ${activeBooking.room_id}`
                  : `Setup ${activeBooking.setup_id}`}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Booking #{activeBooking.booking_id}
              </p>
              <div className="flex justify-between items-center text-sm border-t border-gray-50 pt-3">
                <span className="text-gray-600 font-medium">
                  User #{activeBooking.user_id}
                </span>
                <button
                  className="text-[var(--color-primary)] font-semibold hover:underline"
                  onClick={() => handleOpenEdit(activeBooking)}
                >
                  Manage
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-50 rounded-2xl p-5 border border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-sm font-medium col-span-1 md:col-span-2 lg:col-span-3">
            No active sessions right now.
          </div>
        )}

        {/* Utilization Card */}
        <div className="bg-[var(--color-primary)] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden lg:col-start-4">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
          <p className="text-xs font-bold tracking-wider text-purple-200 uppercase mb-2">
            Current Utilization
          </p>
          <h2 className="text-5xl font-bold mb-4">
            {bookings.length > 0
              ? Math.round((activeBookings.length / bookings.length) * 100)
              : 0}
            %
          </h2>
          <div className="w-full bg-white/20 h-2 rounded-full mb-4">
            <div
              className="bg-white h-2 rounded-full transition-all duration-1000"
              style={{
                width: `${bookings.length > 0 ? Math.round((activeBookings.length / bookings.length) * 100) : 0}%`,
              }}
            ></div>
          </div>
          <div className="flex justify-between text-xs font-medium text-purple-100">
            <span>{activeBookings.length} Active</span>
            <span>{bookings.length} Total</span>
          </div>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">All Schedule</h2>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
              All Status <ChevronDown size={16} />
            </button>
            <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
        {loading ? (
          <BookingTableSkeleton />
        ) : (
          <BookingTable bookings={bookings} onEdit={handleOpenEdit} />
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedBooking ? "Edit Booking" : "New Booking"}
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
