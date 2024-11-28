import React from 'react';
import whiteOne from '../../assets/white_one.avif'; 
import whiteTwo from '../../assets/white_two.jpg';
import whiteThree from '../../assets/white_three.jpg'; 

const TeamAvatars = () => {
  const members = [
    { id: 1, image: whiteOne, alt: 'Person 1', bgColor: 'bg-teal-100' },
    { id: 2, image: whiteTwo, alt: 'Person 2', bgColor: 'bg-blue-100' },
    { id: 3, image: whiteThree, alt: 'Person 3', bgColor: 'bg-gray-100' },
    { id: 4, image: whiteTwo, alt: 'Person 4', bgColor: 'bg-blue-200' },
  ];

  return (
    <div className="flex">
      {members.map((member, index) => (
        <div
          key={member.id}
          className={`relative w-6 h-6 rounded-full overflow-hidden ${member.bgColor} flex items-center`}
          style={{
            marginLeft: index === 0 ? '0px' : '-6px',
          }}
        >
          <div
            className={`w-6 h-6 rounded-full overflow-hidden shadow-md ${
              index === 1 || index === 3 ? 'border border-white' : 'border border-gray-300'
            }`}
          >
            <img
              src={member.image}
              alt={member.alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamAvatars;
