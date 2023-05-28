import "./tech.styles.scss";

import TechCard from "../TechCard/TechCard";

import GradientHeading from "../GradientHeading/GradientHeading";

const Tech = () => {

  return (

    <section id="tech">

      <div className="tech-wrapper">
        
        <div className="container">
            <h2 data-aos="fade-down" className="polysans-bulky-wide text-white">Technologies <span className="sub text-green barlow-condensed-light"> — A CONSTELLATION OF EXPERTISE!</span></h2>


            <div className="tech-card-wrapper">
                
                <div className="tech-card-row">
                    <GradientHeading type='h1'>FRONT-END</GradientHeading>    
                    
                    <TechCard isImage={true} imageURL='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' title='React'/>
                    <TechCard isImage={true} imageURL='/public_images/redux-white.svg' title='Redux Toolkit'/>
                    <TechCard isImage={true} imageURL='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' title='VueJS'/>
                    <TechCard isImage={true} imageURL='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg' title='NuxtJS'/>
                    <TechCard isImage={true} imageURL='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' title='SASS'/>
                    <TechCard isImage={true} imageURL='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg' title='JQuery'/>
                    <TechCard isImage={true} imageURL='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' title='Bootstrap'/>
                    <TechCard isImage={true} imageURL='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' title='JavaScript'/>
                </div>

                <div className="tech-card-row">

                    <GradientHeading type='h1'>BACK-END</GradientHeading>
                    <TechCard isImage={true} imageURL='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' title='PHP'/>
                    <TechCard isImage={true} imageURL='/public_images/laravel.svg' title='Laravel'/>
                    <TechCard isImage={true} imageURL='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' title='NodeJS'/>
                    <TechCard isImage={true} imageURL='/public_images/mysql-white.svg' title='MySQL'/>
                    <TechCard isImage={true} imageURL='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' title='PostgreSQL'/>
                    <TechCard isImage={true} imageURL='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' title='MongoDB'/>
                    <TechCard isImage={true} imageURL='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' title='Firebase'/>
                    <TechCard isImage={true} imageURL='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' title='AWS'/>
                    <TechCard isImage={true} imageURL='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' title='GCP'/>

                </div>

                <div className="tech-card-row">

                    <GradientHeading type='h1'>BEYOND</GradientHeading>
                    <TechCard isImage={true} imageURL='/public_images/wordpress-white.svg' title='WordPress'/>
                    <TechCard isImage={true} imageURL='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/woocommerce/woocommerce-original.svg' title='WooCommerce'/>

                </div>


            </div>
        
        </div>
       

      </div>

    </section>

  )
}

export default Tech;