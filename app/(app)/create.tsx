import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { CreateHeader } from "@/components/create/CreateHeader";
import { GenerateButton } from "@/components/create/GenerateButton";
import { PaletteSelector } from "@/components/create/PaletteSelector";
import { PersonalizationFields } from "@/components/create/PersonalizationFields";
import { PreviewSection } from "@/components/create/PreviewSection";
import { PromptSection } from "@/components/create/PromptSection";
import { StyleSelector } from "@/components/create/StyleSelector";
import { teamData } from "@/constants/jersey";

export default function CreatePage() {
  const { team, prompt: initialPrompt } = useLocalSearchParams<{
    team?: string;
    prompt?: string;
  }>();

  // Form state
  const [prompt, setPrompt] = useState(initialPrompt || "");
  const [selectedPalette, setSelectedPalette] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState("");
  const [playerNumber, setPlayerNumber] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // Pre-fill based on team selection
  useEffect(() => {
    if (team && teamData[team]) {
      const teamInfo = teamData[team];
      setPrompt(
        `A professional football jersey inspired by ${teamInfo.name}, ${teamInfo.style}`
      );
    }
  }, [team]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // TODO: Integrate with actual AI image generation API
    // For now, simulate generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsGenerating(false);
    // In production, this would be the generated image URL
    setGeneratedImage("generated");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-background"
    >
      <CreateHeader />

      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Dummy Preview placeholder */}
        <View className="px-4">
          <View className="mb-4 aspect-square w-full rounded-lg bg-muted" />
        </View>

        <StyleSelector
          onStyleChange={setSelectedStyle}
          selectedStyle={selectedStyle}
        />

        <PaletteSelector
          onPaletteChange={setSelectedPalette}
          selectedPalette={selectedPalette}
        />

        <PersonalizationFields
          onPlayerNameChange={setPlayerName}
          onPlayerNumberChange={setPlayerNumber}
          playerName={playerName}
          playerNumber={playerNumber}
        />

        <PromptSection onPromptChange={setPrompt} prompt={prompt} />

        {typeof generatedImage === "string" && generatedImage.trim() !== "" && (
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
        isDisabled={!prompt.trim()}
        isGenerating={isGenerating}
        onPress={handleGenerate}
      />
    </KeyboardAvoidingView>
  );
}
