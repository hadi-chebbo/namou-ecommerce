import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1C1A16]">
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
}