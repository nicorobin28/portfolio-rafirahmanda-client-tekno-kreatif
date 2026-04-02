"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import NavbarProductDetail from "./navbarProductDetail";

const DynamicNavbar = () => {
  const pathname = usePathname();

  // Check if we are on the work-detail page or any of its sub-pages
  const isWorkDetailPage = pathname?.startsWith("/work-detail");

  if (isWorkDetailPage) {
    return <NavbarProductDetail />;
  }

  return <Navbar />;
};

export default DynamicNavbar;
