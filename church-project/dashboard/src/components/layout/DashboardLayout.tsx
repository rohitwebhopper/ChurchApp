import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "./layout.module.css";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.layoutContainer}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area (Navbar + Content + Footer) */}
      <div className={styles.mainArea}>
        <Navbar />
        <main className={styles.mainContent}>
          <div className={styles.innerContent}>{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
