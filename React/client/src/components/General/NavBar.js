const NavBar = () => {
    return (
      <nav className="navbar">
        <h1>The Stroke Prediction Site</h1>
        <div className="links">
          <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/predictstroke" style={{ 
            color: 'white', 
            backgroundColor: '#f1356d',
            borderRadius: '8px' 
          }}>Predict</a>
        </div>
      </nav>
    );
  }
   
  export default NavBar;