import "./styles/base.scss";

import Navigation from "./components/Navigation/Navigation"
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