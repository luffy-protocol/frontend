import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const jksans = Plus_Jakarta_Sans({ subsets: ["latin"] });
const pxsans = Pixelify_Sans({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Zkricket",
  description: "A zero-knowledge fantasy cricket platform",
};

import {
  DynamicContextProvider,
  EthereumWalletConnectors,
} from "../lib/dynamic";
import { Providers } from "../lib/providers";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { DynamicProvider } from "@/lib/DynamicProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <DynamicProvider>
        <Providers>
          <DynamicWagmiConnector>
            <body>
              <Nav />
              <div className={jksans.className}>{children}</div>
              <Footer />
            </body>
          </DynamicWagmiConnector>
        </Providers>
      </DynamicProvider>
    </html>
  );
}
