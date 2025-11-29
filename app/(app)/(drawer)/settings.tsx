import { Image, ScrollView, Text, View, Pressable } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { getInitials } from '@/lib/utils';
import { useColorScheme } from 'nativewind';
import { 
  SunIcon, 
  MoonStarIcon, 
  ChevronRightIcon,
  BellIcon,
  ShieldIcon,
  HelpCircleIcon,
  FileTextIcon,
  TrashIcon,
  LogOutIcon,
  UserIcon,
  KeyIcon,
  GlobeIcon,
  SmartphoneIcon,
} from 'lucide-react-native';
import { ToggleGroup, ToggleGroupItem, ToggleGroupIcon } from '@/components/ui/toggle-group';
import { Text as UIText } from '@/components/ui/text';
import { Switch } from '@/components/ui/switch';

// Setting item with navigation arrow
function SettingNavItem({ icon: Icon, label, onPress }: { icon: any; label: string; onPress?: () => void }) {
  return (
    <Pressable 
      onPress={onPress}
      className="flex-row items-center justify-between py-3 px-4 active:bg-muted/50"
    >
      <View className="flex-row items-center gap-3">
        <Icon size={20} className="text-muted-foreground" />
        <UIText className="text-foreground">{label}</UIText>
      </View>
      <ChevronRightIcon size={20} className="text-muted-foreground" />
    </Pressable>
  );
}

// Setting item with switch
function SettingSwitchItem({ icon: Icon, label, value, onValueChange }: { 
  icon: any; 
  label: string; 
  value: boolean; 
  onValueChange: (value: boolean) => void 
}) {
  return (
    <View className="flex-row items-center justify-between py-3 px-4">
      <View className="flex-row items-center gap-3">
        <Icon size={20} className="text-muted-foreground" />
        <UIText className="text-foreground">{label}</UIText>
      </View>
      <Switch checked={value} onCheckedChange={onValueChange} />
    </View>
  );
}

// Section header
function SectionHeader({ title }: { title: string }) {
  return (
    <UIText className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-4 py-2 mt-4">
      {title}
    </UIText>
  );
}

export default function Settings() {
  const { user, signout } = useAuth();
  const [imageLoadError, setImageLoadError] = useState(false);
  const { colorScheme, setColorScheme } = useColorScheme();
  
  // Dummy state for switches
  const [notifications, setNotifications] = useState(true);
  const [haptics, setHaptics] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [saveData, setSaveData] = useState(false);

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
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingBottom: 60}}>
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
        <View className="">
        <SectionHeader title="Appearance" />  
        <View className="bg-card rounded-lg overflow-hidden px-4 py-2">        
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

      {/* Notifications & Haptics */}
      <View className="">
        <SectionHeader title="Notifications & Haptics" />
        <View className="bg-card rounded-lg overflow-hidden">
          <SettingSwitchItem 
            icon={BellIcon} 
            label="Push Notifications" 
            value={notifications} 
            onValueChange={setNotifications} 
          />
          <View className="h-px bg-border mx-4" />
          <SettingSwitchItem 
            icon={SmartphoneIcon} 
            label="Haptic Feedback" 
            value={haptics} 
            onValueChange={setHaptics} 
          />
        </View>
      </View>

      {/* Account Settings */}
      <View className="">
        <SectionHeader title="Account" />
        <View className="bg-card rounded-lg overflow-hidden">
          <SettingNavItem icon={UserIcon} label="Edit Profile" />
          <View className="h-px bg-border mx-4" />
          <SettingNavItem icon={KeyIcon} label="Change Password" />
          <View className="h-px bg-border mx-4" />
          <SettingNavItem icon={GlobeIcon} label="Language" />
        </View>
      </View>

      {/* Data & Privacy */}
      <View className="">
        <SectionHeader title="Data & Privacy" />
        <View className="bg-card rounded-lg overflow-hidden">
          <SettingSwitchItem 
            icon={GlobeIcon} 
            label="Auto-play Videos" 
            value={autoPlay} 
            onValueChange={setAutoPlay} 
          />
          <View className="h-px bg-border mx-4" />
          <SettingSwitchItem 
            icon={GlobeIcon} 
            label="Data Saver Mode" 
            value={saveData} 
            onValueChange={setSaveData} 
          />
          <View className="h-px bg-border mx-4" />
          <SettingNavItem icon={ShieldIcon} label="Privacy Settings" />
          <View className="h-px bg-border mx-4" />
          <SettingNavItem icon={TrashIcon} label="Clear Cache" />
        </View>
      </View>

      {/* Support */}
      <View className="">
        <SectionHeader title="Support" />
        <View className="bg-card rounded-lg overflow-hidden">
          <SettingNavItem icon={HelpCircleIcon} label="Help Center" />
          <View className="h-px bg-border mx-4" />
          <SettingNavItem icon={FileTextIcon} label="Terms of Service" />
          <View className="h-px bg-border mx-4" />
          <SettingNavItem icon={ShieldIcon} label="Privacy Policy" />
        </View>
      </View>

      {/* Log Out */}
      <View className="px-6 py-6">
        <Pressable 
          onPress={signout}
          className="flex-row items-center justify-center gap-2 py-3 bg-destructive/10 rounded-lg active:bg-destructive/20"
        >
          <LogOutIcon size={20} className="text-destructive" />
          <UIText className="text-destructive font-medium">Log Out</UIText>
        </Pressable>
      </View>

      {/* App Version */}
      <View className="items-center">
        <UIText className="text-xs text-muted-foreground">StitchAI v1.0.0</UIText>
      </View>
    </ScrollView>
  );
}
