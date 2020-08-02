import React from 'react'
import '../css/date.css'

const DateElement = (props) => {
  return (
    <div className="grid">
      <div className="number">{props.number}</div>
      <div id="events">
        <div className="event-wrapper">
          <div className="event">
            <div className='text'>
              todo
            </div>
          </div>
        </div>
        <div className="event-wrapper">
          <div className="event">
            <div className='text'>
              todo
            </div>
          </div>
        </div>
        <div className="event-wrapper">
          <div className="event">
            <div className='text'>
              ...
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DateElement;