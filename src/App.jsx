import "./styles/base.scss";

import Navigation from "./components/navigation/Navigation"
import Hero from "./components/Hero/Hero"

const App = () => {
  return(
    <div className="wrapper">
      <Navigation/>
      <Hero/>
    </div>
  )
}

export default App