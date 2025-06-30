import logo from "../assets/images/logo4.png";

export default function Footer() {
  return (
    <footer className="d-flex flex-column justify-content-between">
      <div className="first-row d-flex  justify-content-evenly">
        <img
          src={logo}
          alt="Savory Secrets Logo"
          loading="lazy"
          className="align-self-start border rounded-4"
        ></img>
        <div className="footer-item menu-links">
          <h5 className="fw-bold">MENU LINKS</h5>
          <ul>
            <li>
              <a href="/home">HOME</a>
            </li>
            <li>
              <a href="/recipes">ALL RECIPES</a>
            </li>
            <li>
              <a href="/meal">MEAL</a>
            </li>
            <li>
              <a href="/ingredient">INGREDIENTS</a>
            </li>
            <li>
              <a href="/about">ABOUT</a>
            </li>
            <li>
              <a href="/contactus">CONTACT US</a>
            </li>
          </ul>
        </div>
        <div className="footer-item">
          <h5 className="fw-bold">SOCIAL MEDIA LINKS</h5>
          <ul>
            <li>
              <a href="http://www.facebook.com" target="_blank">
                Facebook
              </a>
            </li>
            <li>
              <a href="http://www.linkedin.com" target="_blank">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="http://www.twitter.com" target="_blank">
                Twitter
              </a>
            </li>
            <li>
              <a href="http://www.pinterest.com" target="_blank">
                Pinterest
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-5">@Copyright Savory Secrets Inc.</div>
    </footer>
  );
}
