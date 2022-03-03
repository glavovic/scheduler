import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
// parsing through days prop in order to get information for each day
  const parsedDates = props.days.map(date => <DayListItem
    key={date.id}
    name={date.name} 
    spots={date.spots} 
    selected={date.name === props.value}
    setDay={props.onChange}  
    />);

  return(
    <ul>
      {parsedDates}
    </ul>
  );
};