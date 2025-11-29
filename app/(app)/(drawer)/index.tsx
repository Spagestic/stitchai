import { View, Image, ScrollView, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import { Text } from '@/components/ui/text';
import { Image as ImageIcon } from 'lucide-react-native';

const jerseyImages = [
  { id: 1, source: require('@/assets/images/jerseys/black_jersey.png'), name: 'Black Jersey' },
  { id: 2, source: require('@/assets/images/jerseys/Classic_red_and_whit.png'), name: 'Classic Red & White' },
  { id: 3, source: require('@/assets/images/jerseys/Modern_blue_gradient.png'), name: 'Modern Blue Gradient' },
  { id: 4, source: require('@/assets/images/jerseys/Retro_90s_style_jers.png'), name: 'Retro 90s Style' },
];

const { width } = Dimensions.get('window');
const imageWidth = (width - 48) / 2; // 2 columns with padding

export default function Page() {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState('');

  // Show loading while checking auth
  if (!user) {
    return null;
  }

  return (
    <View className="flex-1">
      <ScrollView className="flex-1">
        <View className="p-4 pb-24">
          <Text className="text-2xl font-bold mb-4">Explore</Text>
          <View className="flex-row flex-wrap justify-between">
            {jerseyImages.map((jersey) => (
              <View key={jersey.id} className="mb-4" style={{ width: imageWidth }}>
                <Image
                  source={jersey.source}
                  style={{ width: imageWidth, height: imageWidth * 1.2, borderRadius: 12 }}
                  resizeMode="cover"
                />
                <Text className="mt-2 text-center font-medium">{jersey.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Search Bar */}
      <View className="absolute bottom-0 left-0 right-0 p-4 pb-8">
        <View className="flex-row items-center bg-secondary rounded-full px-2 py-3">
          <TouchableOpacity className="mr-3">
            <View className="size-10 rounded-full bg-primary/10 items-center justify-center">
            <ImageIcon className="text-secondary-foreground" size={20} />
            </View>
          </TouchableOpacity>
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Type to imagine_"
            placeholderTextColor="#9ca3af"
            className="flex-1 text-secondary-foreground text-base"
          />
        </View>
      </View>
    </View>
  )
}