import "./gradient-heading.styles.scss";

const GradientHeading = (props) =>{
  return (
    <h1 className="gradient-heading polysans-bulky text-lightest-slate" {...props}>{props.children}</h1>
  )
}

export default GradientHeading;