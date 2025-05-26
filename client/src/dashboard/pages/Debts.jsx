
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

import { useState } from 'react';
import {useSelector} from "react-redux"
const Debts = () => {

  const {debtsEvents} = useSelector((state)=>state.deposit)
       const [events] = useState([
    { id: '1', title: 'Event One', start: '2025-05-26' },
    { id: '2', title: 'Event Two', start: '2025-05-28',color:"#cccc" },
  ]);
    const handleDateClick = (arg) => {
      console.log(arg)
    // You can fetch new events here based on arg.date or update state
    }

  return (
    <div>
        <FullCalendar
        plugins={[dayGridPlugin,interactionPlugin]}
        initialView="dayGridMonth"
        events={debtsEvents}
        dateClick={handleDateClick}
      />
    </div>
  )
}

export default Debts

