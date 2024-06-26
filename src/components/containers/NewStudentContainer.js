/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewStudentView from '../views/NewStudentView';
import { addStudentThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "", 
      email: "",
      imageUrl: "",
      gpa: null,
      campusId: null, 
      redirect: false, 
      redirectId: null,
      errors: {
        firstname: "",
        lastname: "",
        email: "",
        gpa: null
      }
    };
  }

  // Capture input data when it is entered
  handleChange = event => {
    const { name, value } = event.target;
    const errors = { ...this.state.errors };
    errors[name] = "";
    this.setState({
      [name]: value,
      errors
    });
  };

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    if(!this.validateForm()){
      return;
    }

    // Convert empty string into null for the database call
    let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        imageUrl: this.state.imageUrl,
        gpa: isNaN(parseFloat(this.state.gpa)) ? null : parseFloat(this.state.gpa),
        campusId: this.state.campusId
    };
    
    // Add new student in back-end database
    let newStudent = await this.props.addStudent(student);

    // Update state, and trigger redirect to show the new student
    this.setState({
      firstname: "", 
      lastname: "", 
      email: "",
      imageUrl: "",
      gpa: null,
      campusId: null, 
      redirect: true, 
      redirectId: newStudent.id
    });
  }

  // Form Validation: Required fields and decimal boundaries
  validateForm = () => {
    const { firstname, lastname, email, gpa } = this.state;
    const errors = {
      firstname: firstname.trim() === '' ? 'First Name is required' : '',
      lastname: lastname.trim() === '' ? 'Last Name is required' : '',
      email: email.trim() === '' ? 'Email is required' : '',
      gpa: (gpa !== '' && (parseFloat(gpa) < 0.0 || parseFloat(gpa) > 4.0)) ? 'GPA must be either blank or between 0.0 and 4.0' : '',
    };

    // Since GPA can be blank, check the others in that case
    this.setState({ errors });
    const { gpa: gpaError, ...otherErrors } = errors;
    return !(Object.values(otherErrors).some(error => error !== ''));
}


  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <NewStudentView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}     
          errors={this.state.errors}  
        />
      </div>          
    );
  }
}

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        addStudent: (student) => dispatch(addStudentThunk(student)),
    })
}

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(null, mapDispatch)(NewStudentContainer);