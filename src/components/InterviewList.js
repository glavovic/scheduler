import React from "react";
import "../styles/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {

  const parsedInterviewers = props.interviewers.map(e => 
    <InterviewerListItem
      key={e.id}
      name={e.name}
      avatar={e.avatar}
      selected={e.id === props.value}
      setInterviewer={() => props.onChange(e.id)}
    />)

    InterviewerList.propTypes = {
      interviewers: PropTypes.array.isRequired
    };

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  )
  
}

