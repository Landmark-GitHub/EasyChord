import '@/styles/globals.css'
import React from 'react';
import ReactDOM from 'react-dom';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
