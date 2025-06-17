'use client';
import LoginRightPanel from '@/components/studentLayouts/loginRightPanel';
import LoginForm from '@/components/studentLayouts/LoginPage';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left side - Enhanced Image Section */}
      <LoginRightPanel />

      {/* Right side - Enhanced Login Form */}
      <LoginForm />
    </div>
  );
}