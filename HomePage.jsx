import React from 'react';
import FeatureCard from '../components/FeatureCard';
import Button from '../components/Button';
import { Type, Layers, Cpu } from 'lucide-react';

const HomePage = ({ onStartDesigning, onViewPricing }) => (
  <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto text-center py-16">
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
        Create <span className="text-blue-600">Fabrication-Ready DXF Files</span> in Minutes.
      </h1>
      <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
        Design custom signage, parts, and stencils instantly for CNC, laser cutting, and plasma tables with professional precision.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Button primary onClick={onStartDesigning} className="py-3 px-8 text-lg shadow-xl">
          Start Designing
        </Button>
        <Button onClick={onViewPricing} className="py-3 px-8 text-lg">
          View Pricing
        </Button>
      </div>
    </div>

    <div className="max-w-6xl mx-auto mt-16">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Powerful Features, Simplified Workflow</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon={Type}
          title="Instant Text-to-DXF"
          description="Convert any custom text into a clean, optimized cutting path immediately. No CAD experience needed."
        />
        <FeatureCard
          icon={Layers}
          title="Advanced Layouts"
          description="Apply complex arrangements like Arched, Circular, and Monogram layouts with a single click."
        />
        <FeatureCard
          icon={Cpu}
          title="AI Prompt Mode (Pro)"
          description="Use natural language to generate complex sign designs and templates. Simply describe what you want."
        />
      </div>
    </div>
  </div>
);

export default HomePage;
