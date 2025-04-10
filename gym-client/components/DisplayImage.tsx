import React from 'react';
import { CgClose } from 'react-icons/cg';

interface DisplayImageProps {
  imgUrl: string;
  onClose: () => void;
}

const DisplayImage: React.FC<DisplayImageProps> = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto p-4 relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-2xl hover:text-red-600 cursor-pointer"
          onClick={onClose}
        >
          <CgClose />
        </button>

        {/* Image */}
        <div className="flex justify-center p-4 max-w-[80vw] max-h-[80vh]">
          <img src={imgUrl} alt="Display" className="w-auto h-auto max-w-full max-h-full" />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
