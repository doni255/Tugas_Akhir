import React from "react";
import NavbarEcommerce from "../../../e-commerce/components/NavbarEcommerce";
import NewsLetter from "../../../e-commerce/components/NewsLetter";
import Feature from "../../../e-commerce/components/Feature";

export default function LayoutEcommerce() {
  return (
    <div className="min-h-screen flex flex-col">
      {" "}
      {/* Flexbox digunakan di sini */}
      <div className="w-screen flex-grow">
        {" "}
        {/* flex-grow untuk mengisi ruang */}
        <NavbarEcommerce />
      </div>
      {/* <NewsLetter /> */}
      
      <Feature />
    </div>
  );
}
