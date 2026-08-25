import "./Hero.css";
function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">
        <p className="hero-small">WELCOME TO SHOPEASE</p>

        <h1>
          Everything you need,
          <br />
          all in one place.
        </h1>

        <p>
          Discover great products at amazing prices.
        </p>

        <button className="shop-button">
          Shop Now
        </button>
      </div>

    </section>
  );
}

export default Hero;