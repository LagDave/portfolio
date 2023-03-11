import "./styles/base.scss";

import { useEffect } from "react";

import Navigation from "./components/NavigationBar/NavigationBar"
import Hero from "./components/Hero/Hero"
import About from "./components/About/About"
import AOS from 'aos';

const App = () => {

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'mobile'
    });
  }, [])

  return(
    <div className="wrapper">
      <Navigation/>
      <Hero/>
      <About/>
    </div>
  )
}

export default App