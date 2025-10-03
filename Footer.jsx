import React from 'react';

const Footer = () => (
  <footer className="bg-gray-800 text-white mt-auto">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4 text-blue-400">DXF Generator</h3>
          <p className="text-sm text-gray-400">Precision design for modern fabrication.</p>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-3">Account</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-400 hover:text-white">Login</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Editor</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 border-t border-gray-700 pt-8">
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} DXF Generator. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
