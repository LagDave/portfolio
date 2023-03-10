import "./hero.styles.scss";

import Lottie from "lottie-react";
import Button from "../Button/Button";

import roboLottie from "../../images/robo-lottie.json";

const Hero = () => {

  return (
    <>
    <section id="hero">
      <div className="container">
        
        <div className="left">
          <p data-aos-delay="400" data-aos="fade-right" className="space-mono text-green">Hi, my name is</p>
          <h1 data-aos-delay="600" data-aos="fade-right" className="polysans-bulky text-lightest-slate">Rustine Dave.</h1>
          <h2 data-aos-delay="800" data-aos="fade-right" className="polysans-bulky text-darker-slate">Putting imaginations into <span className="glow">perspective</span></h2>

          <p data-aos-delay="1000" data-aos="fade-right" className="description text-slate mt-4">
            I am a <span className="text-lightest-slate">passionate software engineer</span> who loves to solve problems and build applications for the web.
            With <span className="text-lightest-slate">over 3 years of specialized experience</span> in modern web technologies I am keen to delivering efficient web solutions to rev up your business.
          </p>
          <Button data-aos-delay="1100" data-aos="fade-right" className="primary filled mt-3" text="Checkout my Resume!"/>
        </div>

        <div className="right">
          <Lottie data-aos-delay="1200" data-aos="zoom-in" className="robo-lottie" animationData={roboLottie}/>
        </div>

      </div>
    </section>
    </>
  )
}

export default Hero
