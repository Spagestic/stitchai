import { View, Image, Dimensions, Pressable } from 'react-native';
import React from 'react';
import { Text } from '@/components/ui/text';

interface Jersey {
  id: number;
  source: any;
  name: string;
  creator: string;
}

interface CommunityCreationsProps {
  jerseys: Jersey[];
  onJerseyPress: (jerseyId: number) => void;
}

const { width } = Dimensions.get('window');
const imageWidth = (width - 48) / 2; // 2 columns with padding

export const CommunityCreations = ({ jerseys, onJerseyPress }: CommunityCreationsProps) => {
  return (
    <View className="p-4 pb-24">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-bold">Get Inspired</Text>
        <Pressable>
          <Text className="text-primary text-sm">See all</Text>
        </Pressable>
      </View>
      <View className="flex-row flex-wrap justify-between">
        {jerseys.map((jersey) => (
          <Pressable 
            key={jersey.id} 
            className="mb-4" 
            style={{ width: imageWidth }}
            onPress={() => onJerseyPress(jersey.id)}
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
  );
};
