/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
const HomePageView = () => {
  // Render Home page view
  return (
    <div>
      <h1>Home Page</h1>
      <hr></hr>
      <div  className="home-page">
        <a href="/campuses" className="home-campuses">
          <img src="https://picsum.photos/id/49/600/400" className="home-image" alt="Campus Link"></img>
          <div className="home-image-title"><h3>All Campuses</h3></div>
        </a> 
        <a href="/students" className="home-students">
          <img src="https://picsum.photos/id/180/600/400" className="home-image" alt="Student Link"></img>
          <div className="home-image-title"><h3>All Students</h3></div>
        </a>
      </div>
    </div>
  );    
}

export default HomePageView;