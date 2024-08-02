import React, { useCallback, useReducer } from "react";
import '../../App.css'; // Assuming you have a CSS file for global styles

const initialData = {
  name: "",
  email: "",
  password: "",
  role: "",
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.name };
    case "email":
      return { ...state, email: action.name };
    case "password":
      return { ...state, password: action.name };
    case "role":
      return { ...state, role: action.name };
    default:
      return state;
  }
};

const SignUp = () => {
  const [data, dispatch] = useReducer(dataReducer, initialData);

  const handleTextField = useCallback(
    (e, from) => {
      dispatch({ name: e.target.value, type: from });
    },
    []
  );

  const handleSignUpData = async () => {
    console.log('------ all data ---------', data);
    try {
      fetch("http://localhost:9000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.name,
          password: data.password,
          role: data.role,
          email: data.email,
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'User created successfully') {
          alert('Sign up successfully');
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
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        backgroundColor: "#f0f2f5", // Light background color
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
          width: 400, // Set a fixed width for the form
          backgroundColor: "#ffffff",
          padding: 30,
          borderRadius: 8,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
        }}
      >
        <h2 style={{ textAlign: "center", color: "#333" }}>Sign Up</h2>
        
        <div>
          <label style={{ display: "block", marginBottom: 5 }}>User Name</label>
          <input
            className="inputBox"
            type="text"
            placeholder="Enter Name"
            onChange={(e) => handleTextField(e, "name")}
            value={data.name}
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

        <div>
          <label style={{ display: "block", marginBottom: 5 }}>Email</label>
          <input
            className="inputBox"
            type="text"
            placeholder="Enter Email"
            onChange={(e) => handleTextField(e, "email")}
            value={data.email}
            style={{
              width: "100%",
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

        <div>
          <label style={{ display: "block", marginBottom: 5 }}>Password</label>
          <input
            className="inputBox"
            type="password"
            placeholder="Enter Password"
            onChange={(e) => handleTextField(e, "password")}
            value={data.password}
            style={{
              width: "100%",
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

        <div>
          <label style={{ display: "block", marginBottom: 5 }}>Role</label>
          <input
            className="inputBox"
            type="text"
            placeholder="Enter Role"
            onChange={(e) => handleTextField(e, "role")}
            value={data.role}
            style={{
              width: "100%",
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
            onClick={handleSignUpData}
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
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
