import { View, ScrollView, Dimensions, Pressable } from 'react-native';
import React from 'react';
import { Text } from '@/components/ui/text';
import { Plus } from 'lucide-react-native';

interface Team {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  league: string;
}

interface PopularTeamsProps {
  teams: Team[];
  onTeamPress: (teamId: string) => void;
  onCustomTeamPress: () => void;
}

const { width } = Dimensions.get('window');
const teamCardWidth = 140;

export const PopularTeams = ({ teams, onTeamPress, onCustomTeamPress }: PopularTeamsProps) => {
  return (
    <View className="px-4 pt-2">
      <Text className="text-lg font-bold mb-4">Popular Teams</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
        {teams.map((team) => (
          <Pressable
            key={team.id}
            onPress={() => onTeamPress(team.id)}
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
          onPress={onCustomTeamPress}
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
  );
};
