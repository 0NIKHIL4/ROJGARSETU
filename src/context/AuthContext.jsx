import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const sendOTP = async (phone) => {
    // Simulate OTP sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`OTP sent to ${phone}: 123456`);
    return true;
  };

  const verifyOTP = async (phone, otp) => {
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    return otp === '123456';
  };

  const login = async (phone, role) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(u => u.phone === phone && u.role === role);
    
    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem('user', JSON.stringify(existingUser));
      return true;
    }
    
    return false;
  };

  const register = async (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(u => u.phone === userData.phone && u.role === userData.role);
    
    if (existingUser) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name: userData.name || '',
      phone: userData.phone || '',
      role: userData.role || 'customer',
      location: userData.location || '',
      skills: userData.skills || [],
      available: userData.role === 'labourer' ? true : undefined,
      profileComplete: false
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = (updates) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Update in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateProfile,
      sendOTP,
      verifyOTP
    }}>
      {children}
    </AuthContext.Provider>
  );
};