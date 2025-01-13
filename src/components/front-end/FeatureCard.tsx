import React from "react";

interface propsType {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const FeatureCard = ({icon, title, desc}: propsType) => {
  return (
    <div className="flex gap-2 bg-cyan-800 rounded px-4 py-6 items-center justify-center">
      {icon}

      <div>
        <h2 className="font-medium text-xl text-white">{title}</h2>
        <p className="text-gray-200">{desc}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
