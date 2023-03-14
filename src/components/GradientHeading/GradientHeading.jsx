import "./gradient-heading.styles.scss";

const GradientHeading = (props) =>{

  const fontStyle = props.fontStyle || 'polysans-bulky';

  if(props.type == 'h1'){
    return <h1 className={`gradient-heading ${fontStyle} text-lightest-slate`} {...props}>{props.children}</h1>
  } else if(props.type == 'h2'){
    return <h2 className={`gradient-heading ${fontStyle} text-lightest-slate`} {...props}>{props.children}</h2>
  }
  
}

export default GradientHeading;