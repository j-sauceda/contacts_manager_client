function Footer() {
  return (
    <div
      className="ui teal inverted vertical segment"
      style={{ position: "fixed", left: "0px", bottom: "0px", width: "100%" }}
    >
      <div className="ui center aligned container">
        <a href="/about" className="ui link" style={{ color: "white" }}>
          About
        </a>
      </div>
    </div>
  );
}

export default Footer;
