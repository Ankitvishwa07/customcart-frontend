import { NavLink } from "react-router-dom";
import homeImage from "../../assets/image.png";

const HeroSection = () => {
  return (
    <div className="hero-container">

      <div >
        <hr />
      </div>
      
      {}
      <div className="hero-left">
        <h1>Buy & Sell Engineering Essentials with Ease</h1>

        <p>
          CustomCart is a student-focused marketplace where engineering
          students can buy and sell used textbooks, lab equipment,
          calculators, and project materials — all in one place.
          Save money. Reduce waste. Help fellow students.
        </p>

        <div className="hero-buttons">
          <NavLink to={"/products"}>
            <button className="btn-primary">Explore Products</button>
          </NavLink>
          <NavLink to={"/addproduct"}>
            <button className="btn-secondary">Sell Your Item</button>
          </NavLink>
        </div>
      </div>

      {}
      <div className="hero-right">
        <img
          src={homeImage}
          alt="Engineering Items"
        />
      </div>

    </div>
  )
}

export default HeroSection