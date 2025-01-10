import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Avatar,
  TextField,
  IconButton,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  Dashboard,
  People,
  Settings,
  Notifications,
  Upload,
  Task,
  Visibility,
} from "@mui/icons-material";

const AdminHomePage = () => {
  const [theme, setTheme] = useState("light");
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/150");
  const [adminName, setAdminName] = useState("Admin Name");
  const [email, setEmail] = useState("admin@example.com");

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleProfileUpdate = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfilePic(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: theme === "light" ? "#fff" : "#121212",
        color: theme === "light" ? "#000" : "#fff",
        minHeight: "120vh",
      }}
    >
      {/* Top Navigation Bar */}
      <AppBar position="static" sx={{ bgcolor: theme === "light" ? "#3f51b5" : "#212121" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <FormControlLabel
            control={<Switch checked={theme === "dark"} onChange={handleThemeToggle} />}
            label="Dark Mode"
          />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Grid container spacing={2} sx={{ padding: 2, maxWidth: "1200px", margin: "0 auto" }}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ padding: 2, height: "100%", textAlign: "center" }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                margin: "0 auto",
                mb: 2,
              }}
              src={profilePic}
            />
            <Typography variant="h6">{adminName}</Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {email}
            </Typography>
            <TextField
              label="Admin Name"
              fullWidth
              margin="normal"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              variant="contained"
              component="label"
              startIcon={<Upload />}
              fullWidth
              sx={{ mt: 2 }}
            >
              Upload Profile
              <input type="file" hidden onChange={handleProfileUpdate} />
            </Button>
            <Button startIcon={<Dashboard />} fullWidth sx={{ mt: 2 }}>
              Dashboard
            </Button>
            <Button startIcon={<People />} fullWidth sx={{ mt: 1 }}>
              Users
            </Button>
            <Button startIcon={<Settings />} fullWidth sx={{ mt: 1 }}>
              Settings
            </Button>
            <Button startIcon={<Notifications />} fullWidth sx={{ mt: 1 }}>
              Notifications
            </Button>
          </Paper>
        </Grid>

        {/* Main Panel */}
        <Grid item xs={12} md={9}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
              Welcome to the Admin Dashboard
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Manage your institution's operations efficiently and effectively.
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    textAlign: "center",
                    backgroundColor: theme === "light" ? "#f5f5f5" : "#424242",
                  }}
                >
                  <Task sx={{ fontSize: 50, color: "#3f51b5" }} />
                  <Typography variant="h6">Tasks</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Manage and track tasks
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    textAlign: "center",
                    backgroundColor: theme === "light" ? "#f5f5f5" : "#424242",
                  }}
                >
                  <Notifications sx={{ fontSize: 50, color: "#3f51b5" }} />
                  <Typography variant="h6">Notifications</Typography>
                  <Typography variant="body2" color="textSecondary">
                    View recent updates
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={3}
                  sx={{
                    padding:2,
                    textAlign: "center",
                    backgroundColor: theme === "light" ? "#f5f5f5" : "#424242",
                  }}
                >
                  <Visibility sx={{ fontSize: 50, color: "#3f51b5" }} />
                  <Typography variant="h6">Activity Logs</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Review recent actions
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminHomePage;
