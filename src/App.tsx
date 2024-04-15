import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return <QueryClientProvider client={queryClient}>App</QueryClientProvider>;
}

export default App;
