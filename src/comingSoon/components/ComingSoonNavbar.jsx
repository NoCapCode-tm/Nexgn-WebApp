export default function ComingSoonNavbar() {
  return (
    <nav className="cs-navbar">
      <img src="/nexgn-logo.png" alt="Nexgn" className="cs-nav-logo" />
      <div className="cs-nav-center">
        <a href="#/home">Home</a>
        <a href="#/product">Product</a>
        <a href="#/pricing">Pricing</a>
      </div>
      <div className="cs-nav-right">
        <a href="#/login" className="cs-nav-login">Log in</a>
        <button className="cs-nav-start">Get Started</button>
      </div>
    </nav>
  );
}
