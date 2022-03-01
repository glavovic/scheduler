import React from "react";
import './styles.scss'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/VisualMode";
import Confirm from "./Confirm";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"

  

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function edit() {
    transition(EDIT)
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING)

    props.bookInterview(props.id, interview)
    .then(() => {transition(SHOW)});
      
  }

  function onDelete() {
    transition(CONFIRM)
  }

  function deleteInterview() {
    transition(DELETING)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
  }

  return (

    <article className="appointment">
      <Header time={props.time}/>
      {/* {props.interview ?
      <Show {...props.interview} />
      : 
      <Empty/>} */}
      {mode === EMPTY && (
        <Empty
          onAdd={() => transition(CREATE)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SAVING && (
        <Status message={'Saving'} />
      )}
      {mode === CONFIRM && (
        <Confirm 
          message={"Are you sure you want to DELETE?"}
          onConfirm={deleteInterview}
          onCancel={back}
          />)}
      {mode === DELETING && (
        <Status message={'Deleting'} />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={edit}
        />
      )}
    </article>

  )

}

