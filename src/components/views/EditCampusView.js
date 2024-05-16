/*==================================================
EditCampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */

import React, { useState } from 'react';
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

const EditCampusView = (props) => {
    const { campus, handleSubmit } = props;
    const classes = useStyles();
    const [editedCampus, setEditedCampus] = useState(campus);
    const [redirect, setRedirect] = useState(false);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setEditedCampus({ ...editedCampus, [name]: value });
    }
  
    const onSubmit = (event) => {
      event.preventDefault();
      handleSubmit(editedCampus);
      setRedirect(true);
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
              <label style={{color:'#11153e', fontWeight: 'bold'}}>Name: </label>
              <input type="text" name="name" value={editedCampus.name} onChange={handleChange} />
              <br/>
              <br/>
  
              <label style={{color:'#11153e', fontWeight: 'bold'}}>Address: </label>
              <input type="text" name="address" value={editedCampus.address} onChange={handleChange} />
              <br/>
              <br/>
  
              <label style={{color:'#11153e', fontWeight: 'bold'}}>Description: </label>
              <input type="text" name="description" value={editedCampus.description} onChange={handleChange} />
              <br/>
              <br/>
  
              <label style={{color:'#11153e', fontWeight: 'bold'}}>Image URL: </label>
              <input type="text" name="imageUrl" value={editedCampus.imageUrl} onChange={handleChange} />
              <br/>
              <br/>
  
              <Button variant="contained" color="primary" type="submit">
                Save Changes
              </Button>
              <br/>
              <br/>
            </form>
          </div>
        </div>
      </div>    
    )
}
  
  export default EditCampusView;
