import React, { useCallback } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from 'nativewind';
import { Pressable, Text, View } from 'react-native';
import { ThemeToggle } from '@/components/ThemeToggle';
import { UserMenu } from '@/components/auth/user-menu';

function DrawerLayout() {
  const { colorScheme } = useColorScheme();
  const renderThemeToggle = useCallback(
    () => (
      <View className="mr-4 flex-row items-center">
        <ThemeToggle />
        <UserMenu />
      </View>
    ),
    []
  );

  return (
    <Drawer
      screenOptions={{
        headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
        headerStyle: { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' },
        headerTitleStyle: {
          fontWeight: '600',
          color: colorScheme === 'dark' ? '#fff' : '#000',
        },
        headerRight: renderThemeToggle,
        drawerStyle: { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' },
      }}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerTitle: 'Tabs',
          drawerLabel: ({ color, focused }) => (
            <Text style={{ color: focused ? color : colorScheme === 'dark' ? '#fff' : '#000' }}>
              Tabs
            </Text>
          ),
          drawerIcon: ({ size, color, focused }) => (
            <MaterialIcons
              name="border-bottom"
              size={size}
              color={focused ? color : colorScheme === 'dark' ? '#fff' : '#000'}
            />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable className="mr-4">
                <Ionicons
                  name="add-outline"
                  size={24}
                  color={colorScheme === 'dark' ? '#fff' : '#000'}
                />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: 'Home',
          drawerLabel: ({ color, focused }) => (
            <Text style={{ color: focused ? color : colorScheme === 'dark' ? '#fff' : '#000' }}>
              Home
            </Text>
          ),
          drawerIcon: ({ size, color, focused }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={focused ? color : colorScheme === 'dark' ? '#fff' : '#000'}
            />
          ),
        }}
      />
    </Drawer>
  );
}

export default DrawerLayout;
