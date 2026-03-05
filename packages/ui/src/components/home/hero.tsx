interface HeroProps {
  cta: React.ReactNode;
  description: string;
  image: React.ReactNode;
  title: string;
}

export function Hero({ title, description, image, cta }: HeroProps) {
  return (
    <div className="flex flex-col items-center md:flex-row">
      <div className="flex flex-col gap-4 md:w-2/3">
        <h1 className="font-bold text-6xl">{title}</h1>
        <p className="text-gray-500 text-lg">{description}</p>
        <div>{cta}</div>
      </div>
      <div className="mt-4 md:mt-0 md:w-1/3">{image}</div>
    </div>
  );
}
