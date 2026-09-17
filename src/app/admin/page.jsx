"use client";
import React, { useState, useEffect } from "react"; // useEffect ইম্পোর্ট করা হয়েছে
import axios from "axios";
import Dashboard from "./Dashboard/Dashboard";


export default function AdminLogin() {
  const[email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // ১. পেজ লোড হওয়ার সময় চেক করবে LocalStorage-এ লগইন তথ্য আছে কি না
  useEffect(() => {
    const authStatus = localStorage.getItem("admin_auth");
    if (authStatus === "true") {
      setIsVerified(true);
    }
  }, []); //[] দেয়া হয়েছে যাতে একবারই কল হয়

  const requestLogin = async () => {
    console.log("text")
    try {
      const res = await axios.post("http://localhost:5000/admin/request-login", { email });
      console.log(res)
      setMessage(res.data.message);
      setOtpSent(true);
    } catch (err) {
      setMessage(err?.response?.data?.message || "Request failed");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/admin/verify-otp", { email, otp });
      console.log(res.data);
      
      // ✅ লগইন সফল হলে localStorage-এ সেভ করুন
      localStorage.setItem("admin_auth", "true");
      
      setMessage("✅ Login Successful");
      setIsVerified(true); 
    } catch (err) {
      setMessage("❌ " + (err?.response?.data?.message || "Verification failed"));
    }
  };

  // ড্যাশবোর্ডে লগআউট বাটন যোগ করতে চাইলে এখানে একটি ফাংশন তৈরি করতে পারেন
  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setIsVerified(false);
    setEmail("");
    setOtp("");
    setOtpSent(false);
  };

  if (isVerified) {
    // ড্যাশবোর্ডে লগআউট অপশনটি যোগ করার জন্য ড্যাশবোর্ড কম্পোনেন্টে handleLogout পাস করতে পারেন
    return <Dashboard onLogout={handleLogout} />; 
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Admin Login</h2>
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            placeholder="Enter Admin Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-white border rounded-md"
            disabled={otpSent} // OTP পাঠানো হয়ে গেলে ইমেইল ইনপুট ডিসেবল করা ভালো
          />

          {otpSent ? (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
              <button onClick={verifyOtp} className="w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-600">
                Verify OTP
              </button>
            </>
          ) : (
            <button onClick={requestLogin} className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
              Send OTP
            </button>
          )}
          {message && <p className="mt-4 text-sm text-center text-gray-600">{message}</p>}
        </div>
      </div>
    </div>
  );
}