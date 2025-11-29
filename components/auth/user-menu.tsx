import type { TriggerRef } from "@rn-primitives/popover";
import { router } from "expo-router";
import { LogOutIcon, PlusIcon, SettingsIcon } from "lucide-react-native";
import React, { useCallback, useMemo } from "react";
import { Alert, View } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/context/AuthContext";
import { cn, getInitials } from "@/lib/utils";

export function UserMenu({ className }: { className?: string }) {
  const { user, signout } = useAuth();
  const popoverTriggerRef = React.useRef<TriggerRef>(null);

  // Memoize avatar URL to prevent unnecessary re-renders
  const avatarSource = useMemo(() => {
    if (!user?.name) {
      return;
    }
    // Generate Appwrite initials avatar URL
    const endpoint =
      process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ||
      "https://cloud.appwrite.io/v1";
    return {
      uri: `${endpoint}/avatars/initials?name=${encodeURIComponent(user.name)}&width=80&height=80`,
    };
  }, [user?.name]);

  const onSignOut = useCallback(async () => {
    popoverTriggerRef.current?.close();

    try {
      await signout();
      router.replace("/auth/signin");
    } catch {
      Alert.alert("Sign Out Error", "Failed to sign out. Please try again.");
    }
  }, [signout]);

  const handleSettingsPress = useCallback(() => {
    popoverTriggerRef.current?.close();
    router.push("/settings");
  }, []);

  const handleAddAccountPress = useCallback(() => {
    popoverTriggerRef.current?.close();
    router.push("/auth/add-account");
  }, []);

  // Show loading state if no user data
  if (!user) {
    return null;
  }

  const userInitials = getInitials(user.name);
  const displayName = user.name || "User";
  const username = user.email || "";

  return (
    <Popover>
      <PopoverTrigger asChild ref={popoverTriggerRef}>
        <Button className="size-8 rounded-full" size="icon" variant="ghost">
          <UserAvatar
            avatarSource={avatarSource}
            className={className}
            initials={userInitials}
            user={user}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-80 p-0" side="bottom">
        <View className="gap-3 border-border border-b p-3">
          <View className="flex-row items-center gap-3">
            <UserAvatar
              avatarSource={avatarSource}
              className="size-10"
              initials={userInitials}
              user={user}
            />
            <View className="flex-1">
              <Text className="font-medium leading-5">{displayName}</Text>
              {username ? (
                <Text className="font-normal text-muted-foreground text-sm leading-4">
                  {username}
                </Text>
              ) : null}
            </View>
          </View>
          <View className="flex-row flex-wrap gap-3 py-0.5">
            <Button onPress={handleSettingsPress} size="sm" variant="outline">
              <Icon as={SettingsIcon} className="size-4" />
              <Text>Manage Account</Text>
            </Button>
            <Button
              className="flex-1"
              onPress={onSignOut}
              size="sm"
              variant="outline"
            >
              <Icon as={LogOutIcon} className="size-4" />
              <Text>Sign Out</Text>
            </Button>
          </View>
        </View>
        <Button
          className="h-16 justify-start gap-3 rounded-none rounded-b-md px-3 sm:h-14"
          onPress={handleAddAccountPress}
          size="lg"
          variant="ghost"
        >
          <View className="size-10 items-center justify-center">
            <View className="size-7 items-center justify-center rounded-full border border-border border-dashed bg-muted/50">
              <Icon as={PlusIcon} className="size-5" />
            </View>
          </View>
          <Text>Add account</Text>
        </Button>
      </PopoverContent>
    </Popover>
  );
}

interface UserAvatarProps
  extends Omit<React.ComponentProps<typeof Avatar>, "alt"> {
  user: { name?: string; email?: string };
  initials: string;
  avatarSource?: { uri: string };
}

function UserAvatar({
  user,
  initials,
  avatarSource,
  className,
  ...props
}: UserAvatarProps) {
  return (
    <Avatar
      alt={`${user?.name || "User"}'s avatar`}
      className={cn("size-8", className)}
      {...props}
    >
      {avatarSource ? <AvatarImage source={avatarSource} /> : null}
      <AvatarFallback>
        <Text>{initials}</Text>
      </AvatarFallback>
    </Avatar>
  );
}
