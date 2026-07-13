import React from 'react';

const LoaderButton = () => {
  return (
    <div className="app-bg flex min-h-screen flex-col items-center justify-center gap-5">
      <div className="relative flex h-14 w-14 items-center justify-center">
        {/* Amber/Orange pulse rings */}
        <span className="absolute inset-0 animate-ping rounded-full bg-brand-500/20" />
        <span className="animate-orange-glow flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/30">
          <i className="ri-quill-pen-ai-fill text-xl" />
        </span>
      </div>
      <p className="text-sm font-semibold text-slate-400">
        Loading Notes Gini…
      </p>
      <div className="flex gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-400" style={{ animation: 'wave 1.2s ease-in-out infinite', animationDelay: '0ms' }} />
        <span className="h-1.5 w-1.5 rounded-full bg-brand-500" style={{ animation: 'wave 1.2s ease-in-out infinite', animationDelay: '150ms' }} />
        <span className="h-1.5 w-1.5 rounded-full bg-brand-600" style={{ animation: 'wave 1.2s ease-in-out infinite', animationDelay: '300ms' }} />
      </div>
    </div>
  );
};

export default LoaderButton;
