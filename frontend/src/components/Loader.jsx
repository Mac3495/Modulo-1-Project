import React from 'react';
import { PulseLoader } from 'react-spinners'; // Puedes elegir otros loaders como 'ClipLoader', 'BeatLoader', etc.

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-80px)] text-white">
      <PulseLoader color="#FFB433" size={15} margin={4} speedMultiplier={0.5}/>
      <p className="text-lg mt-4">Espere por favor</p>
    </div>
  );
};

export default Loader;