import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import firebase from '../firebase';

class ScheduleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      loading: true,
    };
  }
  static defaultProps = {
    readOnly: false,
  };

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents = async () => {
    try {
      const scheduleRef = firebase.firestore()
        .collection('teachers')
        .doc(this.props.teacherId)
        .collection('schedules')
        .doc('staticSchedule');
  
      const querySnapshot = await scheduleRef.get();
      const events = querySnapshot.data()?.events || [];
  
      this.setState({ events, loading: false });
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };
  

  handleDateSelect = async (selectInfo) => {
    if (this.props.readOnly) return;

    const title = prompt('Please enter a new event title:');
    if (!title) return;

    const newEvent = {
      id: Date.now(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    };

    try {
      const scheduleRef = firebase.default

        .firestore()
        .collection('teachers')
        .doc(this.props.teacherId)
        .collection('schedules')
        .doc('staticSchedule');

      await scheduleRef.update({
        events: [...this.state.events, newEvent],
      });

      this.setState({ events: [...this.state.events, newEvent] });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  handleEventChange = async (changeInfo) => {
    if (this.props.readOnly) return;

    const updatedEvent = {
      ...changeInfo.event.extendedProps,
      start: changeInfo.event.start,
      end: changeInfo.event.end,
    };

    try {
      const updatedEvents = this.state.events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      );

      const scheduleRef = firebase.default

        .firestore()
        .collection('teachers')
        .doc(this.props.teacherId)
        .collection('schedules')
        .doc('staticSchedule');

      await scheduleRef.update({
        events: updatedEvents,
      });

      this.setState({ events: updatedEvents });
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  handleEventRemove = async (removeInfo) => {
    if (this.props.readOnly) return;

    if (!window.confirm(`Are you sure you want to delete the event '${removeInfo.event.title}'?`)) {
      return;
    }

    try {
      const updatedEvents = this.state.events.filter((event) => event.id !== removeInfo.event.id);

      const scheduleRef = firebase.default

        .firestore()
        .collection('teachers')
        .doc(this.props.teacherId)
        .collection('schedules')
        .doc('staticSchedule');

      await scheduleRef.update({
        events: updatedEvents,
      });

      this.setState({ events: updatedEvents });
    } catch (error) {
      console.error('Error removing event:', error);
    }
  };

  render() {
    const { events, loading } = this.state;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        initialView="timeGridWeek"
        editable={!this.props.readOnly}
        selectable={!this.props.readOnly}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events}
        select={this.handleDateSelect}
        eventContent={this.renderEventContent}
        eventChange={this.handleEventChange}
        eventRemove={this.handleEventRemove}
      />
    );
  }
}

export default ScheduleComponent;

