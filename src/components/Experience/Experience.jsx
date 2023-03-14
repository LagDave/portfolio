import "./experience.styles.scss";

import GradientHeading from "../GradientHeading/GradientHeading";

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import Icon from "../Icon/Icon";
import {faBriefcase} from '@fortawesome/free-solid-svg-icons'

import pdfitLogo from "../../images/pdfit-logo.png"

const Experience = () => {
  return(
    <section id="experience">
      <div className="container">
      <h2 data-aos="fade-right" className="polysans-bulky-wide text-white">Experience<span className="sub text-green barlow-condensed-light"> — OH, I HAVE A LOT OF STORIES TO TELL!</span></h2>

        <div className="vertical-timeline-wrapper">

          <VerticalTimeline>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentArrowStyle={{ borderRight: '7px solid  #fff' }}
              icon={<Icon icon={faBriefcase}/>}
            >

            <h3 className="vertical-timeline-element-title polysans-neutral">Full-stack Web Developer</h3>
            <h6 className="vertical-timeline-element-subtitle polysans-neutral mt-2">FGS Advisory — Sydney, Australia</h6>
            <ul>
              <li>
                <p> Designed and Developed internal web applications and software products for the company. </p>
              </li>
            </ul>
            
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentArrowStyle={{ borderRight: '7px solid  #fff' }}
              icon={<Icon icon={faBriefcase}/>}
            >

            <h3 className="vertical-timeline-element-title polysans-neutral">Web Development Consultant</h3>
            <h6 className="vertical-timeline-element-subtitle polysans-neutral mt-2">wesmcdowell.com — Chicago, USA</h6>
            <ul>
              <li>
                <p className="text-slate">Created custom web solutions for technical business problems</p>
              </li>
              <li>
              <p className="text-slate">Developed WordPress websites for different requirements</p>
              </li>
            </ul>

            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentArrowStyle={{ borderRight: '7px solid  #fff' }}
              icon={<Icon icon={faBriefcase}/>}
            >

            <h3 className="vertical-timeline-element-title polysans-neutral">Web Development Consultant</h3>
            <h6 className="vertical-timeline-element-subtitle polysans-neutral mt-2">2fsolutions.com — Italy</h6>
            <ul>
              <li>
                <p className="text-slate">Designed and developed websites for agency clients with Wix, Shopify, WordPresss and custom scripts.</p>
              </li>
              <li>
              <p className="text-slate">Troubleshot, optimized, and formulated solutions for faulty, existing websites.</p>
              </li>
            </ul>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentArrowStyle={{ borderRight: '7px solid  #fff' }}
              icon={<Icon icon={faBriefcase}/>}
            >

            <h3 className="vertical-timeline-element-title polysans-neutral">WordPress Developer</h3>
            <h6 className="vertical-timeline-element-subtitle polysans-neutral mt-2">Web Propellers — Davao, Philippines</h6>
            <ul>
              <li>
                <p className="text-slate">Developed WordPress websites for an array of industries </p>
              </li>
              <li>
              <p className="text-slate">Engineered web solutions to accommodate brilliant business ideas Provided outstanding technical support for english, and non-english clients</p>
              </li>
            </ul>

            </VerticalTimelineElement>


          </VerticalTimeline>

        </div>

      </div>
    </section>
  )
}

export default Experience;