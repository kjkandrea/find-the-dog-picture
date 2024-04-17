import { ReactNode } from "react";

interface DefaultLayoutProps {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return <div data-testid="default-layout">{children}</div>;
};
