// Home.tsx
// React 19 + TypeScript + MUI
// Requires: @mui/material @mui/icons-material @emotion/react @emotion/styled
// Fonts (Playfair Display + Inter) are loaded via GlobalStyles @import below.

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  GlobalStyles,
  IconButton,
  Link,
  Stack,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";
import LocalParkingOutlinedIcon from "@mui/icons-material/LocalParkingOutlined";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

const AIRBNB_LINK = "https://www.airbnb.com/rooms/1603180174265456961";

const VRBO_LINK = "https://www.vrbo.com/5071000";

const DIRECT_BOOKING_LINK = "/book";

// Images
import Hero from "../assets/hero.avif";
import Salem from "../assets/salem.jpg";

import LivingRoom from "../assets/livingroom.avif";
import Bathroom from "../assets/bathroom.avif";
import Bedroom from "../assets/bedroom.avif";

import Backyard from "../assets/backyard.avif";

import BathroomSink from "../assets/bathroomsink.avif";
import BedroomTwo from "../assets/bedroomtwo.avif";
import Dining from "../assets/dining.avif";

import AvOne from "../assets/avatar.jpg";
import AvTwo from "../assets/avatarTwo.jpg";

import Airbnb from "../assets/airbnb.svg";
import Vrbo from "../assets/vrbo.svg";
import React from "react";
import type { TransitionProps } from "@mui/material/transitions";
import {
  FavoriteBorder,
  GppGoodOutlined,
  HolidayVillage,
  People,
} from "@mui/icons-material";

/* -------------------------------------------------------------------------- */
/*  Theme                                                                     */
/* -------------------------------------------------------------------------- */
const SERIF = `"Playfair Display", Georgia, "Times New Roman", serif`;
const SANS = `"Inter", system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;

const theme = createTheme({
  palette: {
    primary: { main: "#7C2D37" }, // maroon
    secondary: { main: "#2E3D2B" }, // deep green
    background: { default: "#F3EEE6", paper: "#FFFFFF" },
    text: { primary: "#2B2724", secondary: "#5B554F" },
  },
  typography: {
    fontFamily: SANS,
    h1: { fontFamily: SERIF, fontWeight: 600, lineHeight: 1.05 },
    h2: { fontFamily: SERIF, fontWeight: 600, lineHeight: 1.1 },
    h3: { fontFamily: SERIF, fontWeight: 600, lineHeight: 1.15 },
    h4: { fontFamily: SERIF, fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: 0.3 },
    body1: { lineHeight: 1.65 },
  },
  shape: { borderRadius: 10 },
});

/* -------------------------------------------------------------------------- */
/*  Scroll reveal hook + component                                            */
/* -------------------------------------------------------------------------- */
function useReveal<T extends HTMLElement>(rootMargin = "0px 0px -10% 0px") {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // if (typeof IntersectionObserver === "undefined") {
    //   setVisible(true);
    //   return;
    // }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return { ref, visible };
}

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  sx?: object;
};

function Reveal({ children, delay = 0, y = 26, sx }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : `translateY(${y}px)`,
        transition: `opacity .7s cubic-bezier(.22,.61,.36,1) ${delay}ms, transform .7s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
        willChange: "opacity, transform",
        "@media (prefers-reduced-motion: reduce)": {
          opacity: 1,
          transform: "none",
          transition: "none",
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

/* -------------------------------------------------------------------------- */
/*  Lazy image                                                                */
/* -------------------------------------------------------------------------- */
type ImgProps = {
  alt: string;
  src?: string;
  eager?: boolean;
  ratio?: string;
  radius?: number;
  sx?: object;
};

function Img({ alt, src, eager = false, ratio, radius = 10, sx }: ImgProps) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: ratio,
        overflow: "hidden",
        borderRadius: `${radius}px`,
        backgroundColor: "rgba(0,0,0,0.06)",
        ...sx,
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
        sx={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform .6s ease",
          "&:hover": { transform: "scale(1.04)" },
          "@media (prefers-reduced-motion: reduce)": {
            "&:hover": { transform: "none" },
          },
        }}
      />
    </Box>
  );
}

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                     */
/* -------------------------------------------------------------------------- */
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <Typography
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        color: "primary.main",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: 2,
        textTransform: "uppercase",
        "&::before": {
          content: '""',
          width: 26,
          height: 2,
          backgroundColor: "primary.main",
          display: "inline-block",
        },
      }}
    >
      {children}
    </Typography>
  );
}

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */
const NAV = ["Home", "About"];

