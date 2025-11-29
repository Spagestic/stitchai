import { Slot, Redirect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function Layout() {
  const { session } = useAuth();
  return !session ? <Redirect href="/auth/signin" /> : <Slot />;
}
