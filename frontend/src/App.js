
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/footer';
import Nav from './components/nav';
import SignUp from './components/signup';
import QrCodePage from './components/qr-code';
import Login from './components/login';
import DashBord from './screens/dashbord';
import AddQuiz from './screens/addQuiz';
import Logout from './components/logout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<h1>Product component</h1>}/>
          <Route path="/add" element={<h1>add component</h1>}/>
          <Route path="/dashbord" element={<DashBord/>}/>
          <Route path="/logout" element={<Logout />}/>
          <Route path="/profile" element={<h1>profile component</h1>}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/qrcode" element={<QrCodePage />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/addquiz" element={<AddQuiz />}/>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
