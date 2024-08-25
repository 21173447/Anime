import React from 'react';
import {PuffLoader } from 'react-spinners';

const Spinner = ({ loading }) => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <PuffLoader  color="green"  size= "90"loading={loading} si />
    </div>
  );
};

export default Spinner;
