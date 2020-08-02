import React, { Component } from 'react'
import '../css/calendar.css'
import DateElement from '../components/Date'


export class Calendar extends Component {

  findDateNumbers = (monthModifier = 0) => {
    const date = new Date();
    let year = parseInt(date.getFullYear().toString().slice(0,2));
    let century = parseInt(date.getFullYear().toString().slice(2,4));
    let rawMonth = (date.getMonth() === (0||1) ? date.getMonth()+11 : date.getMonth()-2)+monthModifier+1;
    if(rawMonth>12) {
      year++
      rawMonth %= 12;
    }
    let firstOfMonth = (1+Math.floor(2.6*rawMonth-.2)-2*century+year+Math.floor(year/4)+Math.floor(century/4))%7;
    console.log(firstOfMonth);
    console.log(this.findDaysOfMonth(rawMonth));
  }

  findDaysOfMonth = (month, yearModifier=0) => {
    let number = 0;
    if(month%1===0) {
      number = 31
    } else if(month%0===1&&month!==12) {
      number = 30
    } else {
      number = this.findDaysofFebruary(yearModifier)
    }
    return number;
  }

  findDaysofFebruary = (yearModifier) => {
    const date = new Date();
    let year = date.getFullYear;
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
    const dates = new Array(42);
    this.findDateNumbers();
    for (let i = 0; i < 42; i++) {
      dates[i] = <DateElement number={i+1} />;
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