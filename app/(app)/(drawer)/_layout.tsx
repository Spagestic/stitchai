import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Bookmark } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { Dimensions, Pressable, Text, View } from "react-native";
import { CustomDrawerContent } from "@/components/CustomDrawerContent";

const { width: screenWidth } = Dimensions.get("window");

function DrawerLayout() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
          borderBottomWidth: 0,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTitleStyle: {
          fontWeight: "600",
          color: colorScheme === "dark" ? "#fff" : "#000",
        },
        headerRight: () => (
          <View className="mr-4 flex-row items-center">
            <Bookmark />
          </View>
        ),
        drawerStyle: {
          backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
          width: screenWidth,
        },
        overlayColor: "transparent",
        swipeEnabled: true,
        swipeEdgeWidth: 100,
        swipeMinDistance: 5,
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: "",
          drawerLabel: ({ color, focused }) => {
            let textColor: string;
            if (focused) {
              textColor = color;
            } else {
              textColor = colorScheme === "dark" ? "#fff" : "#000";
            }
            return <Text style={{ color: textColor }}>Home</Text>;
          },
          drawerIcon: ({ size, color, focused }) => {
            let iconColor: string;
            if (focused) {
              iconColor = color;
            } else {
              iconColor = colorScheme === "dark" ? "#fff" : "#000";
            }
            return (
              <Ionicons color={iconColor} name="home-outline" size={size} />
            );
          },
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          headerTitle: "Settings",
          headerLeft: () => (
            <Pressable className="pl-4" onPress={() => router.back()}>
              <Ionicons
                color={colorScheme === "dark" ? "#fff" : "#000"}
                name="close"
                size={24}
              />
            </Pressable>
          ),
          headerRight: () => null,
          drawerLabel: ({ color, focused }) => {
            let textColor: string;
            if (focused) {
              textColor = color;
            } else {
              textColor = colorScheme === "dark" ? "#fff" : "#000";
            }
            return <Text style={{ color: textColor }}>Settings</Text>;
          },
          drawerIcon: ({ size, color, focused }) => {
            let iconColor: string;
            if (focused) {
              iconColor = color;
            } else {
              iconColor = colorScheme === "dark" ? "#fff" : "#000";
            }
            return (
              <Ionicons color={iconColor} name="settings-outline" size={size} />
            );
          },
        }}
      />
    </Drawer>
  );
}

export default DrawerLayout;
