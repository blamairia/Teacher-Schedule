import React, { Component } from 'react';
import ScheduleComponent from './ScheduleComponent';
import firebase from '../firebase';
class TeacherHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherId: null,
      loading: true,
    };
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;
    if (!user) {
      console.error('User not authenticated');
      return;
    }
  
    this.setState({ teacherId: user.uid, loading: false });
  }
  

  render() {
    const { teacherId, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>Teacher Home</h1>
        <h2>Schedule</h2>
        <ScheduleComponent teacherId={teacherId} true />
      </div>
    );
  }
}

export default TeacherHome;
