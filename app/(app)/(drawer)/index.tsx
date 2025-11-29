import { View, ScrollView, Keyboard, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { PopularTeams } from '@/components/home/PopularTeams';
import { CommunityCreations } from '@/components/home/CommunityCreations';
import { Plus } from 'lucide-react-native';

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

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const handleTeamPress = (teamId: string) => {
    router.push(`/create?team=${teamId}` as any);
  };

  const handleJerseyPress = (jerseyId: number) => {
    router.push(`/jersey/${jerseyId}` as any);
  };

  const handleCreatePress = () => {
    router.push('/create' as any);
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

        {/* Popular Teams Section */}
        <PopularTeams 
          teams={popularTeams}
          onTeamPress={handleTeamPress}
          onCustomTeamPress={handleCreatePress}
        />

        {/* Community Creations / Explore Section */}
        <CommunityCreations 
          jerseys={communityCreations}
          onJerseyPress={handleJerseyPress}
        />
      </ScrollView>
      {!isKeyboardVisible && (
        <TouchableOpacity 
          onPress={handleCreatePress}
          className="absolute bottom-6 right-6 w-14 h-14 bg-primary rounded-full items-center justify-center shadow-lg"
        >
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  )
}