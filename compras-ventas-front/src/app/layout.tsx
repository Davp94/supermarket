import "./globals.css";
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
         <PrimeReactProvider>
            {children}
          </PrimeReactProvider> 
      </body>
    </html>
  );
}
