import React from 'react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-start space-y-3">
    <Icon size={32} className="text-blue-600" />
    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
);

export default FeatureCard;
