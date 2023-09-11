import React from "react";
import Img from "../public/logobd.svg";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Link from "next/link";
import Slide1 from "../components/silde";
import Footer from "../components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js",
};

export default function App() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <header>
          <Image
            src={Img}
            alt="logo"
            style={{
              margin: "auto",
            }}
          />
        </header>
      </div>
      <div>
        <Link href="/nested" passHref legacyBehavior>
          NEXT
        </Link>
      </div>
      <div>
        <Slide1 />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
