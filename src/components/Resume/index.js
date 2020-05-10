import React from 'react';

const Resume = () => (
  <div id="resume">
      <iframe id="resumePDF" title="resume" src={process.env.REACT_APP_RESUME_LINK}/>
  </div>
);

export default Resume;