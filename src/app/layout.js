import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Time Capsule",
  description: "Share your predictions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Script
          id="whisperbox-widget"
          strategy="afterInteractive"
        >
          {`
            window.whisperboxq = window.whisperboxq || [];
            (function(w,d,s,o){
              w.WhisperBoxWidget=o;
              w[o]=w[o]||function(){
                (w[o].q=w[o].q||[]).push(arguments)
              };
              var f=d.getElementsByTagName(s)[0] || d.getElementsByTagName('body')[0];
              var e=d.createElement(s);
              e.async=1;
              e.src='https://whisperbox.tech/widget/v1.js';
              e.onload = function() {
                w[o]('init', '67745f1ff79d6d5b2da5d217');
              };
              f.parentNode.insertBefore(e,f);
            })(window,document,'script','whisperbox');
          `}
        </Script>
      </body>
    </html>
  );
}