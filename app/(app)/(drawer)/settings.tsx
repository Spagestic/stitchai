import {
  BellIcon,
  ChevronRightIcon,
  FileTextIcon,
  GlobeIcon,
  HelpCircleIcon,
  KeyIcon,
  LogOutIcon,
  MoonStarIcon,
  ShieldIcon,
  SmartphoneIcon,
  SunIcon,
  TrashIcon,
  UserIcon,
} from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Switch } from "@/components/ui/switch";
import { Text as UIText } from "@/components/ui/text";
import {
  ToggleGroup,
  ToggleGroupIcon,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { useAuth } from "@/context/AuthContext";
import { getInitials } from "@/lib/utils";

// Setting item with navigation arrow
function SettingNavItem({
  icon: Icon,
  label,
  onPress,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      className="flex-row items-center justify-between px-4 py-3 active:bg-muted/50"
      onPress={onPress}
    >
      <View className="flex-row items-center gap-3">
        <Icon className="text-muted-foreground" size={20} />
        <UIText className="text-foreground">{label}</UIText>
      </View>
      <ChevronRightIcon className="text-muted-foreground" size={20} />
    </Pressable>
  );
}

// Setting item with switch
function SettingSwitchItem({
  icon: Icon,
  label,
  value,
  onValueChange,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      <View className="flex-row items-center gap-3">
        <Icon className="text-muted-foreground" size={20} />
        <UIText className="text-foreground">{label}</UIText>
      </View>
      <Switch checked={value} onCheckedChange={onValueChange} />
    </View>
  );
}

// Section header
function SectionHeader({ title }: { title: string }) {
  return (
    <UIText className="mt-4 px-4 py-2 font-medium text-muted-foreground text-xs uppercase tracking-wide">
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
  const displayName = user?.name || "User";
  const userEmail = user?.email || "";

  // Get Appwrite avatar URL
  const getAvatarUrl = () => {
    if (!user?.name) {
      return;
    }
    const endpoint =
      process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ||
      "https://cloud.appwrite.io/v1";
    return `${endpoint}/avatars/initials?name=${encodeURIComponent(user.name)}&width=200&height=200`;
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      {/* Profile Avatar & Info */}
      <View className="items-center px-6 py-6">
        <View className="h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-border bg-muted">
          {getAvatarUrl() && !imageLoadError ? (
            <Image
              className="h-full w-full"
              onError={() => setImageLoadError(true)}
              resizeMode="cover"
              source={{ uri: getAvatarUrl() }}
            />
          ) : (
            <Text className="font-normal text-4xl text-foreground">
              {getInitials(user?.name)}
            </Text>
          )}
        </View>
        <Text className="mt-4 font-bold text-2xl text-foreground">
          {displayName}
        </Text>
        {typeof userEmail === "string" && userEmail.trim() !== "" && (
          <Text className="mt-1 text-muted-foreground text-xs">
            {userEmail}
          </Text>
        )}
      </View>

      {/* Appearance Section */}
      <View className="">
        <SectionHeader title="Appearance" />
        <View className="overflow-hidden rounded-lg bg-card px-4 py-2">
          <ToggleGroup
            className="gap-2"
            onValueChange={(value) => {
              if (value) {
                setColorScheme(value as "light" | "dark");
              }
            }}
            type="single"
            value={colorScheme}
          >
            <ToggleGroupItem className="flex-1" isFirst value="light">
              <ToggleGroupIcon as={SunIcon} />
              <UIText className="text-xs">Light</UIText>
            </ToggleGroupItem>

            <ToggleGroupItem className="flex-1" isLast value="dark">
              <ToggleGroupIcon as={MoonStarIcon} />
              <UIText className="text-xs">Dark</UIText>
            </ToggleGroupItem>
          </ToggleGroup>
        </View>
      </View>

      {/* Notifications & Haptics */}
      <View className="">
        <SectionHeader title="Notifications & Haptics" />
        <View className="overflow-hidden rounded-lg bg-card">
          <SettingSwitchItem
            icon={BellIcon}
            label="Push Notifications"
            onValueChange={setNotifications}
            value={notifications}
          />
          <View className="mx-4 h-px bg-border" />
          <SettingSwitchItem
            icon={SmartphoneIcon}
            label="Haptic Feedback"
            onValueChange={setHaptics}
            value={haptics}
          />
        </View>
      </View>

      {/* Account Settings */}
      <View className="">
        <SectionHeader title="Account" />
        <View className="overflow-hidden rounded-lg bg-card">
          <SettingNavItem icon={UserIcon} label="Edit Profile" />
          <View className="mx-4 h-px bg-border" />
          <SettingNavItem icon={KeyIcon} label="Change Password" />
          <View className="mx-4 h-px bg-border" />
          <SettingNavItem icon={GlobeIcon} label="Language" />
        </View>
      </View>

      {/* Data & Privacy */}
      <View className="">
        <SectionHeader title="Data & Privacy" />
        <View className="overflow-hidden rounded-lg bg-card">
          <SettingSwitchItem
            icon={GlobeIcon}
            label="Auto-play Videos"
            onValueChange={setAutoPlay}
            value={autoPlay}
          />
          <View className="mx-4 h-px bg-border" />
          <SettingSwitchItem
            icon={GlobeIcon}
            label="Data Saver Mode"
            onValueChange={setSaveData}
            value={saveData}
          />
          <View className="mx-4 h-px bg-border" />
          <SettingNavItem icon={ShieldIcon} label="Privacy Settings" />
          <View className="mx-4 h-px bg-border" />
          <SettingNavItem icon={TrashIcon} label="Clear Cache" />
        </View>
      </View>

      {/* Support */}
      <View className="">
        <SectionHeader title="Support" />
        <View className="overflow-hidden rounded-lg bg-card">
          <SettingNavItem icon={HelpCircleIcon} label="Help Center" />
          <View className="mx-4 h-px bg-border" />
          <SettingNavItem icon={FileTextIcon} label="Terms of Service" />
          <View className="mx-4 h-px bg-border" />
          <SettingNavItem icon={ShieldIcon} label="Privacy Policy" />
        </View>
      </View>

      {/* Log Out */}
      <View className="px-6 py-6">
        <Pressable
          className="flex-row items-center justify-center gap-2 rounded-lg bg-destructive/10 py-3 active:bg-destructive/20"
          onPress={signout}
        >
          <LogOutIcon className="text-destructive" size={20} />
          <UIText className="font-medium text-destructive">Log Out</UIText>
        </Pressable>
      </View>

      {/* App Version */}
      <View className="items-center">
        <UIText className="text-muted-foreground text-xs">
          StitchAI v1.0.0
        </UIText>
      </View>
    </ScrollView>
  );
}
