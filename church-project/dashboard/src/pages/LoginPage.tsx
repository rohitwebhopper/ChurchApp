import type { FormEvent } from "react";
import { useState } from "react";
import ChurchIcon from "@/assets/churchlogo.svg?react";
import { HiOutlineUser, HiOutlineLockClosed } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { useApi } from "@/context/ApiContext";
import { useAuth } from "@/context/AuthContext";

interface LoginResponse {
  email: string;
  token: string;
  user: {
    id: string;
    name: string;
    role: string;
  };
}

const ChurchLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { post, loading } = useApi();
  const [username, setUsername] = useState("admin@gmail.com");
  const [password, setPassword] = useState("123456");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const data = {
      email: username,
      password,
    };

    const response = await post<LoginResponse>("/api/web/admin/login", data);

    if (response && response.token) {
      await login(response.email, response.token);
      navigate("/dashboard");
    } else {
      setFormError("Login failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className="flex flex-col items-center">
          <ChurchIcon />
          <h1 className={styles.title}>Mon Eglise</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className={styles.inputWrapper}>
            <HiOutlineUser className={styles.icon} />
            <input
              type="text"
              required
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputWrapper}>
            <HiOutlineLockClosed className={styles.icon} />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
          </div>

          {formError && (
            <p className="text-center text-red-400 text-sm">{formError}</p>
          )}

          <div className={styles.forgotLink}>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className={styles.loginBtn} disabled={loading}>
            {loading ? <div className={styles.loader}></div> : "LOGIN"}
          </button>
        </form>

        <p className={styles.footer}>
          &copy; {new Date().getFullYear()} Mon Eglise Admin Panel
        </p>
      </div>
    </div>
  );
};

export default ChurchLogin;
