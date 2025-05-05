import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const { profile, isLoading } = useAuthStore();
    const [userName, setUserName] = useState(localStorage.getItem("userName") || "Selamat Datang");
    const [userImage, setUserImage] = useState(localStorage.getItem("userImage") || "");

    useEffect(() => {
        if (!isLoading && profile?.name) {
            setUserName(profile.name);
            localStorage.setItem("userName", profile.name);
            if (profile.imageProfile) {
                setUserImage(profile.imageProfile);
                localStorage.setItem("userImage", profile.imageProfile);
            }
        }
    }, [profile, isLoading]);

    const initial = userName.charAt(0).toUpperCase();

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNavigate = (path: string) => {
        handleMenuClose();
        navigate(path);
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                width: `calc(100% - 240px)`,
                left: 240,
                backgroundColor: "#F1F5F8",
                color: "#1C1C1C",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                px: 3,
                borderBottom: "2px solid #D1D5DB",
            }}
        >
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, color: "#1C3D32" }}>
                  
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }} onClick={handleMenuOpen}>
                    <IconButton sx={{ p: 0 }}>
                        <Avatar
                            src={userImage || undefined}
                            sx={{
                                bgcolor: "#1C3D32",
                                width: 36,
                                height: 36,
                                fontSize: 16,
                                border: "2px solid #F9A825",
                            }}
                        >
                            {!userImage && initial}
                        </Avatar>
                    </IconButton>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: "#1C3D32" }}>
                        Hi, {userName}
                    </Typography>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                        sx: {
                            mt: 1,
                            boxShadow: 3,
                            minWidth: 250,
                            borderRadius: 2,
                            backgroundColor: "#FFFFFF",
                            border: "1px solid #D1D5DB",
                        },
                    }}
                >
                    <MenuItem
                        onClick={() => handleNavigate("/profile")}
                        sx={{ px: 2, py: 1, fontWeight: "bold", color: "#1C3D32", "&:hover": { backgroundColor: "#F1F5F8" } }}
                    >
                        Profile
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
