import React from 'react';

interface SectionProps {
    title: string;
    items: {
        icon: React.ReactNode; // Allows any valid React element
        text: string;
    }[];
}

const Section: React.FC<SectionProps> = ({ title, items }) => {
    return (
        <div className="border-b border-gray-400 w-full max-w-md mx-auto sm:mx-0 sm:max-w-none">
            <h3 className="uppercase text-[9px] font-bold text-gray-300 text-center sm:text-left">
                {title}
            </h3>
            <div className="p-2">
                {items.map((item, index) => (
                    <div 
                        className="flex items-center gap-3 p-2 justify-center sm:justify-start" 
                        key={index}
                    >
                        <div className="flex items-center justify-center min-w-[24px] h-[24px]">
                            {item.icon}
                        </div>
                        <p className="text-[#a8aaaf] flex-1">{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Section;
