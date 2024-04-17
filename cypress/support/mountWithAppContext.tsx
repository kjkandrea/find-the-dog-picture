import { mount } from "cypress/react18";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

export function mountWithAppContext(children: React.ReactNode) {
  return mount(
    <RecoilRoot>
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
      </QueryClientProvider>
    </RecoilRoot>,
  );
}
