import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import JerseyIcon from "@/assets/jersey.svg";
import BottomDrawer, { type BottomDrawerRef } from "@/components/BottomDrawer";
import { CreateHeader } from "@/components/create/CreateHeader";
import { ColorPickerContent } from "@/components/create/color/ColorPickerDialog";
import { PaletteSelector } from "@/components/create/color/PaletteSelector";
import { GenerateButton } from "@/components/create/GenerateButton";
import { PersonalizationFields } from "@/components/create/PersonalizationFields";
import { PreviewSection } from "@/components/create/PreviewSection";
import { PromptSection } from "@/components/create/PromptSection";
import { StyleSelector } from "@/components/create/StyleSelector";
import { TeamLogoSelector } from "@/components/create/team/TeamLogoSelector";
import type { ColorPalette } from "@/constants/jersey";
import { colorPalettes, teamData } from "@/constants/jersey";
import type { Team } from "@/constants/teams";

export default function CreatePage() {
  const { team, prompt: initialPrompt } = useLocalSearchParams<{
    team?: string;
    prompt?: string;
  }>();

  // Color picker drawer ref
  const colorPickerDrawerRef = useRef<BottomDrawerRef>(null);

  // Form state
  const [prompt, setPrompt] = useState(initialPrompt || "");
  const [selectedPalette, setSelectedPalette] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [playerName, setPlayerName] = useState("");
  const [playerNumber, setPlayerNumber] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [customPalettes, setCustomPalettes] = useState<ColorPalette[]>([]);

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

  const handleOpenColorPicker = () => {
    colorPickerDrawerRef.current?.open();
  };

  const handleCloseColorPicker = () => {
    colorPickerDrawerRef.current?.close();
  };

  const handleCreatePalette = (palette: { name: string; colors: string[] }) => {
    const newPalette: ColorPalette = {
      id: `custom-${Date.now()}`,
      name: palette.name,
      colors: palette.colors,
      isCustom: true,
    };
    setCustomPalettes((prev) => [...prev, newPalette]);
    setSelectedPalette(newPalette.id);
  };

  const handleDeleteCustomPalette = (paletteId: string) => {
    setCustomPalettes((prev) => prev.filter((p) => p.id !== paletteId));
    if (selectedPalette === paletteId) {
      setSelectedPalette(null);
    }
  };

  // Get the current jersey color based on selected palette
  const getJerseyColor = (): string => {
    // Check custom palettes first
    const customPalette = customPalettes.find((p) => p.id === selectedPalette);
    if (customPalette) {
      return customPalette.colors[0];
    }

    // Check built-in palettes
    const builtInPalette = colorPalettes.find((p) => p.id === selectedPalette);
    if (builtInPalette) {
      return builtInPalette.colors[0];
    }

    // Default color
    return "#1a1a1a";
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
        {/* Jersey Preview */}
        <View className="mb-4 px-4">
          <View className="aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-muted">
            <JerseyIcon color={getJerseyColor()} height={280} width={280} />
          </View>
        </View>

        <StyleSelector
          onStyleChange={setSelectedStyle}
          selectedStyle={selectedStyle}
        />

        <TeamLogoSelector
          onTeamChange={setSelectedTeam}
          selectedTeam={selectedTeam}
        />

        <PaletteSelector
          customPalettes={customPalettes}
          onCustomPaletteDelete={handleDeleteCustomPalette}
          onOpenColorPicker={handleOpenColorPicker}
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

      {/* Color Picker Bottom Drawer */}
      <BottomDrawer refProp={colorPickerDrawerRef}>
        <ColorPickerContent
          onClose={handleCloseColorPicker}
          onCreatePalette={handleCreatePalette}
        />
      </BottomDrawer>
    </KeyboardAvoidingView>
  );
}
