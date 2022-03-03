import React, {useState} from 'react';
import InterviewerList from 'components/InterviewList';
import Button from "../Button";

export default function Form (props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
// removes value from student state
  const reset=()=> {
    setStudent("")
    setInterviewer(null)
  }
// resets student state
  const cancel=()=> {
    reset()
    props.onCancel()
  }
  // validate user and interviewer before saving
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null ) {
      setError("You must choose a interviewer");
      return
    }
    setError("")
    props.onSave(student, interviewer);
  }
// Form component
  return (
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form onSubmit={event => event.preventDefault()} autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={student}
          onChange={(event)=> setStudent(event.target.value)}
          data-testid="student-name-input"
        />
      </form>
      <section className="appointment__validation">{error}</section>
      <InterviewerList 
        value={interviewer}
        onChange={setInterviewer}
        interviewers={props.interviewers}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={validate}>Save</Button>
      </section>
    </section>
  </main>
  );
}
