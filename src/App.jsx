import "./App.css";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import Recipes from "./components/Recipes";

function App() {
  return (
    <>
      <Navbar />
      <Intro />
      <Recipes />
    </>
  );
}

export default App;
