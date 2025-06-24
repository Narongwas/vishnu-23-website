"use client";

import React from "react";
import BackgroundWithNoise from "@/components/BackgroundWithNoise";
import Image from "next/image";

const styleVars = {
  "--color-dark-blue": "#41415F",
  "--color-dark-gray": "#545456",
  "--color-red": "#A7271D",
  "--color-coral": "#C57564",
  "--color-yellow": "#F4D590",
  "--color-white": "#FFFFFF",
} as React.CSSProperties;

export default function ClientComponent() {
  return (
    <BackgroundWithNoise>
      <div
        className="font-bai"
        style={{
          ...styleVars,
          backgroundColor: "var(--color-coral)",
          minHeight: "100vh",
          fontSize: "16px",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(180deg, var(--color-red) 7.32%, var(--color-coral) 47.03%)",
            minHeight: "100vh",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <button
            style={{
              position: "absolute",
              top: "2.5rem",
              left: "1rem",
              width: "2.75rem",
              height: "2.75rem",
              backgroundColor: "var(--color-yellow)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className="font-icon"
              style={{
                color: "var(--color-red)",
                fontSize: "1.25rem",
              }}
            >
              arrow_back
            </span>
          </button>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
              paddingTop: "2.5rem",
            }}
          >
            <Image
              src="https://placehold.co/108x108"
              alt="profile"
              style={{
                height: "15vh",
                borderRadius: "9999px",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                textAlign: "center",
                color: "var(--color-white)",
                fontSize: "1.875rem",
                lineHeight: "2.25rem",
              }}
            >
              สมชาย
              <br />
              นามสกุลยาวจริง
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "var(--color-yellow)",
                  padding: "0.5rem 1rem",
                }}
              >
                <span
                  className="font-icon"
                  style={{ color: "var(--color-red)", fontSize: "1.25rem" }}
                >
                  edit
                </span>
                <span style={{ color: "var(--color-red)", fontWeight: "bold" }}>
                  แก้ไข
                </span>
              </button>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "var(--color-red)",
                  padding: "0.5rem 1rem",
                }}
              >
                <span
                  className="font-icon"
                  style={{ color: "var(--color-white)", fontSize: "1.25rem" }}
                >
                  logout
                </span>
                <span
                  style={{ color: "var(--color-white)", fontWeight: "bold" }}
                >
                  ออกจากระบบ
                </span>
              </button>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              maxWidth: "28rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{ color: "var(--color-white)", fontSize: "1.25rem" }}
              >
                เพื่อนของน้อง
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "var(--color-white)",
                  opacity: 0.8,
                  padding: "0.25rem 0.5rem",
                  width: "9rem",
                  borderRadius: "0.25rem",
                }}
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const query = e.currentTarget.search.value;
                    console.log("ค้นหา:", query);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%", // make form fill the parent
                    gap: "0.25rem",
                  }}
                >
                  <input
                    type="text"
                    name="search"
                    placeholder="ค้นหา"
                    style={{
                      flex: 1, // this makes the input fill remaining space
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                      color: "var(--color-red)",
                      fontFamily: "inherit",
                      fontSize: "0.875rem",
                      minWidth: 0, // avoids overflow
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      border: "none",
                      background: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      className="font-icon"
                      style={{ color: "var(--color-red)", fontSize: "1.25rem" }}
                    >
                      search
                    </span>
                  </button>
                </form>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "0.5rem",
              }}
            >
              {[
                "คราม",
                "น้ำเงิน",
                "เขียว",
                "เหลือง",
                "แสด",
                "แดง",
                "บลู",
                "กรีน",
                "ม่วง",
              ].map((name, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src="https://placehold.co/60x60"
                    alt={name}
                    style={{
                      height: "7.5vh",
                      borderRadius: "9999px",
                      objectFit: "cover",
                    }}
                  />
                  <span
                    style={{
                      color: "var(--color-white)",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      textAlign: "center",
                    }}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
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
            }}
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
                color: "var(--color-dark-blue)",
                fontSize: "2.25rem",
                fontWeight: 400,
                lineHeight: "2.5rem",
                textAlign: "center",
                zIndex: 10,
              }}
            >
              person_add
            </div>
            <div
              style={{
                color: "var(--color-dark-blue)",
                fontSize: "1rem",
                fontWeight: "bold",
                lineHeight: "1.5rem",
                textAlign: "center",
                zIndex: 10,
              }}
            >
              เพิ่มเพื่อน
            </div>
          </div>
        </div>
      </div>
    </BackgroundWithNoise>
  );
}
