import { useState } from 'react';
import axios from 'axios';

function AddCourseOutcome() {
  const [form, setForm] = useState({
    courseCode: '',
    cloNumber: '',
    description: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/course-outcomes`, form);
      setMessage('✅ Successfully added CLO');
      setForm({ courseCode: '', cloNumber: '', description: '' });
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to add CLO');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <h2>Add Course Learning Outcome</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Course Code:
          <input type="text" name="courseCode" value={form.courseCode} onChange={handleChange} required />
        </label><br/><br/>
        <label>
          CLO Number:
          <input type="text" name="cloNumber" value={form.cloNumber} onChange={handleChange} required />
        </label><br/><br/>
        <label>
          Description:
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </label><br/><br/>
        <button type="submit">Add CLO</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default AddCourseOutcome;