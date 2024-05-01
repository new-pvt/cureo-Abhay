import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./Utils/Store/store.js";
import ScrollToTop from "./ScrollToTop.jsx";
import { AxiosInterceptor } from "./Utils/axiosClient.jsx";
import AuthContextProvider from "./Utils/Context/Patients/AuthContextProvider.jsx";
import {
    useQuery,
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <AuthContextProvider>
                    <BrowserRouter>
                        <AxiosInterceptor>
                            <ScrollToTop />
                            <App />
                        </AxiosInterceptor>
                    </BrowserRouter>
                </AuthContextProvider>
            </PersistGate>
        </Provider>
    </QueryClientProvider>
    // </React.StrictMode>,
);
