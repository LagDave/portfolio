import "./about.styles.scss";

import profilePicture from "../../images/profile-picture.png"

const About = () => {

  return (
    <section id="about">
      
      <div className="container">

        <div className="left">
          <img data-aos="fade-right" src={profilePicture} alt="" />
        </div>

        <div className="right">
          <h2 data-aos="fade-right" className="polysans-bulky-wide text-white">About me <span className="sub text-green barlow-condensed-light"> — I just love programming!</span></h2>
          <p data-aos="fade-right" className="mt-4">Hello! My name is Rustine Dave. I am a full-stack developer who loves to solve problems - <span className="text-lightest-slate">I eat them for breakfast!</span></p>
          <p data-aos-delay="100" data-aos="fade-right">My flaming love for programming sparked at a very young age. I was on 6<sup>th</sup> grade when I realized how much I enjoyed creating complex logic, staying up late in front of a screen to do nothing but show a <a href="#">"guitarist animation"</a> in my status bar.</p>
          <p data-aos-delay="200" data-aos="fade-right">Fast-forward to today, I've had the privilege to deliver solutions on various companies in different industries harnessing my web skills I garnered throughout the years. I have substantial experience working at  <span className="text-lightest-slate">a digital marketing agency</span>,  <span className="text-lightest-slate">a startup</span>, and  <span className="text-lightest-slate">an outsourcing web development company</span>.</p>
          <p data-aos-delay="300" data-aos="fade-right">Checkout my <a href="#">resume</a> to see the technologies I've worked with.</p>
        </div>

      </div>

    </section>
  )

}

export default About;