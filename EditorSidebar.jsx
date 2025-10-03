import React, { useState } from "react";
import { Type, Layers, Layout, Grid, Cpu } from "lucide-react";
import {
  FONT_OPTIONS,
  LAYOUT_OPTIONS,
  TEMPLATE_CATEGORIES,
} from "../data/constants";

const EditorSidebar = ({
  inputText,
  setInputText,
  selectedFont,
  setSelectedFont,
  selectedLayout,
  setSelectedLayout,
  isPremium,
  templates = [],
}) => {
  const [templateTab, setTemplateTab] = useState("Farm");

  const handleApplyTemplate = (previewText) => {
    setInputText(previewText.toUpperCase().split(" ").join("\n"));
  };

  return (
    <div className="p-6 bg-gray-50 border-r border-gray-200 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Design Controls</h2>

      {/* ✏️ Custom Text Input */}
      <div className="mb-8">
        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Type size={16} className="mr-1" /> Custom Text
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter custom text (e.g., 'bitf23m001')"
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base font-mono"
        ></textarea>
        <p className="text-xs text-gray-500 mt-1">Separate lines for stacking.</p>
      </div>

      {/* 🔤 Font Selection */}
      <div className="mb-8">
        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Layers size={16} className="mr-1" /> Font Selection
        </label>
        <select
          value={selectedFont}
          onChange={(e) => setSelectedFont(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
        >
          {FONT_OPTIONS.map((font) => (
            <option key={font.name} value={font.style} className={font.style}>
              {font.name}
            </option>
          ))}
        </select>
      </div>

      {/* 📐 Layout Options */}
      <div className="mb-8">
        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Layout size={16} className="mr-1" /> Layout Options
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {LAYOUT_OPTIONS.map((layout) => {
            const Icon = layout.icon;
            const isSelected = selectedLayout === layout.id;

            return (
              <button
                key={layout.id}
                onClick={() => setSelectedLayout(layout.id)}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-3 rounded-xl border-2 transition-all min-w-[90px] text-center ${
                  isSelected
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg scale-105"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-blue-400"
                }`}
                title={layout.label}
              >
                <Icon size={22} className="mx-auto" />
                <span className="text-sm font-medium whitespace-nowrap">
                  {layout.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 📚 Template Library */}
      <div className="mb-8">
        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Grid size={16} className="mr-1" /> Template Library
        </label>

        {/* Tabs */}
        <div className="flex space-x-2 border-b border-gray-200 mb-3">
          {TEMPLATE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setTemplateTab(cat)}
              className={`px-3 py-1 text-sm font-medium rounded-t-lg transition-colors ${
                templateTab === cat
                  ? "bg-white border border-b-0 border-gray-300 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Template List */}
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {templates
            .filter((t) => t.category === templateTab)
            .map((t) => (
              <div
                key={t._id || t.name}
                className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-200"
              >
                <span className="text-sm text-gray-700">{t.name}</span>
                <button
                  onClick={() => handleApplyTemplate(t.preview)}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Apply
                </button>
              </div>
            ))}
          {!isPremium && (
            <p className="text-xs text-red-500 italic mt-2">
              Upgrade for full template access!
            </p>
          )}
        </div>
      </div>

      {/* 🤖 AI Prompt Mode */}
      <div className="pt-4 border-t border-gray-200">
        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Cpu size={16} className="mr-1" /> AI Prompt Mode
        </label>
        <textarea
          placeholder={
            isPremium
              ? "Make a circular sign with vintage font for a BBQ pit."
              : "Upgrade to Pro to unlock AI Mode."
          }
          rows={2}
          disabled={!isPremium}
          className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm text-sm ${
            !isPremium
              ? "bg-gray-100 italic cursor-not-allowed"
              : "focus:ring-blue-500 focus:border-blue-500"
          }`}
        ></textarea>
        {!isPremium && (
          <p className="text-xs text-red-500 mt-1">
            Requires Professional Plan.
          </p>
        )}
      </div>
    </div>
  );
};

export default EditorSidebar;
