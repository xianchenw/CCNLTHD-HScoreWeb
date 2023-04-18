import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Header from './layouts/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './layouts/Footer';
import SubjectArea from './components/Subject';

function App() {
  return (
    <>
      <BrowserRouter >
        <Header/>
        <SubjectArea/>
      </BrowserRouter>
    </>
  );
}

export default App;
