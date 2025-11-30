import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
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
import { colorPalettes, jerseyStyles, teamData } from "@/constants/jersey";
import type { Team } from "@/constants/teams";

export default function CreatePage() {
  const { team, prompt: initialPrompt } = useLocalSearchParams<{
    team?: string;
    prompt?: string;
  }>();

  // Refs
  const colorPickerDrawerRef = useRef<BottomDrawerRef>(null);
  const previewDrawerRef = useRef<BottomDrawerRef>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // Form state
  const [prompt, setPrompt] = useState(initialPrompt || "");
  const [selectedPalette, setSelectedPalette] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [playerName, setPlayerName] = useState("");
  const [playerNumber, setPlayerNumber] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
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

  const getRandomItem = <T,>(array: T[]): T =>
    array[Math.floor(Math.random() * array.length)];

  const handleRandomize = () => {
    // Randomize style
    const randomStyle = getRandomItem(jerseyStyles);
    setSelectedStyle(randomStyle.id);

    // Randomize color palette
    const randomPalette = getRandomItem(colorPalettes);
    setSelectedPalette(randomPalette.id);

    // Randomize player name
    const playerNames = [
      "RONALDO",
      "MESSI",
      "NEYMAR",
      "MBAPPE",
      "HAALAND",
      "VINICIUS",
      "SALAH",
      "BENZEMA",
      "LEWANDOWSKI",
      "KANE",
    ];
    setPlayerName(getRandomItem(playerNames));

    // Randomize player number
    const randomNumber = String(Math.floor(Math.random() * 99) + 1);
    setPlayerNumber(randomNumber);

    // Randomize prompt
    const prompts = [
      "A sleek modern football jersey with geometric patterns",
      "A classic retro-inspired jersey with vintage vibes",
      "A bold and vibrant football kit with striking design",
      "A minimalist football jersey with elegant simplicity",
      "A gradient-filled jersey with smooth color transitions",
      "A futuristic football uniform with tech-inspired elements",
      "A traditional jersey with timeless classic design",
      "An abstract art-inspired football kit",
      "A nature-inspired jersey with organic patterns",
      "A luxury premium football jersey with premium details",
    ];
    setPrompt(getRandomItem(prompts));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // TODO: Integrate with actual AI image generation API
    // For now, simulate generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsGenerating(false);
    // In production, this would open the drawer with the generated image URL
    previewDrawerRef.current?.open();
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-background"
    >
      <CreateHeader onRandomize={handleRandomize} />

      <ScrollView
        automaticallyAdjustKeyboardInsets
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
      >
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

      {/* Preview Bottom Drawer */}
      <BottomDrawer drawerHeight={580} refProp={previewDrawerRef}>
        <PreviewSection
          onRegenerate={() => {
            previewDrawerRef.current?.close();
            handleGenerate();
          }}
          onSave={() => {
            // TODO: Implement save functionality
            previewDrawerRef.current?.close();
          }}
        />
      </BottomDrawer>
    </KeyboardAvoidingView>
  );
}
