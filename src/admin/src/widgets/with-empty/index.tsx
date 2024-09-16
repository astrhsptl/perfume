import React from 'react';

interface WithEmptyProps {
  condition: boolean;
  children: React.ReactNode;
}

export const WithEmpty: React.FC<WithEmptyProps> = ({
  children,
  condition,
}) => {
  return <>{condition && children}</>;
};
