import React from "react";

interface propsType {
  title: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<propsType> = ({ title, icon }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="bg-gray-300 w-[50px] h-[50px] text-accentDark text-[24px] grid place-items-center rounded-full">
        {icon}
      </div>
      <div>
        <h3 className="text-accent font-medium text-xl">{title}</h3>
        <p className="text-gray-500 text-[14px]">Lorem, ipsum dolor.</p>
      </div>
    </div>
  );
};

export default FeatureCard;
