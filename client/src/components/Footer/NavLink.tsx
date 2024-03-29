type NavLinkProps = {
  link?: string;
  label?: string;
};

const NavLink = ({ link, label }: NavLinkProps) => {
  return (
    <div>
      <li>
        <a
          href={link}
          className={`inline-block mb-2 text-base leading-loose text-body-color hover:text-primary`}
        >
          {label}
        </a>
      </li>
    </div>
  );
};

export default NavLink;
