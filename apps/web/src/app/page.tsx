import { Button } from "@repo/ui/components/button";
import { Hero } from "@repo/ui/components/hero";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <Hero
      cta={
        <Button asChild size="lg">
          <Link href="/search">Browse All Products</Link>
        </Button>
      }
      description="Premium swag for developers who build with Vercel. From tees to tech gear, represent the tools you love."
      image={
        <Image
          alt="Swag Store"
          height={1000}
          src="/images/hero.jpg"
          width={1000}
        />
      }
      title="Wear the framework you ship with"
    />
  );
}
