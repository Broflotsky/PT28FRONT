"use client";
import { useAuth } from "@/contexts/AuthContext";
import { NavItems } from "@/utils/NavItems";
import Link from "next/link";

const Navbar = () => {
  const { dataUser } = useAuth();

  return (
    <div className="flex items-center justify-between h-[60px] bg-amber-400 w-screen">
      <section className="flex-1">LOGO DE ECOMMERCE</section>
      <section className="flex-1">
        <nav className="flex h-full justify-around">
          {NavItems.map((navigationItem) => {
            return (
              <Link key={navigationItem.id} href={navigationItem.route}>
                {navigationItem.nameToRender}
              </Link>
            );
          })}
          {dataUser && <p>{dataUser.user.name}</p>}
        </nav>
      </section>
    </div>
  );
};

export default Navbar;
