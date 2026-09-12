import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.3Z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M5 8h14l-1 12H6L5 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuMounted, setIsMenuMounted] = useState(false);

  const openMenu = () => {
    setIsMenuMounted(true);
    requestAnimationFrame(() => setIsMenuOpen(true));
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) return;
    const timer = setTimeout(() => setIsMenuMounted(false), 300);
    return () => clearTimeout(timer);
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-100 border-b border-[#E5E0D8] bg-[#FAF8F4]">
        <div className="relative flex h-20 items-center px-6 sm:px-8 lg:px-10 xl:px-12">
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={openMenu}
            className="flex items-center justify-center text-[#1C1A16] md:hidden cursor-pointer"
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>

          {/* Logo */}
          <Link
            to="/products"
            className="absolute left-1/2 -translate-x-1/2 text-lg font-medium tracking-[0.35em] text-[#1C1A16] md:static md:left-auto md:translate-x-0"
          >
            MAVE
          </Link>

          {/* Desktop navigation */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive
                    ? "font-medium text-[#1C1A16]"
                    : "text-[#8B8478] hover:text-[#1C1A16]"
                }`
              }
            >
              Shop
            </NavLink>

            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive
                    ? "font-medium text-[#1C1A16]"
                    : "text-[#8B8478] hover:text-[#1C1A16]"
                }`
              }
            >
              Wishlist
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive
                    ? "font-medium text-[#1C1A16]"
                    : "text-[#8B8478] hover:text-[#1C1A16]"
                }`
              }
            >
              Cart
            </NavLink>
          </nav>

          {/* Desktop sign out */}
          <button
            type="button"
            className="ml-auto hidden text-sm text-[#8B8478] transition-colors hover:text-[#1C1A16] md:block"
          >
            Sign out
          </button>

          {/* Mobile actions */}
          <div className="ml-auto flex items-center gap-4 md:hidden">
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="text-[#1C1A16]"
            >
              <HeartIcon />
            </Link>

            <Link
              to="/cart"
              aria-label="Shopping bag"
              className="text-[#1C1A16]"
            >
              <BagIcon />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {isMenuMounted && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Drawer */}
          <aside
            className={`absolute left-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-[#FAF8F4] px-6 py-6 shadow-xl transition-transform duration-300 ease-out ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-6">
              <Link
                to="/products"
                onClick={closeMenu}
                className="text-lg font-medium tracking-[0.35em] text-[#1C1A16]"
              >
                MAVE
              </Link>

              <button
                type="button"
                onClick={closeMenu}
                className="text-[#1C1A16] cursor-pointer"
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="flex flex-col pt-8">
              <NavLink
                to="/products"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `border-b border-[#E5E0D8] py-4 text-sm transition-colors ${
                    isActive
                      ? "font-medium text-[#1C1A16]"
                      : "text-[#8B8478]"
                  }`
                }
              >
                Shop
              </NavLink>

              <NavLink
                to="/wishlist"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `border-b border-[#E5E0D8] py-4 text-sm transition-colors ${
                    isActive
                      ? "font-medium text-[#1C1A16]"
                      : "text-[#8B8478]"
                  }`
                }
              >
                Wishlist
              </NavLink>

              <NavLink
                to="/cart"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `border-b border-[#E5E0D8] py-4 text-sm transition-colors ${
                    isActive
                      ? "font-medium text-[#1C1A16]"
                      : "text-[#8B8478]"
                  }`
                }
              >
                Cart
              </NavLink>
            </nav>

            <div className="mt-auto border-t border-[#E5E0D8] pt-6">
              <Link
                to="/profile"
                onClick={closeMenu}
                className="block py-3 text-sm text-[#1C1A16] transition-colors hover:text-[#8B8478]"
              >
                Profile
              </Link>

              <button
                type="button"
                onClick={closeMenu}
                className="py-3 text-sm text-[#8B8478] transition-colors hover:text-[#1C1A16]"
              >
                Sign out
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}