import type { Metadata } from "next";
import { Inter, Stalinist_One } from "next/font/google";
import "./globals.css";

import { Providers } from "@/lib/providers";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { DynamicProvider } from "@/lib/DynamicProvider";

const inter = Inter({ subsets: ["latin"] });
const stalinist = Stalinist_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-stalinist",
});
export const metadata: Metadata = {
  title: "Luffy",
  description:
    "Fully private and decentralized fantasy sports solution. Own your squad. Own your prediction. ",
};

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
            <body className={`${(inter.className, stalinist.variable)} `}>
              {children}
            </body>
          </DynamicWagmiConnector>
        </Providers>
      </DynamicProvider>
    </html>
  );
}
