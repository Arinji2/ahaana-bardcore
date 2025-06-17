import Image from "next/image";

export default function About() {
  return (
    <div className="w-full  gap-10 relative flex flex-col items-start px-4 justify-center">
      <div className="w-40 md:w-60 absolute -top-20 right-4 md:right-20">
        <Image
          src="/about.png"
          alt="About"
          width={362}
          height={327}
          className="w-full h-auto"
        />
      </div>
      <h2 className="text-4xl font-bold tracking-wider text-primary">ABOUT</h2>
      <div className="flex gap-y-8 flex-col md:flex-row justify-between items-center w-full h-full mt-auto">
        <div className="w-full md:w-[40%] overflow-hidden min-h-[300px] shadow-button bg-offwhite relative border-primary rounded-md border-[4px]">
          <Image
            src="/guitar.jpeg"
            fill
            alt="Guitar"
            className="object-cover object-bottom"
          />
        </div>

        <p className="text-3xl tracking-wider w-full md:w-[55%] text-secondary">
          {
            "Hey there! I'm a college student on a musical adventure. Pop culture's grown on me but I don't stick to one genre. Its just me and my guitars against the world- unless you're down to join the ride. Welcome to my corner! :)"
          }
        </p>
      </div>
    </div>
  );
}
