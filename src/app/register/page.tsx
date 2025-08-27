"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [day, setDay] = useState("1");
  const [month, setMonth] = useState("Jan");
  const [year, setYear] = useState("2000");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = `${firstName} ${surname}`;
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, day, month, year, gender }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
    setShowModal(true);

    if (data.message === "User registered") {
      setTimeout(() => {
        setShowModal(false);
        router.push("/login");
      }, 1500);
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          padding: 20,
          borderRadius: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          background: "#fff",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "40px",
            fontWeight: "bold",
            color: "#1877f2",
            marginBottom: 12,
          }}
        >
          facebook
        </h1>

        <h2
          style={{
            textAlign: "center",
            fontSize: "22px",
            marginBottom: 6,
            fontWeight: "600",
            color: "#1c1e21",
          }}
        >
          Create a new account
        </h2>
        <p style={{ textAlign: "center", marginBottom: 16, color: "#606770" }}>
  It&apos;s quick and easy.
</p>

        <hr style={{ marginBottom: 20, border: "0.5px solid #ddd" }} />

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Name fields */}
          <div style={{ display: "flex", flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
            <input
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{
                flex: 1,
                minWidth: "calc(50% - 5px)",
                padding: 10,
                borderRadius: 6,
                border: "1px solid #ccd0d5",
                fontSize: 15,
              }}
            />
            <input
              placeholder="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              style={{
                flex: 1,
                minWidth: "calc(50% - 5px)",
                padding: 10,
                borderRadius: 6,
                border: "1px solid #ccd0d5",
                fontSize: 15,
              }}
            />
          </div>

          {/* Date of birth */}
          <label style={{ fontSize: 13, color: "#606770" }}>Date of birth</label>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              style={{
                flex: 1,
                minWidth: "30%",
                padding: 10,
                borderRadius: 6,
                border: "1px solid #ccd0d5",
                fontSize: 15,
              }}
            >
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              style={{
                flex: 1,
                minWidth: "30%",
                padding: 10,
                borderRadius: 6,
                border: "1px solid #ccd0d5",
                fontSize: 15,
              }}
            >
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              style={{
                flex: 1,
                minWidth: "30%",
                padding: 10,
                borderRadius: 6,
                border: "1px solid #ccd0d5",
                fontSize: 15,
              }}
            >
              {Array.from({ length: 100 }, (_, i) => 2025 - i).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Gender */}
          <label style={{ fontSize: 13, color: "#606770" }}>Gender</label>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["Female", "Male", "Custom"].map((g) => (
              <label
                key={g}
                style={{
                  flex: 1,
                  minWidth: "30%",
                  border: "1px solid #ccd0d5",
                  borderRadius: 6,
                  padding: "8px 10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: 15,
                  cursor: "pointer",
                }}
              >
                {g}
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>
            ))}
          </div>

          {/* Email */}
          <input
            placeholder="Mobile number or email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: 10,
              borderRadius: 6,
              border: "1px solid #ccd0d5",
              fontSize: 15,
            }}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: 10,
              borderRadius: 6,
              border: "1px solid #ccd0d5",
              fontSize: 15,
            }}
          />

          <button
            type="submit"
            style={{
              padding: 12,
              borderRadius: 6,
              border: "none",
              background: "#42b72a",
              color: "#fff",
              fontWeight: "bold",
              fontSize: 18,
              cursor: "pointer",
              marginTop: 10,
            }}
          >
            Sign Up
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Link
            href="/login"
            style={{
              color: "#1877f2",
              fontWeight: "bold",
              textDecoration: "none",
              fontSize: 15,
            }}
          >
            Already have an account?
          </Link>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 32,
              borderRadius: 10,
              boxShadow: "0 2px 16px #0003",
              minWidth: 280,
              maxWidth: "90%",
              textAlign: "center",
            }}
          >
            <p style={{ marginBottom: 24, fontSize: 16 }}>{message}</p>
            <button
              onClick={closeModal}
              style={{
                padding: "10px 24px",
                borderRadius: 6,
                border: "none",
                background: "#1877f2",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
