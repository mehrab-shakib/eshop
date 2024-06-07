import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { banner } from "../../../Assests/images";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage: `url(${banner})`
          // "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#ffffff] font-[600] capitalize`}
        >
          Best Collection from <br /> our very own artisans
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
        Discover a curated collection of handcrafted treasures made with passion and precision by talented <br/> artisans from around the globe. At Artisans E-shop, we celebrate the beauty of traditional craftsmanship <br/>and the creativity of modern design, bringing you unique, high-quality items that tell a story. Whether you're searching for distinctive home decor, exquisite jewelry, or thoughtful gifts, our diverse range of products offers something special for every taste and occasion.
        </p>
        <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-5`}>
                 <span className="text-[#fff] font-[Poppins] text-[18px]">
                    Shop Now
                 </span>
            </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
