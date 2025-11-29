import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function Layout() {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href="/auth/signin" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(drawer)" />
      <Stack.Screen
        name="jersey/[id]"
        options={{
          animation: "fade_from_bottom",
          animationDuration: 300,
          presentation: "card",
        }}
      />
    </Stack>
  );
}
