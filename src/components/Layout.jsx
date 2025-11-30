import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <div className="app">
      <div style={{ minHeight: "100svh", display: "grid", gridTemplateRows: "auto 1fr" }}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
