import { View, ScrollView, TextInput, Pressable, Dimensions, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Sparkles, Wand2, Palette, Type, Hash, Shirt } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Team data for pre-filling
const teamData: Record<string, { name: string; primaryColor: string; secondaryColor: string; style: string }> = {
  'real-madrid': { name: 'Real Madrid', primaryColor: '#FFFFFF', secondaryColor: '#00529F', style: 'classic white with blue accents' },
  'barcelona': { name: 'Barcelona', primaryColor: '#A50044', secondaryColor: '#004D98', style: 'red and blue stripes' },
  'man-united': { name: 'Man United', primaryColor: '#DA291C', secondaryColor: '#FBE122', style: 'classic red with gold details' },
  'liverpool': { name: 'Liverpool', primaryColor: '#C8102E', secondaryColor: '#00B2A9', style: 'vibrant red with teal accents' },
  'bayern': { name: 'Bayern Munich', primaryColor: '#DC052D', secondaryColor: '#0066B2', style: 'bold red with blue trim' },
  'psg': { name: 'Paris SG', primaryColor: '#004170', secondaryColor: '#DA291C', style: 'navy blue with red stripe' },
  'juventus': { name: 'Juventus', primaryColor: '#000000', secondaryColor: '#FFFFFF', style: 'black and white stripes' },
  'portugal': { name: 'Portugal', primaryColor: '#006600', secondaryColor: '#FF0000', style: 'green and red national colors' },
};

// Color palette options
const colorPalettes = [
  { id: 'classic', name: 'Classic', colors: ['#FFFFFF', '#000000', '#C8102E'] },
  { id: 'ocean', name: 'Ocean', colors: ['#0077B6', '#00B4D8', '#90E0EF'] },
  { id: 'sunset', name: 'Sunset', colors: ['#FF6B6B', '#FFA500', '#FFE66D'] },
  { id: 'forest', name: 'Forest', colors: ['#2D5A27', '#52B788', '#95D5B2'] },
  { id: 'royal', name: 'Royal', colors: ['#5E548E', '#9F86C0', '#BE95C4'] },
  { id: 'neon', name: 'Neon', colors: ['#FF00FF', '#00FFFF', '#39FF14'] },
];

// Jersey style options
const jerseyStyles = [
  { id: 'classic', name: 'Classic', icon: 'shirt-outline' },
  { id: 'modern', name: 'Modern', icon: 'flash-outline' },
  { id: 'retro', name: 'Retro', icon: 'time-outline' },
  { id: 'minimalist', name: 'Minimal', icon: 'remove-outline' },
  { id: 'bold', name: 'Bold', icon: 'bonfire-outline' },
  { id: 'gradient', name: 'Gradient', icon: 'color-fill-outline' },
];

