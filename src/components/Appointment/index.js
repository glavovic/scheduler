import React from "react";
import './styles.scss'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/VisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW"

  return (

    <article className="appointment">
      <Header time={props.time}/>
      {props.interview ?
      <Show {...props.interview} />
      : 
      <Empty/>}
  
    </article>

  )

}

