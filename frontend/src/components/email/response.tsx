import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
}

export function Respond({ firstName }: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        fontSize: "16px",
        color: "#333",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ fontSize: "22px", marginBottom: "10px" }}>
        Hi {firstName},
      </h1>

      <p style={{ margin: "0 0 16px 0" }}>
        Thanks a lot for reaching out through my website! I’ve received your
        message and will get back to you as soon as possible.
      </p>

      <p style={{ margin: "0 0 16px 0" }}>
        In the meantime, feel free to check out some of my recent work over at{" "}
        <a
          href="https://ahaana.arinji.com"
          target="_blank"
          style={{ color: "#1a73e8", textDecoration: "none" }}
        >
          ahaana.arinji.com
        </a>{" "}
        or connect with me on socials if you haven’t already.
      </p>

      <p style={{ margin: "0 0 16px 0" }}>
        Talk soon!
        <br />– Ahaana
      </p>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #ddd",
          margin: "24px 0",
        }}
      />

      <p style={{ fontSize: "14px", color: "#888" }}>
        This is an auto-generated email to confirm your message was received. No
        need to reply to this message.
      </p>
    </div>
  );
}
