import React, {usestate}from "react";
import "../styles/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";
import { useState } from "react";

export default function InterviewerList(props) {

  const parsedInterviewers = props.interviewers.map(interviewer => 
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={() => props.onChange(interviewer.id)}
    />)

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  )
  
}