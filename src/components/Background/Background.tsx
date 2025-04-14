import React from 'react';
import backgroundImage from '../../assets/images/background.png';
import './Background.css';
export function Background() {
  return (
    <div 
      className="background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    />
  );
}