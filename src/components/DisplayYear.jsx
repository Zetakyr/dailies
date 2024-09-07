import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import DisplayMonth from './DisplayMonth';


const DisplayYear = ({ year }) => {
  const { dailyStatistics } = useSelector((state) => state.dailies);
  const yearData = dailyStatistics[year];
  const [expanded, setExpanded] = useState(false);

  const months = Object.keys(yearData).map((month) => {
    return <DisplayMonth year={year} month={month} />
  });
  
  return <div className="yearContainer" >
    <div className="yearHeader" onClick={() => setExpanded(!expanded)}>
    {year}
      </div>
      
  {expanded && months}
  </div>;
};

export default DisplayYear;