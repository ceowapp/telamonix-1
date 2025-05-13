import React from "react";
import { careerLocaleMap } from '@/constants/data';

interface CareerCardProps {
  date: string;
  title: string;
  insetStyle?: React.CSSProperties;
  tags: string[];
  salaryRange: string;
  address: string;
  language: 'en' | 'vi' | 'zh';
  onClick: () => void;
}

const CareerCard: React.FC<CareerCardProps> = ({
  date,
  title,
  tags,
  insetStyle,
  salaryRange,
  address,
  language = 'en',
  onClick,
}) => {
  return (
    <div className="w-full flex items-center justify-center sm:justify-start">
      <div className="relative w-full max-w-[400px] bg-white border border-gray-200 rounded-[20px] p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
        {insetStyle && (
          <div 
            className="absolute inset-0 z-0 overflow-hidden"
            style={insetStyle}
          >
            <div 
              className="absolute rounded-full"
              style={{
                width: '749px',
                height: '749px',
                top: '70px',
                left: '-380px',
                opacity: '80%',
                transform: 'rotate(45deg)',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, #FFFFFF 100%)',
                zIndex: 1
              }}
            />
            <div 
              className="absolute rounded-full"
              style={{
                width: '311px',
                height: '311px',
                top: '25px',
                left: '140px',
                opacity: '80%',
                transform: 'rotate(-45deg)',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, #FFFFFF 100%)',
                zIndex: 1
              }}
            />
          </div>
        )}
        <div className="relative z-10">
          <p className="text-body-small-black-2 mb-2">{date}</p>
          <h2 className="text-title-medium-black-4 mb-2 line-clamp-2">{title}</h2>
          <div className="flex flex-wrap gap-1.5 mt-4 mb-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-white text-body-small-black-2 px-4 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="relative z-10">
          <p className="text-title-small-black mt-10">{salaryRange}</p>
          <div className="flex items-center text-sm text-gray-600 mt-1.5 mb-3">
            <span className="text-body-small-black-3 truncate">{address}</span>
          </div>
          <button aria-label="View more details" onClick={onClick} className="w-full bg-buttonColor text-title-regular-white py-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50">
            {careerLocaleMap.details[language]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CareerCard);