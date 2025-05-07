// src/pages/NotFound.tsx
import { FC } from 'react';

const NotFound: FC = () => {
  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <a href="/">Return to Home</a>
    </div>
  );
};

export default NotFound;