import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';


const DisplayMonth = ({ year, month }) => {
  const { dailyStatistics } = useSelector((state) => state.dailies);
  const monthData = dailyStatistics[year][month];
  const [expanded, setExpanded] = useState(false);

  const days = Object.keys(monthData).map((day) => {
    console.log(day);
    return <div className="dayContainer">{monthData[day].day}</div>;
  });

  const monthText = (month) => {
    const monthNames = ["January", 
        "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[month];
} 

  const monthDays = (month) => {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if(year%4===0){
      daysInMonth[1] = 29;
    }
    return daysInMonth[month];
} 


//   const dayBox =[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34];
  //create an array of 35 elements with the day and status "empty"
  let dayBox = [];
  for (let i = 0; i < 37; i++) {
    dayBox.push({day: i, status: "empty"});
  }

  //find the index of the first day of the month
  let firstDayIndex = Math.floor((monthData[0].day-1)/7+monthData[0].dayOfWeek);
  let firstDayOfMonth = firstDayIndex - (monthData[0].day-1);

  //for every day before the first day of the month, set the status to "non-exist"
  for (let i = 0; i < firstDayOfMonth; i++) {
    dayBox[i].status = "non-exist";
  }

  //for every day after the last day of the month, set the status to "non-exist"
  for (let i = firstDayOfMonth+monthDays(month); i < 37; i++) {
    dayBox[i].status = "non-exist";
  }

  //for each day in the monthData, set the status to appropriate status
  for (let i = 0; i < Object.keys(monthData).length; i++) {
    // let index = Math.floor((monthData[i].day-1)/7+monthData[i].dayOfWeek);
    let index = (Math.ceil((monthData[i].day)/7)-1)*7+monthData[i].dayOfWeek;
    dayBox[index].status = monthData[i].status;


  }
  
  return <div className="monthContainer">
    <div className="monthHeader">
      {monthText(month)}
    </div>
    <div className="dayBoxes">
        {dayBox.map((day) => {
            return <div className={`dayBox box${day.status}`}>{}</div>;
        })}
    </div>
      
  </div>;
};

export default DisplayMonth;