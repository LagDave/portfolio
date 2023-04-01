import "./contact.styles.scss";

import Icon from "../Icon/Icon";
import { faPaperPlane, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithubSquare, faFacebookSquare, faWhatsappSquare} from '@fortawesome/free-brands-svg-icons'
import Button from "../Button/Button";

const Contact = () => {
  return ( 
    <section id="contact">
      <div className="container">
 
        <h2 className="polysans-bulky-wide text-white text-center">Contact <span className="sub text-green barlow-condensed-light"> — SEND YOUR THOUGHTS!</span></h2>

        <div className="contact-glass">

          <form action="">

            <div className="row">
              <div className="col-lg-6">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" className="form-control" />
              </div>
              <div className="col-lg-6">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" className="form-control" />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="10" className="form-control"></textarea>
              </div>
            </div>

            <div className="contact-footer">
              
              <div className="contact-thumbs">
                
                <a href="https://www.linkedin.com/in/rustine-dave-235a51237/" target="_blank"><Icon icon={faLinkedin}/></a>
                <a href="https://github.com/lagdave/" target="_blank"><Icon icon={faGithubSquare}/></a>
                <a href="https://www.facebook.com/rustinedave" target="_blank"><Icon icon={faFacebookSquare}/></a>
                <a href="mailto:hi@rustinedave.com"><Icon icon={faEnvelope}/></a>
                <a href="https://wa.me/+639505425118" target="_blank"><Icon icon={faWhatsappSquare}/></a>
              </div>

              <Button id="contact-anchor" className="primary white"><Icon icon={faPaperPlane}/> Submit</Button>
            
            </div>
            
            
          </form>

        </div>



      </div>
    </section>
   );
}
 
export default Contact;