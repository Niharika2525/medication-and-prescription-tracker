import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export interface Prescription {
  id: number;
  patientId: string;
  patient: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Completed' | 'Expired';
  refills: number;
  instructions?: string;
  notes?: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  bloodType?: string;
  allergies?: string;
  conditions?: string;
}

export interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  startDate: string;
  endDate: string;
  refillsLeft: number;
  status: 'Active' | 'Completed' | 'Expired';
  instructions?: string;
}

export interface RefillRequest {
  id: number;
  medicationId: number;
  medicationName: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Denied';
  notes?: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'patient' | 'admin';
  status: 'Active' | 'Inactive';
  createdAt: string;
  specialty?: string;
  phone?: string;
}

interface DataContextType {
  // Prescriptions
  prescriptions: Prescription[];
  addPrescription: (prescription: Omit<Prescription, 'id'>) => void;
  updatePrescription: (id: number, prescription: Partial<Prescription>) => void;
  deletePrescription: (id: number) => void;

  // Patients
  patients: Patient[];
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, patient: Partial<Patient>) => void;
  deletePatient: (id: string) => void;

  // Medications
  medications: Medication[];
  addMedication: (medication: Omit<Medication, 'id'>) => void;
  updateMedication: (id: number, medication: Partial<Medication>) => void;
  deleteMedication: (id: number) => void;

  // Refill Requests
  refillRequests: RefillRequest[];
  addRefillRequest: (request: Omit<RefillRequest, 'id'>) => void;
  updateRefillRequest: (id: number, status: 'Pending' | 'Approved' | 'Denied') => void;

  // App Users
  appUsers: AppUser[];
  addAppUser: (user: AppUser) => void;
  updateAppUser: (id: string, user: Partial<AppUser>) => void;
  deleteAppUser: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Initial mock data
const initialPrescriptions: Prescription[] = [
  {
    id: 1,
    patientId: '1',
    patient: 'John Smith',
    medication: 'Lisinopril 10mg',
    dosage: '1 tablet',
    frequency: 'once-daily',
    startDate: '2026-03-01',
    endDate: '2026-06-01',
    status: 'Active',
    refills: 2,
    instructions: 'Take with water in the morning',
  },
  {
    id: 2,
    patientId: '2',
    patient: 'Emma Wilson',
    medication: 'Metformin 500mg',
    dosage: '2 tablets',
    frequency: 'twice-daily',
    startDate: '2026-02-15',
    endDate: '2026-05-15',
    status: 'Active',
    refills: 3,
  },
  {
    id: 3,
    patientId: '3',
    patient: 'Michael Brown',
    medication: 'Atorvastatin 20mg',
    dosage: '1 tablet',
    frequency: 'once-daily',
    startDate: '2026-01-20',
    endDate: '2026-04-20',
    status: 'Active',
    refills: 1,
  },
  {
    id: 4,
    patientId: '4',
    patient: 'Sarah Davis',
    medication: 'Amoxicillin 500mg',
    dosage: '1 capsule',
    frequency: 'three-times',
    startDate: '2026-02-28',
    endDate: '2026-03-10',
    status: 'Completed',
    refills: 0,
  },
  {
    id: 5,
    patientId: '5',
    patient: 'Robert Johnson',
    medication: 'Aspirin 81mg',
    dosage: '1 tablet',
    frequency: 'once-daily',
    startDate: '2025-12-01',
    endDate: '2026-12-01',
    status: 'Active',
    refills: 5,
  },
];

const initialPatients: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1980-05-15',
    address: '123 Main St, New York, NY 10001',
    bloodType: 'O+',
    allergies: 'Penicillin',
    conditions: 'Hypertension',
  },
  {
    id: '2',
    name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    phone: '+1 (555) 234-5678',
    dateOfBirth: '1992-08-22',
    address: '456 Oak Ave, Los Angeles, CA 90001',
    bloodType: 'A+',
    allergies: 'None',
    conditions: 'Type 2 Diabetes',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '+1 (555) 345-6789',
    dateOfBirth: '1975-11-30',
    address: '789 Pine Rd, Chicago, IL 60601',
    bloodType: 'B+',
    allergies: 'Sulfa drugs',
    conditions: 'High Cholesterol',
  },
  {
    id: '4',
    name: 'Sarah Davis',
    email: 'sarah.davis@email.com',
    phone: '+1 (555) 456-7890',
    dateOfBirth: '1988-03-10',
    address: '321 Elm St, Houston, TX 77001',
    bloodType: 'AB+',
    conditions: 'Seasonal allergies',
  },
  {
    id: '5',
    name: 'Robert Johnson',
    email: 'robert.johnson@email.com',
    phone: '+1 (555) 567-8901',
    dateOfBirth: '1965-07-25',
    address: '654 Maple Dr, Phoenix, AZ 85001',
    bloodType: 'O-',
    conditions: 'Cardiovascular disease',
  },
];

