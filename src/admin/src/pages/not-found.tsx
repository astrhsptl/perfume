import React, { useEffect } from 'react';

interface NotFoundProps {}

export const NotFound: React.FC<NotFoundProps> = () => {
  useEffect(() => {
    window.location.replace('/not-found');
  }, []);
  return <></>;
};
