import { mount } from "cypress/react";
import { QueryClient, QueryClientProvider } from "react-query";

export function mountWithAppContext(children: React.ReactNode) {
  return mount(
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>,
  );
}
