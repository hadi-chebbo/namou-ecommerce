import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useAuth";

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

function HeartIcon({
  pulsing = false,
  className = "h-5 w-5",
}: {
  pulsing?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`${className} ${pulsing ? "wishlist-icon-pop" : ""}`}
      aria-hidden="true"
    >
      <path
        className={pulsing ? "wishlist-fill-pulse" : ""}
        d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.3Z"
      />
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
  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);

  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout.mutateAsync();
    navigate("/login");
  }

  useEffect(() => {
    function handleWishlistAdded() {
      setIsWishlistAnimating(true);

      const timer = setTimeout(() => {
        setIsWishlistAnimating(false);
      }, 750);

      return () => clearTimeout(timer);
    }

    window.addEventListener("wishlist-added", handleWishlistAdded);

    return () => {
      window.removeEventListener("wishlist-added", handleWishlistAdded);
    };
  }, []);

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
      <style>{`
        @keyframes wishlist-color-pulse {
          0%, 100% { color: #1C1A16; }
          35% { color: #B23A2E; }
        }
        @keyframes wishlist-icon-pop {
          0% { transform: scale(1); }
          30% { transform: scale(1.32); }
          55% { transform: scale(0.94); }
          100% { transform: scale(1); }
        }
        @keyframes wishlist-fill-pulse {
          0%, 100% { fill: transparent; }
          40% { fill: currentColor; }
        }
        @keyframes wishlist-ring {
          0% { transform: scale(0.5); opacity: 0.5; }
          100% { transform: scale(2.3); opacity: 0; }
        }
        @keyframes wishlist-underline {
          0% { transform: scaleX(0); opacity: 0.6; }
          60% { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(1); opacity: 0; }
        }
        .wishlist-color-pulse {
          animation: wishlist-color-pulse 0.7s ease-out;
        }
        .wishlist-icon-pop {
          animation: wishlist-icon-pop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .wishlist-fill-pulse {
          animation: wishlist-fill-pulse 0.7s ease-out;
        }
        .wishlist-ring {
          position: absolute;
          inset: -7px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(178,58,46,0.5) 0%, rgba(178,58,46,0) 70%);
          animation: wishlist-ring 0.7s ease-out;
          pointer-events: none;
        }
        .wishlist-underline {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -6px;
          height: 1px;
          background: #B23A2E;
          transform-origin: center;
          animation: wishlist-underline 0.75s ease-out;
        }
      `}</style>

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
                `relative flex items-center gap-1.5 text-sm transition-colors ${
                  isActive
                    ? "font-medium text-[#1C1A16]"
                    : "text-[#8B8478] hover:text-[#1C1A16]"
                } ${isWishlistAnimating ? "wishlist-color-pulse" : ""}`
              }
            >
              {isWishlistAnimating && (
                <span className="wishlist-ring" aria-hidden="true" />
              )}
              <HeartIcon pulsing={isWishlistAnimating} className="h-4 w-4" />
              <span className="relative">
                Wishlist
                {isWishlistAnimating && (
                  <span className="wishlist-underline" aria-hidden="true" />
                )}
              </span>
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
            onClick={handleLogout}
            disabled={logout.isPending}
            className="ml-auto hidden text-sm text-[#8B8478] transition-colors hover:text-[#1C1A16] disabled:opacity-50 md:block"
          >
            {logout.isPending ? "Signing out..." : "Sign out"}
        </button>

          {/* Mobile actions */}
          <div className="ml-auto flex items-center gap-4 md:hidden">
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className={`relative flex items-center justify-center text-[#1C1A16] ${
                isWishlistAnimating ? "wishlist-color-pulse" : ""
              }`}
            >
              {isWishlistAnimating && (
                <span className="wishlist-ring" aria-hidden="true" />
              )}
              <HeartIcon pulsing={isWishlistAnimating} />
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
                    isActive ? "font-medium text-[#1C1A16]" : "text-[#8B8478]"
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
                    isActive ? "font-medium text-[#1C1A16]" : "text-[#8B8478]"
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
                    isActive ? "font-medium text-[#1C1A16]" : "text-[#8B8478]"
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
                onClick={() => {
                  closeMenu();
                  handleLogout();
                }}
                disabled={logout.isPending}
                className="py-3 text-sm text-[#8B8478] transition-colors hover:text-[#1C1A16] disabled:opacity-50"
              >
                {logout.isPending ? "Signing out..." : "Sign out"}
            </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}