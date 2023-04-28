import React, { useState, useEffect } from 'react';
import ScheduleComponent from './ScheduleComponent';
import { useParams, useNavigate } from 'react-router-dom';

function TeacherScheduleEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error('Teacher ID not found');
      return;
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Teacher Schedule</h1>
      <h2>{id}</h2>
      <ScheduleComponent teacherId={id}  />
      <button onClick={() => navigate(-1)}>Back to Admin Panel</button>
    </div>
  );
}

export default TeacherScheduleEdit;
