import 'bootstrap/dist/css/bootstrap.min.css';
import { useReducer } from 'react';
import cookie from 'react-cookies';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import ForumArea from './components/ForumArea';
import Login from './components/Login';
import ScoreArea from './components/ScoreArea';
import SubjectArea from './components/SubjectArea';
import { UserContext } from './configs/MyContext';
import Layout from './layouts/Layout';
import userReducer from './reducers/UserReducer';
import Register from './components/Register';
import ScoreManagementArea from './components/ScoreManagementArea';

function App() {
  const [user, dispatch] = useReducer(userReducer, cookie.load('current-user') || null);

  if (user !== null) {
    if (user.role === "STUDENT") {
      return (
        <>
          <UserContext.Provider value={[user, dispatch]}>
            <BrowserRouter>
              <Routes>
                <Route element={<Layout />} >
                  <Route index element={<SubjectArea />} />
                  <Route path="/subjects" element={<SubjectArea />} />
                  <Route path="/scores" element={<ScoreArea />} />
                  <Route path="/forums" element={<ForumArea />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
              </Routes>

            </BrowserRouter>
          </UserContext.Provider>
        </>
      )
    }
    else if (user.role === "INSTRUCTOR") {
      return (
        <UserContext.Provider value={[user, dispatch]}>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />} >
                <Route index element={<SubjectArea />} />
                <Route path="/subjects" element={<SubjectArea />} />
                <Route path="/scores" element={<ScoreManagementArea />} />
                <Route path="/forums" element={<ForumArea />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />
            </Routes>

          </BrowserRouter>
        </UserContext.Provider>
      )
    }
    else {
      return (
        <UserContext.Provider value={[user, dispatch]}>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />} >
                <Route index element={<SubjectArea />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />
            </Routes>

          </BrowserRouter>
        </UserContext.Provider>
      )

    }
  }

  else {
    return (
      <>
        <UserContext.Provider value={[user, dispatch]}>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />} >
                <Route index element={<SubjectArea />} />
                <Route path="/subjects" element={<SubjectArea />} />
                <Route path="/scores" element={<ScoreArea />} />
                <Route path="/forums" element={<ForumArea />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />
            </Routes>

          </BrowserRouter>
        </UserContext.Provider>
      </>
    );
  }
}

export default App;
