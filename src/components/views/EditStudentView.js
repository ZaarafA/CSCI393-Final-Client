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
    backgroundColor: '#f0f0f5',
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
    backgroundColor:'#c5c8d6',
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
        setEditedStudent(student);
    }, [student]);
  
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
  
    const validateForm = () => {
        const messages = {
            firstName: editedStudent.firstname.trim() === '' ? 'First name cannot be empty' : '',
            lastName: editedStudent.lastname.trim() === '' ? 'Last name cannot be empty' : '',
            email: editedStudent.email.trim() === '' ? 'Email cannot be empty' : '',
            gpa: !isValidGPA(editedStudent.gpa) ? 'Invalid GPA. Please enter a value between 0.0 and 4.0' : '',
        };
        setValidationMessages(messages);
        return Object.values(messages).every(message => message === '');
    }

    const isValidGPA = (gpa) => {
        return gpa === "" || (parseFloat(gpa) >= 0.0 && parseFloat(gpa) <= 4.0);
    }  

    const onSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            handleSubmit(editedStudent);
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
            <label style= {{color:'#11153e', fontWeight: 'bold'}}>First Name: </label>
            <input type="text" name="firstname" value={editedStudent.firstname} onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Last Name: </label>
            <input type="text" name="lastname" value={editedStudent.lastname} onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Email: </label>
            <input type="text" name="email" value={editedStudent.email} onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Image URL: </label>
            <input type="text" name="imageUrl" value={editedStudent.imageUrl} onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>GPA: </label>
            <input type="text" name="gpa" value={editedStudent.gpa} onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Campus Id: </label>
            <input type="text" name="campusId" value={editedStudent.campusId} onChange={(e) => handleChange(e)} />
            <br/>
            <br/>
  
              <Button variant="contained" color="primary" type="submit">
                Save Changes
              </Button>
              <br/>
              <br/>
            </form>
            
          </div>
        <span>{validationMessages.firstName}</span><br/>
        <span>{validationMessages.lastName}</span><br/>
        <span>{validationMessages.email}</span><br/>
        <span>{validationMessages.gpa}</span><br/>
        </div>
      </div>    
    )
}
  
  export default EditStudentView;
