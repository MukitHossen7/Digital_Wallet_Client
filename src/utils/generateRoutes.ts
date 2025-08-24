import type { ISidebarItem } from "@/types";

export const generateRoutes = (sidebarItems: ISidebarItem[]) => {
  return sidebarItems.flatMap((sections) =>
    sections.items.map((route) => ({
      path: route.url,
      Component: route.component,
    }))
  );
};
