import React, { useEffect, useState, useContext } from 'react';
import DxfPreview from '../components/DxfPreview';
import EditorSidebar from '../components/EditorSidebar';
import Button from '../components/Button';
import API from '../services/api';
import { Zap, Download, Mail, Sparkles, Settings, Edit3, Home } from 'lucide-react';
import { LAYOUT_OPTIONS } from '../data/constants';
import { AuthContext } from '../context/AuthContext';

const EditorPage = ({ isPremium, onWatermarkToggle, isWatermarkApplied }) => {
  const [inputText, setInputText] = useState("DXF Generator\nReady");
  const [selectedFont, setSelectedFont] = useState("Inter, system-ui, -apple-system, \"Segoe UI\", Roboto");
  const [selectedLayout, setSelectedLayout] = useState(LAYOUT_OPTIONS[0].id);
  const [showDimensions, setShowDimensions] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [templates, setTemplates] = useState([]);
  const { user, upgrade } = useContext(AuthContext);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const { data } = await API.get('/templates');
        setTemplates(data.templates || []);
      } catch (err) {
        console.error('Templates fetch failed', err);
      }
    }
    fetchTemplates();
  }, []);

  const handleDownload = async (type) => {
    const fileExtension = type.toLowerCase();
    if (fileExtension !== 'dxf' && !user?.isPremium) {
      alert(`The ${type} format is only available to Premium users. Please upgrade.`);
      return;
    }
    try {
      const res = await API.get(`/download/${fileExtension}`, {
        responseType: 'blob',
        params: {
          inputText,
          layout: selectedLayout,
          font: selectedFont
        }
      });
      const blob = new Blob([res.data], { type: res.headers['content-type'] || 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dxf-generator-output.${fileExtension}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Download failed');
    }
  };

  const handleUpgradeClick = async () => {
    if (!user) return alert('Please login/register to upgrade.');
    try {
      await upgrade();
      alert('Upgraded to premium — now you can download SVG/PDF.');
    } catch (err) {
      alert('Upgrade failed');
    }
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [activeSidebarTab, setActiveSidebarTab] = useState('controls');

  return (
    <div className="h-screen flex flex-col pt-16 md:pt-20 bg-gray-100">
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 p-4 bg-green-500 text-white rounded-lg shadow-xl flex items-center space-x-2">
          <Zap size={20} />
          <span>File generated successfully!</span>
          <a onClick={() => setShowNotification(false)} className="text-white hover:text-green-200 cursor-pointer underline ml-2">Dismiss</a>
        </div>
      )}

      <div className="flex flex-grow overflow-hidden">
        <div className="hidden md:block w-80 lg:w-96 flex-shrink-0 h-full">
          <EditorSidebar
            inputText={inputText} setInputText={setInputText}
            selectedFont={selectedFont} setSelectedFont={setSelectedFont}
            selectedLayout={selectedLayout} setSelectedLayout={setSelectedLayout}
            isPremium={user?.isPremium} templates={templates}
          />
        </div>

        <div className="flex-grow p-4 md:p-8 flex flex-col relative overflow-auto">
          <DxfPreview
            inputText={inputText}
            selectedFont={selectedFont}
            selectedLayout={selectedLayout}
            showDimensions={showDimensions}
            isWatermarkApplied={isWatermarkApplied && !user?.isPremium}
          />

          <div className="absolute top-8 right-8 flex space-x-3 p-2 bg-white rounded-lg shadow-md border border-gray-100 z-10">
            <button
              onClick={() => setShowDimensions(!showDimensions)}
              className={`p-2 rounded-full transition-colors ${showDimensions ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
              title="Toggle Dimensions"
            >
              <Settings size={20} />
            </button>
            <button
              onClick={onWatermarkToggle}
              className={`p-2 rounded-full transition-colors ${!user?.isPremium && isWatermarkApplied ? 'bg-red-100 text-red-600' : 'text-gray-500 hover:bg-gray-100'}`}
              title="Watermark Status (Toggle visibility for Free users)"
            >
              <Sparkles size={20} />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap justify-center md:justify-end gap-3 p-3 bg-white rounded-xl shadow-xl border border-gray-200">
            <Button primary onClick={() => handleDownload('DXF')} className="flex items-center">
              <Download size={20} className="mr-2" /> Download DXF
            </Button>
            <Button onClick={() => handleDownload('SVG')} className="flex items-center">
              <Download size={20} className="mr-2" /> Download SVG
              {!user?.isPremium && <span className="ml-2 text-xs text-red-500">(Pro)</span>}
            </Button>
            <Button onClick={() => handleDownload('PDF')} className="flex items-center">
              <Download size={20} className="mr-2" /> Download PDF
              {!user?.isPremium && <span className="ml-2 text-xs text-red-500">(Pro)</span>}
            </Button>

            <Button onClick={() => alert('Email Functionality Mocked')} className="flex items-center">
              <Mail size={20} className="mr-2" /> Email File
            </Button>

            <Button onClick={handleUpgradeClick} className="flex items-center">
              <Edit3 size={18} className="mr-2" /> Upgrade (Mock)
            </Button>
          </div>
        </div>
      </div>

      <div className="md:hidden flex-shrink-0 border-t border-gray-200">
        <div className="flex justify-around bg-white p-3 shadow-t-lg">
          <button
            onClick={() => setActiveSidebarTab('controls')}
            className={`flex-1 py-2 text-center font-medium ${activeSidebarTab === 'controls' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            <Edit3 size={18} className="inline-block mr-1" /> Controls
          </button>
          <button
            onClick={() => setActiveSidebarTab('preview')}
            className={`flex-1 py-2 text-center font-medium ${activeSidebarTab === 'preview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            <Home size={18} className="inline-block mr-1" /> Preview
          </button>
        </div>
        {activeSidebarTab === 'controls' && (
          <div className="h-64 overflow-y-scroll">
            <EditorSidebar
              inputText={inputText} setInputText={setInputText}
              selectedFont={selectedFont} setSelectedFont={setSelectedFont}
              selectedLayout={selectedLayout} setSelectedLayout={setSelectedLayout}
              isPremium={user?.isPremium} templates={templates}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorPage;
