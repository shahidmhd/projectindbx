import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import Authslice from './Redux/Authslice.js';
import ErrorBoundary from './Components/Boundry/ErrorBoundary.jsx';


const store = configureStore({
    reducer: {
        Authslice: Authslice
    },
})
ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <Provider store={store}>
            <ErrorBoundary>
            <App />
            </ErrorBoundary>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored" />
        </Provider>
    </>
)
