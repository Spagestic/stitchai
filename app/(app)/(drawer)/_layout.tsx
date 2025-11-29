import React, { useCallback } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from 'nativewind';
import { useRouter } from 'expo-router';
import { Dimensions, Pressable, Text, View } from 'react-native';
import { UserMenu } from '@/components/auth/user-menu';
import { CustomDrawerContent } from '@/components/CustomDrawerContent';

const { width: screenWidth } = Dimensions.get('window');

function DrawerLayout() {
  const { colorScheme } = useColorScheme();
  const renderThemeToggle = useCallback(
    () => (
      <View className="mr-4 flex-row items-center">
        <UserMenu />
      </View>
    ),
    []
  );

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
        headerStyle: { 
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
          borderBottomWidth: 0,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTitleStyle: {
          fontWeight: '600',
          color: colorScheme === 'dark' ? '#fff' : '#000',
        },
        headerRight: renderThemeToggle,
        drawerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
          width: screenWidth,
        },
        overlayColor: 'transparent',
        swipeEnabled: true,
        swipeEdgeWidth: 100,
        swipeMinDistance: 5,
      }}>
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: '',
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
      <Drawer.Screen
        name="settings"
        options={{
          headerTitle: 'Settings',
          headerLeft: () => {
            const router = useRouter();
            return (
              <Pressable onPress={() => router.back()} className="pl-4">
                <Ionicons
                  name="close"
                  size={24}
                  color={colorScheme === 'dark' ? '#fff' : '#000'}
                />
              </Pressable>
            );
          },
          headerRight: () => null,
          drawerLabel: ({ color, focused }) => (
            <Text style={{ color: focused ? color : colorScheme === 'dark' ? '#fff' : '#000' }}>
              Settings
            </Text>
          ),
          drawerIcon: ({ size, color, focused }) => (
            <Ionicons
              name="settings-outline"
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
