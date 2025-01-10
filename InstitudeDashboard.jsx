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
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import {
  Dashboard,
  School,
  Class,
  People,
  Upload,
} from "@mui/icons-material";

const InstituteDashboard = () => {
  const [theme, setTheme] = useState("light");
  const [institutes, setInstitutes] = useState([
    { name: "National University of Lesotho", description: "Lesotho's premier university offering a variety of programs." },
    { name: "Limkokwing University of Creative Technology", description: "A leading institution for creative and technological education." },
    { name: "Lesotho Agricultural College", description: "Specialized in agricultural studies and research." },
  ]);
  const [faculties, setFaculties] = useState([
    
    { name: "Dr. Mpho Tšosane", subject: "Computer Science" },
    { name: "Dr. Thabisa Letsie", subject: "Engineering" },
    { name: "Dr. Mokhulo Makara", subject: "Law" },
  ]);
  const [courses, setCourses] = useState([

    { name: "BSc in Computer Science", duration: "3 Years" },
    { name: "MBA in Management", duration: "2 Years" },
    { name: "Diploma in Journalism", duration: "2 Years" },
  ]);

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: theme === "light" ? "#f4f6f8" : "#121212",
        color: theme === "light" ? "#000" : "#fff",
        minHeight: "130vh",
        paddingBottom: "2rem", // Add padding to the bottom for spacing
      }}
    >
      {/* Top Navigation Bar */}
      <AppBar position="static" sx={{ bgcolor: theme === "light" ? "#3f51b5" : "#212121" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Institute Dashboard
          </Typography>
          <FormControlLabel
            control={<Switch checked={theme === "dark"} onChange={handleThemeToggle} />}
            label="Dark Mode"
          />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Grid container spacing={3} sx={{ padding: 3, maxWidth: "1200px", margin: "0 auto" }}>
        {/* Institutes Section */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ marginBottom: "1rem" }}>
            Existing Institutes in Lesotho
          </Typography>
          <Grid container spacing={2}>
            {institutes.map((institute, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card elevation={3} sx={{ display: "flex", alignItems: "center", padding: "1rem" }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 120, height: 120 }}
                    image="https://via.placeholder.com/120"
                    alt="Institute Logo"
                  />
                  <CardContent sx={{ paddingLeft: "1rem" }}>
                    <Typography variant="h6">{institute.name}</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ marginTop: "0.5rem" }}>
                      {institute.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Faculties Section */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ marginBottom: "1rem" }}>
            Faculties in Lesotho Institutes
          </Typography>
          <Grid container spacing={2}>
            {faculties.map((faculty, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
                  <Avatar sx={{ margin: "0 auto", bgcolor: "#3f51b5", width: 56, height: 56 }}>
                    <People />
                  </Avatar>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {faculty.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {faculty.subject}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Courses Section */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ marginBottom: "1rem" }}>
            Available Courses
          </Typography>
          <Grid container spacing={2}>
            {courses.map((course, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 5,
                    backgroundColor: theme === "light" ? "#f5f5f5" : "#424242",
                    textAlign: "center",
                    height: "50%",
                  }}
                >
                  <Typography variant="h6">{course.name}</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ marginTop: "0.5rem" }}>
                    Duration: {course.duration}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InstituteDashboard;
