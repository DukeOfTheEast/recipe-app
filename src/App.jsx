import "./App.css";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import Recipes from "./components/Recipes";

function App() {
  return (
    <>
      <Navbar />
      <Intro />
      <Recipes />
      <Footer />
    </>
  );
}

export default App;