const initialMedications: Medication[] = [
  {
    id: 1,
    name: 'Lisinopril 10mg',
    dosage: '1 tablet',
    frequency: 'Once daily',
    prescribedBy: 'Dr. Sarah Johnson',
    startDate: '2026-03-01',
    endDate: '2026-06-01',
    refillsLeft: 2,
    status: 'Active',
    instructions: 'Take in the morning with water',
  },
  {
    id: 2,
    name: 'Metformin 500mg',
    dosage: '2 tablets',
    frequency: 'Twice daily',
    prescribedBy: 'Dr. Sarah Johnson',
    startDate: '2026-02-15',
    endDate: '2026-05-15',
    refillsLeft: 3,
    status: 'Active',
    instructions: 'Take with meals',
  },
];

const initialRefillRequests: RefillRequest[] = [
  {
    id: 1,
    medicationId: 1,
    medicationName: 'Lisinopril 10mg',
    requestDate: '2026-03-05',
    status: 'Pending',
    notes: 'Running low on medication',
  },
];

const initialAppUsers: AppUser[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'doctor@med.com',
    role: 'doctor',
    status: 'Active',
    createdAt: '2025-01-15',
    specialty: 'Cardiology',
    phone: '+1 (555) 123-4567',
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'patient@mail.com',
    role: 'patient',
    status: 'Active',
    createdAt: '2025-06-20',
    phone: '+1 (555) 987-6543',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@med.com',
    role: 'admin',
    status: 'Active',
    createdAt: '2024-12-01',
    phone: '+1 (555) 555-5555',
  },
  {
    id: '4',
    name: 'Dr. Michael Chen',
    email: 'mchen@med.com',
    role: 'doctor',
    status: 'Active',
    createdAt: '2025-03-10',
    specialty: 'Family Medicine',
    phone: '+1 (555) 222-3333',
  },
  {
    id: '5',
    name: 'Emma Wilson',
    email: 'emma.w@mail.com',
    role: 'patient',
    status: 'Active',
    createdAt: '2025-08-05',
    phone: '+1 (555) 444-5555',
  },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(initialPrescriptions);
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [medications, setMedications] = useState<Medication[]>(initialMedications);
  const [refillRequests, setRefillRequests] = useState<RefillRequest[]>(initialRefillRequests);
  const [appUsers, setAppUsers] = useState<AppUser[]>(initialAppUsers);

  // Prescription methods
  const addPrescription = (prescription: Omit<Prescription, 'id'>) => {
    const newId = Math.max(...prescriptions.map(p => p.id), 0) + 1;
    setPrescriptions([...prescriptions, { ...prescription, id: newId }]);
  };

  const updatePrescription = (id: number, prescription: Partial<Prescription>) => {
    setPrescriptions(prescriptions.map(p => 
      p.id === id ? { ...p, ...prescription } : p
    ));
  };

  const deletePrescription = (id: number) => {
    setPrescriptions(prescriptions.filter(p => p.id !== id));
  };

  // Patient methods
  const addPatient = (patient: Patient) => {
    setPatients([...patients, patient]);
  };

  const updatePatient = (id: string, patient: Partial<Patient>) => {
    setPatients(patients.map(p => 
      p.id === id ? { ...p, ...patient } : p
    ));
  };

  const deletePatient = (id: string) => {
    setPatients(patients.filter(p => p.id !== id));
  };

  // Medication methods
  const addMedication = (medication: Omit<Medication, 'id'>) => {
    const newId = Math.max(...medications.map(m => m.id), 0) + 1;
    setMedications([...medications, { ...medication, id: newId }]);
  };

  const updateMedication = (id: number, medication: Partial<Medication>) => {
    setMedications(medications.map(m => 
      m.id === id ? { ...m, ...medication } : m
    ));
  };

  const deleteMedication = (id: number) => {
    setMedications(medications.filter(m => m.id !== id));
  };

  // Refill request methods
  const addRefillRequest = (request: Omit<RefillRequest, 'id'>) => {
    const newId = Math.max(...refillRequests.map(r => r.id), 0) + 1;
    setRefillRequests([...refillRequests, { ...request, id: newId }]);
  };

  const updateRefillRequest = (id: number, status: 'Pending' | 'Approved' | 'Denied') => {
    setRefillRequests(refillRequests.map(r => 
      r.id === id ? { ...r, status } : r
    ));
  };

  // App user methods
  const addAppUser = (user: AppUser) => {
    setAppUsers([...appUsers, user]);
  };

  const updateAppUser = (id: string, user: Partial<AppUser>) => {
    setAppUsers(appUsers.map(u => 
      u.id === id ? { ...u, ...user } : u
    ));
  };

  const deleteAppUser = (id: string) => {
    setAppUsers(appUsers.filter(u => u.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        prescriptions,
        addPrescription,
        updatePrescription,
        deletePrescription,
        patients,
        addPatient,
        updatePatient,
        deletePatient,
        medications,
        addMedication,
        updateMedication,
        deleteMedication,
        refillRequests,
        addRefillRequest,
        updateRefillRequest,
        appUsers,
        addAppUser,
        updateAppUser,
        deleteAppUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
