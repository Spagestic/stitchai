import { View, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { Sparkles } from 'lucide-react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

interface AIPromptBarProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  onSendPress: () => void;
  onCreatePress: () => void;
  isKeyboardVisible: boolean;
}

export const AIPromptBar = ({
  searchText,
  onSearchChange,
  onSendPress,
  onCreatePress,
  isKeyboardVisible,
}: AIPromptBarProps) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="absolute bottom-0 left-0 right-0"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View className={`p-4 ${isKeyboardVisible ? 'pb-2' : 'pb-8'}`}>
        <View className="flex-row items-center bg-secondary rounded-full px-2 py-3">
          <TouchableOpacity className="mr-3" onPress={onCreatePress}>
            <View className="size-10 rounded-full bg-primary items-center justify-center">
              <Sparkles size={18} color="#fff" />
            </View>
          </TouchableOpacity>
          <TextInput
            value={searchText}
            onChangeText={onSearchChange}
            onSubmitEditing={onSendPress}
            placeholder="Describe your dream jersey..."
            placeholderTextColor="#9ca3af"
            className="flex-1 text-secondary-foreground text-base"
            returnKeyType="send"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={onSendPress} className="ml-2 mr-2">
              <Ionicons name="send" size={20} color={isDark ? '#fff' : '#000'} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
