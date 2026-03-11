import Image from "next/image";
import { Button } from "../button";

interface HeroProps {
  cta?: string | undefined;
  description?: string | undefined;
  image?: string | undefined;
  title: string;
}

export function Hero({ title, description, image, cta }: HeroProps) {
  return (
    <div className="flex flex-col items-center md:flex-row md:gap-8">
      <div className="flex flex-col gap-4 md:w-2/3">
        <h1 className="font-bold text-6xl">{title}</h1>
        {description && <p className="text-gray-500 text-lg">{description}</p>}
        {cta && (
          <div>
            <Button asChild>
              <a href="/search">{cta}</a>
            </Button>
          </div>
        )}
      </div>
      <div className="mt-4 md:mt-0 md:w-1/3">
        {image && (
          <Image
            alt={title}
            fetchPriority="high"
            height={320}
            loading="eager"
            preload
            src={image}
            width={480}
          />
        )}
      </div>
    </div>
  );
}
