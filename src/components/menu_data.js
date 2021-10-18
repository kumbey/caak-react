export const menu_data = [
  {
    name: "Миний профайл",
    href: `/user/:userId/profile`,
    image: <span className={"icon-fi-rs-profile text-18px5 w-5 h-5 mr-2"} />,
    user: true,
  },
  {
    name: "Бүлгүүд",
    href: "#",
    image: <span className={"icon-fi-rs-group text-18px5 w-5 h-5 mr-2"} />,
    user: true,
  },
  {
    name: "Шөнийн горим",
    href: "#",
    image: <span className={"icon-fi-rs-view text-18px5 w-5 h-5 mr-2"} />,
    user: true,
  },
  {
    name: "Шинэчлэлт",
    href: "#",
    image: <span className={"icon-fi-rs-resend text-18px w-5 h-5 mr-2"} />,
    user: true,
  },
  {
    name: "Тохиргоо",
    href: "#",
    image: <span className={" icon-fi-rs-settings text-18px w-5 h-5 mr-2"} />,
  },
  {
    name: "Тусламж",
    href: "#",
    image: <span className={"icon-fi-rs-help text-18px w-5 h-5 mr-2"} />,
  },
  {
    name: "Гарах",
    href: "/logout",
    image: <span className={"icon-fi-rs-exit text-18px w-5 h-5 mr-2"} />,
  },
];
