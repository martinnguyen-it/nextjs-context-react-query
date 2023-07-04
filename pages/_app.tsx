import AppContextProvider from '@/src/contexts';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <AppContextProvider>
                <Component {...pageProps} />
                <ToastContainer autoClose={1500} />
            </AppContextProvider>
        </QueryClientProvider>
    );
}
