interface NavLinkInterface {
  link: string;
  label: string;
}

const NavLink = ({ link, label }: NavLinkInterface) => {
  return (
    <li>
      <a
        href={link}
        className="inline-block text-base leading-loose text-body-color hover:text-primary dark:text-dark-6"
      >
        {label}
      </a>
    </li>
  );
};

export default NavLink;
