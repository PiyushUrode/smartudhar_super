// Updated LoginPage with 2FA and QR Flow
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import logo from "../assets/logo/logo_hr.png";
import lockImage from "../assets/login/login side img.webp";
import icon from "../assets/login/icon.webp";
import "../Styles/login.css";

const LoginPage = () => {
  const [step, setStep] = useState("login");
  const [form, setForm] = useState({ email: "", password: "" });
  // const [otp, setOtp] = useState(Array(6).fill(""));
  // const [emailInput, setEmailInput] = useState("");
  // const [smsInput, setSmsInput] = useState("");
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  // const [formverify, setFormverify] = useState({
  //   email: "",
  //   emailOtp: "",
  //   sms: "",
  //   smsOtp: "",
  // });

  const generateEmailOtp = () => {
    if (form.email.trim() === "") {
      toast.error("Please enter an email address first");
      return;
    }
    toast.success("OTP sent to your email!");
  };



    const generateSmsOtp = () => {
   
    toast.success("OTP sent to your sms!");
  };

  // const generateSmsOtp = () => {
  //   if (form.sms.trim() === "") {
  //     toast.error("Please enter a mobile number first");
  //     return;
  //   }
  //   toast.success("OTP sent to your phone!");
  // };

  const handleVerifyOtp = () => {
    const emailValid = form.emailOtp.length === 6;
    const smsValid = form.smsOtp.length === 6;

    if (emailValid && smsValid) {
      navigate("/dashboard");
    } else {
      toast.error("Please enter valid 6-digit OTPs for both email and SMS");
    }
  };

  const handleOtpChange = (value, type) => {
    const filtered = value.replace(/\D/g, "").slice(0, 6);
    setForm((prev) => ({ ...prev, [type]: filtered }));
  };

  const validate = () => {
    const errs = {};
    if (!form.email.includes("@")) errs.email = "Enter valid email or username";
    if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;
    setStep("qr");
  };

  const handleNext = () => {
    setStep("2fa");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="login-header">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <div className="login-header-right">
          <span>Don't have an account?</span>
          <Link to="/signup">
            <button className="signup-btn">Sign Up</button>
          </Link>
        </div>
      </header>

      <main className="flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
        <div className="hidden md:flex md:w-1/2 justify-center items-center bg-gray-50">
          <img src={lockImage} alt="Illustration" className="w-3/4 max-w-md" />
        </div>

        <div className="flex flex-1 justify-center items-center px-4 py-12">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <img src={icon} alt="icon" className="h-12" />
            </div>

            <h2 className="text-xl font-robotoM text-center mb-1">
              Welcome Back
            </h2>
            <p className="text-md  font-robotoM text-center mb-6">
              Please Enter Your Login Details
            </p>

            {step === "login" && (
              <>
                <input
                  type="text"
                  placeholder="Email or Username"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full mb-2 px-4 py-2 border-2  border-blue-200    rounded-lg text-black bg-white autofill:bg-white autofill:text-black"
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mb-2">{errors.email}</p>
                )}

                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full mb-2 px-4 py-2 border-2  border-blue-200  rounded-lg text-black bg-white autofill:bg-white autofill:text-black"
                />

                {errors.password && (
                  <p className="text-red-500 text-sm mb-2">{errors.password}</p>
                )}

                <div className="flex items-center gap-2 my-4">
                  <input
                    type="checkbox"
                    className="appearance-none h-5 w-5 border-2  border-blue-200   rounded-lg-sm checked:bg-white checked:border-2  checked:border-white checked:after:content-['✔'] checked:after:text-blue-500 checked:after:border-2  border-blue-200 -2 checked:after:block checked:after:text-center"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label htmlFor="rememberMe" className="text-sm">
                    Remember Me{" "}
                  </label>
                </div>

                <button
                  className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </>
            )}

            {step === "qr" && (
              <>
                <div className="mb-4 text-center">
                  <p className="text-sm mb-2">
                    Scan this QR code with your Authenticator App
                  </p>
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=otpauth://totp/demo"
                    alt="QR Code"
                    className="mx-auto"
                  />
                </div>
                <button
                  className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={handleNext}
                >
                  Next
                </button>
              </>
            )}

            {step === "2fa" && (
              <>
                <div className="space-y-6 max-w-md mx-auto">
                  {/* Email OTP Section */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Email OTP
                    </label>

                    <input
                      type="text"
                      placeholder="Email address"
                      value={form.email}
                      onChange={(e) => handleOtpChange(e.target.value, "email")}
                      className="w-full px-4 py-2 border border-blue-300 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="justify-items-end w-full flex items-end ">
                      <button
                        className="w-fit py-2.5 px-2.5  bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition"
                        onClick={generateEmailOtp}
                      >
                        Generate Email OTP
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP sent to email"
                      value={form.emailOtp}
                      onChange={(e) =>
                        handleOtpChange(e.target.value, "emailOtp")
                      }
                      className="w-full px-4 py-2 border border-blue-300 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* SMS OTP Section */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      SMS OTP
                    </label>

                    <input
                      type="text"
                      placeholder="Mobile number"
                      // value={form.sms}
                      // onChange={(e) => handleOtpChange(e.target.value, 'sms')}
                      className="w-full px-4 py-2 border border-blue-300 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                      className="w-fit py-2.5 px-3 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition"
                      onClick={generateSmsOtp}
                    >
                      Generate SMS OTP
                    </button>

                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP sent via SMS"
                      value={form.smsOtp}
                      onChange={(e) =>
                        handleOtpChange(e.target.value, "smsOtp")
                      }
                      className="w-full px-4 py-2 border border-blue-300 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Final Verify Button */}
                  <button
                    className="w-full py-3 bg-blue-600 text-white text-base font-semibold rounded-lg hover:bg-blue-700 transition"
                    onClick={handleVerifyOtp}
                  >
                    Verify & Continue
                  </button>
                </div>
              </>
            )}

            <div className="mt-6 text-center">
              <Link
                to="/forgetpassword"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
              <p className="text-xs text-gray-500 mt-2">
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>{" "}
                &{" "}
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
