function About() {
  return (
    <div
      className="ui middle aligned centered grid"
      style={{ marginTop: 60, marginBottom: 60 }}
    >
      <div className="message">
        <h2 className="ui header">About this app</h2>
        <div className="ui message">
          <p>This application has been built by Jorge Sauceda.</p>
          <p>
            The frontend makes use of React, Semantic-UI, React-Query & Zustand.
          </p>
          <p>
            The backend utilizes Nest, Passport jwt authentication and MongoDB.
          </p>
          <p>
            For more information about my open-source apps, see my{" "}
            <a href="http://www.jsauceda.info">Portfolio</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
