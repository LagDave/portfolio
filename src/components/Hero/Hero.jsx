import "./hero.styles.scss";

import Lottie from "lottie-react";
import roboLottie from "../../images/robo-lottie.json";
import clickLottie from "../../images/click-lottie-black.json";
import resumePreview from "../../images/resume-preview.jpg"
import Icon from "../Icon/Icon";
import {faArrowUpRightFromSquare} from '@fortawesome/free-solid-svg-icons'

import Button from "../Button/Button";
import GradientHeading from "../GradientHeading/GradientHeading";


const Hero = () => {

  return (
    <>
    <section id="hero">
      <div className="container">
    
        <div className="left">
          <Lottie data-aos-delay="1200" data-aos="zoom-in" className="robo-lottie" animationData={roboLottie}/>
          <p data-aos-delay="400" data-aos="fade-right" className="space-mono text-lightest-slate">Hi, my name is</p>
          <GradientHeading type='h1' data-aos-delay="600" data-aos="fade-right">Rustine Dave</GradientHeading>
          <h2 data-aos-delay="800" data-aos="fade-right" className="polysans-bulky text-darker-slate">Putting imaginations into <span className="glow">perspective</span></h2>

          <p data-aos-delay="1000" data-aos="fade-right" className="description text-slate mt-4">
            I am a <span className="text-lightest-slate">passionate software engineer</span> who loves to solve problems and build applications for the web.
            With <span className="text-lightest-slate">over 3 years of specialized experience</span> in modern web technologies I am keen to delivering efficient web solutions to rev up your business.
          </p>
          <a className="mt-4 d-block" target="_blank" href="/files/Resume.pdf">
            <Button data-aos-delay="1100" data-aos="fade-right" className="primary filled"><Icon icon={faArrowUpRightFromSquare}/> Check out my Resume</Button>
          </a>
        </div>

        <div className="right">
          
          <a className="mt-4 d-block" target="_blank" href="/files/Resume.pdf">
            <div className="resume-preview">
              <img className='resume-drop' src={resumePreview} alt="" />
              <img className='resume-front' src={resumePreview} alt="" />
              <Lottie speed={3.0} data-aos-delay="1200" data-aos="zoom-in" className="click-lottie" animationData={clickLottie}/>
            </div>
          </a>
        </div>

      </div>
    </section>
    </>
  )
}

export default Hero
