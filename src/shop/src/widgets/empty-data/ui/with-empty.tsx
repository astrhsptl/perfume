interface WithEmptyProps {
  children?: React.ReactNode;
}
export const WithEmpty = async ({ children }: WithEmptyProps) => {
  return <>{children ? children : <h3>Пусто</h3>}</>;
};
