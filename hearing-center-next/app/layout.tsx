import type { Metadata } from "next";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

import { LanguageProvider } from "@/lib/context/LanguageContext";
import { AuthProvider } from "@/lib/context/AuthContext";

export const metadata: Metadata = {
  title: "Hearing Center",
  description: "Hearing Center Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LanguageProvider>
            {/* ✅ CLIENT COMPONENT */}
            <ClientLayoutWrapper>
              <Navbar />

              <div className="flex justify-end gap-5 items-center px-10 py-4 border-b">
                <h1 className="font-bold">Select the language</h1>
                <LanguageSwitcher />
              </div>

              {children}

              <Footer />
            </ClientLayoutWrapper>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
