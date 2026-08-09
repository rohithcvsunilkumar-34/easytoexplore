import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookingDrawer } from '@/components/destinations/BookingDrawer';
import { Toast } from '@/components/ui/Toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EasyToExplore | Premium Travel & Tour Experiences Across India',
  description: 'Explore breathtaking destinations in India — Kashmir, Manali, Goa, Rajasthan, Lakshadweep, Meghalaya, Delhi & Agra. Customized holiday packages, 5-star houseboats, scuba diving & 24/7 local guide support.',
  keywords: [
    'EasyToExplore',
    'Kashmir Tour Packages',
    'Manali Snow Tour',
    'Goa Beach Vacation',
    'Rajasthan Royal Circuit',
    'Lakshadweep Scuba Diving',
    'Meghalaya Living Root Bridge',
    'Agra Taj Mahal Luxury Tour',
  ],
  openGraph: {
    title: 'EasyToExplore | Premium Travel & Tour Experiences Across India',
    description: 'Book verified India tour packages with best price guarantee & 24/7 travel concierge.',
    images: ['https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-emerald-500 selection:text-white`}>
        <AppProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <BookingDrawer />
          <Toast />
        </AppProvider>
      </body>
    </html>
  );
}
