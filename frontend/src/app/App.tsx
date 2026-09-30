import { RouterProvider } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { router } from './routes';

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </AuthProvider>
  );
}