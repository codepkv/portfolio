import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import React from "react";
import TimelinePage from "./timeline/page";
import TechToolsPage from "./TechTools/page";
import ContactPage from "@/components/Contact";
import SocialLinksPage from "@/components/LinkTree";
import ProjectsPage from "@/components/Projects";
import TestimonialsPage from "@/components/Testinomials";

const page = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <TimelinePage/>
      <TechToolsPage/>
      <ContactPage/>
      <SocialLinksPage/>
      <ProjectsPage/>
      <TestimonialsPage/>
    </div>
  );
};

export default page;
