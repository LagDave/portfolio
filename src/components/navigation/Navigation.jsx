import "./navigation.styles.scss"

import Button from "../Button/Button"

import { useEffect } from "react";
import AOS from 'aos';
import Lottie from "lottie-react";
import logoLottie from "../../images/logo-lottie.json";

import aboutGreen from "../../images/about-green.png";
import expGreen from "../../images/exp-green.png";
import techGreen from "../../images/tech-green.png";
import contactGreen from "../../images/contact-green.png";

import aboutBlue from "../../images/about-blue.png";
import expBlue from "../../images/exp-blue.png";
import techBlue from "../../images/tech-blue.png";
import contactBlue from "../../images/contact-blue.png";


const Navigation = () => {

  useEffect(() => {
    AOS.init();
  }, [])

  function liftNavigationLabel(e){
    const icon = e.target.closest('a').childNodes[0];
    const label = e.target.closest('a').childNodes[2];
    label.classList.add('lift');
    icon.classList.add('lift');

    setTimeout(() => {
      label.classList.remove('lift');
      icon.classList.remove('lift');
    }, 500)
  }

  return (
    <>
    <header>
      <div className="container">

        <div data-aos="fade-right" className="brand">
          <Lottie style={{ width: '80px' }} animationData={logoLottie}/>
          </div>

        <div className="navigation-menu">
          <ul>
            <li data-aos-delay="400" data-aos="fade-down"><a href="#"><span className="icon"><img src={aboutGreen} alt="" /></span> About</a></li>
            <li data-aos-delay="500" data-aos="fade-down"><a href="#"><span className="icon"><img src={expGreen} alt="" /></span> Experience</a></li>
            <li data-aos-delay="600" data-aos="fade-down"><a href="#"><span className="icon"><img src={techGreen} alt="" /></span> Technologies</a></li>
            <li data-aos-delay="700" data-aos="fade-down"><a href="#"><span className="icon"><img src={contactGreen} alt="" /></span> Contact</a></li>
            <li data-aos-delay="1100" data-aos="fade-left"><a><Button className="primary primary-small" text="Resume"/></a></li>
          </ul>
        </div>

        <div className="navigation-menu-mobile">

          <a><Button text="Download Resume" className="primary filled primary-small" /></a>

          <ul>
            <li><a onClick={liftNavigationLabel} href="#"><span className="icon"><img src={aboutGreen} alt="" /></span> <span className="label">About</span></a></li>
            <li><a onClick={liftNavigationLabel} href="#"><span className="icon"><img src={expGreen} alt="" /></span> <span className="label">ExP</span></a></li>
            <li><a onClick={liftNavigationLabel} href="#"><span className="icon"><img src={techGreen} alt="" /></span> <span className="label">Tech</span></a></li>
            <li><a onClick={liftNavigationLabel} href="#"><span className="icon"><img src={contactGreen} alt="" /></span> <span className="label">Contact</span></a></li>
          </ul>
        </div>

      </div>

    </header>
    </>
  )
}

export default Navigation
