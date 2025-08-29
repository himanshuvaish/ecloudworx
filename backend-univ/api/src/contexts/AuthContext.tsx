import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_BASE } from '../config';

export interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>(null!);

export const useAuth = (): AuthContextValue => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('jwt');
    const storedUser  = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const saveSession = (jwt: string, user: User) => {
    setToken(jwt);
    setUser(user);
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const parseJwt = (jwt: string): User => {
    const [, payload] = jwt.split('.');
    const decoded = JSON.parse(atob(payload));
    return { id: decoded.id, name: decoded.name, email: decoded.email };
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) return false;
    const { token: jwt } = await res.json();
    const userInfo = parseJwt(jwt);
    saveSession(jwt, userInfo);
    return true;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    if (!res.ok) return false;
    return login(email, password);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
