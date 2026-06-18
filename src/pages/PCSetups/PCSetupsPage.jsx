import { useState, useEffect, useMemo } from "react";
import pcSetupsService from "../../services/pcSetupsService";
import PCSetupTable, {
  PCSetupSkeleton,
} from "../../components/pcSetups/PCSetupTable";
import PCSetupModal from "../../components/pcSetups/PCSetupModal";
import PCSetupForm from "../../components/pcSetups/PCSetupForm";
import { Plus, Cpu, Activity, Wrench, ArrowUpCircle } from "lucide-react";

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
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchSetups();
  }, []);

  // UI mock stats based on total units
  const stats = useMemo(() => {
    const total = setups.length;
    // Mocking active vs maintenance just for UI aesthetics
    const maintenance = Math.floor(total * 0.1);
    const active = total - maintenance;
    return { total, active, maintenance, upgrade: Math.floor(total * 0.05) };
  }, [setups]);

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
          : err.message;
      alert(`Error: ${errorMsg}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSetup = async (id) => {
    if (!window.confirm("Are you sure you want to delete this PC setup?"))
      return;
    setError("");
    setSuccess("");
    try {
      await pcSetupsService.deletePcSetup(id);
      setSuccess("PC setup deleted successfully!");
      fetchSetups();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink-primary)] tracking-tight mb-1">
            Hardware Fleet
          </h1>
          <p className="text-[var(--color-ink-muted)] text-sm">
            Manage and monitor all PC setups across gaming rooms.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white px-5 py-2.5 rounded-lg shadow-[var(--shadow-raised)] text-sm font-semibold transition-all transform hover:-translate-y-0.5"
        >
          <Plus size={18} /> Register New PC
        </button>
      </div>

      {/* Hardware Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <Cpu size={20} />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-1">
            {stats.total}
          </h3>
          <p className="text-sm font-medium text-gray-500">Total Units</p>
          <Activity className="absolute -right-4 -bottom-4 text-blue-50 opacity-50 w-24 h-24 group-hover:scale-110 transition-transform" />
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-soft)] text-[var(--color-primary)] flex items-center justify-center mb-4">
            <Activity size={20} />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-1 flex items-center gap-2">
            {stats.active}{" "}
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
          </h3>
          <p className="text-sm font-medium text-gray-500">Active PCs</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mb-4">
            <Wrench size={20} />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-1">
            {stats.maintenance}
          </h3>
          <p className="text-sm font-medium text-gray-500">In Maintenance</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-gray-50 text-gray-600 flex items-center justify-center mb-4">
            <ArrowUpCircle size={20} />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-1">
            {stats.upgrade}
          </h3>
          <p className="text-sm font-medium text-gray-500">Upgrade Required</p>
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
        <PCSetupSkeleton />
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
        title={selectedSetup ? "Edit Hardware Spec" : "Register PC"}
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
