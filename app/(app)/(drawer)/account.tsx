import { Image, ScrollView, Text, View, Switch } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { getInitials } from '@/lib/utils';

export default function Account() {
  const { user } = useAuth();
  const [imageLoadError, setImageLoadError] = useState(false);

  // Get user display info
  const displayName = user?.name || 'User';
  const userEmail = user?.email || '';
  

  // Get Appwrite avatar URL
  const getAvatarUrl = () => {
    if (!user?.name) return undefined;
    const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
    return `${endpoint}/avatars/initials?name=${encodeURIComponent(user.name)}&width=200&height=200`;
  };

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Profile Avatar & Info */}
      <View className="items-center px-6 py-6">
        <View className="h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-border bg-muted">
          {getAvatarUrl() && !imageLoadError ? (
            <Image
              source={{ uri: getAvatarUrl() }}
              className="h-full w-full"
              resizeMode="cover"
              onError={() => setImageLoadError(true)}
            />
          ) : (
            <Text className="text-4xl font-normal text-foreground">{getInitials(user?.name)}</Text>
          )}
        </View>
        <Text className="mt-4 text-2xl font-bold text-foreground">{displayName}</Text>
        {userEmail && <Text className="mt-1 text-xs text-muted-foreground">{userEmail}</Text>}
      </View>
    </ScrollView>
  );
}
