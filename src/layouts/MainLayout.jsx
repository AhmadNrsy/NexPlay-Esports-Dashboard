import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    // h-screen dan overflow-hidden ini yang ngunci layar biar ga bocor
    <div className="flex h-screen overflow-hidden bg-[var(--color-surface-app)]">
      <Sidebar />

      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Navbar />

        {/* HANYA bagian ini yang boleh di-scroll */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
