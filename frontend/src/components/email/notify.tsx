import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  subject: string;
  body: string;
}

export function Notify({ name, email, subject, body }: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: "monospace",
        lineHeight: "1.8",
        fontSize: "15px",
        color: "#222",
        padding: "24px",
        backgroundColor: "#fffbe6",
        borderRadius: "10px",
        border: "2px dashed #ffa500",
      }}
    >
      <h1 style={{ fontSize: "20px", marginBottom: "20px", color: "#ff4500" }}>
        NEW FORM SUBMISSION OMG PANIK WTHH !?!!!?!
      </h1>

      <div
        style={{
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "6px",
          padding: "12px",
          marginBottom: "16px",
          whiteSpace: "pre-wrap",
        }}
      >
        <strong>👤 Name:</strong> {name}
        <br />
        <strong>📧 Email:</strong> {email}
        <br />
        <strong>📝 Subject:</strong> {subject}
        <br />
        <strong>💬 Message:</strong>
        <br />
        {body}
      </div>

      <p style={{ fontSize: "13px", color: "#888" }}>
        You’re seeing this because someone spammed the hell out of your form, or
        you’re just really popular. Either way, copy away 😎
      </p>
    </div>
  );
}
