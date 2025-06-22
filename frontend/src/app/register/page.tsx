'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/services/authService';
import { Eye, EyeOff, User, Mail, Phone, Lock, CheckCircle, XCircle } from 'lucide-react';
import AuthRightPanel from '@/components/studentLayouts/authRightPanel';
import RegisterForm from '@/components/studentLayouts/RegisterForm';



const role = "admin"

const redirect = ` ${role ==="admin"? "/admin" : "/student"}`

export default function RegisterPage() {

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Panneau latéral */}
      <AuthRightPanel />

      {/* Formulaire */}
      <RegisterForm />
    </div>
  );
}