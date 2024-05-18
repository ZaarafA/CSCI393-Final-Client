/*==================================================
EditStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */

import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  formContainer:{  
    width: '500px',
    backgroundColor: '#03624c',
    borderRadius: '5px',
    margin: 'auto',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none'
  }, 
  customizeAppBar:{
    backgroundColor: '#11153e',
    shadows: ['none'],
  },
  formTitle:{
    backgroundColor:'#2cc295',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px'
  },
}));

const EditStudentView = (props) => {
    const { student, handleSubmit } = props;
    const classes = useStyles();
    const [editedStudent, setEditedStudent] = useState(student);
    const [redirect, setRedirect] = useState(false);
    const [validationMessages, setValidationMessages] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gpa: '',
    });

    useEffect(() => {
      setEditedStudent({
          ...student,
          gpa: student.gpa || ''
      });
    }, [student])
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setEditedStudent({ ...editedStudent, [name]: value });
      setValidationMessages({
          ...validationMessages,
          [name]: '',
          firstName: name === 'firstname' ? '' : validationMessages.firstName,
          lastName: name === 'lastname' ? '' : validationMessages.lastName, 
          email: name === 'email' ? '' : validationMessages.email, 
          gpa: name === 'gpa' ? '' : validationMessages.gpa, 
      });
    }
  
    // Secondary Validation: Redundency for the HTML automatic validation
    const validateForm = () => {
      const messages = {
          firstName: editedStudent.firstname.trim() === '' ? 'First name cannot be empty' : '',
          lastName: editedStudent.lastname.trim() === '' ? 'Last name cannot be empty' : '',
          email: editedStudent.email.trim() === '' ? 'Email cannot be empty' : '',
          gpa: !isValidGPA(editedStudent.gpa) ? 'GPA must be either blank or between 0.0 and 4.0' : '',
      };
      setValidationMessages(messages);
      return Object.values(messages).every(message => message === '');
    }

    // gpa can either be empty or a value between 0.0 and 4.0
    const isValidGPA = (gpa) => {
        return gpa === "" || (parseFloat(gpa) >= 0.0 && parseFloat(gpa) <= 4.0);
    }

    const onSubmit = (event) => {
      event.preventDefault();
      // for the case where the gpa is an empty string => null instead
      const editedStudentN = {
          ...editedStudent,
          gpa: editedStudent.gpa === '' ? null : editedStudent.gpa
      };
      if (validateForm()) {
          handleSubmit(editedStudentN);
          setRedirect(true);
      }
    }
  
    if (redirect) {
      return <Redirect to={`/student/${editedStudent.id}`} />;
    }
  
    return (
      <div>
        <h1>Edit Student</h1>
        <div className={classes.root}>
          <div className={classes.formContainer}>
            <div className={classes.formTitle}>
              <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
                Edit Student Information
              </Typography>
            </div>
            <form style={{textAlign: 'center'}} onSubmit={onSubmit}>
            <label style= {{color:'#f1f7f6', fontWeight: 'bold'}}>First Name: </label>
            <input type="text" name="firstname" value={editedStudent.firstname} onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style={{color:'#f1f7f6', fontWeight: 'bold'}}>Last Name: </label>
            <input type="text" name="lastname" value={editedStudent.lastname} onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style={{color:'#f1f7f6', fontWeight: 'bold'}}>Email: </label>
            <input type="email" name="email" value={editedStudent.email} onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style={{color:'#f1f7f6', fontWeight: 'bold'}}>Image URL: </label>
            <input type="text" name="imageUrl" placeholder='(optional)' value={editedStudent.imageUrl} onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style={{color:'#f1f7f6', fontWeight: 'bold'}}>GPA: </label>
            <input type="number" name="gpa" placeholder='(optional)' value={editedStudent.gpa || ''} onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style={{color:'#f1f7f6', fontWeight: 'bold'}}>Campus Id: </label>
            <input type="number" name="campusId" placeholder='(optional)' value={editedStudent.campusId} onChange={(e) => handleChange(e)} />
            <br/>
            <br/>
  
              <Button variant="contained" style={{backgroundColor:'#08f793', color:'#01110a', fontWeight:'bold'}} type="submit">
                Save Changes
              </Button>
              <br/>
              <br/>
            </form>
            
          </div>
        {/* Error messages */}
        <div>{validationMessages.firstName}</div><br/>
        <div>{validationMessages.lastName}</div><br/>
        <div>{validationMessages.email}</div><br/>
        <div>{validationMessages.gpa}</div><br/>
        </div>
      </div>    
    )
}
  
  export default EditStudentView;
