import "./styles/base.scss";

import { useEffect } from "react";

import Navigation from "./components/NavigationBar/NavigationBar"
import Hero from "./components/Hero/Hero"
import About from "./components/About/About"
import Experience from "./components/Experience/Experience";
import Tech from "./components/Tech/Tech";
import Contact from "./components/Contact/Contact";

import AOS from 'aos';



const App = () => {

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'mobile'
    });
  }, [])

  return(
    <>
    <div className="global-wrapper">
      <Navigation/>
      <Hero/>
      <About/>
      <Experience/>
      <Tech/>
    </div>
    <Contact/>
    </>
  )
}

export default App