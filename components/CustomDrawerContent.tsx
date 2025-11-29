import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Image } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { getInitials } from '@/lib/utils';

interface JerseyHistoryItem {
  id: string;
  title: string;
  prompt: string;
  date: string;
  image: any;
}

// Sample jersey generation history
const jerseyHistory: JerseyHistoryItem[] = [
  { 
    id: '1', 
    title: 'Midnight Edition', 
    prompt: 'A sleek black jersey with gold accents',
    date: 'Today',
    image: require('@/assets/images/jerseys/black_jersey.png'),
  },
  { 
    id: '2', 
    title: 'Portugal Home Kit', 
    prompt: 'Portugal national team inspired design',
    date: 'Yesterday',
    image: require('@/assets/images/jerseys/Classic_red_and_whit.png'),
  },
  { 
    id: '3', 
    title: 'Ocean Wave', 
    prompt: 'Modern gradient blue jersey with wave pattern',
    date: 'Nov 27',
    image: require('@/assets/images/jerseys/Modern_blue_gradient.png'),
  },
  { 
    id: '4', 
    title: 'Retro 90s Vibes', 
    prompt: 'Throwback design with geometric patterns',
    date: 'Nov 25',
    image: require('@/assets/images/jerseys/Retro_90s_style_jers.png'),
  },
  { 
    id: '5', 
    title: 'Barcelona Away', 
    prompt: 'Barcelona inspired with modern twist',
    date: 'Nov 20',
    image: require('@/assets/images/jerseys/Modern_blue_gradient.png'),
  },
];

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { colorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const isDark = colorScheme === 'dark';

  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedTextColor = isDark ? 'text-gray-400' : 'text-gray-500';
  const borderColor = isDark ? 'border-gray-800' : 'border-gray-200';
  const inputBgColor = isDark ? 'bg-gray-900' : 'bg-gray-100';
  const iconColor = isDark ? '#fff' : '#000';
  const mutedIconColor = isDark ? '#9ca3af' : '#6b7280';

  const closeDrawer = () => {
    props.navigation.closeDrawer();
  };

  const filteredHistory = jerseyHistory.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.prompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className={`flex-1 ${bgColor}`} style={{ paddingTop: insets.top }}>
      {/* Search Bar Header */}
      <View className="flex-row items-center px-4 py-3 gap-3">
        <View className={`flex-1 flex-row items-center ${inputBgColor} rounded-full px-4`}>
          <Ionicons name="search" size={20} color={mutedIconColor} />
          <TextInput
            className={`flex-1 ml-3 text-base ${textColor}`}
            placeholder="Search designs..."
            placeholderTextColor={mutedIconColor}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <Pressable onPress={closeDrawer} className="p-2">
          <Ionicons name="chevron-forward" size={24} color={iconColor} />
        </Pressable>
      </View>

      {/* History Section */}
      <View className="px-4 py-2">
        <Text className={`text-xs font-semibold uppercase tracking-wide ${mutedTextColor}`}>
          Recent Designs
        </Text>
      </View>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {filteredHistory.map((item) => (
          <Pressable
            key={item.id}
            className="flex-row items-center px-4 py-3"
            onPress={() => {
              closeDrawer();
              router.push(`/jersey/${item.id}` as any);
            }}>
            {/* Jersey Thumbnail */}
            <Image 
              source={item.image}
              className="rounded-lg mr-3"
              style={{ width: 56, height: 64 }}
              // resizeMode="cover"
            />
            <View className="flex-1">
              <Text className={`text-base font-medium ${textColor}`} numberOfLines={1}>
                {item.title}
              </Text>
              <Text className={`text-sm ${mutedTextColor}`} numberOfLines={1}>
                {item.prompt}
              </Text>
              <Text className={`text-xs mt-0.5 ${mutedTextColor}`}>{item.date}</Text>
            </View>
            <Pressable className="p-2">
              <Ionicons name="ellipsis-vertical" size={18} color={mutedIconColor} />
            </Pressable>
          </Pressable>
        ))}
      </ScrollView>

      {/* User Profile Footer */}
      <View className={`flex-row items-center justify-between px-4 py-4 ${borderColor}`}>
        <View className="flex-row items-center gap-3 flex-1">
          <View className="w-10 h-10 rounded-full bg-gray-600 items-center justify-center overflow-hidden">
            <Text className="text-white font-semibold text-sm">
              {getInitials(user?.name)}
            </Text>
          </View>
          <View className="flex-1">
            <Text className={`text-base font-medium ${textColor}`}>
              {user?.name || 'User'}
            </Text>
            {user?.email && (
              <Text className={`text-xs ${mutedTextColor}`}>{user.email}</Text>
            )}
          </View>
        </View>
        <Pressable
          onPress={() => {
            closeDrawer();
            router.push('/settings');
          }}>
          <Ionicons name="settings-outline" size={22} color={mutedIconColor} />
        </Pressable>
      </View>
    </View>
  );
}
