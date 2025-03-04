import { useState, useEffect, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faBriefcase,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Navbar.module.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const menuRef = useRef(null);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/", icon: faHome },
    { name: "About", path: "/about", icon: faUser },
    { name: "Projects", path: "/projects", icon: faBriefcase },
    { name: "Contact", path: "/contact", icon: faEnvelope },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          width: "100vw",
          left: 0,
          backgroundColor: scrolling ? "rgba(6,11,24, 0.9)" : "transparent",
          boxShadow: "none",
          transition: "background-color 0.3s ease-in-out",
          padding: "20px",
          zIndex: "1000",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
              fontFamily: "'Pacifico', cursive",
            }}
          >
            <span style={{ color: "#1e90ff" }} className={styles.navbarBar}>
              &lt;
            </span>
            <span className={styles.navbarLogo}>Eduard Milotai </span>
            <span style={{ color: "#1e90ff" }} className={styles.navbarBar}>
              /&gt;
            </span>
          </Link>

          {/* Meniu Desktop */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 4,
            }}
          >
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={index}
                  to={item.path}
                  style={{
                    color: isActive ? "#1e90ff" : "white",
                    textDecoration: "none",
                    fontSize: "1.2rem",
                    position: "relative",
                    paddingBottom: "5px",
                    borderBottom: isActive
                      ? "2px solid #1e90ff"
                      : "2px solid transparent",
                    transition: "border-bottom 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) =>
                    !isActive &&
                    (e.target.style.borderBottom = "2px solid white")
                  }
                  onMouseLeave={(e) =>
                    !isActive &&
                    (e.target.style.borderBottom = "2px solid transparent")
                  }
                >
                  {item.name}
                </Link>
              );
            })}
          </Box>

          {/* Buton Meniu Mobil */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ padding: "5px" }}
              onClick={handleMenuToggle}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Toolbar>

        {/* Meniu Mobil */}
        {menuOpen && (
          <Box
            ref={menuRef}
            sx={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "75%",
              height: "100%",
              background: "rgba(30, 41, 59, 0.95)",
              backdropFilter: "blur(8px)",
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              transition: "right 0.3s ease-in-out",
              zIndex: 1000,
              color: "white",
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                alignSelf: "flex-end",
                color: "white",
                marginBottom: "20px",
                marginTop: "7px",
              }}
            >
              <CloseIcon />
            </IconButton>

            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={index}
                  to={item.path}
                  onClick={handleClose}
                  style={{
                    textDecoration: "none",
                    width: "100%",
                  }}
                >
                  <MenuItem
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      padding: "15px",
                      borderRadius: "8px",
                      transition: "background 0.3s ease-in-out",
                      backgroundColor: isActive
                        ? "rgba(30, 144, 255, 0.3)"
                        : "transparent",
                      "&:hover": {
                        background: "rgba(30, 144, 255, 0.5)",
                      },
                    }}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      style={{
                        color: isActive ? "#1e90ff" : "white",
                        fontSize: "1.3rem",
                        width: "28px",
                        textAlign: "center",
                      }}
                    />
                    <span
                      style={{
                        color: isActive ? "#1e90ff" : "white",
                        fontSize: "1.2rem",
                      }}
                    >
                      {item.name}
                    </span>
                  </MenuItem>
                </Link>
              );
            })}
          </Box>
        )}
      </AppBar>
    </Box>
  );
}

export default Navbar;
