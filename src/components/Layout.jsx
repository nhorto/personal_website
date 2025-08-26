import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div style={{ minHeight: "100svh", display: "grid", gridTemplateRows: "auto 1fr" }}>
      <Header />
      <Outlet />
    </div>
  );
}