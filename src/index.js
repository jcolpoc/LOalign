import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

app.use(express.json());

app.post('/api/course-outcomes', (req, res) => {
  const { courseCode, cloNumber, description } = req.body;

  if (!courseCode || !cloNumber || !description) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const sql = `
    INSERT INTO course_outcomes (course_code, clo_number, description)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [courseCode, cloNumber, description], (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ error: 'Database insert failed' });
    }
    res.json({ success: true, insertedId: result.insertId });
  });
});
