import React from 'react';
import './welcome.scss';

const Welcome = () => {
  return (
      <div className="welcome-section">
         <div className='welcome-header'>
            <h1 className='heading-m'>Welcome to the</h1>
            <h2 className='heading-l'>Frontend Quiz!</h2>
         </div>

         <p className='body-s'>Pick a subject to get started.</p>
      </div>
  )
}

export default Welcome