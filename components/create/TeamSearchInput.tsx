import { Search, X } from "lucide-react-native";
import { Pressable, TextInput, View } from "react-native";

type TeamSearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export function TeamSearchInput({ value, onChangeText }: TeamSearchInputProps) {
  return (
    <View className="flex-row items-center gap-2 rounded-lg border border-border bg-muted/50 px-3">
      <Search className="text-muted-foreground" size={18} />
      <TextInput
        className="flex-1 py-3 text-foreground"
        onChangeText={onChangeText}
        placeholder="Search teams..."
        placeholderTextColor="#888"
        value={value}
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText("")}>
          <X className="text-muted-foreground" size={18} />
        </Pressable>
      )}
    </View>
  );
}
