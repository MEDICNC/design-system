"use client";

import { posts } from "@/.velite";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideMenu = () => {
  const pathname = usePathname();
  const currentComponent = pathname.split("/").pop();
  const currentIntro = pathname.split("/").pop();

  const introPosts = posts.filter((post) => post.slug.includes("intro"));
  const componentPosts = posts.filter((post) =>
    post.slug.includes("components"),
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="font-semibold text-lg mb-0">참고 및 셋팅</p>
        {introPosts?.map((post) => (
          <Link
            href={"/" + post.slug}
            className={cn(
              "py-1 block w-1/2 text-gray-700",
              currentIntro === post.slugAsParams.toLowerCase() &&
                "font-semibold text-gray-700 underline",
            )}
          >
            {post.componentName}
          </Link>
        ))}
      </div>

      <div>
        <p className="font-semibold text-lg mb-0">컴포넌트</p>
        {componentPosts?.map((post) => (
          <Link
            href={"/" + post.slug}
            className={cn(
              "py-1 block w-1/2 text-gray-700",
              currentComponent === post.componentName.toLowerCase() &&
                "font-semibold underline",
            )}
          >
            {post.componentName}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
