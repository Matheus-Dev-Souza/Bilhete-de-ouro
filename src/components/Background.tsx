import React from 'react';
import backgroundImage from '../assets/images/background.png';

export function Background() {
  return (
    <div 
      className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 brightness-80"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    />
  );
}