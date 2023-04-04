import "./navigation.styles.scss"

import Button from "../Button/Button"

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import logoLottie from "../../images/logo-lottie.json";

import Icon from "../Icon/Icon";
import { faAddressCard, faRankingStar, faMicrochip, faPhone, faFile} from '@fortawesome/free-solid-svg-icons'


const NavigationBar = () => {

  const [offset, setoffset]  = useState(0);

  useEffect(() => {
    
    const onScroll = () => setoffset(window.pageYOffset);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);

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

  function scrollBottom(){
    // pseudo scroll workaround for content reveal style contact section
    window.scrollTo(0, document.body.scrollHeight);
    window.history.pushState('#contact', 'Contact', '/#contact');
  }

  function liftNavigationLabelScrollBottom(event){
    liftNavigationLabel(event);
    scrollBottom();
  }

  return (
    <>
      <header id="desktop-header" className={`${offset > 0 && 'isScrolled'}`}>
        <div className="container">

          <div data-aos="fade-right" className="brand">
            <Lottie style={{ width: '80px' }} animationData={logoLottie}/>
          </div>

          <div className="navigation-menu">
            <ul>
              <li data-aos-delay="400" data-aos="fade-down"><a href="#about"><span className="icon"><Icon icon={faAddressCard}/></span> About</a></li>
              <li data-aos-delay="500" data-aos="fade-down"><a href="#experience"><span className="icon"><Icon icon={faRankingStar}/></span> Experience</a></li>
              <li data-aos-delay="600" data-aos="fade-down"><a href="#tech"><span className="icon"><Icon icon={faMicrochip}/></span> Technologies</a></li>
              <li data-aos-delay="700" data-aos="fade-down"><a onClick={scrollBottom}><span className="icon"><Icon icon={faPhone}/></span> Contact</a></li>
              <li data-aos-delay="1100" data-aos="fade-left"><a target="_blank" href="/files/Resume.pdf"><Button className="primary primary-small"><Icon icon={faFile}/> Resume</Button></a></li>
            </ul>
          </div>

        </div>

      </header>

      <header id="mobile-header">
        <div className="navigation-menu-mobile">

        <a target="_blank" href="/files/Resume.pdf"><Button className="primary filled primary-small">Checkout my Resume</Button></a>

        <ul>
          <li><a onClick={liftNavigationLabel} href="#about"><span className="icon"><Icon icon={faAddressCard}/></span> <span className="label">About</span></a></li>
          <li><a onClick={liftNavigationLabel} href="#experience"><span className="icon"><Icon icon={faRankingStar}/></span> <span className="label">ExP</span></a></li>
          <li><a onClick={liftNavigationLabel} href="#tech"><span className="icon"><Icon icon={faMicrochip}/></span> <span className="label">Tech</span></a></li>
          <li><a onClick={liftNavigationLabelScrollBottom}><span className="icon"><Icon icon={faPhone}/></span> <span className="label">Contact</span></a></li>
        </ul>
        </div>
      </header>
    </>
  )
}

export default NavigationBar
