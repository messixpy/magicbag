import React from 'react';

const SkeletonLoadingVideo = () => {
  return (
    <div className="animate-pulse bg-gray-300 rounded-lg">
      {/* Replace this with a skeleton placeholder for your video */}
      <div className="h-64 w-full"></div>
    </div>
  );
};

export default SkeletonLoadingVideo;