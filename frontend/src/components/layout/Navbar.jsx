import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  ShoppingCart,
  User,
  Menu,
  X,
  Search,
  MapPin,
  Heart,
  Bell,
  Settings,
  LogOut,
  Zap,
  Award,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const searchInputRef = useRef(null);

  // Dynamic navbar color on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      name: "Home",
      icon: Home,
      path: "/",
      gradient: "from-emerald-400 to-emerald-600",
      description: "Explore delicious options",
    },
    {
      name: "Discover",
      icon: MapPin,
      path: "/saved-addresses",
      gradient: "from-teal-400 to-teal-600",
      description: "Find nearby restaurants",
    },
    {
      name: "Favorites",
      icon: Heart,
      path: "/favorites",
      gradient: "from-rose-400 to-rose-600",
      description: "Your loved dishes",
    },
    {
      name: "Cart",
      icon: ShoppingCart,
      path: "/cart",
      badge: 2,
      gradient: "from-lime-400 to-lime-600",
      description: "Ready to order",
    },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  const userMenuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-300 
        ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-2xl"
            : "bg-gradient-to-r from-white/80 to-emerald-50/50 backdrop-blur-sm"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center py-">
          {/* Logo with Advanced Animation */}
          <motion.div
            whileHover={{
              rotate: [0, -5, 5, -5, 0],
              scale: 1.05,
            }}
            className="flex items-center group"
          >
            <Link to="/" className="flex items-center my-2 space-x-4 group">
              <div className="relative w-14 h-14">
                <motion.div
                  className="
                    absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 
                    rounded-2xl shadow-lg transform transition-all duration-500
                    group-hover:rotate-6 group-hover:scale-110
                  "
                  initial={{ rotate: 0, scale: 1 }}
                  whileHover={{
                    rotate: 6,
                    scale: 1.1,
                    transition: { duration: 0.3 },
                  }}
                />
                <div
                  className="
                    absolute inset-0 flex items-center justify-center
                    text-white text-3xl font-bold tracking-wider
                  "
                >
                  FA
                </div>
              </div>
              <span
                className="text-3xl font-extrabold text-emerald-800 
                group-hover:text-emerald-600 transition-colors"
              >
                FoodApp
              </span>
            </Link>
          </motion.div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center flex-grow mx-8 max-w-xl"
          >
            <div className="relative w-full group">
              <motion.input
                ref={searchInputRef}
                type="text"
                placeholder="Craving something? Search dishes, cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                whileFocus={{
                  scale: 1.02,
                  boxShadow: "0 0 0 4px rgba(16, 185, 129, 0.3)",
                }}
                className="
                  w-full  p-2 m-4
                  border-2 border-emerald-200 rounded-full 
                  focus:outline-none ring-4 ring-emerald-500/30 
                  transition duration-300 
                  text-emerald-800 placeholder-emerald-400
                  hover:border-emerald-300
                "
              />
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                className="relative group"
                onHoverStart={() => setHoveredItem(index)}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <Link
                  to={item.path}
                  className="
                    relative flex items-center space-x-2 
                    text-emerald-700 hover:text-emerald-900 
                    transition duration-300 
                    hover:bg-emerald-50 px-4 py-2 rounded-full
                    group
                  "
                >
                  <div className="relative">
                    <motion.div
                      className={`
                        absolute -inset-2 bg-gradient-to-br ${item.gradient}
                        opacity-0 group-hover:opacity-40 
                        rounded-full blur-lg 
                        transition-opacity duration-300
                      `}
                    />
                    <motion.div
                      whileHover={{
                        scale: 1.2,
                        rotate: [0, -10, 10, -10, 0],
                      }}
                    >
                      <item.icon
                        className="
                          w-6 h-6 
                          group-hover:scale-110 
                          transition-transform
                        "
                      />
                    </motion.div>
                    {item.badge && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="
                          absolute -top-2 -right-2 
                          bg-red-500 text-white 
                          text-xs rounded-full 
                          w-5 h-5 flex items-center justify-center
                        "
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </div>
                  <span className="text-sm font-semibold">{item.name}</span>
                </Link>
                <AnimatePresence>
                  {hoveredItem === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="
                        absolute bottom-[-50px] left-1/2 transform -translate-x-1/2
                        bg-white shadow-lg rounded-lg px-4 py-2
                        border border-emerald-100
                        text-sm text-emerald-700 text-center
                        whitespace-nowrap
                      "
                    >
                      {item.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Notifications */}
            <motion.button
              whileHover={{
                scale: 1.1,
                rotate: [0, -15, 15, -15, 0],
              }}
              className="
                relative text-emerald-700 hover:text-emerald-900 
                transition duration-300 p-2 rounded-full 
                hover:bg-emerald-50
              "
            >
              <Bell className="w-6 h-6" />
              {notifications > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="
                    absolute -top-1 -right-1 
                    bg-red-500 text-white 
                    text-xs rounded-full 
                    w-5 h-5 flex items-center justify-center
                  "
                >
                  {notifications}
                </motion.span>
              )}
            </motion.button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <motion.button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                whileHover={{ scale: 1.05 }}
                className="
                  flex items-center space-x-2 
                  bg-emerald-100 text-emerald-800 
                  px-4 py-2 rounded-full 
                  hover:bg-emerald-200 transition
                "
              >
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">Profile</span>
                <ChevronDown
                  className={`
                    w-4 h-4 transition-transform 
                    ${userMenuOpen ? "rotate-180" : ""}
                  `}
                />
              </motion.button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    variants={userMenuVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="
                      absolute right-0 top-full mt-2 
                      w-64 bg-white 
                      rounded-xl shadow-2xl 
                      border border-emerald-100 
                      overflow-hidden
                    "
                  >
                    <div className="p-4 bg-emerald-50 border-b border-emerald-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-emerald-200 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-emerald-800">
                            John Doe
                          </p>
                          <p className="text-xs text-emerald-600">
                            Premium Member
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      {[
                        { icon: Settings, text: "Settings", path: "/settings" },
                        { icon: Award, text: "Rewards", path: "/rewards" },
                      ].map((item) => (
                        <Link
                          key={item.text}
                          to={item.path}
                          className="
                            flex items-center space-x-3 
                            px-4 py-2 hover:bg-emerald-50 
                            text-emerald-700 hover:text-emerald-900
                          "
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="text-sm">{item.text}</span>
                        </Link>
                      ))}
                      <button
                        className="
                          w-full text-left flex items-center space-x-3 
                          px-4 py-2 hover:bg-red-50 
                          text-red-600 hover:text-red-800
                        "
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm">Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="
                text-emerald-600 hover:text-emerald-800 
                focus:outline-none transition-colors
              "
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu - Similar structure to previous version, but with updated styling */}
        {/* ... (you can keep the mobile menu implementation from the previous version with minor style updates) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: { duration: 0.3 },
              }}
              exit={{
                opacity: 0,
                height: 0,
                transition: { duration: 0.2 },
              }}
              className="
                        md:hidden absolute left-0 right-0 
                        bg-white shadow-lg 
                        overflow-hidden
                      "
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {/* Mobile Search */}
                <form onSubmit={handleSearchSubmit} className="px-4 mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search restaurants, dishes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="
                                w-full pl-10 pr-4 py-2 
                                border border-gray-300 rounded-full 
                                focus:outline-none focus:ring-2 focus:ring-green-500
                              "
                    />
                    <Search
                      className="
                                absolute left-3 top-1/2 transform -translate-y-1/2 
                                text-gray-400
                              "
                    />
                  </div>
                </form>

                {/* Mobile Navigation Items */}
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="
                              flex items-center space-x-3 px-4 py-3 
                              text-gray-700 hover:bg-green-50 
                              rounded-lg relative
                            "
                  >
                    <div className="relative">
                      <item.icon className="w-6 h-6" />
                      {item.badge && (
                        <span
                          className="
                                    absolute -top-2 -right-2 
                                    bg-red-500 text-white 
                                    text-xs rounded-full 
                                    w-5 h-5 flex items-center justify-center
                                  "
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-base font-medium">{item.name}</span>
                  </Link>
                ))}

                {/* Additional Mobile Menu Options */}
                <div className="border-t border-gray-200 pt-4">
                  <Link
                    to="/settings"
                    className="
                              flex items-center space-x-3 px-4 py-3 
                              text-gray-700 hover:bg-green-50 
                              rounded-lg
                            "
                  >
                    <Settings className="w-6 h-6" />
                    <span className="text-base font-medium">Settings</span>
                  </Link>
                  <button
                    className="
                              w-full text-left flex items-center space-x-3 
                              px-4 py-3 text-gray-700 
                              hover:bg-green-50 rounded-lg
                            "
                  >
                    <LogOut className="w-6 h-6 text-red-500" />
                    <span className="text-base font-medium text-red-500">
                      Logout
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
