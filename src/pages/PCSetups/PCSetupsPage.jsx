import { useState, useEffect } from "react";
import pcSetupsService from "../../services/pcSetupsService";
import PCSetupTable from "../../components/pcSetups/PCSetupTable";
import PCSetupModal from "../../components/pcSetups/PCSetupModal";
import PCSetupForm from "../../components/pcSetups/PCSetupForm";

const PCSetupsPage = () => {
  const [setups, setSetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSetup, setSelectedSetup] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchSetups = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await pcSetupsService.getAllPcSetups();
      setSetups(response.data || response || []);
    } catch (err) {
      setError(err.message || "Failed to load PC setups data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSetups();
  }, []);

  const handleOpenCreate = () => {
    setSelectedSetup(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (setup) => {
    setSelectedSetup(setup);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSetup(null);
  };

  const handleSaveSetup = async (formData) => {
    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      if (selectedSetup) {
        await pcSetupsService.updatePcSetup(selectedSetup.pc_id, formData);
        setSuccess("PC setup updated successfully!");
      } else {
        await pcSetupsService.createPcSetup(formData);
        setSuccess("PC setup created successfully!");
      }

      handleCloseModal();
      fetchSetups();
    } catch (err) {
      const errorMsg =
        typeof err === "object" && err.messages
          ? Object.values(err.messages).join(", ")
          : err.message || "Failed to save PC setup.";
      alert(`Error: ${errorMsg}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSetup = async (id) => {
    if (!window.confirm("Are you sure you want to delete this PC setup?")) return;

    setError("");
    setSuccess("");
    try {
      await pcSetupsService.deletePcSetup(id);
      setSuccess("PC setup deleted successfully!");
      fetchSetups();
    } catch (err) {
      setError(err.message || "Failed to delete PC setup.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">PC Setups</h1>
          <p className="text-gray-600 text-sm">Manage individual PC specifications and availability</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchSetups}
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded shadow-sm text-sm font-medium transition-colors"
          >
            Refresh
          </button>
          <button
            onClick={handleOpenCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm text-sm font-medium transition-colors"
          >
            Add New PC Setup
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
          <div className="text-gray-500 font-medium">Loading PC setups data...</div>
        </div>
      ) : (
        <PCSetupTable
          setups={setups}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteSetup}
        />
      )}

      <PCSetupModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedSetup ? "Edit PC Setup" : "Add New PC Setup"}
      >
        <PCSetupForm
          initialData={selectedSetup}
          onSave={handleSaveSetup}
          onCancel={handleCloseModal}
          loading={isSaving}
        />
      </PCSetupModal>
    </div>
  );
};

export default PCSetupsPage;
