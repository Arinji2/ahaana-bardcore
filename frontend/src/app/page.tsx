import About from "./about";
import Hero from "./hero";
import FeaturedRelease from "./release";
import Work from "./work";

export default function Home() {
  return (
    <div className=" gap-20 flex flex-col items-center justify-start py-10">
      <Hero />
      <About />
      <FeaturedRelease />
      <Work />
    </div>
  );
}
