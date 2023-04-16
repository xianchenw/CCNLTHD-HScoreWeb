import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Header from './layouts/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Subjects from './components/Subjects';
import Footer from './layouts/Footer';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Subjects/>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
