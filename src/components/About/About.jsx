import "./about.styles.scss";

import profilePicture from "../../images/profile-picture.png"

const About = () => {

  return (
    <section id="about">
      
      <div className="container">

        <div className="left">
          <img data-aos="fade-right" src={profilePicture} alt="" />
        </div>

        <div data-aos="fade-left" className="right">
          <h2 className="polysans-bulky-wide text-white text-shadow-1">About me <span className="sub text-white barlow-condensed-light"> — I just love programming!</span></h2>
          <p className="mt-4">Hello! My name is Rustine Dave. I am a full-stack developer who loves to solve problems - <span className="text-green text-shadow-none">I eat them for breakfast!</span></p>
          <p>My flaming love for programming sparked at a very young age. I was on 6<sup>th</sup> grade when I realized how much I enjoyed creating complex logic. My love for music is also unmatched!</p>
          <p>I got my first web dev job when I was 16 and from then on, things has just gotten better and better for my career. Fast-forward to today, I've had the privilege to deliver solutions on various companies in different industries harnessing my web skills I garnered throughout the years. I have a substantial experience working at  <span className="text-green">a digital marketing agency,  a startup, and  an outsourcing web development company</span>.</p>
          <p>Checkout my <a target="_blank" href="/files/Resume.pdf">resume</a> to see the technologies I've worked with.</p>
        </div>

      </div>

    </section>
  )

}

export default About;