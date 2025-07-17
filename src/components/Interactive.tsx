"use client";

import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types/misc";
import { motion } from "motion/react";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLElement>;
};

const Interactive: StyleableFC<Props> = ({
  children,
  disabled = false,
  href,
  type = "button",
  onClick,
  className,
  style,
  ...props
}) => {
  const rippleContainerRef = useRef<HTMLSpanElement>(null);

  function getRipplePosition({
    clientX,
    clientY,
  }: {
    clientX: number;
    clientY: number;
  }): [number, number] {
    const rect = rippleContainerRef.current?.getBoundingClientRect();
    if (!rect) return [0, 0];
    return [clientX - rect.left, clientY - rect.top];
  }

  function startRipple(x: number, y: number) {
    const rippleContainer = rippleContainerRef.current;
    if (!rippleContainer) return;

    const ripple = document.createElement("span");
    ripple.className =
      "absolute aspect-square rounded-full opacity-25 pointer-events-none bg-current";
    ripple.style.transform = `scale(0)`;
    ripple.style.transition = `transform 0.5s, opacity 0.5s`;
    rippleContainer.appendChild(ripple);

    const rect = rippleContainer.getBoundingClientRect();
    const diameter = Math.max(rect.width * 4, 320);
    const blurRadius = Math.max(Math.round(rect.width / 2), 4);

    ripple.style.left = `${x - diameter / 2}px`;
    ripple.style.top = `${y - diameter / 2}px`;
    ripple.style.width = `${diameter}px`;
    ripple.style.height = `${diameter}px`;
    ripple.style.filter = `blur(${blurRadius}px)`;
    ripple.style.transform = `scale(0)`;
    ripple.style.transition = `transform 0.5s, opacity 0.5s`;

    void ripple.offsetHeight;

    ripple.style.transform = `scale(1)`;
    ripple.style.opacity = "0";

    setTimeout(() => ripple.remove(), 500);
  }

  const MotionElement = href ? motion.a : motion.button;

  return (
    <MotionElement
      href={href}
      type={type}
      tabIndex={disabled ? -1 : 0}
      onClick={onClick}
      onTapStart={(event: TouchEvent | MouseEvent) => {
        if (disabled) return;
        const { clientX, clientY } =
          "touches" in event && event.touches.length
            ? event.touches[0]
            : (event as MouseEvent);

        const [x, y] = getRipplePosition({ clientX, clientY });
        startRipple(x, y);
      }}
      onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
        if (!["Enter", " "].includes(event.key) || disabled) return;
        const rect = rippleContainerRef.current?.getBoundingClientRect();
        if (!rect) return;
        startRipple(rect.width / 2, rect.height / 2);
      }}
      className={cn(
        "relative cursor-pointer overflow-hidden transition-all duration-150",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:opacity-0",
        'before:bg-current before:transition-opacity before:duration-150 before:ease-out before:content-[""]',
        "hover:before:opacity-[0.08] focus-visible:before:opacity-[0.10] active:before:opacity-[0.10]",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      style={style}
      disabled={disabled}
      {...props}
    >
      <span
        aria-hidden
        ref={rippleContainerRef}
        className="pointer-events-none absolute inset-0 z-10"
      />
      {children}
    </MotionElement>
  );
};

export default Interactive;
