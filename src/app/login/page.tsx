"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
    setShowModal(true);

    if (data.message === "Login successful") {
      if (data.token) {
        localStorage.setItem("auth-token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      setTimeout(() => {
        setShowModal(false);
        router.push("/");
      }, 1500);
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f0f2f5", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: 380, padding: 20, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.15)", background: "#fff", textAlign: "center" }}>
        <h1 style={{ fontSize: "40px", fontWeight: "bold", color: "#1877f2", marginBottom: 20 }}>facebook</h1>
        <h2 style={{ fontSize: 18, fontWeight: "600", marginBottom: 16 }}>Log in to Facebook</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input placeholder="Email address or phone number" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: 12, borderRadius: 6, border: "1px solid #ccd0d5", fontSize: 15 }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: 12, borderRadius: 6, border: "1px solid #ccd0d5", fontSize: 15 }} />
          <button type="submit" style={{ padding: 12, borderRadius: 6, border: "none", background: "#1877f2", color: "#fff", fontWeight: "bold", fontSize: 16, cursor: "pointer", marginTop: 4 }}>Log in</button>
        </form>
        <div style={{ marginTop: 14 }}>
          <Link href="#" style={{ fontSize: 14, color: "#1877f2", textDecoration: "none" }}>Forgotten account?</Link>
          <span style={{ margin: "0 5px", color: "#606770" }}>·</span>
          <Link href="/register" style={{ fontSize: 14, color: "#1877f2", textDecoration: "none" }}>Sign up for Facebook</Link>
        </div>
      </div>
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", padding: 32, borderRadius: 10, boxShadow: "0 2px 16px #0003", minWidth: 280, maxWidth: "90%", textAlign: "center" }}>
            <p style={{ marginBottom: 24 }}>{message}</p>
            <button onClick={closeModal} style={{ padding: "8px 24px", borderRadius: 6, border: "none", background: "#1877f2", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
