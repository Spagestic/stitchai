import { View, Image, ScrollView, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext';
import { Text } from '@/components/ui/text';
import { Image as ImageIcon, Sparkles, Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

// Popular football teams for quick selection
const popularTeams = [
  { id: 'real-madrid', name: 'Real Madrid', primaryColor: '#FFFFFF', secondaryColor: '#00529F', league: 'La Liga' },
  { id: 'barcelona', name: 'Barcelona', primaryColor: '#A50044', secondaryColor: '#004D98', league: 'La Liga' },
  { id: 'man-united', name: 'Man United', primaryColor: '#DA291C', secondaryColor: '#FBE122', league: 'Premier League' },
  { id: 'liverpool', name: 'Liverpool', primaryColor: '#C8102E', secondaryColor: '#00B2A9', league: 'Premier League' },
  { id: 'bayern', name: 'Bayern Munich', primaryColor: '#DC052D', secondaryColor: '#0066B2', league: 'Bundesliga' },
  { id: 'psg', name: 'Paris SG', primaryColor: '#004170', secondaryColor: '#DA291C', league: 'Ligue 1' },
  { id: 'juventus', name: 'Juventus', primaryColor: '#000000', secondaryColor: '#FFFFFF', league: 'Serie A' },
  { id: 'portugal', name: 'Portugal', primaryColor: '#006600', secondaryColor: '#FF0000', league: 'National' },
];

// Sample community creations / inspiration
const communityCreations = [
  { id: 1, source: require('@/assets/images/jerseys/black_jersey.png'), name: 'Midnight Edition', creator: 'Alex' },
  { id: 2, source: require('@/assets/images/jerseys/Classic_red_and_whit.png'), name: 'Classic Red', creator: 'Maria' },
  { id: 3, source: require('@/assets/images/jerseys/Modern_blue_gradient.png'), name: 'Ocean Wave', creator: 'João' },
  { id: 4, source: require('@/assets/images/jerseys/Retro_90s_style_jers.png'), name: 'Retro Vibes', creator: 'Carlos' },
];

const { width } = Dimensions.get('window');
const imageWidth = (width - 48) / 2; // 2 columns with padding
const teamCardWidth = 140;

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const [searchText, setSearchText] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const isDark = colorScheme === 'dark';

  const handleTeamPress = (teamId: string) => {
    router.push(`/create?team=${teamId}` as any);
  };

  const handleJerseyPress = (jerseyId: number) => {
    router.push(`/jersey/${jerseyId}` as any);
  };

  const handleCreatePress = () => {
    router.push('/create' as any);
  };

  const handlePromptSubmit = () => {
    if (searchText.trim()) {
      router.push(`/create?prompt=${encodeURIComponent(searchText)}` as any);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Show loading while checking auth
  if (!user) {
    return null;
  }

  return (
    <View className="flex-1">
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {/* Create from Scratch CTA */}
        <View className="p-4">
          <Pressable 
            onPress={handleCreatePress}
            className="flex-row items-center justify-between bg-primary/10 rounded-2xl p-4 border border-primary/20"
          >
            <View className="flex-row items-center gap-3">
              <View className="size-12 rounded-full bg-primary items-center justify-center">
                <Sparkles size={24} color="#fff" />
              </View>
              <View>
                <Text className="text-lg font-bold">Create with AI</Text>
                <Text className="text-muted-foreground text-sm">Design your dream jersey</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color={isDark ? '#fff' : '#000'} />
          </Pressable>
        </View>

        {/* Popular Teams Section */}
        <View className="px-4 pt-2">
          <Text className="text-lg font-bold mb-4">Popular Teams</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
            {popularTeams.map((team) => (
              <Pressable
                key={team.id}
                onPress={() => handleTeamPress(team.id)}
                className="mr-3"
                style={{ width: teamCardWidth }}
              >
                <View 
                  className="h-20 rounded-xl items-center justify-center mb-2 border border-border overflow-hidden"
                  style={{ 
                    backgroundColor: team.primaryColor,
                  }}
                >
                  <View 
                    className="absolute right-0 top-0 bottom-0 w-1/3"
                    style={{ backgroundColor: team.secondaryColor }}
                  />
                  <Text 
                    className="text-center font-bold text-sm px-2 z-10"
                    style={{ 
                      color: team.primaryColor === '#FFFFFF' || team.primaryColor === '#FBE122' ? '#000' : '#fff',
                      textShadowColor: 'rgba(0,0,0,0.3)',
                      textShadowOffset: { width: 0, height: 1 },
                      textShadowRadius: 2,
                    }}
                  >
                    {team.name}
                  </Text>
                </View>
                <Text className="text-xs text-center text-muted-foreground">{team.league}</Text>
              </Pressable>
            ))}
            {/* Add More Teams Card */}
            <Pressable
              onPress={handleCreatePress}
              className="mr-3"
              style={{ width: teamCardWidth }}
            >
              <View className="h-20 rounded-xl items-center justify-center mb-2 border border-dashed border-muted-foreground">
                <Plus size={24} className="text-muted-foreground" />
              </View>
              <Text className="text-xs text-center text-muted-foreground">Custom Team</Text>
            </Pressable>
          </ScrollView>
        </View>

        {/* Community Creations / Explore Section */}
        <View className="p-4 pb-24">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold">Get Inspired</Text>
            <Pressable>
              <Text className="text-primary text-sm">See all</Text>
            </Pressable>
          </View>
          <View className="flex-row flex-wrap justify-between">
            {communityCreations.map((jersey) => (
              <Pressable 
                key={jersey.id} 
                className="mb-4" 
                style={{ width: imageWidth }}
                onPress={() => handleJerseyPress(jersey.id)}
              >
                <Image
                  source={jersey.source}
                  style={{ width: imageWidth, height: imageWidth * 1.2, borderRadius: 12 }}
                  resizeMode="cover"
                />
                <Text className="mt-2 font-medium text-sm">{jersey.name}</Text>
                <Text className="text-xs text-muted-foreground">by {jersey.creator}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom AI Prompt Bar */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="absolute bottom-0 left-0 right-0"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View className={`p-4 ${isKeyboardVisible ? 'pb-2' : 'pb-8'}`}>
          <View className="flex-row items-center bg-secondary rounded-full px-2 py-3">
            <TouchableOpacity className="mr-3" onPress={handleCreatePress}>
              <View className="size-10 rounded-full bg-primary items-center justify-center">
                <Sparkles size={18} color="#fff" />
              </View>
            </TouchableOpacity>
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handlePromptSubmit}
              placeholder="Describe your dream jersey..."
              placeholderTextColor="#9ca3af"
              className="flex-1 text-secondary-foreground text-base"
              returnKeyType="send"
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={handlePromptSubmit} className="ml-2 mr-2">
                <Ionicons name="send" size={20} color={isDark ? '#fff' : '#000'} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}