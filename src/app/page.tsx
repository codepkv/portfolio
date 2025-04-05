import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import React from "react";
import TimelinePage from "./timeline/page";
import TechToolsPage from "./TechTools/page";
import ContactPage from "@/components/Contact";

const page = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <TimelinePage/>
      <TechToolsPage/>
      <ContactPage/>
    </div>
  );
};

export default page;
