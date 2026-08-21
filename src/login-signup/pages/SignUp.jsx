import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../config";
// import { Building2, ArrowDown, PartyPopper } from "lucide-react";
import styles from "../css/Signup.module.css";

export default function SignUp() {
  const [step, setStep] = useState(1);

  // Step 1 state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Step 2 state
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [teamSize, setTeamSize] = useState("");

  const navigate = useNavigate();

  const handleStep1Submit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}admin/signup`,
        {
          name,
          email,
          password,
          companyname: companyName,
          industry,
          team_size: teamSize,
        },
        { withCredentials: true }
      );
      console.log(response.data.message);
      setStep(3);
    } catch (error) {
      console.log("Something went wrong", error.message);
    }
  };

  const handleStep3Submit = (e) => {
    e.preventDefault();
    localStorage.setItem("theme", "light");
    navigate("/");
  };

  return (
    <div className={styles.page}>
      {/* ---------------- Left panel ---------------- */}
      <div className={styles.leftPanel}>
        <div className={styles.logo}>
          <svg
            width="51"
            height="51"
            viewBox="0 0 51 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.logoMark}
          >
            <path
              d="M41 0C46.5228 0 51 4.47715 51 10V41C51 41.7841 50.906 42.5462 50.7354 43.2783L39.0234 31.8213C37.0495 29.8907 33.8666 29.908 31.9141 31.8604L30.5977 33.1777C28.6453 35.1302 28.6622 38.278 30.6357 40.209L41.6436 50.9766C41.4307 50.9901 41.2163 51 41 51H10C9.49485 51 8.99869 50.961 8.51367 50.8887L40.1865 19.9062C42.1604 17.9754 42.1777 14.8277 40.2256 12.875L38.9092 11.5576C36.9566 9.60506 33.7728 9.58757 31.7988 11.5186L0.113281 42.5127C0.0384312 42.0194 8.24792e-09 41.5142 0 41V10C0 9.76522 0.0104491 9.53249 0.0263672 9.30176L11.9219 20.9385C13.8959 22.8689 17.0788 22.8517 19.0312 20.8994L20.3477 19.583C22.3001 17.6306 22.283 14.4818 20.3096 12.5508L7.74316 0.257812C8.46859 0.0904411 9.22373 1.24512e-08 10 0H41Z"
              fill="#FF0915"
            />
          </svg>
        </div>

        <div className={styles.formWrap} style={{marginTop:"30px"}}>
          {/* ---------------- Step 1: account details ---------------- */}
          {step === 1 && (
            <>
              <div className={styles.titleRow} >
                {/* <UserPlus size={28} className={styles.titleIcon} /> */}
                <h1 className={styles.title}>Create an account</h1>
              </div>
              <p className={styles.subtitle}>Sign up to get started with Nexgn</p>

              <form className={styles.form} onSubmit={handleStep1Submit}>
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={styles.input}
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="email" className={styles.label}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={styles.input}
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="password" className={styles.label}>
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className={styles.input}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                </div>

                <button type="submit" className={styles.loginButton}>
                  Sign Up
                </button>

                <p className={styles.signupText}>
                  Have an account?{" "}
                  <Link to="/login" className={styles.signupLink}>
                    Log in
                  </Link>
                </p>
              </form>
            </>
          )}

          {/* ---------------- Step 2: company details ---------------- */}
          {step === 2 && (
            <>
              <div className={styles.titleRow}>
                {/* <Building2 size={28} className={styles.titleIcon} /> */}
                <h1 className={styles.title}>Your company</h1>
              </div>
              <p className={styles.subtitle}>Tell us about your company</p>

              <form className={styles.form} onSubmit={handleStep2Submit}>
                <div className={styles.field}>
                  <label htmlFor="companyName" className={styles.label}>
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    className={styles.input}
                    placeholder="Acme Corp"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="industry" className={styles.label}>
                    Industry (Optional)
                  </label>
                  <div className={styles.selectWrap}>
                    <select
                      id="industry"
                      className={`${styles.input} ${styles.select}`}
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                    >
                      <option value="" disabled hidden>
                        Select industry
                      </option>
                      <option value="Technology">Technology</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Other">Other</option>
                    </select>
                    {/* <ArrowDown size={16} className={styles.selectArrow} /> */}
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="teamSize" className={styles.label}>
                    Team Size (Optional)
                  </label>
                  <div className={styles.selectWrap}>
                    <select
                      id="teamSize"
                      className={`${styles.input} ${styles.select}`}
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                    >
                      <option value="" disabled hidden>
                        Select team size
                      </option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="50+">50+ employees</option>
                    </select>
                    {/* <ArrowDown size={16} className={styles.selectArrow} /> */}
                  </div>
                </div>

                <button type="submit" className={styles.loginButton}>
                  Continue Dashboard
                </button>
              </form>
            </>
          )}

          {/* ---------------- Step 3: success ---------------- */}
          {step === 3 && (
            <>
              <div className={styles.titleRow}>
                {/* <PartyPopper size={28} className={styles.successIcon} /> */}
                <h1 className={styles.title}>Account created</h1>
              </div>
              <p className={styles.subtitle}>
                You're now the admin of your Nexgn workspace
              </p>

              <form className={styles.form} onSubmit={handleStep3Submit}>
                <button type="submit" className={styles.loginButton}>
                  Go to Dashboard
                </button>
              </form>
            </>
          )}
        </div>

          <div className={styles.faceGraphic}>
                  <img src = "./Intersect.png" />
                </div>
        
                <p className={styles.tagline}>Smart Signing</p>
        
                <div className={styles.wordmarkSlot} aria-hidden="true">
                  <span className={styles.wordmarkRed}>Nexgn</span>
                </div>
              </div>
        
              <div className={styles.rightPanel}>
                <div className={styles.wordmarkSlot} aria-hidden="true">
                  <span className={styles.wordmarkWhite}>Nexgn</span>
                </div>
              </div>
    </div>
  );
}