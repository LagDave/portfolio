import "./tech-card.styles.scss"

const TechCard = ({isImage = false, imageURL, deviconClasses, title, whiteCardBG = false}) => {
  return ( 

    <div
        className="tech-card"
        data-aos="zoom-in"
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
    </div>

   );
}
 
export default TechCard;