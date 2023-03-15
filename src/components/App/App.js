import React, { useState, useEffect } from "react";
import Main from "../main/main.js";
import Login from "../login/login.js";
import Signup from "../signup/signup.js";
import Browse from "../browse/browse.js";
import Footer from "../footer/footer.js";
import Nominated from "../Nominated/nominated.js";
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
import Leaders from "../Leaderboard/Leaders.js";
import "./App.css";

function App() {
  const [loggedin, setloggedin] = useState(false);

  useEffect(() => {
    fetch("https://agmoviesbackend.onrender.com/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => setloggedin(data.isLoggenIn))
  }, [])

  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" >
            <Route path="" element={<Main />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} >

            </Route>
          </Route>
          <Route exact path="/browse" element={<Browse />} />
          <Route path="/nominated" element={<Nominated />} />
          <Route path="/leaderBoard" element={<Leaders />} />





        </Routes>

      </Router>
      <Footer />

    </div>
  );
}

export default App;
