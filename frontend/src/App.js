import GIF from './assets/images/onload.gif';
import './assets/css/docs.css';
import './assets/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import store from './store/store';

import Home from './components/home';
import SignupForm from './components/signup';
import AccountActivated from './components/accountActivated';
import LoginForm from './components/login';
import ArticleDetails from './components/articleDetails';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import NotFound from './components/404';


const OnLoading = () => {
  const onloadStyle = {
    backgroundImage: `url(${GIF})`,
    backgroundSize: '100%',
    backgroundPosition: "50%",
    backgroundRepeat: 'no-repeat',
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
  }

  return (
    <div className='container' style={onloadStyle}></div>
  )
}


function App() {
  const [loading, setOnloading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let res = await store.getArticles();
      setOnloading(!res);
    }
    fetchData();
  }, []);
  
  const AppRoute = () => {
    return (
      <Router>
        <Navbar />
        <Sidebar />

        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/activated" element={<AccountActivated />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/articles/:slug" element={<ArticleDetails />} />
          <Route path="*" element={<NotFound />} />

        </Routes>

      </Router>
    );
  }

  if (loading) {
    return <OnLoading />
  } else {
    return <AppRoute />
  }
}


export default App;
