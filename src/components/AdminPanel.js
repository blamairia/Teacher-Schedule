import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import firebase from '../firebase';
import {ScheduleComponent} from './ScheduleComponent';
class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchTeachers();
  }

  fetchTeachers = async () => {
    try {
      const teachersRef = firebase.firestore().collection('teachers');
      const snapshot = await teachersRef.get();

      const teachers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      this.setState({ teachers, loading: false });
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  render() {
    const { teachers, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>Admin Panel</h1>
        <ul>
          {teachers.map((teacher) => (
            <li key={teacher.id}>
              {teacher.name} - {teacher.specialty}
              <Link to={`/admin/teacher-schedule-edit/${teacher.id} `}>
                <button>Edit Schedule</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AdminPanel;
