import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [ping, setPing] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    // Ping the backend
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/ping`)
      .then(res => setPing(res.data.message))
      .catch(err => setPing("❌ Error connecting to backend"));

    // Example: Fetch learning outcomes
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/learning-outcomes`)
      .then(res => setData(res.data))
      .catch(err => console.error("Data fetch error", err));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>📡 Frontend Connected to Backend</h1>
      <p><strong>Status:</strong> {ping}</p>

      <h2>📘 Learning Outcomes</h2>
      <ul>
        {data.map((item, i) => (
          <li key={i}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;