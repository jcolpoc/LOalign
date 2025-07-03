import { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_BASE_URL;

function CLOManager() {
  const [form, setForm] = useState({
    description: '',
    clo_theme: '',
    course_id: '',
    created_by: ''
  });
  const [clos, setClos] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch all CLOs
  const fetchClos = async () => {
    try {
      const res = await axios.get(`${API}/clos`);
      setClos(res.data);
    } catch (err) {
      console.error('Error fetching CLOs', err);
    }
  };

  useEffect(() => {
    fetchClos();
  }, []);

  // Handle input
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new CLO
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${API}/clos`, form);
      setMessage('✅ CLO added successfully');
      setForm({ description: '', clo_theme: '', course_id: '', created_by: '' });
      fetchClos();
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to add CLO');
    }
  };

  // Delete CLO
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/clos/${id}`);
      fetchClos();
    } catch (err) {
      console.error('Failed to delete CLO', err);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <h2>📘 CLO Manager</h2>

      <form onSubmit={handleSubmit}>
        <label>Description:<br />
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </label><br /><br />
        <label>Theme:<br />
          <input name="clo_theme" value={form.clo_theme} onChange={handleChange} required />
        </label><br /><br />
        <label>Course ID:<br />
          <input name="course_id" value={form.course_id} onChange={handleChange} required />
        </label><br /><br />
        <label>Created By (User ID):<br />
          <input name="created_by" value={form.created_by} onChange={handleChange} required />
        </label><br /><br />
        <button type="submit">Add CLO</button>
      </form>

      <p>{message}</p>

      <hr />

      <h3>📄 Existing CLOs</h3>
      <ul>
        {clos.map(clo => (
          <li key={clo.id}>
            <strong>{clo.description}</strong> ({clo.clo_theme}) – Course #{clo.course_id}
            <button onClick={() => handleDelete(clo.id)} style={{ marginLeft: '1rem' }}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CLOManager;
