import "./contact.styles.scss";

import Icon from "../Icon/Icon";
import { faPaperPlane, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithubSquare, faFacebookSquare, faWhatsappSquare} from '@fortawesome/free-brands-svg-icons'
import Button from "../Button/Button";

import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'

import axios from "axios";
import { useState } from "react";
const Contact = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  function sendEmail(e) {
    e.preventDefault();

    setIsSubmitting(true);

    const apiUrl = {
      local: 'http://localhost:5555/rustine-dave/us-central1/api/sendmail',
      prod: 'https://us-central1-rustine-dave.cloudfunctions.net/api/sendmail'
    }

    axios.get('https://api.ipify.org/?format=json')
    .then(({data}) => {
      
      axios.post(apiUrl.local, {
        name, email, message, ip: data.ip
      })
      .then(response => {

        setName('');
        setEmail('');
        setMessage(''); 
        setIsSubmitting(false);

        if(response.data.status == 'success'){
          Swal.fire(
            'Just Awesome!',
            'Your email has been sent. Please expect a reply within 24 hours. Thank you!',
            'success'
          )
        }else if (response.data.status == 'error' && response.data.body == 'max-send-limit'){
          Swal.fire(
            'Ooopsiee...',
            'You can only send 3 consecutive emails at max. Try again tomorrow — or poke me through any of my social media links.',
            'error'
          )
        }
  
  
      })
      .catch(err => console.log(err));
    }).catch(err => console.log(err))
    

  }

  return ( 
    <section id="contact">
      <div className="container">
 
        <h2 data-aos="fade-down" className="polysans-bulky-wide text-white text-center">Contact <span className="sub text-green barlow-condensed-light"> — SEND YOUR THOUGHTS!</span></h2>

        <div data-aos="fade-up" className="contact-glass">

          <form onSubmit={sendEmail}>

            <div className="row">
              <div className="col-lg-6">
                <label htmlFor="name">Name</label>
                <input onChange={e => setName(e.target.value)} value={name}required id="name" name="name" type="text" className="form-control" />
              </div>
              <div className="col-lg-6">
                <label htmlFor="email">Email</label>
                <input onChange={e => setEmail(e.target.value)} value={email}required id="email" name="email" type="email" className="form-control" />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <label htmlFor="message">Message</label>
                <textarea onChange={e => setMessage(e.target.value)} value={message}required id="message" name="message" rows="10" className="form-control"></textarea>
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

              <Button disabled={isSubmitting} id="contact-anchor" className="primary white">
              {
                isSubmitting ? 
                (
                  <div className="spinner-border spinner-border-sm" role="status"></div>
                ) :
                (
                  <Icon icon={faPaperPlane}/>
                )
              }
              Submit</Button>
            
            </div>
            
            
          </form>

        </div>



      </div> 
      <p className="text-center footer-text mt-5">Made with <i className="devicon-react-original colored mx-2"></i> and <i className="devicon-firebase-plain colored mx-2"></i> by Rustine Dave © 2023</p>
    </section>
   );
}
 
export default Contact;