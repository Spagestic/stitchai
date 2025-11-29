import { Ionicons } from "@expo/vector-icons";
import { Sparkles } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type AIPromptBarProps = {
  searchText: string;
  onSearchChange: (text: string) => void;
  onSendPress: () => void;
  onCreatePress: () => void;
  isKeyboardVisible: boolean;
};

export const AIPromptBar = ({
  searchText,
  onSearchChange,
  onSendPress,
  onCreatePress,
  isKeyboardVisible,
}: AIPromptBarProps) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="absolute right-0 bottom-0 left-0"
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View className={`p-4 ${isKeyboardVisible ? "pb-2" : "pb-8"}`}>
        <View className="flex-row items-center rounded-full bg-secondary px-2 py-3">
          <TouchableOpacity className="mr-3" onPress={onCreatePress}>
            <View className="size-10 items-center justify-center rounded-full bg-primary">
              <Sparkles color="#fff" size={18} />
            </View>
          </TouchableOpacity>
          <TextInput
            className="flex-1 text-base text-secondary-foreground"
            onChangeText={onSearchChange}
            onSubmitEditing={onSendPress}
            placeholder="Describe your dream jersey..."
            placeholderTextColor="#9ca3af"
            returnKeyType="send"
            value={searchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity className="mr-2 ml-2" onPress={onSendPress}>
              <Ionicons
                color={isDark ? "#fff" : "#000"}
                name="send"
                size={20}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
