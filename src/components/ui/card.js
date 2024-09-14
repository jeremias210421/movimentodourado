import React from 'react';

export const Card = ({ className, children }) => (
  <div className={`card ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ className, children }) => (
  <div className={`card-header ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children }) => (
  <h2 className="card-title">{children}</h2>
);

export const CardContent = ({ children }) => (
  <div className="card-content">{children}</div>
);
