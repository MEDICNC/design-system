import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, sortPosts } from "@/lib/utils";
import { posts } from "#site/content";
import Link from "next/link";

export default function Home() {
  const latestPosts = sortPosts(posts).slice(0, 5);
  return (
    <div className="flex justify-center w-full items-center">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:mt-10 lg:py-32 mb-32">
        <div className="container flex flex-col gap-4 text-center">
          <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-balance">
            MEDIC&C Component Library
          </h1>
          <div className="flex flex-col gap-4 justify-center sm:flex-row mt-5">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full sm:w-fit",
              )}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
