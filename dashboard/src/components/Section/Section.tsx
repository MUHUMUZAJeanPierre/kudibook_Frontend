import React from 'react';

interface SectionProps {
    title: string;
    items: {
        icon: React.ReactNode; 
        text: string;
    }[];
}

const Section: React.FC<SectionProps> = ({ title, items }) => {
    return (
        <div className="border-b border-gray-200  w-full sm:w-[80%]  max-w-md mx-auto sm:mx-0 sm:max-w-none">
            <h3 className="uppercase text-[0.6rem] font-bold text-gray-300 text-center sm:text-left">
                {title}
            </h3>
            <div className="p-[0.7rem]">
                {items.map((item, index) => (
                    <div 
                        className="flex items-center gap-2 p-[0.25rem] justify-center sm:justify-start" 
                        key={index}
                    >
                        <div className="flex items-center justify-center min-w-[1rem] h-[1rem]">
                            <span  className="text-gray-400 text-[0.85rem]">
                            {item.icon}
                            </span>
                        </div>
                        <p className="text-[#a8aaaf] flex-1 text-[0.8rem]">{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Section;
