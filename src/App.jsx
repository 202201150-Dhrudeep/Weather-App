import React from 'react'
import Weather from './components/Weather'
import './index.css'

import rainbow from './assets/rainbow.jpg';

const App = () => {
  return (
    <div style={{
      backgroundImage: `url(${rainbow})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Weather />
    </div>
  );
};

export default App;
