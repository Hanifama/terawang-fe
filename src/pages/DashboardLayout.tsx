import { ReactNode } from "react";
import { Box, Container } from "@mui/material";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Konten utama */}
      <Box sx={{ flexGrow: 1, ml: 0 }}>
        {/* Navbar */}
        <Navbar />

        {/* Konten Dinamis */}
        <Box sx={{ pt: 10 }}>
          <Container>{children}</Container>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
