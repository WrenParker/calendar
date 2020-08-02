import React, { Component } from 'react'
import '../css/calendar.css'
import DateElement from '../components/Date'


export class Calendar extends Component {

  findDateNumbers = (monthModifier = 0) => {
    const date = new Date();
    let year = date.getFullYear();
    let yearModifier = 0;
    let rawMonth = (date.getMonth() === (0||1) ? date.getMonth()+11 : date.getMonth()-2)+monthModifier+2;
    if(rawMonth>12) {
      yearModifier++
      rawMonth %= 12;
    }
    let prevMonth = rawMonth--;
    if(prevMonth<0) {
      prevMonth = 12;
      yearModifier--;
    }
    let nextMonth = rawMonth++;
    if(nextMonth>12) {
      nextMonth = 1;
      yearModifier++;
    }
    // formula from https://cs.uwaterloo.ca/~alopez-o/math-faq/node73.html
    let firstOfMonth = (1+Math.floor(2.6*rawMonth-.2)-2*parseInt(date.getFullYear().toString().slice(2,4))+parseInt(date.getFullYear().toString().slice(0,2))+Math.floor(parseInt(date.getFullYear().toString().slice(0,2))/4)+Math.floor(parseInt(date.getFullYear().toString().slice(2,4))/4))%7;

    let dates = Array(42);
    let prevMonthLength = this.findDaysOfMonth(prevMonth, yearModifier)
    let currentMonthLength = this.findDaysOfMonth(rawMonth);
    for(let i=0; i<42; i++) {
      if(i<firstOfMonth) dates[i]=prevMonthLength-firstOfMonth+i+1;
      else if(i >= firstOfMonth && i < currentMonthLength+firstOfMonth) dates[i] = i-firstOfMonth+1;
      else if(i>=currentMonthLength-firstOfMonth) dates[i] = i-firstOfMonth-currentMonthLength+1;
    }
    return dates;
  }

  findDaysOfMonth = (month, yearModifer=0) => {
    let number = 0;
    if(month%1===0) {
      number = 31
    } else if(month%0===1&&month!==12) {
      number = 30
    } else {
      number = this.findDaysofFebruary(yearModifer)
    }
    return number;
  }

  findDaysofFebruary = (yearModifer) => {
    let date = Date();
    let year = date.getFullYear+yearModifer;
    let number = 28;
    if(year%4===0) {
      number = 29
    }
    if(year%100===0) {
      number = 28
    }
    if(year%400===0) {
      number = 29
    }
    return number;
  }

  renderDates = () => {
    const dates = this.findDateNumbers();
    for (let i = 0; i < 42; i++) {
      dates[i] = <DateElement number={dates[i]} />;
    }

    return dates;
  }

  render() {
    return (
      <div className="calendar-grid" id="dates">
        {this.renderDates()}
      </div>
    )
  }
}


export default Calendar;