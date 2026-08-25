function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-about">
          <h2>ShopEase</h2>
          <p>
            Your one-stop online shopping destination.
            Discover quality products at great prices.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">Categories</a>
        </div>

        <div className="footer-section">
          <h3>Customer Service</h3>
          <a href="#">Contact Us</a>
          <a href="#">Shipping</a>
          <a href="#">Returns</a>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 ShopEase. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;