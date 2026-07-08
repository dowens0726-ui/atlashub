import NavLink from "./NavLink";

type NavigationItemProps = {
  href: string;
  label: string;
  icon?: string;
};

export default function NavigationItem({
  href,
  label,
  icon,
}: NavigationItemProps) {
  return (
    <NavLink
      href={href}
      label={label}
      icon={icon}
    />
  );
}