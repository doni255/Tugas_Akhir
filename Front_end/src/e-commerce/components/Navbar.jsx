import React from 'react';
import { Outlet } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { IoIosMenu } from 'react-icons/io';
import { AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import CartCountBadge from './CartCountBadge';


const Navbar = ( setShowCart ) => {
  return (
    <div className="sticky top-0 bg-white z-10">
      <div className="container hidden lg:block">
        <div className="flex justify-between items-center p-8">
          <h1 className="text-4xl font-medium">Logo</h1>
          <div className="relative w-full max-w-[500px]">
            <input
              className="bg-[#f2f3f5] border-none outline-none px-6 py-3 rounded-[30px] w-full"
              type="text"
              placeholder="Search Product..."
            />
            <BsSearch
              className="absolute top-0 right-0 mt-4 mr-5 text-gray-500"
              size={20}
            />
          </div>

          <div className="flex gap-4">
                <div className="icon__wrapper">
                    <AiOutlineUser />
                </div>
                <div className="icon__wrapper relative">
                    <AiOutlineShoppingCart onClick={() => setShowCart(true)}/>
                    <CartCountBadge size="w-[25px] h-[25px]"/>
                </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
