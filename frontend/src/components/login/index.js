import React, { useState } from "react";
import '../../App.css';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");

  const handleName = (e) => {
    setUserName(e.target.value);
  };
  
  const handlePass = (e) => {
    setUserPass(e.target.value);
  };

  const submiteBtn = () => {
    try {
      fetch("http://localhost:9000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: userPass,
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Login successfully') {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', data.user.role);
          alert('Login successful');
        } else {
          alert(data.message); // Show the error message
        }
      })
      .catch((error) => console.error("Error:", error));
      
    } catch (error) {
      console.log('----- error -------->>>>>>', error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Fill the viewport height
        backgroundColor: "#f0f2f5", // Light background color
      }}
    >
      <div
        style={{
          padding: 30,
          borderRadius: 8,
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
          width: 400, // Set a fixed width for the form
        }}
      >
        <h2 style={{ textAlign: "center", color: "#333" }}>Login</h2>
        
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 5 }}>{"Username (Email)"}</label>
          <input
            className="inputBox"
            type="text"
            placeholder="Enter your email"
            onChange={handleName}
            value={userName}
            style={{
              width: "100%", // Full width input
              padding: 10,
              border: "1px solid #ddd",
              borderRadius: 5,
              fontSize: 16,
              outline: "none",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007BFF")} // Change border color on focus
            onBlur={(e) => (e.target.style.borderColor = "#ddd")} // Revert border color on blur
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 5 }}>{"Password"}</label>
          <input
            className="inputBox"
            type="password"
            placeholder="Enter your password"
            onChange={handlePass}
            value={userPass}
            style={{
              width: "100%", // Full width input
              padding: 10,
              border: "1px solid #ddd",
              borderRadius: 5,
              fontSize: 16,
              outline: "none",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007BFF")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <button
            className="signUpButton"
            type="button"
            onClick={submiteBtn}
            style={{
              backgroundColor: "#007BFF",
              color: "#ffffff",
              padding: "10px 20px",
              border: "none",
              borderRadius: 5,
              fontSize: 16,
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")} // Darker on hover
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")} // Revert on leave
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
