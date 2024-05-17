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
      <div className="campus-header">
        <img src={campus.imageUrl || 'https://picsum.photos/id/193/200/200'}></img>
        <div className="campus-info">
          <h1>{campus.name}</h1>
          <p>{campus.address}</p>
          <p>{campus.description}</p>
          <Link to={`${campus.id}/edit`}>Edit Campus</Link>
        </div>
      </div>
      <hr></hr>
      <h3>Students:</h3>
      <div className="campus-students">
        {campus.students.length === 0 ? (
          <p>No Students Currently Enrolled</p>
        ) : (
          campus.students.map((student) => {
            let name = student.firstname + " " + student.lastname;
            return (
              <div className="campus-student-item" key={student.id}>
                <Link to={`/student/${student.id}`}>
                  <h2>{name}</h2>
                </Link>
                <hr/>
                <button className="delete-button" onClick={() => handleUnenrollStudent(student.id, allStudents)}>UNENROLL</button>
              </div>
            );
          })
        )}
      </div>
      <hr></hr>
      <h2>Add a Student</h2>
      <select className="campus-options" value={studentIdToAdd} onChange={handleChange}>
        <option value="">Select a Student</option>
        {availableStudents.map((student) => (
          <option key={student.id} value={student.id}>
            {student.firstname} {student.lastname}
          </option>
        ))}
      </select>
      <button className="add-student-button" onClick={handleAddStudentEvent}>Add to Campus</button>
      <br/>
      <button className="add-new-student-button"><a href="/newstudent">Add New Student</a></button>
    </div>
  );
};

export default CampusView;