const BADGES = [
  {
    icon: <DirectionsWalkIcon fontSize="small" />,
    big: "5 MIN WALK",
    small: "to Riverfront Park",
  },
  {
    icon: <LocalHospitalOutlinedIcon fontSize="small" />,
    big: "7 MIN WALK",
    small: "to Salem Hospital",
  },
  {
    icon: <PlaceOutlinedIcon fontSize="small" />,
    big: "10 MIN WALK",
    small: "to Downtown",
  },
];

const AMENITIES = [
  { icon: <BedOutlinedIcon />, title: "2 Bedroom", sub: "Sleeps 4 Guests" },
  { icon: <BathtubOutlinedIcon />, title: "1 Bathroom", sub: "Fresh & Clean" },
  {
    icon: <WifiOutlinedIcon />,
    title: "High-Speed WiFi",
    sub: "Work or Stream",
  },
  { icon: <KitchenOutlinedIcon />, title: "Full Kitchen", sub: "Cook & Dine" },
  {
    icon: <LocalParkingOutlinedIcon />,
    title: "Free Parking",
    sub: "On Premises",
  },
  {
    icon: <AcUnitOutlinedIcon />,
    title: "Air Conditioning",
    sub: "Year Round Comfort",
  },
];

const REVIEWS = [
  {
    name: "Eden",
    text: "“Place was great! Very clean and had everything we needed! Really enjoyed the backyard space!”",
    src: AvOne,
  },
  {
    name: "Jacqueline",
    text: "“This was honestly the BEST Airbnb I’ve ever stayed at. Renae was so kind and understanding and incredibly patient as we were navigating health challenges with my dad. Thank you so much for everything 💛💛💛”",
    src: AvTwo,
  },
];

