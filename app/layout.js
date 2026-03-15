// import { Playfair_Display, DM_Sans } from 'next/font/google';
// import './globals.css';
// import { CartProvider } from '../lib/CartContext';
// import Navbar from '../components/Navbar';
// import { Toaster } from 'react-hot-toast';

// const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
// const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm' });

// export const metadata = {
//   title: 'Rural Roots Farms – Pure & Natural Products',
//   description: 'Fresh organic products from Belthangady, Karnataka. Honey, coconut oil, spices and more.',
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${playfair.variable} ${dmSans.variable}`}>
//         <CartProvider>
//           <Navbar />
//           <main>{children}</main>
//           <Toaster position="top-right" />
//         </CartProvider>
//       </body>
//     </html>
//   );
// }

import { Playfair_Display, Jost } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../lib/CartContext';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';

const playfair = Playfair_Display({
  subsets: ['latin'], weight: ['400','500','700'],
  style: ['normal','italic'], variable: '--font-head',
});
const jost = Jost({
  subsets: ['latin'], weight: ['300','400','500','600'],
  variable: '--font-body',
});

export const metadata = {
  title: 'Rural Roots — Pure Farm Products from Karnataka',
  description: 'Wild honey, cold-pressed coconut oil and black pepper from Belthangady, Karnataka.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${jost.variable}`}>
        <CartProvider>
          <Navbar />
          {children}
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: '#1c1410', color: '#f2e8d8',
                fontFamily: 'Jost, sans-serif', fontSize: 13,
                borderRadius: 4, padding: '12px 18px',
                border: '1px solid #4a3424',
              },
              duration: 2000,
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}