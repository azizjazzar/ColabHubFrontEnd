import React, { useState, useEffect } from 'react';

export function  Calendar(){
  const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [noOfDays, setNoOfDays] = useState([]);
  const [blankdays, setBlankdays] = useState([]);
  const [events, setEvents] = useState([
    {
      event_date: new Date(2020, 3, 1),
      event_title: "April Fool's Day",
      event_theme: 'blue'
    },
    {
      event_date: new Date(2020, 3, 10),
      event_title: "Birthday",
      event_theme: 'red'
    },
    {
      event_date: new Date(2020, 3, 16),
      event_title: "Upcoming Event",
      event_theme: 'green'
    }
  ]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTheme, setEventTheme] = useState('blue');
  const [openEventModal, setOpenEventModal] = useState(false);

  useEffect(() => {
    initDate();
    getNoOfDays();
  }, []);

  const initDate = () => {
    let today = new Date();
    setMonth(today.getMonth());
    setYear(today.getFullYear());
  };

  const isToday = (date) => {
    const today = new Date();
    const d = new Date(year, month, date);
    return today.toDateString() === d.toDateString();
  };

  const showEventModal = (date) => {
    setOpenEventModal(true);
    setEventDate(new Date(year, month, date).toDateString());
  };

  const addEvent = () => {
    if (eventTitle === '') {
      return;
    }

    setEvents((prevEvents) => [
      ...prevEvents,
      {
        event_date: eventDate,
        event_title: eventTitle,
        event_theme: eventTheme
      }
    ]);

    // clear the form data
    setEventTitle('');
    setEventDate('');
    setEventTheme('blue');

    // close the modal
    setOpenEventModal(false);
  };

  const getNoOfDays = () => {
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let dayOfWeek = new Date(year, month).getDay();
    let blankdaysArray = Array.from({ length: dayOfWeek }, (_, i) => i + 1);
    let daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    setBlankdays(blankdaysArray);
    setNoOfDays(daysArray);
  };

  return (
    <div className="antialiased sans-serif bg-gray-100 h-screen">
      <div className="bg-white rounded-lg shadow overflow-hidden">
  <div className="flex items-center justify-between py-2 px-6">
    <div>
      <span className="text-lg font-bold text-gray-800">{MONTH_NAMES[month]}</span>
      <span className="ml-1 text-lg text-gray-600 font-normal">{year}</span>
    </div>
    <div className="border rounded-lg px-1" style={{ paddingTop: '2px' }}>
      <button
        type="button"
        className={`leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center ${
          month === 0 ? 'cursor-not-allowed opacity-25' : ''
        }`}
        disabled={month === 0 ? true : false}
        onClick={() => {
          setMonth(month - 1);
          getNoOfDays();
        }}
      >
        <svg
          className="h-6 w-6 text-gray-500 inline-flex leading-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div className="border-r inline-flex h-6"></div>
      <button
        type="button"
        className={`leading-none rounded-lg transition ease-in-out duration-100 inline-flex items-center cursor-pointer hover:bg-gray-200 p-1 ${
          month === 11 ? 'cursor-not-allowed opacity-25' : ''
        }`}
        disabled={month === 11 ? true : false}
        onClick={() => {
          setMonth(month + 1);
          getNoOfDays();
        }}
      >
        <svg
          className="h-6 w-6 text-gray-500 inline-flex leading-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>

  <div className="-mx-1 -mb-1">
    <div className="flex flex-wrap" style={{ marginBottom: '-40px' }}>
      {DAYS.map((day, index) => (
        <div key={index} style={{ width: '14.26%' }} className="px-2 py-2">
          <div className="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">{day}</div>
        </div>
      ))}
    </div>

    <div className="flex flex-wrap border-t border-l">
      {blankdays.map((blankday, index) => (
        <div key={index} style={{ width: '14.28%', height: '120px' }} className="text-center border-r border-b px-4 pt-2"></div>
      ))}
      {noOfDays.map((date, dateIndex) => (
        <div key={dateIndex} style={{ width: '14.28%', height: '120px' }} className="px-4 pt-2 border-r border-b relative">
          <div
            onClick={() => showEventModal(date)}
            className={`inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100 ${
              isToday(date) ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-200'
            }`}
          >
            {date}
          </div>
          <div style={{ height: '80px' }} className="overflow-y-auto mt-1">
            {events
              .filter((event) => new Date(event.event_date).toDateString() === new Date(year, month, date).toDateString())
              .map((event, eventIndex) => (
                <div
                  key={eventIndex}
                  className={`px-2 py-1 rounded-lg mt-1 overflow-hidden border ${
                    event.event_theme === 'blue'
                      ? 'border-blue-200 text-blue-800 bg-blue-100'
                      : event.event_theme === 'red'
                      ? 'border-red-200 text-red-800 bg-red-100'
                      : event.event_theme === 'yellow'
                      ? 'border-yellow-200 text-yellow-800 bg-yellow-100'
                      : event.event_theme === 'green'
                      ? 'border-green-200 text-green-800 bg-green-100'
                      : event.event_theme === 'purple'
                      ? 'border-purple-200 text-purple-800 bg-purple-100'
                      : ''
                  }`}
                >
                  <p className="text-sm truncate leading-tight">{event.event_title}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>

  </div>
</div>
 </div>
 
  );
};

export default Calendar;
