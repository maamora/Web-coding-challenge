'use client';
import '@/styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='height'>{children}</body>
    </html>
  );
}
