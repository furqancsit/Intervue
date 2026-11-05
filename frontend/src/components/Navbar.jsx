import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/authProvider";
import { logout } from "../auth/api/Auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user,setUser } = useAuth();


  // Close mobile menu after navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Product", path: "/features" },
    { name: "Features", path: "/feture" },
    { name: "Pricing", path: "/pricing" },
  ];

  const linkStyle = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 text-slate-300 ${
      isActive ? "text-slate-50" : "hover:text-white"
    }`;

  const handleLogout = async () => {
    const res= await logout()
    setUser(null)

  }

  return (
    <header className="sticky top-0 z-50 w-full border-b  bg-black ">
      <nav className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="flex h-18 min-h-[72px] items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-medium  tracking-tight text-slate-50"
          >
            <span className=" font-bold  text-amber-500 ">Pre</span>pwise
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={linkStyle}>
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-5 md:flex">
            {user ? (
              <>
               <div className="group relative">
  <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition  cursor-pointer hover:bg-slate-800 hover:text-white">
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 font-bold text-white">
      {user.name?.charAt(0).toUpperCase()}
    </div>

    <span>{user.name}</span>

    <span className="text-xs">▼</span>
  </button>

  <div className="invisible absolute right-0 top-full z-50 mt-2 w-40 rounded-lg border border-slate-700 bg-slate-900 p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
    <button
      onClick={handleLogout}
      className="w-full rounded-md px-3 py-2 text-left text-sm text-red-400 transition hover:bg-slate-800 cursor-pointer"
    >
      <span className="mr-2">↪</span>
      Logout
    </button>
  </div>
</div>

              

                <Link   className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700" to="/dashboard">Dashboard</Link>
              </>
            ) : (
              <>
                <Link className = "text-white" to="/login">Sign in</Link>

                <Link
                  to="/signup"
                  className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className="rounded-lg p-2 text-amber-400 hover:bg-gray-100 md:hidden"
          >
            {isOpen ? (
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-navigation"
          aria-hidden={!isOpen}
          className={`grid transition-all duration-300 md:hidden ${
            isOpen
              ? "grid-rows-[1fr] opacity-100 pb-5"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-1 border-t border-gray-50 pt-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  tabIndex={isOpen ? 0 : -1}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-50 hover:bg-gray-50"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="mt-3 flex flex-col gap-3 border-t border-gray-100 pt-4">
               {user ? (
              <>
                <span className="text-sm font-medium text-slate-300">
                  Welcome, {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-white hover:text-amber-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Sign in</Link>

                <Link
                  to="/signup"
                  className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700"
                >
                  Get Started Free
                </Link>
              </>
            )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
