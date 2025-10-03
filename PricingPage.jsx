import React from 'react';
import PricingCard from '../components/PricingCard';

const PricingPage = ({ onUpgrade, onStartDesigning }) => {
  const plans = [
    {
      title: 'Free', price: '$0', isFeatured: false, features: [
        { name: 'Limited Fonts & Templates', isIncluded: true },
        { name: 'DXF Export Only', isIncluded: true },
        { name: 'DXF Generator Watermark', isIncluded: true },
        { name: 'SVG/PDF Export', isIncluded: false },
        { name: 'AI Prompt Mode', isIncluded: false },
      ]
    },
    {
      title: 'Standard', price: '$19', isFeatured: true, features: [
        { name: 'Full Font & Template Library', isIncluded: true },
        { name: 'DXF, SVG Export', isIncluded: true },
        { name: 'No Watermark', isIncluded: true },
        { name: 'PDF Export', isIncluded: false },
        { name: 'AI Prompt Mode', isIncluded: false },
      ]
    },
    {
      title: 'Professional', price: '$49', isFeatured: false, features: [
        { name: 'Full Font & Template Library', isIncluded: true },
        { name: 'DXF, SVG, PDF Export', isIncluded: true },
        { name: 'No Watermark', isIncluded: true },
        { name: 'Dedicated Support', isIncluded: true },
        { name: 'AI Prompt Mode', isIncluded: true },
      ]
    }
  ];

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900">Access the Full Power of Fabrication</h1>
        <p className="mt-3 text-xl text-gray-500">Compare our plans and choose the right tools for your business.</p>
        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard
              key={plan.title}
              {...plan}
              onUpgrade={plan.title === 'Free' ? onStartDesigning : onUpgrade}
            />
          ))}
        </div>
        <div className="mt-10 p-4 bg-white rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700">Need Enterprise Solutions?</h3>
            <p className="text-sm text-gray-500">Contact us for custom seat licenses and advanced API integration.</p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
