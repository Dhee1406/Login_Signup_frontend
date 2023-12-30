
import React, { useState } from "react"
import "./AuthPopup.css"
import logo from "./logo192.png"
import { AiOutlineClose } from "react-icons/ai"
import dayjs from "dayjs"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { DesktopDatePicker } from "@mui/x-date-pickers"
import { toast } from "react-toastify"

const AuthPopup = ({ setshowpopup }) => {
  const [showSignup, setShowSignup] = React.useState(false)

  const [signupformData, setSignupFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    dob: new Date()
  })

  const [loginformData, setLoginFormData] = useState({
    email: "",
    password: ""
  })

  const handleLogin = () => {
    console.log(loginformData)

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginformData),
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)

        if (data.ok) {
          toast.success(data.message)
          setshowpopup(false)
        } else {
          toast.error(data.message)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  const handleSignup = () => {
    console.log(signupformData)

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(signupformData),
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)

        if (data.ok) {
          toast.success(data.message)
          setShowSignup(false)
        } else {
          toast.error(data.message)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <div className="popup">
      <button
        className="close"
        onClick={() => {
          setshowpopup(false)
        }}
      >
        <AiOutlineClose />
      </button>
      {showSignup ? (
        <div className="authform">
          <div className="left">
            <img src={logo} alt="Logo" />
          </div>
          <div className="right">
            <h1>Signup to become.</h1>
            <form action="">
              <input
                color="warning"
                placeholder="name"
                size="lg"
                variant="solid"
                onChange={e => {
                  setSignupFormData({
                    ...signupformData,
                    name: e.target.value
                  })
                }}
              />

              <input
                color="warning"
                placeholder="email"
                size="lg"
                variant="solid"
                onChange={e => {
                  setSignupFormData({
                    ...signupformData,
                    email: e.target.value
                  })
                }}
              />

              <input
                color="warning"
                placeholder="password"
                size="lg"
                variant="solid"
                onChange={e => {
                  setSignupFormData({
                    ...signupformData,
                    password: e.target.value
                  })
                }}
              />

              <select
                color="warning"
                placeholder="Gender"
                size="lg"
                variant="solid"
                onChange={(event, newValue) => {
                  setSignupFormData({
                    ...signupformData,
                    gender: newValue?.toString() || ""
                  })
                }}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <label htmlFor="">Date of Birth</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  defaultValue={dayjs(new Date())}
                  sx={{
                    backgroundColor: "white"
                  }}
                  onChange={newValue => {
                    setSignupFormData({
                      ...signupformData,
                      dob: new Date(newValue)
                    })
                  }}
                />
              </LocalizationProvider>

              <button
                onClick={e => {
                  e.preventDefault()
                  handleSignup()
                }}
              >
                Signup
              </button>
            </form>
            <p>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setShowSignup(false)
                }}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      ) : (
        <div className="authform">
          <div className="left">
            <img src={logo} alt="Logo" />
          </div>
          <div className="right">
            <h1>Login to see.</h1>
            <form action="">
              <input
                color="warning"
                placeholder="email"
                size="lg"
                variant="solid"
                onChange={e => {
                  setLoginFormData({
                    ...loginformData,
                    email: e.target.value
                  })
                }}
              />

              <input
                color="warning"
                placeholder="password"
                size="lg"
                variant="solid"
                onChange={e => {
                  setLoginFormData({
                    ...loginformData,
                    password: e.target.value
                  })
                }}
              />

              <button
                onClick={e => {
                  e.preventDefault()
                  handleLogin()
                }}
              >
                Login
              </button>
            </form>
            <p>
              Don't have an account?{" "}
              <button
                onClick={() => {
                  setShowSignup(true)
                }}
              >
                Signup
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AuthPopup
