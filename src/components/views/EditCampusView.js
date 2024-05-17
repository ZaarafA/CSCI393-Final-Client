/*==================================================
EditCampusView.js

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

const EditCampusView = (props) => {
    const { campus, handleSubmit } = props;
    const classes = useStyles();
    const [editedCampus, setEditedCampus] = useState(campus);
    const [redirect, setRedirect] = useState(false);
    const [validationMessages, setValidationMessages] = useState({
      name: '',
      address: '',
    });
  
    useEffect(() => {
      setEditedCampus({
          ...campus,
      });
    }, [campus])

    const handleChange = (event) => {
      const { name, value } = event.target;
      setEditedCampus({ ...editedCampus, [name]: value });
      setValidationMessages({
        ...validationMessages,
        [name]: '',
        name: name === 'name' ? '' : validationMessages.name,
        address: name === 'address' ? '' : validationMessages.address, 
      });
    }

    const validateForm = () => {
      const messages = {
          name: editedCampus.name.trim() === '' ? 'First name cannot be empty' : '',
          address: editedCampus.address.trim() === '' ? 'Last name cannot be empty' : '',
      };
      setValidationMessages(messages);
      return Object.values(messages).every(message => message === '');
    }
  
    const onSubmit = (event) => {
      event.preventDefault();
      if (validateForm()) {
        handleSubmit(editedCampus);
        setRedirect(true);
      }
    }
  
    if (redirect) {
      return <Redirect to={`/campus/${editedCampus.id}`} />;
    }
  
    return (
      <div>
        <h1>Edit Campus</h1>
        <div className={classes.root}>
          <div className={classes.formContainer}>
            <div className={classes.formTitle}>
              <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
                Edit Campus Information
              </Typography>
            </div>
            <form style={{textAlign: 'center'}} onSubmit={onSubmit}>
              <label style={{color:'#f1f7f6', fontWeight: 'bold'}}>Name: </label>
              <input type="text" name="name" value={editedCampus.name} onChange={handleChange} />
              <br/>
              <br/>
  
              <label style={{color:'#f1f7f6', fontWeight: 'bold'}}>Address: </label>
              <input type="text" name="address" value={editedCampus.address} onChange={handleChange} />
              <br/>
              <br/>
  
              <label style={{color:'#f1f7f6', fontWeight: 'bold'}}>Description: </label>
              <input type="text" name="description" value={editedCampus.description} onChange={handleChange} />
              <br/>
              <br/>
  
              <label style={{color:'#f1f7f6', fontWeight: 'bold'}}>Image URL: </label>
              <input type="text" name="imageUrl" value={editedCampus.imageUrl} onChange={handleChange} />
              <br/>
              <br/>
  
              <Button variant="contained" style={{backgroundColor:'#08f793', color:'#01110a', fontWeight:'bold'}} type="submit">
                Save Changes
              </Button>
              <br/>
              <br/>
            </form>
          </div>
          <div>{validationMessages.name}</div><br/>
          <div>{validationMessages.address}</div><br/>
        </div>
      </div>    
    )
}
  
  export default EditCampusView;
