import { MoonStarIcon, SunIcon } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button
      className="web:mx-4 ios:size-9 rounded-full"
      onPressIn={toggleColorScheme}
      size="icon"
      variant="ghost"
    >
      <Icon as={THEME_ICONS[colorScheme ?? "light"]} className="size-5" />
    </Button>
  );
}
