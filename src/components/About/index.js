import React from 'react';

const AboutPage = () => (
  <div className="container">
    <div className="about-content">
        <img id="picture" className="img-thumbnail" src="./Profile.jpg" alt="Profile"/>
        <p>I'm Peter McNeely and this is my website.</p>
        <p>I like learning, cooking, woodworking, and staying active.</p>
        <p>Currently, my favorite programming language is C#, I'm really loving React.js, and I think working with k8s is pretty cool.</p>
        <p>When I'm not at a computer, you can probably catch me running in Prospect Park.</p>
    </div>
    <div className="footer text-center">
        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/pete-mcneely"><span className="fa fa-linkedin-square fa-3x"></span></a>
    </div>
  </div>
);

export default AboutPage;