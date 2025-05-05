import { ReactNode } from "react";
import { Box, Container } from "@mui/material";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

// Lebar sidebar tetap
const SIDEBAR_WIDTH = 240;

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex", width: "100vw", overflowX: "hidden" }}>
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{
          width: { sm: SIDEBAR_WIDTH },
          flexShrink: { sm: 0 },
        }}
      >
        <Sidebar />
      </Box>

      {/* Konten utama */}
      <Box
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${SIDEBAR_WIDTH}px)` },
          overflowX: "hidden",
          px: { xs: 2, sm: 4 }, 
          pt: 10, 
        }}
      >
        {/* Navbar */}
        <Navbar />

        {/* Konten Dinamis */}
        <Container maxWidth={false} disableGutters>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
