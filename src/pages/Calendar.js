import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ workoutsToCalender, setWorkoutsToCalender }) => {
  const [currentView, setCurrentView] = useState('');

  useEffect(() => {
    // Retrieve the current view from local storage when the component mounts
    const storedView = localStorage.getItem('currentView');
    console.log('Stored view:', storedView);
    if (storedView) {
      setCurrentView(storedView);
    }
  }, []);

  useEffect(() => {
    // Store the current view in local storage when it changes
    localStorage.setItem('currentView', currentView);
  }, [currentView]);

  const handleEventClick = (event) => {
    if (event){
      if (window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
        // Filter out the selected event from the events state
        const updatedEvents = workoutsToCalender.filter((e) => !areEventsEqual(e, event));
        // Update the parent component's state with the updated events
        setWorkoutsToCalender(updatedEvents);
      }
    }
  };

  const handleView = (view) => {
    setCurrentView(view);
  };

  // Function to check if two events are equal
  const areEventsEqual = (event1, event2) => {
    // Compare start times of events to check if they occur on the same day
    return (
      moment(event1.start).isSame(event2.start, 'day') &&
      moment(event1.end).isSame(event2.end, 'day') &&
      event1.title === event2.title // Add any other conditions for equality, if needed
    );
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={workoutsToCalender}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: '50px' }}
        eventPropGetter={(event, start, end, isSelected) => {
          const backgroundColor = isSelected ? '#3174ad' : '#3a87ad';
          return { style: { backgroundColor } };
        }}
        views={['month', 'agenda']} // Set the views to only 'month'
        onSelectEvent={handleEventClick}
        onView={handleView} // Update currentView when the view changes
      />
    </div>
  );
};

export default MyCalendar;
