import { useEffect, useState } from 'react';
import axios from 'axios';
import AddCourseOutcome from './AddCourseOutcome'; 

function App() {
  return (
    <div>
      <h1>📘 CLO Tracker</h1>
      <AddCourseOutcome />
    </div>
  );
}

export default App;