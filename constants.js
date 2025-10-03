import { Minus, Sparkles, Layers, Type, Grid } from 'lucide-react';

export const FONT_OPTIONS = [
  { name: 'Inter', style: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' },
  { name: 'Roboto Mono', style: 'Roboto Mono, ui-monospace, SFMono-Regular, Menlo' },
  { name: 'Poppins', style: 'Poppins, system-ui, -apple-system, "Segoe UI", Roboto' },
  { name: 'Georgia', style: 'Georgia, serif' },
  { name: 'Arial Black', style: 'Arial Black, Gadget, sans-serif' },
];

export const LAYOUT_OPTIONS = [
  { id: 'Straight', icon: Minus, label: 'Straight' },
  { id: 'Arched', icon: Sparkles, label: 'Arched' },
  { id: 'Circular', icon: Layers, label: 'Circular' },
  { id: 'Monogram', icon: Type, label: 'Monogram' },
  { id: 'Stacked', icon: Grid, label: 'Stacked' },
];

export const TEMPLATE_CATEGORIES = ['Farm', 'Workshop', 'Camping', 'Heritage'];
