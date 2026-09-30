import { createBrowserRouter } from 'react-router';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DoctorLayout } from './components/DoctorLayout';
import { PatientLayout } from './components/PatientLayout';
import { AdminLayout } from './components/AdminLayout';

// Public pages
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';

// Doctor pages
import { DoctorDashboard } from './pages/doctor/DoctorDashboard';
import { Patients } from './pages/doctor/Patients';
import { Prescriptions } from './pages/doctor/Prescriptions';
import { NewPrescription } from './pages/doctor/NewPrescription';
import { History } from './pages/doctor/History';
import { Profile } from './pages/doctor/Profile';

// Patient pages
import { PatientDashboard } from './pages/patient/PatientDashboard';
import { Medications } from './pages/patient/Medications';
import { PatientHistory } from './pages/patient/PatientHistory';
import { Doctors } from './pages/patient/Doctors';
import { Refills } from './pages/patient/Refills';
import { PatientProfile } from './pages/patient/PatientProfile';

// Admin pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminReports } from './pages/admin/AdminReports';
import { AdminSettings } from './pages/admin/AdminSettings';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Landing,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/register',
    Component: Register,
  },
  {
    path: '/forgot-password',
    Component: ForgotPassword,
  },
  {
    path: '/doctor',
    element: (
      <ProtectedRoute allowedRoles={['doctor']}>
        <DoctorLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        Component: DoctorDashboard,
      },
      {
        path: 'patients',
        Component: Patients,
      },
      {
        path: 'prescriptions',
        Component: Prescriptions,
      },
      {
        path: 'prescriptions/new',
        Component: NewPrescription,
      },
      {
        path: 'history',
        Component: History,
      },
      {
        path: 'profile',
        Component: Profile,
      },
    ],
  },
  {
    path: '/patient',
    element: (
      <ProtectedRoute allowedRoles={['patient']}>
        <PatientLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        Component: PatientDashboard,
      },
      {
        path: 'medications',
        Component: Medications,
      },
      {
        path: 'history',
        Component: PatientHistory,
      },
      {
        path: 'doctors',
        Component: Doctors,
      },
      {
        path: 'refills',
        Component: Refills,
      },
      {
        path: 'profile',
        Component: PatientProfile,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        Component: AdminDashboard,
      },
      {
        path: 'users',
        Component: AdminUsers,
      },
      {
        path: 'reports',
        Component: AdminReports,
      },
      {
        path: 'settings',
        Component: AdminSettings,
      },
    ],
  },
  {
    path: '*',
    element: (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Page not found</p>
          <a href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            Go Home
          </a>
        </div>
      </div>
    ),
  },
]);
