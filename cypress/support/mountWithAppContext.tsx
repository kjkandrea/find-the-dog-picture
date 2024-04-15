import { mount } from "cypress/react18";
import { QueryClient, QueryClientProvider } from "react-query";

export function mountWithAppContext(children: React.ReactNode) {
  return mount(
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              retry: 0,
              refetchOnWindowFocus: false,
            },
          },
        })
      }
    >
      {children}
    </QueryClientProvider>,
  );
}
