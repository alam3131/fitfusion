import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events ,setEvents] = useState([
    {
      title: 'My event',
      start: new Date(),
      end: new Date(),
    },
  ]);

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };
  
  const handleDeleteEvent = (eventToDelete) => {
    setEvents(events.filter(event => event !== eventToDelete));
  };

  const handleEventClick = (event) => {
    if (window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
      handleDeleteEvent(event);
    }
  };

return (
  <div style = {{ height: 500 }}>
    <Calendar
    localizer={localizer}
    events={events}
    startAccessor="start"
    endAccessor="end"
    style={{ margin: '50px' }}
    eventPropGetter={(event, start, end, isSelected) => {
      const backgroundColor = isSelected ? '#3174ad' : '#3a87ad';
      return { style: { backgroundColor } };
    }}
    onSelectEvent={handleEventClick}
    />
    <WorkoutForm onAddEvent={handleAddEvent} />
  </div>
  );
};

const WorkoutForm = ({ onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new event object using form data
    const newEvent = { title, start, end };
    // Call the callback function provided by the parent component to add the new event
    onAddEvent(newEvent);
    // Clear the form fields
    setTitle('');
    setStart(new Date());
    setEnd(new Date());
  };

  return (
    // Form for inputting workout details
    <form onSubmit={handleSubmit}>
      {/* Input field for workout title */}
      <input
        type="text"
        placeholder="Workout title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* Input field for start time */}
      <input
        type="datetime-local"
        value={moment(start).format('YYYY-MM-DDTHH:mm')}
        onChange={(e) => setStart(new Date(e.target.value))}
      />
      {/* Input field for end time */}
      <input
        type="datetime-local"
        value={moment(end).format('YYYY-MM-DDTHH:mm')}
        onChange={(e) => setEnd(new Date(e.target.value))}
      />
      {/* Button to submit the form */}
      <button type="submit">Add Workout</button>
    </form>
  );
};


export default MyCalendar;