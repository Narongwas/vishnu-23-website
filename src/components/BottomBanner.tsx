"use client";

interface BottomBannerProps {
  icon: string;
  text: string;
  onClick?: () => void;
}

export default function BottomBanner({
  icon,
  text,
  onClick,
}: BottomBannerProps) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "28rem",
        height: "140px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        zIndex: 10,
        overflow: "visible",
        border: "none",
        background: "none",
        cursor: "pointer",
        textAlign: "center",
      }}
      type="button"
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          width: "120vw",
          height: "200px",
          backgroundColor: "var(--color-yellow)",
          borderTopLeftRadius: "9999px",
          borderTopRightRadius: "9999px",
          transform: "translateX(-50%) translateY(30%)",
          zIndex: -10,
        }}
      />
      <div
        className="font-icon"
        style={{
          color: "var(--color-blue)",
          fontSize: "2.25rem",
          fontWeight: 400,
          lineHeight: "2.5rem",
          zIndex: 10,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          color: "var(--color-blue)",
          fontSize: "1rem",
          fontWeight: "bold",
          lineHeight: "1.5rem",
          zIndex: 10,
        }}
      >
        {text}
      </div>
    </button>
  );
}
