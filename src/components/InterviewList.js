import React from "react";
import "../styles/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {

  const parsedInterviewers = props.interviewers.map(e => 
    <InterviewerListItem
      key={e.id}
      name={e.name}
      avatar={e.avatar}
      selected={props.interviewer === e.id }
      setInterviewer={() => props.onChange(e.id)}
    />)

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  )
  
}