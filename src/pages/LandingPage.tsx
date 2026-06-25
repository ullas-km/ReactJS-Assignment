import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsBar from "../components/StatsBar";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Cta from "../components/Cta";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <Testimonials />
      <Cta />
      <Footer />
    </>
  );
}