const FOOTER = [
  { heading: "Company", links: ["About Us", "Contact"] },
  {
    heading: "Explore",
    links: ["Affiliate Shop", "Airbnb Revamp Services", "FAQs"],
  },
  {
    heading: "Resources",
    links: ["Privacy Policy"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Logo                                                                      */
/* -------------------------------------------------------------------------- */
function Logo({ light = false }: { light?: boolean }) {
  const color = light ? "#F3EEE6" : "#2B2724";
  return (
    <Stack
      direction="row"
      spacing={1.2}
      aria-label="Inspiring Joy LLC home"
      sx={{ alignItems: "center" }}
    >
      <WbSunnyOutlinedIcon sx={{ color: "#C9A24B" }} />
      <Box sx={{ lineHeight: 1 }}>
        <Typography
          sx={{
            fontFamily: SERIF,
            fontWeight: 700,
            letterSpacing: 3,
            fontSize: 16,
            color,
          }}
        >
          INSPIRING JOY
        </Typography>
        <Typography
          sx={{
            fontSize: 10,
            letterSpacing: 4,
            color,
            opacity: 0.75,
            textAlign: "center",
          }}
        >
          LLC
        </Typography>
      </Box>
    </Stack>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

/* -------------------------------------------------------------------------- */
/*  Home                                                                      */
/* -------------------------------------------------------------------------- */
export default function Home() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const heroAnim = (delay: number) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "none" : "translateY(28px)",
    transition: `opacity .8s ease ${delay}ms, transform .8s ease ${delay}ms`,
    "@media (prefers-reduced-motion: reduce)": {
      opacity: 1,
      transform: "none",
      transition: "none",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: { scrollBehavior: "smooth" },
          body: { backgroundColor: theme.palette.background.default },
          "*:focus-visible": {
            outline: `3px solid ${theme.palette.primary.main}`,
            outlineOffset: 2,
          },
        }}
      />

      {/* ------------------------------- Header ------------------------------- */}
      <AppBar
        position="sticky"
        elevation={0}
        color="transparent"
        sx={{
          backgroundColor: "rgba(243,238,230,0.7)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 1.5, gap: 2 }}>
            <Logo />
            <Box sx={{ flexGrow: 1 }} />
            <Stack
              component="nav"
              aria-label="Primary"
              direction="row"
              spacing={5}
              sx={{ display: "none", alignItems: "center" }}
            >
              {NAV.map((item, i) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  underline="none"
                  sx={{
                    color: "text.primary",
                    fontWeight: 600,
                    fontSize: 14,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    borderBottom:
                      i === 0 ? "2px solid" : "2px solid transparent",
                    borderColor: i === 0 ? "text.primary" : "transparent",
                    pb: 0.25,
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
            <Button
              variant="text"
              onClick={handleOpen}
              sx={{
                // ml: { xs: 0, md: 2 },
                px: 2.5,
                py: 1,
                // borderRadius: 0,
                borderRadius: 0.7,
                letterSpacing: 1,
              }}
            >
              CONTACT
            </Button>
            <Button
              variant="contained"
              href="#book-options"
              sx={{
                // ml: { xs: 0, md: 2 },
                px: 2.5,
                py: 1,
                // borderRadius: 0,
                borderRadius: 0.7,
                letterSpacing: 1,
              }}
            >
              BOOK
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Dialog
        open={open}
        slots={{ transition: Transition }}
        keepMounted
        onClose={handleClose}
        aria-labelledby="contact-dialog-title"
        aria-describedby="contact-dialog-description"
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            component: "form",
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const values = Object.fromEntries(data.entries());
              console.log("[v0] contact form submit:", values);
              handleClose();
            },
            sx: {
              borderRadius: 3,
              backgroundColor: "background.paper",
              // maroon accent bar across the top
              borderTop: "4px solid",
              borderColor: "primary.main",
              overflow: "hidden",
            },
          },
        }}
      >
        <DialogTitle
          id="contact-dialog-title"
          sx={{ pt: 4, px: { xs: 3, md: 4 }, pb: 0 }}
        >
          <Typography
            component="span"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              color: "primary.main",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              "&::before": {
                content: '""',
                width: 26,
                height: 2,
                backgroundColor: "primary.main",
                display: "inline-block",
              },
            }}
          >
            Get in Touch
          </Typography>
          <Typography
            sx={{
              fontFamily: `"Playfair Display", Georgia, serif`,
              fontWeight: 600,
              fontSize: { xs: 26, md: 32 },
              color: "text.primary",
              mt: 1.5,
            }}
          >
            Let&apos;s Plan Your Stay
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ px: { xs: 3, md: 4 }, pt: 2 }}>
          <DialogContentText
            id="contact-dialog-description"
            sx={{ color: "text.secondary", mb: 3 }}
          >
            Have a question about Wine &amp; City Retreat or ready to book? Send
            us a note and we&apos;ll get back to you shortly.
          </DialogContentText>

          <Stack spacing={2.5}>
            <TextField
              name="name"
              label="Full Name"
              placeholder="Jane Doe"
              required
              fullWidth
              autoFocus
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5}>
              <TextField
                name="email"
                type="email"
                label="Email"
                placeholder="jane@email.com"
                required
                fullWidth
              />
              <TextField
                name="phone"
                type="tel"
                label="Phone Number"
                placeholder="(555) 000-0000"
                fullWidth
                inputMode="tel"
              />
            </Stack>

            <TextField
              name="message"
              label="Message"
              placeholder="Tell us about your trip, dates, or any questions..."
              required
              fullWidth
              multiline
              minRows={4}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: { xs: 3, md: 4 }, pb: 3.5, pt: 1, gap: 1 }}>
          <Button
            onClick={handleClose}
            color="inherit"
            sx={{
              borderRadius: 0.7,
              px: 3,
              py: 1.1,
              color: "text.secondary",
              letterSpacing: 1,
            }}
          >
            CANCEL
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ borderRadius: 0.7, px: 4, py: 1.1, letterSpacing: 1 }}
          >
            SEND
          </Button>
        </DialogActions>
      </Dialog>

      <Box component="main">
        {/* -------------------------------- Hero -------------------------------- */}
        <Box
          component="section"
          aria-label="Introduction"
          sx={{
            position: "relative",
            minHeight: { xs: 520, md: 640 },
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ position: "absolute", inset: 0 }}>
            <Img
              alt="Bright modern kitchen and dining area of the rental"
              eager
              radius={0}
              sx={{ height: "100%" }}
              src={Hero}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(20,16,14,0.72) 0%, rgba(20,16,14,0.45) 45%, rgba(20,16,14,0.15) 100%)",
              }}
            />
          </Box>

          <Container
            maxWidth="lg"
            sx={{
              position: "relative",
              color: "#F3EEE6",
              py: { xs: 8, md: 0 },
            }}
          >
            <Box sx={{ maxWidth: 620 }}>
              <Typography
                sx={{
                  ...heroAnim(80),
                  fontFamily: SERIF,
                  fontSize: 22,
                  mb: 0.5,
                }}
              >
                Wine &amp; City Retreat
              </Typography>
              <Typography
                sx={{
                  ...heroAnim(180),
                  letterSpacing: 3,
                  fontSize: 14,
                  fontWeight: 600,
                  opacity: 0.9,
                  mb: 3,
                }}
              >
                YOUR HOME IN DOWNTOWN SALEM
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  ...heroAnim(280),
                  fontSize: { xs: 46, sm: 64, md: 82 },
                  mb: 4,
                }}
              >
                Relax. Explore.
                <br />
                Be Our Guest.
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* ------------------------------ Welcome ------------------------------- */}
        <Box component="section" id="about" sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: { xs: 5, md: 8 },
                alignItems: "center",
              }}
            >
              <Reveal>
                <Eyebrow>Welcome to Wine &amp; City Retreat</Eyebrow>
                <Typography
                  variant="h2"
                  sx={{ fontSize: { xs: 34, md: 44 }, mt: 2, mb: 3 }}
                >
                  A Peaceful Stay in the Heart of Salem
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ mb: 4, maxWidth: 460 }}
                >
                  Wine &amp; City Retreat is a thoughtfully designed space just
                  steps from the Willamette River, Riverfront Park, and downtown
                  Salem. Whether you&apos;re here for work, a getaway, or to
                  explore the valley, you&apos;ll feel right at home.
                </Typography>
                <Button
                  variant="outlined"
                  color="inherit"
                  href={AIRBNB_LINK}
                  sx={{
                    borderRadius: 0.7,
                    px: 3,
                    py: 1.3,
                    borderColor: "rgba(0,0,0,0.35)",
                    letterSpacing: 1,
                  }}
                >
                  LEARN MORE ABOUT THE SPACE
                </Button>
              </Reveal>

              <Reveal delay={120}>
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <Img
                    alt="Aerial view of downtown Salem at dusk"
                    ratio="16 / 11"
                    radius={12}
                    src={Salem}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      backgroundColor: "rgba(124,45,55,0.92)",
                      color: "#F3EEE6",
                    }}
                  >
                    {BADGES.map((b, i) => (
                      <Stack
                        key={b.big}
                        direction="row"
                        spacing={1}
                        sx={{
                          p: { xs: 1.2, md: 1.6 },
                          alignItems: "center",
                          borderLeft:
                            i === 0
                              ? "none"
                              : "1px solid rgba(255,255,255,0.18)",
                        }}
                      >
                        {b.icon}
                        <Box>
                          <Typography
                            sx={{
                              fontSize: 12,
                              fontWeight: 700,
                              letterSpacing: 0.5,
                            }}
                          >
                            {b.big}
                          </Typography>
                          <Typography sx={{ fontSize: 11, opacity: 0.85 }}>
                            {b.small}
                          </Typography>
                        </Box>
                      </Stack>
                    ))}
                  </Box>
                </Box>
              </Reveal>
            </Box>
          </Container>
        </Box>

        {/* ----------------------------- Amenities ------------------------------ */}
        <Container maxWidth="lg">
          <Reveal>
            <Box
              sx={{
                backgroundColor: "rgba(124,45,55,0.06)",
                borderRadius: 3,
                px: { xs: 2, md: 3 },
                py: { xs: 3, md: 3.5 },
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2,1fr)",
                  sm: "repeat(3,1fr)",
                  md: "repeat(6,1fr)",
                },
              }}
            >
              {AMENITIES.map((a, i) => (
                <Stack
                  key={a.title}
                  spacing={0.5}
                  sx={{
                    px: 1,
                    alignItems: "center",
                    py: { xs: 1.5, md: 0 },
                    textAlign: "center",
                    borderLeft: {
                      md: i % 6 === 0 ? "none" : "1px solid rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <Box
                    sx={{ color: "primary.main", "& svg": { fontSize: 26 } }}
                  >
                    {a.icon}
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                    {a.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontSize: 12 }}>
                    {a.sub}
                  </Typography>
                </Stack>
              ))}
            </Box>
          </Reveal>
        </Container>

        {/* ------------------------------ Comfort ------------------------------- */}
        <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1.15fr 0.85fr" },
                gap: { xs: 5, md: 8 },
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 2,
                }}
              >
                {[
                  { src: LivingRoom, text: "Living room seating area" },
                  { src: Bathroom, text: "Bathroom vanity" },
                  { src: Bedroom, text: "Primary bedroom" },
                ].map((label, i) => (
                  <Reveal key={label.text} delay={i * 120}>
                    <Img
                      alt={label.text}
                      src={label.src}
                      ratio="3 / 4"
                      radius={12}
                    />
                  </Reveal>
                ))}
              </Box>

              <Reveal delay={120}>
                <Eyebrow>Designed for Comfort</Eyebrow>
                <Typography
                  variant="h2"
                  sx={{ fontSize: { xs: 32, md: 42 }, mt: 2, mb: 3 }}
                >
                  Thoughtful Details. Modern Comfort.
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 4 }}>
                  Every detail at Wine &amp; City Retreat has been carefully
                  curated to make your stay comfortable, relaxing, and
                  memorable.
                </Typography>
                <Button
                  variant="outlined"
                  color="inherit"
                  target="_blank"
                  href="https://www.airbnb.com/rooms/1603180174265456961/amenities"
                  sx={{
                    borderRadius: 0.7,
                    px: 3,
                    py: 1.3,
                    borderColor: "rgba(0,0,0,0.35)",
                    letterSpacing: 1,
                  }}
                >
                  EXPLORE AMENITIES
                </Button>
              </Reveal>
            </Box>
          </Container>
        </Box>

        {/* ------------------------------ Reviews ------------------------------- */}
        <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 12 } }}>
          <Reveal>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              {/* Text side */}
              <Box
                sx={{
                  backgroundColor: "primary.main",
                  color: "#F3EEE6",
                  display: "flex",
                  flexDirection: "column",
                  p: { xs: 4, md: 5 },
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ mb: 3, alignItems: "center" }}
                >
                  <Typography
                    sx={{ fontWeight: 700, letterSpacing: 1, fontSize: 14 }}
                  >
                    GUESTS LOVE THEIR STAY
                  </Typography>
                  <Stack direction="row" sx={{ color: "#E7B65B" }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarRoundedIcon key={i} sx={{ fontSize: 18 }} />
                    ))}
                  </Stack>
                </Stack>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 3,
                  }}
                >
                  {REVIEWS.map((r) => (
                    <Box key={r.name}>
                      <Typography
                        sx={{
                          fontSize: 14,
                          lineHeight: 1.6,
                          opacity: 0.95,
                          mb: 2,
                        }}
                      >
                        {r.text}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        style={{ alignItems: "center" }}
                      >
                        <Avatar
                          sx={{ width: 34, height: 34 }}
                          alt={`Guest ${r.name}`}
                          src={r.src}
                        />
                        <Typography
                          sx={{
                            fontSize: 14,
                            marginTop: "auto !important",
                            marginBottom: "auto !important",
                          }}
                        >
                          - {r.name}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Box>

                <Button
                  variant="outlined"
                  href="https://www.airbnb.com/rooms/1603180174265456961/reviews?&review_page_entrypoint=show_all"
                  target="_blank"
                  sx={{
                    mt: 4,
                    borderRadius: 0.7,
                    mx: "auto",
                    px: 3,
                    py: 1.2,
                    textAlign: "center",
                    color: "#F3EEE6",
                    borderColor: "rgba(243,238,230,0.6)",
                    letterSpacing: 1,
                    "&:hover": {
                      borderColor: "#F3EEE6",
                      backgroundColor: "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  VIEW ALL REVIEWS ON AIRBNB
                </Button>
              </Box>

              {/* Image side */}
              <Img
                alt="Cozy backyard patio with fire pit and string lights"
                radius={0}
                sx={{ minHeight: { xs: 240, md: "100%" } }}
                src={Backyard}
              />
            </Box>
          </Reveal>
        </Container>

        {/* --------------------------- Booking Options --------------------------- */}
        <Box
          component="section"
          id="booking"
          sx={{
            py: { xs: 8, md: 12 },
            backgroundColor: "#F3EEE6",
          }}
        >
          <Container maxWidth="lg">
            <Reveal>
              <Box
                sx={{
                  textAlign: "center",
                  maxWidth: 760,
                  mx: "auto",
                  mb: { xs: 5, md: 7 },
                }}
              >
                <Eyebrow>Choose Your Booking Experience</Eyebrow>

                <Typography
                  variant="h2"
                  id="book-options"
                  sx={{
                    fontSize: { xs: 34, sm: 44, md: 56 },
                    mt: 2,
                    mb: 3,
                    color: "#142F2A",
                  }}
                >
                  Same Great Stay.
                  <br />
                  Your Choice.
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: 15, md: 17 },
                    maxWidth: 620,
                    mx: "auto",
                    lineHeight: 1.8,
                  }}
                >
                  Book your stay through the platform you know and love, or
                  reserve directly with us and enjoy exclusive savings.
                </Typography>
              </Box>
            </Reveal>

            {/* Booking Cards */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(3, minmax(0, 1fr))",
                },
                gap: { xs: 3, md: 2.5 },
                alignItems: "stretch",
              }}
            >
              {/* Airbnb */}
              <Reveal delay={0} sx={{ height: "100%" }}>
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(43,39,36,0.10)",
                    borderRadius: 3,
                    p: { xs: 3, sm: 4 },
                    boxShadow: "0 8px 30px rgba(43,39,36,0.04)",
                    transition: "transform .3s ease, box-shadow .3s ease",
                    "&:hover": {
                      transform: { md: "translateY(-5px)" },
                      boxShadow: "0 16px 40px rgba(43,39,36,0.10)",
                    },
                  }}
                >
                  <Stack
                    spacing={1}
                    sx={{
                      alignItems: "center",
                      textAlign: "center",
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        height: 76,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 1,
                      }}
                    >
                      <img src={Airbnb} style={{ width: 135 }} />
                    </Box>

                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: { xs: 23, md: 25 },
                        color: "#142F2A",
                      }}
                    >
                      Book with Airbnb
                    </Typography>

                    <Typography
                      color="text.secondary"
                      sx={{ fontSize: 14, lineHeight: 1.7 }}
                    >
                      Enjoy the convenience of booking through Airbnb.
                    </Typography>
                  </Stack>

                  <Stack spacing={2} sx={{ mb: 4 }}>
                    {[
                      "Secure booking & payment",
                      "Guest support through Airbnb",
                      "Review and reservation history",
                    ].map((benefit) => (
                      <Stack
                        key={benefit}
                        direction="row"
                        spacing={1.5}
                        style={{ alignItems: "flex-start" }}
                      >
                        <Box
                          sx={{
                            color: "#2E6B5A",
                            fontSize: 17,
                            lineHeight: 1.5,
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </Box>

                        <Typography
                          color="text.secondary"
                          sx={{ fontSize: 13.5, lineHeight: 1.5 }}
                        >
                          {benefit}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>

                  <Box sx={{ flexGrow: 1 }} />

                  <Button
                    fullWidth
                    variant="contained"
                    href={AIRBNB_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      mt: 2,
                      py: 1.5,
                      borderRadius: 0.7,
                      backgroundColor: "#FF385C",
                      color: "#FFFFFF",
                      fontSize: 13,
                      letterSpacing: 0.3,
                      "&:hover": {
                        backgroundColor: "#E31C5F",
                      },
                    }}
                  >
                    Book on Airbnb →
                  </Button>
                </Box>
              </Reveal>

              {/* VRBO */}
              <Reveal delay={100} sx={{ height: "100%" }}>
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(43,39,36,0.10)",
                    borderRadius: 3,
                    p: { xs: 3, sm: 4 },
                    boxShadow: "0 8px 30px rgba(43,39,36,0.04)",
                    transition: "transform .3s ease, box-shadow .3s ease",
                    "&:hover": {
                      transform: { md: "translateY(-5px)" },
                      boxShadow: "0 16px 40px rgba(43,39,36,0.10)",
                    },
                  }}
                >
                  <Stack
                    spacing={1}
                    sx={{
                      alignItems: "center",
                      textAlign: "center",
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        height: 76,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 1,
                      }}
                    >
                      <img src={Vrbo} style={{ width: 125 }} />
                    </Box>

                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: { xs: 23, md: 25 },
                        color: "#142F2A",
                      }}
                    >
                      Book with VRBO
                    </Typography>

                    <Typography
                      color="text.secondary"
                      sx={{ fontSize: 14, lineHeight: 1.7 }}
                    >
                      Find your stay through the Vrbo booking platform.
                    </Typography>
                  </Stack>

                  <Stack spacing={2} sx={{ mb: 4 }}>
                    {[
                      "Secure booking & payment",
                      "Guest support through Vrbo",
                      "Reservation management",
                    ].map((benefit) => (
                      <Stack
                        key={benefit}
                        direction="row"
                        spacing={1.5}
                        style={{ alignItems: "flex-start" }}
                      >
                        <Box
                          sx={{
                            color: "#2E6B5A",
                            fontSize: 17,
                            lineHeight: 1.5,
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </Box>

                        <Typography
                          color="text.secondary"
                          sx={{ fontSize: 13.5, lineHeight: 1.5 }}
                        >
                          {benefit}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>

                  <Box sx={{ flexGrow: 1 }} />

                  <Button
                    fullWidth
                    variant="contained"
                    href={VRBO_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      mt: 2,
                      py: 1.5,
                      borderRadius: 0.7,
                      backgroundColor: "#1B4B8F",
                      color: "#FFFFFF",
                      fontSize: 13,
                      letterSpacing: 0.3,
                      "&:hover": {
                        backgroundColor: "#153A70",
                      },
                    }}
                  >
                    Book on VRBO →
                  </Button>
                </Box>
              </Reveal>

              {/* Direct Booking - Featured */}
              <Reveal delay={200} sx={{ height: "100%" }}>
                <Box
                  sx={{
                    position: "relative",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#143D34",
                    color: "#F3EEE6",
                    borderRadius: 3,
                    p: { xs: 3, sm: 4 },
                    overflow: "hidden",
                    boxShadow: "0 12px 40px rgba(20,61,52,0.16)",
                    transition: "transform .3s ease, box-shadow .3s ease",
                    "&:hover": {
                      transform: { md: "translateY(-5px)" },
                      boxShadow: "0 20px 48px rgba(20,61,52,0.25)",
                    },
                  }}
                >
                  {/* Decorative pattern */}
                  <Box
                    sx={{
                      position: "absolute",
                      width: 260,
                      height: 260,
                      right: -120,
                      bottom: -130,
                      borderRadius: "50%",
                      border: "1px solid rgba(169,234,195,0.14)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Savings badge */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      backgroundColor: "#A9EAC3",
                      color: "#143D34",
                      px: 2,
                      py: 1.2,
                      borderBottomLeftRadius: 12,
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: 0.5,
                    }}
                  >
                    SAVE 10%
                  </Box>

                  <Stack
                    spacing={1}
                    sx={{
                      alignItems: "center",
                      textAlign: "center",
                      mb: 3,
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        height: 76,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 1,
                      }}
                    >
                      <HolidayVillage style={{ fontSize: 55 }} />
                    </Box>

                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: { xs: 23, md: 25 },
                        color: "#F3EEE6",
                      }}
                    >
                      Book Direct
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 14,
                        lineHeight: 1.7,
                        color: "rgba(243,238,230,0.82)",
                      }}
                    >
                      The best value, right here.
                      <br />
                      Save 10% when you book directly with us.
                    </Typography>
                  </Stack>

                  <Stack spacing={2} sx={{ mb: 4 }}>
                    {[
                      "Save 10% on your stay",
                      "Direct communication with your host",
                      "A more personal booking experience",
                    ].map((benefit) => (
                      <Stack
                        key={benefit}
                        direction="row"
                        spacing={1.5}
                        style={{ alignItems: "flex-start" }}
                      >
                        <Box
                          sx={{
                            color: "#A9EAC3",
                            fontSize: 17,
                            lineHeight: 1.5,
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </Box>

                        <Typography
                          sx={{
                            fontSize: 13.5,
                            lineHeight: 1.5,
                            color: "rgba(243,238,230,0.9)",
                          }}
                        >
                          {benefit}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>

                  <Box sx={{ flexGrow: 1 }} />

                  <Button
                    fullWidth
                    variant="contained"
                    href={DIRECT_BOOKING_LINK}
                    sx={{
                      mt: 2,
                      py: 1.5,
                      borderRadius: 0.7,
                      backgroundColor: "#A9EAC3",
                      color: "#143D34",
                      fontSize: 13,
                      fontWeight: 800,
                      letterSpacing: 0.2,
                      "&:hover": {
                        backgroundColor: "#C5F3D7",
                      },
                    }}
                  >
                    Book Direct & Save 10% →
                  </Button>
                </Box>
              </Reveal>
            </Box>

            {/* Trust message */}
            <Reveal delay={250}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 4 }}
                sx={{
                  mt: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Stack direction="row" style={{ alignItems: "center", gap: 6 }}>
                  <GppGoodOutlined />
                  <Typography
                    color="text.secondary"
                    sx={{ fontSize: 12.5, letterSpacing: 0.2 }}
                  >
                    Secure Booking
                  </Typography>
                </Stack>

                <Stack direction="row" style={{ alignItems: "center", gap: 6 }}>
                  <People />
                  <Typography
                    color="text.secondary"
                    sx={{ fontSize: 12.5, letterSpacing: 0.2 }}
                  >
                    Your Choice, Your Stay
                  </Typography>
                </Stack>

                <Stack direction="row" style={{ alignItems: "center", gap: 6 }}>
                  <FavoriteBorder />
                  <Typography
                    color="text.secondary"
                    sx={{ fontSize: 12.5, letterSpacing: 0.2 }}
                  >
                    A Stay to Remember
                  </Typography>
                </Stack>
              </Stack>
            </Reveal>
          </Container>
        </Box>

        {/* ------------------------------ Gallery ------------------------------- */}
        <Box component="section" id="gallery" sx={{ pb: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gridAutoRows: { xs: 200, md: 250 },
                gap: 2,
              }}
            >
              {[
                { src: Dining, label: "Dining area for four", col: 1, row: 1 },

                {
                  src: BathroomSink,
                  label: "Bathroom sink and vanity",
                  col: 2,
                  row: 1,
                },
                {
                  src: BedroomTwo,
                  label: "Guest Master Bedroom with Bed",
                  col: 3,
                  row: 1,
                },
                {
                  src: Bedroom,
                  label: "Another Guest Master bedroom",
                  col: 1,
                  row: 1,
                },
                {
                  src: LivingRoom,
                  label: "Living room with seating area",
                  col: 1,
                  row: 1,
                },
              ].map((g, i) => (
                <Reveal
                  key={g.label}
                  delay={i * 80}
                  sx={{
                    gridColumn: {
                      md: i === 0 || i === 5 ? "span 1" : "span 1",
                    },
                    gridRow: { md: i === 0 || i === 5 ? "span 2" : "span 1" },
                    height: "100%",
                  }}
                >
                  <Img
                    src={g.src}
                    alt={g.label}
                    radius={12}
                    sx={{ height: "100%" }}
                  />
                </Reveal>
              ))}
            </Box>

            <Box sx={{ textAlign: "center", mt: 5 }}>
              <Button
                variant="outlined"
                color="inherit"
                href={
                  "https://www.airbnb.com/rooms/1603180174265456961?modal=PHOTO_TOUR_SCROLLABLE"
                }
                target="_blank"
                sx={{
                  borderRadius: 0.7,
                  px: 4,
                  py: 1.4,
                  borderColor: "rgba(0,0,0,0.35)",
                  letterSpacing: 1,
                }}
              >
                VIEW ENTIRE GALLERY ON AIRBNB
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* ------------------------------- Footer ------------------------------- */}
      <Box
        component="footer"
        id="contact"
        sx={{ borderTop: "1px solid rgba(0,0,0,0.08)", py: { xs: 6, md: 8 } }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1.3fr repeat(3, 1fr)",
              },
              gap: { xs: 4, md: 6 },
            }}
          >
            <Box>
              <Logo />
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                {[
                  {
                    icon: <InstagramIcon fontSize="small" />,
                    label: "Instagram",
                  },
                  {
                    icon: <FacebookIcon fontSize="small" />,
                    label: "Facebook",
                  },
                  {
                    icon: <EmailOutlinedIcon fontSize="small" />,
                    label: "Email us",
                  },
                ].map((s) => (
                  <IconButton
                    key={s.label}
                    aria-label={s.label}
                    href="#"
                    size="small"
                    sx={{
                      border: "1px solid rgba(0,0,0,0.15)",
                      color: "text.primary",
                    }}
                  >
                    {s.icon}
                  </IconButton>
                ))}
              </Stack>
            </Box>

            {FOOTER.map((col) => (
              <Box key={col.heading}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: 1.5,
                    mb: 2,
                  }}
                >
                  {col.heading.toUpperCase()}
                </Typography>
                <Stack spacing={1.2}>
                  {col.links.map((l) => (
                    <Link
                      key={l}
                      //   href="#"
                      onClick={() => {
                        if (l === "Contact") {
                          handleOpen();
                        }
                      }}
                      underline="none"
                      color="text.secondary"
                      sx={{
                        fontSize: 14,
                        "&:hover": { color: "primary.main", cursor: "pointer" },
                      }}
                    >
                      {l}
                    </Link>
                  ))}
                </Stack>
              </Box>
            ))}
          </Box>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              mt: 6,
              pt: 3,
              borderTop: "1px solid rgba(0,0,0,0.08)",
              display: "flex",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <Typography color="text.secondary" sx={{ fontSize: 13 }}>
              © {new Date().getFullYear()} Inspiring Joy LLC. All rights
              reserved.
            </Typography>

            <Typography color="text.secondary" sx={{ fontSize: 13 }}>
              Website by{" "}
              <a
                style={{ textDecoration: "none", color: "#000000" }}
                href="https://www.boesebyte.software/"
                target="_blank"
              >
                Boese Byte Software
              </a>
            </Typography>
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
