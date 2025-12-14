gsap.registerPlugin(ScrollTrigger);

gsap.to(".scale-element", {
  scale: 1.5, // Enlarges to 1.5x during scroll
  yPercent: -20, // Optional slight upward movement
  scrollTrigger: {
    trigger: "#scale-section",
    start: "top 80%", // Starts when top of section hits 80% from viewport top
    end: "bottom 20%", // Ends when bottom hits 20% from viewport top
    scrub: true, // Links animation directly to scroll position
    markers: true, // Remove in production
  },
});
