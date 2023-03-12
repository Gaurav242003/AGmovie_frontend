import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [userName, setuserName] = useState();
  const [userPass, setuserPass] = useState();
  const [greet, setGreet] = useState();

  const nameUpdate = (event) => {
    setuserName(event.target.value)
  }

  const passUpdate = (event) => {
    setuserPass(event.target.value)
  }

  const greetUpdate = (event) => {
    setGreet(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const postURL = "http://localhost:8000/signup"
    fetch(postURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userName,
        password: userPass,

      })

    })
    .then(res => res.json())
      .then(data => {
        if(data.backres!="Success")
        alert("Email has already been taken")
        else
        navigate("/login")


      });
   

  }

  return (
    <div>
      <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card bg-transparent text-white form" style={{ borderRadius: "50px" }}>
                <div class="card-body p-5 text-center d-grid gap-2">


                  <h2 class="fw-bold mb-2 agmovie">AGmovies</h2>
                  <p class="text-white-50 mb-5">Welcome {greet}!</p>
                  <form onSubmit={handleSubmit} className="d-grid gap-2 form"  >
                    <div class="form-outline form-white mb-2" >
                      <input type="text" id="typetext" class="form-control form-control-lg" placeholder="Username" name="username" onChange={greetUpdate} required />

                    </div>

                    <div class="form-outline form-white mb-2">
                      <input type="email" id="typeEmailX" class="form-control form-control-lg" placeholder="Email" name="email" onChange={nameUpdate} required />

                    </div>

                    <div class="form-outline form-white mb-4">
                      <input type="password" id="typePasswordX" class="form-control form-control-lg" placeholder="Password" name="password" onChange={passUpdate} required />

                    </div>
                    <button class="btn btn-lg btn-danger newbtn" type="submit">Sign up</button>
                  </form>

                  <div>
                    <p class="mb-0">Already have a account? <a href="/login" class="text-white-50 fw-bold">Log in</a>
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>


  )
}

export default Signup;
