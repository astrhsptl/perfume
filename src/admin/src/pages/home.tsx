import React from 'react';
import { useLocation } from 'react-router-dom';

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const location = useLocation();
  console.log(location.pathname);
  return <div>Home</div>;
};
