import "./experience.styles.scss";

import ExperienceItem from "../ExperienceItem/ExperienceItem";

import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import fgsLogo from "../../images/fgs-logo.png";
import roidnaLogo from "../../images/roidna-logo.png";
import wesmcdowellLogo from "../../images/wes-logo.png";
import twofLogo from "../../images/2f-logo.png";
import webpropellersLogo from "../../images/webpropellers-logo.png";
import cimplicoLogo from "../../images/cimplico-logo.png";
import smudge1 from "../../images/smudge.svg";
import smudge2 from "../../images/smudge2.svg";

const Experience = () => {
  const isMobile = function () {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };

  return (
    <section id="experience">
      <div className="container">
        <h2 data-aos="fade-right" className="polysans-bulky-wide text-white">
          Experience
          <span className="sub text-green barlow-condensed-light">
            {" "}
            — OH, I HAVE A LOT OF STORIES TO TELL!
          </span>
        </h2>
        <div className="vertical-timeline-wrapper">
          <VerticalTimeline animate={!isMobile()}>
            <ExperienceItem
              title="Full-stack Web Developer"
              subtitle="Cimplico — Brisbane, Australia"
              details={[
                "<span>Contributed to the development of an accounting software</span> built with technologies like <span>React</span>, <span>Typescript</span>, <span>Express</span>, among others.",
                "<span>Developed business logic for complex features</span> with javascript",
                "<span>Translated figma mockups to ReactTS components</span> with precision and accuracy",
              ]}
              image={cimplicoLogo}
            />

            <ExperienceItem
              title="Full-stack Web Developer"
              subtitle="FGS Advisory — Sydney, Australia"
              details={[
                "<span>Contributed to the development of a web-based PDF editor</span> targeted for accounting firms with <span>Laravel</span> and <span>Javascript</span>",
                "<span>Implemented complex, calculation-dense features</span> like page rotation logic (algebra and geometry), and undo-redo (sorting algorithms) among others",
                "<span>Designed and presented quick mockups</span> for features and additional pages",
              ]}
              image={fgsLogo}
            />

            <ExperienceItem
              title="Engineering Dep. Consultant"
              subtitle="ROI·DNA — San Francisco, California, USA "
              details={[
                "Added features to existing medium to large-scaled <span>WordPress</span> and <span>Laravel + React</span> projects",
                "<span>Handled multiple client projects</span> simultaneously on different tech-stacks",
                "Reported, and <span>formulated solutions for bugs</span> on numerous projects",
              ]}
              image={roidnaLogo}
            />

            <ExperienceItem
              title="Web Development Consultant"
              subtitle="wesmcdowell.com — Chicago, USA"
              details={[
                "<span>Employer is a youtuber/digital strategy expert with a quarter of a million subscribers and thousands of students</span>",
                "Maintained website and fixed urgent bugs",
                "Helped on the technical side - ie, opening, and closing campaign pages - during course campaigns in a time-sensitive environment",
                "Create new pages, and update existing ones with Elementor + WordPress",
              ]}
              image={wesmcdowellLogo}
            />

            <ExperienceItem
              title="Web Development Consultant"
              subtitle="2fsolutions.com — Italy"
              details={[
                "Developed websites with <span>Vue + Laravel</span> or <span>WordPress</span>, depending on client requirements",
                "<span>Troubleshot, optimized, and formulated solutions</span> for faulty, existing websites",
              ]}
              image={twofLogo}
            />

            <ExperienceItem
              title="WordPress Developer"
              subtitle="Web Propellers — Davao, Philippines"
              details={[
                "Developed and handled different types websites for an array of industries",
                "Engineered web solutions to accommodate brilliant business ideas and provided outstanding technical support for english, and non-english clients",
                "<span>Spun up and maintained virtual compute machines</span> from scratch for different types of project",
                "<span>Exposed to bash terminal</span> and operated virtual machines remotely",
                "Utilized AWS services like <span>S3</span>, <span>Route 53</span>, <span>Lambda</span>, <span>RDS</span>, etc. for different business requirements",
                "<span>Migrated websites</span> to different hosting services",
              ]}
              image={webpropellersLogo}
            />
          </VerticalTimeline>
        </div>
        <img src={smudge1} className="smudge smudge-1" alt="" />
        <img src={smudge2} className="smudge smudge-2" alt="" />
        <img src={smudge1} className="smudge smudge-3" alt="" />
        <img src={smudge2} className="smudge smudge-4" alt="" />
        <img src={smudge1} className="smudge smudge-5" alt="" />
      </div>
    </section>
  );
};

export default Experience;
