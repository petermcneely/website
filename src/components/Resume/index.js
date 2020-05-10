import React from 'react';

const Resume = () => (
  <div id="resume" className="container-fluid">
      <iframe id="resumePDF" title="resume" src={process.env.REACT_APP_RESUME_LINK}/>
  </div>
);

export default Resume;