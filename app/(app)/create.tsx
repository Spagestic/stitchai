import { View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { teamData, jerseyStyles, colorPalettes } from '@/lib/constants/jersey';
import { CreateHeader } from '@/components/create/CreateHeader';
import { StyleSelector } from '@/components/create/StyleSelector';
import { PaletteSelector } from '@/components/create/PaletteSelector';
import { PersonalizationFields } from '@/components/create/PersonalizationFields';
import { PromptSection } from '@/components/create/PromptSection';
import { PreviewSection } from '@/components/create/PreviewSection';
import { GenerateButton } from '@/components/create/GenerateButton';

export default function CreatePage() {
  const { team, prompt: initialPrompt } = useLocalSearchParams<{ team?: string; prompt?: string }>();

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
    <View className="flex-1 bg-background">
      <CreateHeader />

      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <StyleSelector 
          selectedStyle={selectedStyle}
          onStyleChange={setSelectedStyle}
        />

        <PaletteSelector 
          selectedPalette={selectedPalette}
          onPaletteChange={setSelectedPalette}
        />

        <PersonalizationFields
          playerName={playerName}
          playerNumber={playerNumber}
          onPlayerNameChange={setPlayerName}
          onPlayerNumberChange={setPlayerNumber}
        />

        <PromptSection 
          prompt={prompt}
          onPromptChange={setPrompt}
        />

        {generatedImage && (
          <PreviewSection 
            onRegenerate={() => setGeneratedImage(null)}
            onSave={() => {
              // TODO: Implement save functionality
            }}
          />
        )}

        {/* Spacer for bottom button */}
        <View className="h-32" />
      </ScrollView>

      <GenerateButton 
        isGenerating={isGenerating}
        isDisabled={!prompt.trim()}
        onPress={handleGenerate}
      />
    </View>
  );
}
