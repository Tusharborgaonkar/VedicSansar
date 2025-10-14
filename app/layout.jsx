import GlobalStoreProvider from "@/components/Application/GlobalStoreProvider";
import "./globals.css";
import {Assistant} from 'next/font/google'
import { ToastContainer } from "react-toastify";
const assistantFont = Assistant({
  weight : ['400' , '500' , '600' , '700','800'],
  subsets : ['latin'],
  display : 'swap'
})
export const metadata = {
  title: "VedicSansar",
  description: "A place to heal you",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${assistantFont.className} antialiased`}
      >
        <GlobalStoreProvider>
          <ToastContainer />
          {children}
        </GlobalStoreProvider>
      </body>
    </html>
  );
}
