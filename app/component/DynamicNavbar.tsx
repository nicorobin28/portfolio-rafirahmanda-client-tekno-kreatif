"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "./navbar";
import NavbarProductDetail from "./navbarProductDetail";
import { useGlobalContext } from "../providers/GlobalProvider";

const DynamicNavbar = () => {
  const pathname = usePathname();
  const { isAppReady } = useGlobalContext();

  // Check if we are on the work-detail page or any of its sub-pages
  const isWorkDetailPage = pathname?.startsWith("/work-detail");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isAppReady ? 1 : 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full"
    >
      {isWorkDetailPage ? <NavbarProductDetail /> : <Navbar />}
    </motion.div>
  );
};

export default DynamicNavbar;
