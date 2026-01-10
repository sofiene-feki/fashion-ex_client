import React, { useState } from "react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/bragaoui.png";
import logoBlack from "../../assets/bragaouiBlack.png";
import { openCart } from "../../redux/ui/cartDrawer";
import CustomDialog from "../ui/Dialog";
import Search from "./Search";
import HeaderTop from "./HeaderTop";
import { AiOutlineShopping } from "react-icons/ai";
import { PiMagnifyingGlassThin } from "react-icons/pi";
import { PiShoppingBagOpenThin } from "react-icons/pi";
import { HiOutlineBars3 } from "react-icons/hi2";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Produits", href: "/shop" },
  { name: "À propos", href: "/about" },
  { name: "Nous Contacter", href: "/contact" },
];

export default function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const { isAuthenticated } = useSelector((state) => state.user);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);

  return (
    <>
      <HeaderTop />
      {/* ===== STICKY NAV (UNDER BANNER) ===== */}
   <nav className="sticky top-0 z-40 bg-white border-b border-black/10">
  <div className="mx-auto max-w-7xl px-5 relative">
    <div className="flex h-14 items-center justify-between">

      {/* ===== LEFT (MOBILE MENU) ===== */}
      <div className="flex items-center text-[10px] mt-1 md:hidden">
        <button onClick={() => setMobileMenuOpen(true)}>
          <HiOutlineBars3 className="w-7 h-7 text-gray-500" />
          Menu
        </button>
      </div>

      {/* ===== LOGO (CENTER ON MOBILE, LEFT ON DESKTOP) ===== */}
      <Link
        to="/"
        className="
          absolute left-1/2 -translate-x-1/2
          md:static md:translate-x-0
          flex items-center h-10
        "
      >
        <img
          src={logoBlack}
          alt="Logo"
          className="h-12 w-auto"
          draggable={false}
        />
      </Link>

      {/* ===== DESKTOP MENU ===== */}
      <ul className="hidden md:flex items-center gap-8">
        {navigation.map((item) => (
          <li key={item.name}>
            <Link
              to={item.href}
              className={`text-sm uppercase tracking-wide ${
                location.pathname === item.href
                  ? "text-black font-semibold"
                  : "text-gray-600"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* ===== RIGHT ACTIONS ===== */}
      <div className="flex items-center gap-4">
        <button onClick={() => setSearchMenuOpen(true)}>
          <PiMagnifyingGlassThin className="w-6 h-6 text-black" />
        </button>

        <button onClick={() => dispatch(openCart())} className="relative">
          <PiShoppingBagOpenThin className="w-6 h-8 text-black" />
          {totalQty > 0 && (
            <span className="absolute -top-1 -right-3 bg-black text-white text-xs px-1.5 py-0.5 rounded-full">
              {totalQty}
            </span>
          )}
        </button>

        {/* Desktop user icon only */}
        <div className="hidden md:block">
          {isAuthenticated ? (
            <UserIcon className="w-6 h-6 text-black" />
          ) : (
            <Link to="/login">
              <UserIcon className="w-6 h-6 text-black" />
            </Link>
          )}
        </div>
      </div>
    </div>
  </div>
</nav>

      {/* ===== SEARCH DRAWER ===== */}
      <CustomDialog
        open={searchMenuOpen}
        onClose={() => setSearchMenuOpen(false)}
        position="right"
      >
        <Search onClose={() => setSearchMenuOpen(false)} />
      </CustomDialog>

      {/* ===== MOBILE MENU ===== */}
      <CustomDialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        position="left"
      >
        <div className="p-6 bg-white h-full">
          <div className="flex justify-between mb-6">
            <span className="text-lg font-semibold">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)}>
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <ul className="space-y-4">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 uppercase tracking-wide"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </CustomDialog>
    </>
  );
}
