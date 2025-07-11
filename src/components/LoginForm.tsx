import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import ReCAPTCHA from 'react-google-recaptcha';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaToken) {
      setError('Por favor completa el CAPTCHA');
      return;
    }

    // Verificación simulada
    if (email === 'admin@admin.com' && password === '123456') {
      localStorage.setItem('auth', 'true');
      navigate('/admin');
    } else {
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-dark bg-zenu-pattern bg-cover font-sans">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-95 p-10 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300"
      >
        <div className="flex flex-col items-center mb-6">
          <img
            src="/images/sombrero.png"
            alt="Logo Tuchín Zenú"
            className="h-16 w-16 object-contain mb-2 animate-bounce"
          />
          <h1 className="text-3xl font-bold text-primary mb-1">Tuchín Zenú</h1>
          <p className="text-sm text-gray-600">Bienvenido al panel de administrador</p>
        </div>

        <div className="relative mb-5">
          <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="relative mb-6">
          <FaLock className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="mb-4 flex justify-center">
          <ReCAPTCHA
            sitekey="6LdZ734rAAAAAPTJw6M_m6u5oDspBP_MuYFXaZDb" // ⬅️ REEMPLAZA con tu propia clave pública de Google
            onChange={(token: string | null) => setCaptchaToken(token)}

          />
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-secondary transition duration-300"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
