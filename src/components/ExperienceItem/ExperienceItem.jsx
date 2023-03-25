import "./experience-item.styles.scss";

import {VerticalTimelineElement}  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import Icon from "../Icon/Icon";
import {faBriefcase} from '@fortawesome/free-solid-svg-icons'


const ExperienceItem = ({title, subtitle, description, details}) => {
  return ( 
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentArrowStyle={{ borderRight: '7px solid  #fff' }}
      icon={<Icon icon={faBriefcase}/>}
    >

    <h3 className="vertical-timeline-element-title polysans-neutral">{title}</h3>
    <h6 className="vertical-timeline-element-subtitle polysans-neutral mt-2">{subtitle}</h6>
    <ul>

    {
      details.map((detail) => {
        return (
          <li key={detail}>
            <p>{ detail }</p>
          </li>
        )
      })
    }

    </ul>
    
    </VerticalTimelineElement>
   );
}
 
export default ExperienceItem;