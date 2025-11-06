import React from 'react';

export const Editable: React.FC<{
  children: string;
  onUpdate: (value: string) => void;
  className?: string;
  as?: React.ElementType;
  placeholder?: string;
  variant?: 'light' | 'dark';
}> = ({ children, className, as: Component = 'p', placeholder }) => {
  return (
    <Component
      className={className}
      data-placeholder={placeholder}
    >
      {children}
    </Component>
  );
};

export const ShieldsLabel: React.FC<{ label: string; value: string; valueColor?: string; }> = ({ label, value, valueColor = 'bg-green-500' }) => (
    <div className="inline-flex items-center rounded-sm overflow-hidden text-xs font-bold shadow">
        <span className="bg-gray-600 text-white px-2 py-1">{label}</span>
        <span className={`${valueColor} text-white px-2 py-1`}>{value}</span>
    </div>
);

export const SectionHeader: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <h3 className={`text-sm font-bold uppercase tracking-widest mb-4 ${className}`}>{children}</h3>
);