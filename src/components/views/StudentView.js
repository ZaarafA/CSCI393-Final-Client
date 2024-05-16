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
    <div>
      <img src={`${student.imageUrl}`} alt=""/>
      <h1>{student.firstname} {student.lastname}</h1>
      {student.campus ? ( // Check if campus exists
        <Link to={`/campus/${student.campus.id}`}>
          <h3>{student.campus.name}</h3>
        </Link>
      ) : (
        <p>Not Currently Enrolled</p>
      )}
      <p>Email: {student.email}</p>
      <p>GPA: {student.gpa}</p>
    </div>
  );

};

export default StudentView;