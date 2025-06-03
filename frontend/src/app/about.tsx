import Image from "next/image";

export default function About() {
  return (
    <div className="w-full gap-10 flex flex-col items-start px-4 justify-center">
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
          Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
          Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla.
          Pellentesque sit amet sapien fringilla
        </p>
      </div>
    </div>
  );
}
