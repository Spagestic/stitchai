import { Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { THEME } from '@/lib/theme';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function Modal() {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === 'dark' ? THEME.dark : THEME.light;
  const accentForegroundColor = theme.accentForeground;

  function handleClose() {
    router.back();
  }

  return (
    <View className="flex-1 items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center gap-4">
          <View className="mb-2 h-16 w-16 items-center justify-center rounded-full bg-accent">
            <Ionicons name="checkmark" size={32} color={accentForegroundColor} />
          </View>
          <CardTitle className="text-center text-xl">Modal Screen</CardTitle>
          <CardDescription className="text-center">
            This is an example modal screen. You can use this pattern for dialogs, confirmations, or
            any overlay content.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex-col gap-2">
          <Button className="w-full" onPress={handleClose}>
            <Text className="text-primary-foreground">Close</Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
}

export default Modal;
