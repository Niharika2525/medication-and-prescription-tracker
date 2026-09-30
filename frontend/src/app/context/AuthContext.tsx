import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'doctor' | 'patient' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  specialty?: string; // for doctors
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, role: UserRole, specialty?: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'doctor@med.com',
    password: 'doctor123',
    name: 'Dr. Sarah Johnson',
    role: 'doctor',
    specialty: 'Cardiology',
    phone: '+1 (555) 123-4567',
  },
  {
    id: '2',
    email: 'patient@mail.com',
    password: 'patient123',
    name: 'John Smith',
    role: 'patient',
    phone: '+1 (555) 987-6543',
  },
  {
    id: '3',
    email: 'admin@med.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    phone: '+1 (555) 555-5555',
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const authResponse = data.data; // AuthResponse object
        const token = authResponse.token;
        
        if (token && authResponse) {
          // Create user object from AuthResponse
          const user: User = {
            id: authResponse.userId,
            email: authResponse.email,
            name: authResponse.name,
            role: authResponse.role as UserRole,
          };
          
          localStorage.setItem('token', token);
          localStorage.setItem('currentUser', JSON.stringify(user));
          setUser(user);
          return true;
        }
      }
      
      // Fallback to mock authentication if backend fails
      console.log('Backend login failed, falling back to mock auth');
      return await mockLogin(email, password);
    } catch (error) {
      console.error('Login error:', error);
      // Fallback to mock authentication
      return await mockLogin(email, password);
    }
  };

  const mockLogin = async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      localStorage.setItem('token', 'mock-jwt-token'); // Mock token
      return true;
    }
    return false;
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    role: UserRole,
    specialty?: string
  ): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, role, specialty }),
      });

      if (response.ok) {
        const data = await response.json();
        const authResponse = data.data; // AuthResponse object
        
        // Registration successful but no token returned - user must login separately
        if (authResponse && !authResponse.token) {
          // Clear any existing user data
          setUser(null);
          localStorage.removeItem('currentUser');
          localStorage.removeItem('token');
          return true; // Registration successful, but no auto-login
        }
        
        // If token was returned (mock fallback), handle it
        if (authResponse.token) {
          const user: User = {
            id: authResponse.userId,
            email: authResponse.email,
            name: authResponse.name,
            role: authResponse.role as UserRole,
          };
          
          localStorage.setItem('token', authResponse.token);
          localStorage.setItem('currentUser', JSON.stringify(user));
          setUser(user);
          return true;
        }
      }
      
      // Fallback to mock registration if backend fails
      console.log('Backend registration failed, falling back to mock auth');
      return await mockRegister(email, password, name, role, specialty);
    } catch (error) {
      console.error('Registration error:', error);
      // Fallback to mock registration
      return await mockRegister(email, password, name, role, specialty);
    }
  };

  const mockRegister = async (
    email: string,
    password: string,
    name: string,
    role: UserRole,
    specialty?: string
  ): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user already exists
    if (mockUsers.some(u => u.email === email)) {
      return false; // User already exists, don't register
    }
    
    // Create new user
    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      email,
      password,
      name,
      role,
      specialty,
    };
    
    mockUsers.push(newUser);
    
    // IMPORTANT: Don't auto-login after registration - redirect to login page
    // Just return true to indicate registration was successful
    return true; // Registration successful
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const foundUser = mockUsers.find(u => u.email === email);
    return !!foundUser;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
