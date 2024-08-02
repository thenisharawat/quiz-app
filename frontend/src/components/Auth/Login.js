// src/components/Auth/Login.js
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { login } from '../../redux/actions/authActions';

// const Login = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//     });

//     const dispatch = useDispatch();

//     const { email, password } = formData;

//     const onChange = e =>
//         setFormData({ ...formData, [e.target.name]: e.target.value });

//     const onSubmit = e => {
//         e.preventDefault();
//         dispatch(login(formData));
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={onSubmit}>
//                 <input
//                     type="email"
//                     placeholder="Email Address"
//                     name="email"
//                     value={email}
//                     onChange={onChange}
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     name="password"
//                     value={password}
//                     onChange={onChange}
//                     required
//                 />
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;


// src/components/Auth/Login.js
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { login } from '../Redux/actions/authActions';

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const dispatch = useDispatch();

//     const onSubmit = (e) => {
//         e.preventDefault();
//         dispatch(login(username, password));
//     };

//     return (
//         <form onSubmit={onSubmit}>
//             <div>
//                 <label>Username</label>
//                 <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//             </div>
//             <div>
//                 <label>Password</label>
//                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//             </div>
//             <button type="submit">Login</button>
//         </form>
//     );
// };

// export default Login;

















// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [token, setToken] = useState('');

//     const handleLogin = () => {
//         axios.post('http://localhost:5000/api/user/login', { username, password })
//             .then(response => {
//                 setToken(response.data.token);
//                 alert('Login successful!');
//             })
//             .catch(error => {
//                 console.error('Error logging in:', error);
//                 alert('Login failed.');
//             });
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
//             <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//             <button onClick={handleLogin}>Login</button>
//             {token && <p>Token: {token}</p>}
//         </div>
//     );
// };

// export default Login;








import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/user/login', { username, password })
            .then(response => {
                setToken(response.data.token);
                setError('');
                alert('Login successful!');
            })
            .catch(error => {
                setError('Login failed. Please check your credentials.');
                console.error('Error logging in:', error);
            });
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                {token && <p className="success-message">Token: {token}</p>}
            </div>
        </div>
    );
};

export default Login;

