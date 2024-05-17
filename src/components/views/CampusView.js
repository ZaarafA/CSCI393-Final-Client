/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import React, { useState } from "react";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, allStudents, handleAddStudent, handleUnenrollStudent } = props;
  const availableStudents = allStudents.filter(student => student.campusId !== campus.id);
  const [studentIdToAdd, setStudentIdToAdd] = useState("");
  
  const handleChange = (event) => {
    setStudentIdToAdd(Number(event.target.value));
  };

  const handleAddStudentEvent = () => {
    handleAddStudent(studentIdToAdd, allStudents, campus);
    setStudentIdToAdd("");
  };

  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <Link to={`${campus.id}/edit`}>Edit Campus</Link>
      <hr></hr>
      <h3>Students:</h3>
      {campus.students.length === 0 ? (
        <p>No Students Currently Enrolled</p>
      ) : (
        campus.students.map((student) => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h2>{name}</h2>
              </Link>
              <button onClick={() => handleUnenrollStudent(student.id, allStudents)}>UNENROLL</button>
            </div>
          );
        })
      )}
      <hr></hr>
      <h2>Add a Student</h2>
      <select value={studentIdToAdd} onChange={handleChange}>
        <option value="">Select a Student</option>
        {availableStudents.map((student) => (
          <option key={student.id} value={student.id}>
            {student.firstname} {student.lastname}
          </option>
        ))}
      </select>
      <button onClick={handleAddStudentEvent}>Add to Campus</button>
    </div>
  );
};

export default CampusView;