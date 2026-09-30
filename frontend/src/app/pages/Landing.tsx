import { Link } from 'react-router';
import { Activity, Users, Shield, Clock, FileText, Heart } from 'lucide-react';

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">MediTrack</span>
          </div>
          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Complete Medication & Prescription Tracker
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Streamline prescription management for doctors, patients, and healthcare administrators.
          All in one secure platform.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/register"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-lg"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 font-medium text-lg"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Features for Everyone
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Doctor Features */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">For Doctors</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Manage patient prescriptions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>View prescription history</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Track patient medications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Digital prescribing</span>
              </li>
            </ul>
          </div>

          {/* Patient Features */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">For Patients</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>View all medications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Medication reminders</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Request refills</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Access prescription history</span>
              </li>
            </ul>
          </div>

          {/* Admin Features */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">For Admins</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>User management</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>System reports & analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>Settings configuration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <span>Activity monitoring</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose MediTrack?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Save Time</h3>
              <p className="text-gray-600">
                Streamline prescription workflows and reduce administrative burden
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                HIPAA-compliant security measures to protect sensitive data
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
              <p className="text-gray-600">
                Intuitive interface designed for healthcare professionals and patients
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Activity className="w-6 h-6" />
            <span className="text-lg font-semibold">MediTrack</span>
          </div>
          <p className="text-gray-400">
            © 2026 MediTrack. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
