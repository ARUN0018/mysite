import React from "react";
import Img from "../public/logobd.svg";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Link from "next/link";
import Slide1 from "../components/silde";
import Footer from "../components/footer";

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
