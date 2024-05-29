"use client";

import { posts } from "@/.velite";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideMenu = () => {
  const pathname = usePathname();
  const currentComponent = pathname.split("/").pop();

  const componentPosts = posts.filter((post) =>
    post.slug.includes("components"),
  );

  return (
    <>
      {componentPosts?.map((post) => (
        <Link
          href={"/" + post.slug}
          className={cn(
            "py-2",
            currentComponent === post.componentName.toLowerCase() &&
              "font-semibold underline",
          )}
        >
          {post.componentName}
        </Link>
      ))}
    </>
  );
};

export default SideMenu;
