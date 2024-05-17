/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student } = props;

  // Render a single Student view 
  return (
    <div className="student-single">
      <img src={`${student.imageUrl}` || 'https://picsum.photos/200/200'} alt="student"/>
      <h1>{student.firstname} {student.lastname}</h1>
      <div className="student-info-section">
        {student.campus ? ( // Check if campus exists
          <Link to={`/campus/${student.campus.id}`}>
            <h3>{student.campus.name}</h3>
          </Link>
        ) : (
          <p className="student-info">Not Currently Enrolled</p>
        )}
        <p className="student-info">Email: {student.email}</p>
        <p className="student-info">GPA: {student.gpa}</p>
      </div>
      <Link to={`/student/${student.id}/edit`}>Edit Student</Link>
    </div>
  );

};

export default StudentView;