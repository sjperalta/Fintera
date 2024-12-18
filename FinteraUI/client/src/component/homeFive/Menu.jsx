import React from "react";
import logoBlack from "../../assets/images/logo/logoBlack.svg";
import chevronDown from "../../assets/images/icon/chevron-down.svg";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <section className="bg-white border-b b-gray-300 justify-center items-center p-6 gap-9 hidden xl:flex fixed top-0 z-[9999] w-full">
      <Link to="/">
        <div className="flex gap-1.5 h-fit cursor-pointer">
          <img src={logoBlack} alt="logo" />

          <span className="text-4xl font-extrabold leading-extra-loose tracking-tight text-primary h-full flex justify-center items-center pr-16">
            <span className="text-gray-900">Bank</span> Co.
          </span>
        </div>
      </Link>
      <div className="text-gray-900 text-2xl font-medium leading-9 flex gap-11">
        <Link to="" className="flex cursor-pointer">
          <span>Products</span>
          <img src={chevronDown} alt="arrow down" />
        </Link>
        <Link to="" className="flex cursor-pointer">
          <span>Features</span>
        </Link>
        <Link to="" className="flex cursor-pointer">
          <span>Pricing</span>
        </Link>
        <Link to="" className="flex cursor-pointer">
          <span>Resources</span>
          <img src={chevronDown} alt="arrow down" />
        </Link>
        <Link to="" className="flex cursor-pointer">
          <span>Blog</span>
        </Link>
      </div>
      <Link
        to="#"
        className="inline-flex h-[60px] justify-center items-center gap-3 shrink-0 rounded-xl border-[2.333px] border-primary z-50 relative group overflow-hidden transition-all"
      >
        <div className="w-0 h-0 bg-primary absolute right-0 bottom-0 group-hover:w-full group-hover:h-full z-0 transition-all"></div>
        <span className="text-primary text-center text-xl font-semibold leading-8 group-hover:text-white z-10 w-full h-full py-2.5 px-9">
          Login
        </span>
      </Link>
      <Link
        to="#"
        className="inline-flex h-[60px] justify-center items-center gap-3 shrink-0 rounded-xl border-[2.333px] border-primary z-40 transition-all group relative overflow-hidden"
      >
        <div className="w-full h-full bg-primary absolute right-0 bottom-0 group-hover:w-0 group-hover:h-0 z-0 transition-all"></div>
        <div className="text-center text-xl font-semibold leading-8 text-white z-10 group-hover:text-primary w-full h-full py-2.5 px-9">
          Live Preview
        </div>
      </Link>
    </section>
  );
}

export default Menu;
