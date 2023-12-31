import React from "react";
import Ingredient from "../images/ingredients.jpg";
import styles from "../components/Intro.module.css";

const Intro = () => {
  return (
    <div className={styles.intro}>
      <div>
        <h1>
          We make you more passionate about your culinary skills and passions.
        </h1>
        <button className={styles.btn}>Learn more</button>
      </div>
      <img src={Ingredient} alt="" className={styles.introImg} />
    </div>
  );
};

export default Intro;
