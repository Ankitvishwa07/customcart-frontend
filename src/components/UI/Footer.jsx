import cal from "../../assets/cal.png";
import rounder from "../../assets/rounder.png";
import scale from "../../assets/scale.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Column 1 */}
        <div className="footer-col">
          <h2 className="logo">Commerce X</h2>
          <p className="footer-desc">
            Lorem ipsum dolor sit amet consecte dol adipiscing elit aliquam maur.
          </p>

          <div className="social-icons">
            <i className="fa fa-facebook"></i>
            <i className="fa fa-twitter"></i>
            <i className="fa fa-instagram"></i>
            <i className="fa fa-linkedin"></i>
            <i className="fa fa-youtube-play"></i>
          </div>

          <hr />

          <h3 className="contact-title">CONTACT US</h3>

          <div className="contact-item">
            <span>Email</span>
            <p>contact@commerce.com</p>
          </div>

          <div className="contact-item">
            <span>Phone</span>
            <p>(414) 687 - 5892</p>
          </div>
        </div>

        {/* Column 2 - Products */}
        <div className="footer-col">
          <h3 className="footer-heading">PRODUCT</h3>

          <div className="product-item">
            <img src={cal} alt="Backpack" />
            <div>
              <p>Backpack</p>
              <span>$ 39.99 USD</span>
            </div>
          </div>

          <div className="product-item">
            <img src={rounder} alt="Keyboard" />
            <div>
              <p>Wireless Keyboard</p>
              <span>$ 49.99 USD</span>
            </div>
          </div>

          <div className="product-item">
            <img src={scale} alt="VR" />
            <div>
              <p>VR Headset</p>
              <span>$ 579.99 USD</span>
            </div>
          </div>
        </div>

        {/* Column 3 - Menu */}
        <div className="footer-col">
          <h3 className="footer-heading">MENU</h3>
          <ul>
            <li>Home V1</li>
            <li>Home V2</li>
            <li>Home V3</li>
            <li>About</li>
            <li>Contact</li>
            <li>Collection V1</li>
            <li>Collection V2</li>
            <li>Collection V3</li>
            <li>Single Product</li>
          </ul>
        </div>

        {/* Column 4 - Utility */}
        <div className="footer-col">
          <h3 className="footer-heading">UTILITY PAGES</h3>
          <ul>
            <li>Start here</li>
            <li>Style guide</li>
            <li>Password protected</li>
            <li>404 Not found</li>
            <li>Licenses</li>
            <li>Changelog</li>
            <li className="highlight">More Webflow Templates →</li>
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;