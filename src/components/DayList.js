import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

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