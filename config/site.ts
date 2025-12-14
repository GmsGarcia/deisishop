export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "DEISIshop",
  description: "DEISIshop",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Products",
      href: "/products",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Cart",
      href: "/cart",
    },
  ],
  links: {
    github: "https://github.com/GmsGarcia/deisishop",
  },
};
