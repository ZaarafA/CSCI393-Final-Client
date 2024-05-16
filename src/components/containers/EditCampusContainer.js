/*==================================================
EditCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { editCampusThunk, fetchCampusThunk } from '../../store/thunks';

class EditCampusContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      redirect: false
    };
  }

  componentDidMount(){
    this.props.fetchCampus(this.props.match.params.id);
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      campus: {
        ...this.state.campus,
        [name]: value,
      },
    });
  }

  handleSubmit = (editedCampus) => {
    this.props.editCampus(editedCampus);
    this.setState({ redirect: true });
  }

    // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
    this.setState({redirect: false});
  }

  // Render Edit Campus input form
  render() {
    const {campus} = this.props;
    
    // Redirect to edited campus page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.props.match.params.id}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditCampusView 
            campus={campus} 
            handleSubmit={this.handleSubmit} 
        />
      </div>          
    );
  }
}

const mapState = (state) => ({
    campus: state.campus // Assuming you have a campus reducer
});
// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
        editCampus: (campus) => dispatch(editCampusThunk(campus)),
    })
}

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditCampusContainer);