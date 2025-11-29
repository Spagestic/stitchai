import { Image, ScrollView, Text, View } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { getInitials } from '@/lib/utils';
import { useColorScheme } from 'nativewind';
import { SunIcon, MoonStarIcon, MonitorIcon } from 'lucide-react-native';
import { ToggleGroup, ToggleGroupItem, ToggleGroupIcon } from '@/components/ui/toggle-group';
import { Text as UIText } from '@/components/ui/text';

export default function Settings() {
  const { user } = useAuth();
  const [imageLoadError, setImageLoadError] = useState(false);
  const { colorScheme, setColorScheme } = useColorScheme();

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

      {/* Appearance Section */}
      <View className="px-6 py-8">
        <UIText className="text-lg font-semibold text-foreground mb-4">Appearance</UIText>
        
        <View className="bg-card rounded-lg">        
          <ToggleGroup
            type="single"
            value={colorScheme}
            onValueChange={(value) => {
              if (value) {
                setColorScheme(value as 'light' | 'dark');
              }
            }}
            className="gap-2">
            <ToggleGroupItem value="light" isFirst className="flex-1">
              <ToggleGroupIcon as={SunIcon} />
              <UIText className="text-xs">Light</UIText>
            </ToggleGroupItem>
            
            <ToggleGroupItem value="dark" isLast className="flex-1">
              <ToggleGroupIcon as={MoonStarIcon} />
              <UIText className="text-xs">Dark</UIText>
            </ToggleGroupItem>
          </ToggleGroup>
        </View>
      </View>
    </ScrollView>
  );
}
