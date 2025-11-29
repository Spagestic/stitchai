import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import type { TriggerRef } from '@rn-primitives/popover';
import { router } from 'expo-router';
import { LogOutIcon, PlusIcon, SettingsIcon } from 'lucide-react-native';
import * as React from 'react';
import { Alert, View } from 'react-native';

export function UserMenu({ className }: { className?: string }) {
  const { user, signout } = useAuth();
  const popoverTriggerRef = React.useRef<TriggerRef>(null);

  // Generate initials from user name
  const getInitials = (name?: string) => {
    if (!name) return '??';
    const nameParts = name.trim().split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].substring(0, 2).toUpperCase();
    }
    return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
  };

  // Get Appwrite avatar URL for initials
  const getAvatarUrl = () => {
    if (!user?.name) return undefined;
    // Generate Appwrite initials avatar URL
    const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
    return {
      uri: `${endpoint}/avatars/initials?name=${encodeURIComponent(user.name)}&width=80&height=80`,
    };
  };

  async function onSignOut() {
    popoverTriggerRef.current?.close();

    try {
      await signout();
      router.replace('/auth/signin');
    } catch (error: any) {
      Alert.alert('Sign Out Error', 'Failed to sign out. Please try again.');
    }
  }

  // Show loading state if no user data
  if (!user) {
    return null;
  }

  const userInitials = getInitials(user.name);
  const avatarSource = getAvatarUrl();
  const displayName = user.name || 'User';
  const username = user.email || '';

  return (
    <Popover>
      <PopoverTrigger asChild ref={popoverTriggerRef}>
        <Button variant="ghost" size="icon" className="size-8 rounded-full">
          <UserAvatar
            className={className}
            user={user}
            initials={userInitials}
            avatarSource={avatarSource}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center" side="bottom" className="w-80 p-0">
        <View className="gap-3 border-b border-border p-3">
          <View className="flex-row items-center gap-3">
            <UserAvatar
              user={user}
              initials={userInitials}
              avatarSource={avatarSource}
              className="size-10"
            />
            <View className="flex-1">
              <Text className="font-medium leading-5">{displayName}</Text>
              {username ? (
                <Text className="text-sm font-normal leading-4 text-muted-foreground">
                  {username}
                </Text>
              ) : null}
            </View>
          </View>
          <View className="flex-row flex-wrap gap-3 py-0.5">
            <Button
              variant="outline"
              size="sm"
              onPress={() => {
                popoverTriggerRef.current?.close();
                router.push('/settings/account'); // Update with your settings route
              }}>
              <Icon as={SettingsIcon} className="size-4" />
              <Text>Manage Account</Text>
            </Button>
            <Button variant="outline" size="sm" className="flex-1" onPress={onSignOut}>
              <Icon as={LogOutIcon} className="size-4" />
              <Text>Sign Out</Text>
            </Button>
          </View>
        </View>
        <Button
          variant="ghost"
          size="lg"
          className="h-16 justify-start gap-3 rounded-none rounded-b-md px-3 sm:h-14"
          onPress={() => {
            popoverTriggerRef.current?.close();
            router.push('/auth/add-account'); // Update with your add account route
          }}>
          <View className="size-10 items-center justify-center">
            <View className="size-7 items-center justify-center rounded-full border border-dashed border-border bg-muted/50">
              <Icon as={PlusIcon} className="size-5" />
            </View>
          </View>
          <Text>Add account</Text>
        </Button>
      </PopoverContent>
    </Popover>
  );
}

interface UserAvatarProps extends Omit<React.ComponentProps<typeof Avatar>, 'alt'> {
  user: any;
  initials: string;
  avatarSource?: { uri: string };
}

function UserAvatar({ user, initials, avatarSource, className, ...props }: UserAvatarProps) {
  return (
    <Avatar alt={`${user?.name || 'User'}'s avatar`} className={cn('size-8', className)} {...props}>
      {avatarSource && <AvatarImage source={avatarSource} />}
      <AvatarFallback>
        <Text>{initials}</Text>
      </AvatarFallback>
    </Avatar>
  );
}
