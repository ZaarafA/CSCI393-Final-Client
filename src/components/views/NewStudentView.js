/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Create styling for the input form
const useStyles = makeStyles( () => ({
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

const NewStudentView = (props) => {
  const {handleChange, handleSubmit, errors } = props;
  const classes = useStyles();

  // Render a New Student view with an input form
  return (
    <div>
      <h1>New Student</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
              Add a Student
            </Typography>
          </div>
          <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
          <label style= {{color:'#f1f7f6', fontWeight: 'bold'}}>First Name: </label>
            <input type="text" name="firstname" onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style={{color:'#f1f7f6', fontWeight: 'bold'}}>Last Name: </label>
            <input type="text" name="lastname" onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style={{color:'#f1f7f6', fontWeight: 'bold'}}>Email: </label>
            <input type="email" name="email" onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style={{color:'#f1f7f6', fontWeight: 'bold'}}>Image URL: </label>
            <input type="text" name="imageUrl" placeholder='(optional)' onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style={{color:'#f1f7f6', fontWeight: 'bold'}}>GPA: </label>
            <input type="number" name="gpa" placeholder='(optional)' onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style={{color:'#f1f7f6', fontWeight: 'bold'}}>Campus Id: </label>
            <input type="number" name="campusId" placeholder='(optional)' onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <Button variant="contained" style={{backgroundColor:'#08f793', color:'#01110a', fontWeight:'bold'}} type="submit">
              Submit
            </Button>
            <br/>
            <br/>
          </form>
          </div>
          {errors.firstname && <p>{errors.firstname}</p>}
          {errors.lastname && <p>{errors.lastname}</p>}
          {errors.email && <p>{errors.email}</p>}
          {errors.gpa && <p>{errors.gpa}</p>}
      </div>
    </div>    
  )
}

export default NewStudentView;