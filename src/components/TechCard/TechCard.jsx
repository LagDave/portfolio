import "./tech-card.styles.scss"

import Tilt from 'react-parallax-tilt';

const TechCard = ({isImage = false, imageURL, deviconClasses, title, whiteCardBG = false}) => {
  return ( 

    <Tilt
        className="parallax-effect-glare-scale tech-card"
        tiltMaxAngleX={25}
        tiltMaxAngleY={25}
        perspective={800}
        transitionSpeed={100}
    >
        <div className="inner-element">
            {
              isImage ? (
                <img className={`${whiteCardBG && 'white-card-bg'}`} src={`${imageURL}`} />
              ) : ( 
                <i className={`devicon ${deviconClasses}`}></i>
              )
            }
            
            <p className="text-center my-2 space-mono">{title}</p>
        </div>
    </Tilt>

   );
}
 
export default TechCard;