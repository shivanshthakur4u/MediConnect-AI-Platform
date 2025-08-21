import React from 'react';
import { Heart, Menu, User, Bell, LogOut } from 'lucide-react';
import { Button } from '../ui/button';

interface HeaderProps {
  user?: any;
  onLogin: () => void;
  onLogout: () => void;
}

export function Header({ user, onLogin, onLogout }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">DocConnect AI</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </a>
            <a href="#doctors" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Find Doctors
            </a>
            <a href="#ai-consultation" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              AI Consultation
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Bell className="h-5 w-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={onLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={onLogin}>
                  Login
                </Button>
                <Button onClick={onLogin}>
                  Sign Up
                </Button>
              </>
            )}
            <Menu className="h-6 w-6 md:hidden cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
}