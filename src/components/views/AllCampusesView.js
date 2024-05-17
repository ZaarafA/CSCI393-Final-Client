/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllCampusesView = (props) => {
  // If there is no campus, display a message.
  if (!props.allCampuses.length) {
    return <div><p>There are no campuses.</p><br/>
        <button className="add-button">Add New Campus</button>
    </div>;
  }

  // If there is at least one campus, render All Campuses view 
  return (
    <div>
      <h1>All Campuses</h1>
      <hr></hr>
      <div className="all-campuses">
        {props.allCampuses.map((campus) => (
          <div className="campus-item" key={campus.id}>
            <img src={campus.imageUrl || 'https://picsum.photos/id/193/200/200'} alt="campus"></img>
            <Link to={`/campus/${campus.id}`}>
              <h2>{campus.name}</h2>
            </Link>
            <h4>campus id: {campus.id}</h4>
            <p>{campus.address}</p>
            <p>{campus.description}</p>
            <hr/>
            <button className="delete-button" onClick={() => props.deleteCampus(campus.id)}>Delete</button>
          </div>
        ))}
      </div>

      <br/>
      <Link to={`/newcampus`}>
        <button className="add-button">Add New Campus</button>
      </Link>
      <br/><br/>
    </div>
  );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;