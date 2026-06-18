import { useState, useEffect } from "react";
import paymentsService from "../../services/paymentsService";
import PaymentTable from "../../components/payments/PaymentTable";
import PaymentModal from "../../components/payments/PaymentModal";
import PaymentForm from "../../components/payments/PaymentForm";

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchPayments = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await paymentsService.getAllPayments();
      setPayments(response.data || response || []);
    } catch (err) {
      setError(err.message || "Failed to load payments data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleOpenCreate = () => {
    setSelectedPayment(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPayment(null);
  };

  const handleSavePayment = async (formData) => {
    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      if (selectedPayment) {
        await paymentsService.updatePayment(selectedPayment.payment_id, formData);
        setSuccess("Payment updated successfully!");
      } else {
        await paymentsService.createPayment(formData);
        setSuccess("Payment created successfully!");
      }

      handleCloseModal();
      fetchPayments();
    } catch (err) {
      const errorMsg =
        typeof err === "object" && err.messages
          ? Object.values(err.messages).join(", ")
          : err.message || "Failed to save payment.";
      alert(`Error: ${errorMsg}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePayment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this payment?")) return;

    setError("");
    setSuccess("");
    try {
      await paymentsService.deletePayment(id);
      setSuccess("Payment deleted successfully!");
      fetchPayments();
    } catch (err) {
      setError(err.message || "Failed to delete payment.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Payments</h1>
          <p className="text-gray-600 text-sm">Manage transactions and payment records</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchPayments}
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded shadow-sm text-sm font-medium transition-colors"
          >
            Refresh
          </button>
          <button
            onClick={handleOpenCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm text-sm font-medium transition-colors"
          >
            Add New Payment
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
          <div className="text-gray-500 font-medium">Loading payments data...</div>
        </div>
      ) : (
        <PaymentTable
          payments={payments}
          onEdit={handleOpenEdit}
          onDelete={handleDeletePayment}
        />
      )}

      <PaymentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedPayment ? "Edit Payment" : "Add New Payment"}
      >
        <PaymentForm
          initialData={selectedPayment}
          onSave={handleSavePayment}
          onCancel={handleCloseModal}
          loading={isSaving}
        />
      </PaymentModal>
    </div>
  );
};

export default PaymentsPage;
