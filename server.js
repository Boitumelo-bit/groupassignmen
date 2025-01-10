const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3001;  // Ensure this matches the frontend request
const cors = require('cors');
const bodyParser = require('body-parser');

// Middleware to allow CORS
app.use(cors());

// Middleware to parse JSON request body
app.use(express.json());

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',      // Replace with your database host
  user: 'root',           // Replace with your database user
  password: 'boity@2002', // Replace with your database password
  database: 'institutions_db'  // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// GET all institutions
app.get('/api/institutions', (req, res) => {
  db.query('SELECT * FROM institutions', (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error fetching institutions' });
    } else {
      res.json(results);
    }
  });
});

// POST a new institution
app.post('/api/institutions', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({ message: 'Institution name is required' });
  }

  db.query('INSERT INTO institutions (name) VALUES (?)', [name], (err, result) => {
    if (err) {
      return res.status(500).send({ message: 'Error adding institution' });
    }
    res.status(201).send({ id: result.insertId, name });
  });
});

// PUT (update) an institution
app.put('/api/institutions/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({ message: 'Institution name is required' });
  }

  db.query('UPDATE institutions SET name = ? WHERE id = ?', [name, id], (err) => {
    if (err) {
      return res.status(500).send({ message: 'Error updating institution' });
    }
    res.send({ message: 'Institution updated successfully' });
  });
});

// DELETE an institution
app.delete('/api/institutions/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM institutions WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).send({ message: 'Error deleting institution' });
    }
    res.send({ message: 'Institution deleted successfully' });
  });
});

// Get faculties for a specific institution
app.get('/api/faculties/:institution', (req, res) => {
  const institution = req.params.institution;
  const query = 'SELECT * FROM faculties WHERE institution = ?';
  db.query(query, [institution], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Add a new faculty
app.post('/api/faculties', (req, res) => {
  const { institution, name } = req.body;
  const query = 'INSERT INTO faculties (institution, name) VALUES (?, ?)';
  db.query(query, [institution, name], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ id: result.insertId, institution, name });
    }
  });
});

// Add a new course
app.post('/api/courses', (req, res) => {
  const { institution, faculty, name, entryRequirements, isFull, capacity, deadline } = req.body;

  // Validate input
  if (!institution || !faculty || !name || !entryRequirements || !deadline || capacity === undefined) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  // Validate deadline format
  const deadlineDate = new Date(deadline);
  if (isNaN(deadlineDate.getTime())) {
    return res.status(400).send({ message: 'Invalid deadline format. Use YYYY-MM-DD.' });
  }

  const query =
    'INSERT INTO courses (institution, faculty, name, entryRequirements, isFull, capacity, deadline) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(
    query,
    [institution, faculty, name, entryRequirements, isFull || false, capacity, deadline],
    (err, result) => {
      if (err) {
        console.error('Error inserting course:', err);
        return res.status(500).send({ message: 'Error adding the course', error: err });
      }
      res.status(201).json({ id: result.insertId, institution, faculty, name, entryRequirements, isFull, capacity, deadline });
    }
  );
});

// Get all courses
app.get('/api/courses', (req, res) => {
  const query = 'SELECT * FROM courses';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});
// API Routes
// Fetch all courses
app.get("/courses", (req, res) => {
  const query = "SELECT * FROM courses";
  db.query(query, (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
  });
});

// Fetch all applications
app.get("/applications", (req, res) => {
  const query = "SELECT * FROM applications";
  db.query(query, (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
  });
});

// Add a new application
app.post("/applications", (req, res) => {
  const { name, course, status, dateApplied } = req.body;
  const query = "INSERT INTO applications (name, course, status, dateApplied) VALUES (?, ?, ?, ?)";
  db.query(query, [name, course, status, dateApplied], (err, results) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Application submitted successfully", results });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
