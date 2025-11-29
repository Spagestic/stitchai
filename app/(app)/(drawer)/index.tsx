import { View, Text } from 'react-native';
import React from 'react'
import { useAuth } from '@/context/AuthContext';
import { UserMenu } from '@/components/auth/user-menu';


export default function Page() {
  const { user } = useAuth();
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  const userName = user?.name?.split(' ')[0] || 'User';
    // Show loading while checking auth
  if (!user) {
    return null;
  }
  return (
    <View className="gap-4 p-4">
    </View>
  )
}