export default function CreatePage() {
  const { team, prompt: initialPrompt } = useLocalSearchParams<{ team?: string; prompt?: string }>();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === 'dark';

  // Form state
  const [prompt, setPrompt] = useState(initialPrompt || '');
  const [selectedPalette, setSelectedPalette] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState('');
  const [playerNumber, setPlayerNumber] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // Pre-fill based on team selection
  useEffect(() => {
    if (team && teamData[team]) {
      const teamInfo = teamData[team];
      setPrompt(`A professional football jersey inspired by ${teamInfo.name}, ${teamInfo.style}`);
    }
  }, [team]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // TODO: Integrate with actual AI image generation API
    // For now, simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      // In production, this would be the generated image URL
      setGeneratedImage('generated');
    }, 2000);
  };

  const buildFullPrompt = () => {
    let fullPrompt = prompt;
    if (selectedStyle) {
      const style = jerseyStyles.find(s => s.id === selectedStyle);
      fullPrompt += `, ${style?.name.toLowerCase()} design style`;
    }
    if (selectedPalette) {
      const palette = colorPalettes.find(p => p.id === selectedPalette);
      fullPrompt += `, using ${palette?.name.toLowerCase()} color palette`;
    }
    return fullPrompt;
  };

  return (
    <View className="flex-1 bg-background px-2">
      {/* Header */}
      <Animated.View 
        entering={FadeIn.duration(300)}
        className="flex-row items-center justify-between px-4 pb-4"
        style={{ paddingTop: insets.top + 8 }}
      >
        <Pressable
          onPress={() => router.back()}
          className="size-10 rounded-full bg-secondary items-center justify-center"
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDark ? '#fff' : '#000'}
          />
        </Pressable>
        <Text className="text-xl font-bold">Create Jersey</Text>
        <View className="size-10" />
      </Animated.View>

      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* Style Selection */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(400)}
          className="px-4 mb-6"
        >
          <View className="flex-row items-center gap-2 mb-3">
            <Shirt size={20} className="text-primary" />
            <Text className="text-base font-semibold">Style</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {jerseyStyles.map((style) => (
              <Pressable
                key={style.id}
                onPress={() => setSelectedStyle(selectedStyle === style.id ? null : style.id)}
                className={`mr-3 px-4 py-3 rounded-xl border-2 flex-row items-center gap-2 ${
                  selectedStyle === style.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-secondary'
                }`}
              >
                <Ionicons
                  name={style.icon as any}
                  size={18}
                  color={selectedStyle === style.id ? (isDark ? '#fff' : '#000') : '#9ca3af'}
                />
                <Text className={selectedStyle === style.id ? 'font-medium' : 'text-muted-foreground'}>
                  {style.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Color Palette Selection */}
        <Animated.View 
          entering={FadeInDown.delay(300).duration(400)}
          className="px-4 mb-6"
        >
          <View className="flex-row items-center gap-2 mb-3">
            <Palette size={20} className="text-primary" />
            <Text className="text-base font-semibold">Color Palette</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {colorPalettes.map((palette) => (
              <Pressable
                key={palette.id}
                onPress={() => setSelectedPalette(selectedPalette === palette.id ? null : palette.id)}
                className={`mr-3 p-3 rounded-xl border-2 ${
                  selectedPalette === palette.id
                    ? 'border-primary'
                    : 'border-border'
                }`}
              >
                <View className="flex-row mb-2">
                  {palette.colors.map((color, index) => (
                    <View
                      key={index}
                      className="size-8 rounded-full -ml-2 first:ml-0 border-2 border-background"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </View>
                <Text className={`text-xs text-center ${
                  selectedPalette === palette.id ? 'font-medium' : 'text-muted-foreground'
                }`}>
                  {palette.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Customization Fields */}
        <Animated.View 
          entering={FadeInDown.delay(400).duration(400)}
          className="px-4 mb-6"
        >
          <View className="flex-row items-center gap-2 mb-3">
            <Type size={20} className="text-primary" />
            <Text className="text-base font-semibold">Personalize</Text>
          </View>
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Text className="text-sm text-muted-foreground mb-2">Player Name</Text>
              <View className="bg-secondary rounded-xl px-4 py-3">
                <TextInput
                  value={playerName}
                  onChangeText={setPlayerName}
                  placeholder="RONALDO"
                  placeholderTextColor="#9ca3af"
                  className="text-foreground text-base"
                  maxLength={15}
                  autoCapitalize="characters"
                />
              </View>
            </View>
            <View className="w-24">
              <Text className="text-sm text-muted-foreground mb-2">Number</Text>
              <View className="bg-secondary rounded-xl px-4 py-3">
                <TextInput
                  value={playerNumber}
                  onChangeText={setPlayerNumber}
                  placeholder="7"
                  placeholderTextColor="#9ca3af"
                  className="text-foreground text-base text-center"
                  keyboardType="number-pad"
                  maxLength={2}
                />
              </View>
            </View>
          </View>
        </Animated.View>

          {/* AI Prompt Section */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(400)}
          className="px-4 mb-6"
        >
          <View className="flex-row items-center gap-2 mb-3">
            <Wand2 size={20} className="text-primary" />
            <Text className="text-base font-semibold">Describe Your Jersey</Text>
          </View>
          <View className="bg-secondary rounded-2xl p-4">
            <TextInput
              value={prompt}
              onChangeText={setPrompt}
              placeholder="E.g., A futuristic jersey with geometric patterns, inspired by cyberpunk aesthetics..."
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
              className="text-foreground text-base min-h-[100px]"
              style={{ textAlignVertical: 'top' }}
            />
          </View>
        </Animated.View>

        {/* Preview Area (when generated) */}
        {generatedImage && (
          <Animated.View 
            entering={FadeInUp.duration(400)}
            className="px-4 mb-6"
          >
            <Text className="text-base font-semibold mb-3">Your Design</Text>
            <View className="bg-secondary rounded-2xl p-4 items-center">
              {/* Placeholder for generated image */}
              <Image
                source={require('@/assets/images/jerseys/Modern_blue_gradient.png')}
                style={{ width: width - 64, height: (width - 64) * 1.2, borderRadius: 12 }}
                resizeMode="contain"
              />
              <View className="flex-row gap-3 mt-4">
                <Button 
                  variant="outline" 
                  className="flex-1 rounded-full"
                  onPress={() => setGeneratedImage(null)}
                >
                  <Text>Regenerate</Text>
                </Button>
                <Button className="flex-1 rounded-full">
                  <Text className="text-primary-foreground">Save Design</Text>
                </Button>
              </View>
            </View>
          </Animated.View>
        )}

        {/* Spacer for bottom button */}
        <View className="h-32" />
      </ScrollView>

      {/* Generate Button */}
      <Animated.View 
        entering={FadeInUp.delay(500).duration(400)}
        className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t border-border"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <Button 
          className="w-full h-14 rounded-full flex-row items-center justify-center gap-2"
          onPress={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
        >
          {isGenerating ? (
            <>
              <Ionicons name="sync" size={20} color="#fff" />
              <Text className="text-primary-foreground font-semibold text-lg">Generating...</Text>
            </>
          ) : (
            <>
              <Sparkles size={20} color="#fff" />
              <Text className="text-primary-foreground font-semibold text-lg">Generate Jersey</Text>
            </>
          )}
        </Button>
      </Animated.View>
    </View>
  );
}
