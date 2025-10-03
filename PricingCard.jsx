import React from 'react';
import { Check, X as Cross } from 'lucide-react';
import Button from './Button';

const PricingCard = ({ title, price, features, isFeatured, onUpgrade }) => (
  <div className={`p-8 rounded-2xl shadow-2xl transition-all duration-300 flex flex-col h-full ${
    isFeatured ? 'bg-blue-600 text-white transform scale-[1.02] border-4 border-blue-400' : 'bg-white text-gray-800 border border-gray-100'
  }`}>
    <h3 className={`text-2xl font-bold ${isFeatured ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
    <p className={`mt-2 text-sm ${isFeatured ? 'text-blue-200' : 'text-gray-500'}`}>Perfect for {title === 'Free' ? 'hobbyists' : 'professionals'}</p>
    <div className="my-6">
      <span className="text-4xl font-extrabold">{price}</span>
      <span className={`text-gray-400 ml-1 ${isFeatured ? 'text-blue-200' : 'text-gray-500'}`}>{title !== 'Free' ? '/month' : ''}</span>
    </div>

    <ul className="space-y-3 flex-grow">
      {features.map((f, index) => (
        <li key={index} className="flex items-start">
          {f.isIncluded ? (
            <Check size={20} className={`mt-1 mr-2 ${isFeatured ? 'text-white' : 'text-blue-500'}`} />
          ) : (
            <Cross size={20} className={`mt-1 mr-2 ${isFeatured ? 'text-blue-200' : 'text-gray-400'}`} />
          )}
          <span className={`${isFeatured ? '' : 'text-gray-600'}`}>{f.name}</span>
        </li>
      ))}
    </ul>

    <Button
      primary={isFeatured}
      onClick={onUpgrade}
      className={`mt-8 w-full ${isFeatured ? 'bg-white text-blue-600 hover:bg-gray-100' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
    >
      {title === 'Free' ? 'Start Designing' : 'Upgrade Now'}
    </Button>
  </div>
);

export default PricingCard;
