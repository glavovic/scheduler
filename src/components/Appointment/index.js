import React from "react";
import './styles.scss'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/VisualMode";
import Confirm from "./Confirm";
import Error from "./Error";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

  

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  // to transition to edit Mode
  function onEdit() {
    transition(EDIT)
  }
// to save interviw, add to database and remove a spot
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    // async saving screen
    transition(SAVING, true)

    props.bookInterview(props.id, interview)
    .then(() => {transition(SHOW)})
    .catch(error => 
      transition(ERROR_SAVE, true)
    )
      
  }
// to save interviwer, edit to database 
  function edit(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING, true)

    props.editInterview(props.id, interview)
    .then(() => {transition(SHOW)})
    .catch(error => 
      transition(ERROR_SAVE, true)
    )
      
  }
// async delete screen
  function onDelete() {
    transition(CONFIRM)
  }
// to remove interviw, remove from database and add a spot
  function deleteInterview() {
    transition(DELETING, true)

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(err => {
        transition(ERROR_DELETE, true)
      })
  }
// different modes to display 
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
          onSave={edit}
          onCancel={back}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
        message={"Could not save appointment!"}
        onClose={back}
        />
      )}
      {(mode === ERROR_DELETE) && (
        <Error 
          message={"Could not delete!"}
          onClose={back}
        />
      )}
    </article>

  )

}

