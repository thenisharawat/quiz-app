// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { loadUser } from './redux/actions/authActions';
// import Login from './components/Auth/Login';
// import AdminDashboard from './components/Admin/Dashboard';
// import AddQuiz from './components/Admin/AddQuiz';
// import EditQuiz from './components/Admin/EditQuiz';
// import DeleteQuiz from './components/Admin/DeleteQuiz';
// import ViewQuizzes from './components/Admin/ViewQuizzes';
// import UserDashboard from './components/User/Dashboard';
// import AttemptQuiz from './components/User/AttemptQuiz';
// import ViewScores from './components/User/ViewScores';

// const App = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(loadUser());
//   }, [dispatch]);

//   return (
//     <Router>
//       <Switch>
//         <Route exact path="/login" component={Login} />
//         <Route exact path="/admin/dashboard" component={AdminDashboard} />
//         <Route exact path="/admin/add-quiz" component={AddQuiz} />
//         <Route exact path="/admin/edit-quiz/:id" component={EditQuiz} />
//         <Route exact path="/admin/delete-quiz/:id" component={DeleteQuiz} />
//         <Route exact path="/admin/view-quizzes" component={ViewQuizzes} />
//         <Route exact path="/user/dashboard" component={UserDashboard} />
//         <Route exact path="/user/attempt-quiz" component={AttemptQuiz} />
//         <Route exact path="/user/view-scores" component={ViewScores} />
//       </Switch>
//     </Router>
//   );
// };

// export default App;


// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { loadUser } from './redux/actions/authActions';
// import Login from './components/Auth/Login';
// import AdminDashboard from './components/Admin/Dashboard';
// import AddQuiz from './components/Admin/AddQuiz';
// import EditQuiz from './components/Admin/EditQuiz';
// import DeleteQuiz from './components/Admin/DeleteQuiz';
// import ViewQuizzes from './components/Admin/ViewQuizzes';
// import UserDashboard from './components/User/Dashboard';
// import AttemptQuiz from './components/User/AttemptQuiz';
// import ViewScores from './components/User/ViewScores';


// const App = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(loadUser());
//   }, [dispatch]);

//   return (
//     <Router>
//       <Routes>
//         <Route exact path="/login" component={Login} />
//         <Route exact path="/admin/dashboard" component={AdminDashboard} />
//         <Route exact path="/admin/add-quiz" component={AddQuiz} />
//         <Route exact path="/admin/edit-quiz/:id" component={EditQuiz} />
//         <Route exact path="/admin/delete-quiz/:id" component={DeleteQuiz} />
//         <Route exact path="/admin/view-quizzes" component={ViewQuizzes} />
//         <Route exact path="/user/dashboard" component={UserDashboard} />
//         <Route exact path="/user/attempt-quiz" component={AttemptQuiz} />
//         <Route exact path="/user/view-scores" component={ViewScores} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;



// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/Redux/store';

import Login from './components/Auth/Login';
import AdminDashboard from './components/Admin/Dashboard';
import UserDashboard from './components/User/Dashboard';
import AddQuiz from './components/Admin/AddQuiz';
import ViewQuizzes from './components/Admin/ViewQuizzes';
import AttemptQuiz from './components/User/AttemptQuiz';
import ViewScores from './components/User/ViewScores';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/add-quiz" element={<AddQuiz />} />
            <Route path="/admin/view-quizzes" element={<ViewQuizzes />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/attempt-quiz" element={<AttemptQuiz />} />
            <Route path="/user/view-scores" element={<ViewScores />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
