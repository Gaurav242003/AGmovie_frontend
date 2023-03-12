import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [userName, setuserName] = useState();
  const [userPass, setuserPass] = useState();


  const navigate = useNavigate();


  const nameUpdate = (event) => {
    setuserName(event.target.value)
  }

  const passUpdate = (event) => {
    setuserPass(event.target.value)
  }





  const handleSubmit = (event) => {
    event.preventDefault();
    const postURL = "http://localhost:8000/login"
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
        alert("Invalid username or password")
        else
        localStorage.setItem("token", data.token)


      })
      .then(() => {
        fetch("http://localhost:8000/isUserAuth", {
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        })
          .then(res => res.json())
          .then(data => data.isLoggenIn ? navigate(`/browse`, { state: { userid: data.userName } }) : null)
      })
  }






  return (
    <div>

      <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card bg-transparent text-white form d-grid gap-2 " style={{ borderRadius: "50px" }}>
                <div class="card-body p-5 text-center d-grid gap-2">


                  <h2 class="fw-bold mb-2 agmovie">AGmovies</h2>
                  <p class="text-white-50 mb-5">Please enter your email and password!</p>
                  <form onSubmit={handleSubmit} className="d-grid gap-2 form">
                    <div class="form-outline form-white mb-2">
                      <input type="email" id="typeEmailX" class="form-control form-control-lg" placeholder="Email" name="email" onChange={nameUpdate} />

                    </div>

                    <div class="form-outline form-white mb-4">
                      <input type="password" id="typePasswordX" class="form-control form-control-lg" placeholder="Password" name="password" onChange={passUpdate} />

                    </div>
                    <button class="btn btn-lg btn-danger newbtn" type="submit"  >Login</button>
                  </form>

                  <div>
                    <p class="mb-0">Don't have an account? <a href="/signup" class="text-white-50 fw-bold">Sign Up</a>
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

export default Login;