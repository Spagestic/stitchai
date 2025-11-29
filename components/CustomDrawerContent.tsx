import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Image } from 'react-native';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

interface ConversationItem {
  id: string;
  title: string;
  date: string;
}

// Sample conversations data - replace with your actual data
const sampleConversations: ConversationItem[] = [
  { id: '1', title: 'Professional WhatsApp Message Revision for Sponsors', date: 'Monday' },
  { id: '2', title: 'University Sponsorship: Early Graduation Options', date: 'Monday' },
  { id: '3', title: 'Solana Blockchain Technical Architecture Explained', date: 'Oct 14' },
  { id: '4', title: 'University Senate Election Career Guidance', date: 'Oct 02' },
  { id: '5', title: 'Financial Struggles and Solutions', date: 'Sep 26' },
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

  // Generate initials from user name
  const getInitials = (name?: string) => {
    if (!name) return '??';
    const nameParts = name.trim().split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].substring(0, 2).toUpperCase();
    }
    return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
  };

  const filteredConversations = sampleConversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className={`flex-1 ${bgColor}`} style={{ paddingTop: insets.top }}>
      {/* Search Bar Header */}
      <View className="flex-row items-center px-4 py-3 gap-3">
        <View className={`flex-1 flex-row items-center ${inputBgColor} rounded-full px-4`}>
          <Ionicons name="search" size={20} color={mutedIconColor} />
          <TextInput
            className={`flex-1 ml-3 text-base ${textColor}`}
            placeholder="Search History"
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
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {filteredConversations.map((conversation) => (
          <Pressable
            key={conversation.id}
            className="flex-row items-start justify-between px-4 py-4"
            onPress={() => {
              closeDrawer();
              // Navigate to conversation
            }}>
            <View className="flex-1 pr-4">
              <Text className={`text-base font-medium ${textColor}`} numberOfLines={2}>
                {conversation.title}
              </Text>
              <Text className={`text-sm mt-1 ${mutedTextColor}`}>{conversation.date}</Text>
            </View>
            <Pressable className="p-1">
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
            router.push('/settings/account');
          }}>
          <Ionicons name="settings-outline" size={22} color={mutedIconColor} />
        </Pressable>
      </View>
    </View>
  );
}
