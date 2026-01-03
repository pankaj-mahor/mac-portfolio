import { gsap } from "gsap";
import React from "react";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);
const FONT_WEIGHTS = {
  title: { min: 400, max: 900, default: 400 },
  subtitle: { min: 100, max: 400, default: 100 },
};

const renderText = (text, className, baseWeight = 400) => {
  return text.split("").map((char, index) => (
    <span
      key={index}
      className={className}
      style={{
        transitionDelay: `${index * 50}ms`,
        fontVariationSettings: `'wght' ${baseWeight}`,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setupTextHover = (container, type) => {
  if (!container) return;
  const letters = container.querySelectorAll("span");
  const {
    min,
    max,
    default: base,
  } = FONT_WEIGHTS[type === "title" ? "title" : "subtitle"];

  const animateLetter = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, {
      duration,
      fontVariationSettings: `'wght' ${weight}`,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (event) => {
    const { left, width } = container.getBoundingClientRect();
    const mouseX = event.clientX - left;

    letters.forEach((letter) => {
      // const letterRect = letter.getBoundingClientRect();
      // const letterCenterX = letterRect.left - (letterRect.width / 2) * left;
      // const distance = Math.abs(mouseX - letterCenterX);
      // const intensity = Math.exp(-(distance ** 2) / 1000);

      // const maxDistance = width / 2;
      // const weight =
      //   distance < maxDistance
      //     ? max - ((max - min) * distance) / maxDistance
      //     : base;

      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 20000);
      animateLetter(letter, min + (max - min) * intensity);
    });
  };
  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetter(letter, base, 0.3);
    });
  };
  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome = () => {
  const titleRef = React.useRef(null);
  const subTitleRef = React.useRef(null);

  useGSAP(() => {
    const titleCleanup = setupTextHover(titleRef.current, "title");
    const subTitleCleanup = setupTextHover(subTitleRef.current, "subtitle");
    return () => {
      titleCleanup();
      subTitleCleanup();
    };
  }, []);
  return (
    <section id="welcome">
      <p className="" ref={subTitleRef}>
        {renderText(
          "Hey, I'm Pankaj, welcome to my.",
          "text-3xl font-georama",
          100
        )}
      </p>
      <h1 ref={titleRef}>
        {renderText("Portfolio", "text-9xl italic font-georama", 400)}
      </h1>

      <div className="small-screen">
        <p>This portfolio is designed for desktop/tablet screens only.</p>
      </div>
    </section>
  );
};

export default Welcome;
