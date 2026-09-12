import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProductMenu } from "@/lib/products";

/*
  Poppins is the single typeface for the whole website.

  Poppins is not a variable font, so the weights the design uses are listed
  explicitly. The font is exposed as a CSS variable and globals.css maps it to
  Tailwind's --font-sans, which makes it the default font everywhere.
*/
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "I&N Energy — Solar, storage and smart energy systems",
  description:
    "I&N Energy designs and manufactures high-efficiency solar inverters, battery storage and smart energy systems for residential, commercial and utility projects.",
};

export default async function RootLayout({ children }) {
  // The navbar is a client component, so the products dropdown cannot fetch
  // its own data. The layout reads it here and passes it down, which also
  // means the menu is rendered on the server and is in the HTML immediately.
  const productMenu = await getProductMenu();

  return (
    <html lang="en" className={`${poppins.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <Navbar productMenu={productMenu} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
