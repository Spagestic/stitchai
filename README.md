# Stitch AI 

**AI-Powered Custom Jersey Design App**

Create unique, personalized sports jerseys using AI image generation. Inspired by the excitement of customizing jerseys at stadium booths - but without the wait.

![Sample Jersey](./assets/images/jerseys/Modern_blue_gradient.png)

## ✨ Features

- **AI Jersey Generation** - Describe your dream jersey and let AI bring it to life
- **Team Templates** - Quick-start designs inspired by popular football teams
- **Color Palettes** - Choose from curated color schemes or create your own
- **Personalization** - Add player name and number to your design
- **Dark Mode** - Full dark/light theme support
- **Cross-Platform** - Works on iOS, Android, and Web

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac only) or Android Emulator

### Installation

```bash
# Clone the repository
git clone https://github.com/Spagestic/stitchai.git
cd stitchai

# Install dependencies
bun install
# or
npm install

# Start the development server
bun dev
# or
npm run dev
```

### Running the App

After starting the dev server:

- **iOS**: Press `i` to launch in iOS Simulator (Mac only)
- **Android**: Press `a` to launch in Android Emulator
- **Web**: Press `w` to open in browser
- **Physical Device**: Scan QR code with [Expo Go](https://expo.dev/go)

## App Structure

```bash
app/
├── (app)/                 # Authenticated app routes
│   ├── (drawer)/          # Drawer navigation
│   │   ├── index.tsx      # Home page with team templates
│   │   └── settings.tsx   # User settings
│   ├── create.tsx         # AI jersey creation page
│   └── jersey/[id].tsx    # Jersey detail/customization
├── auth/                  # Authentication screens
└── _layout.tsx            # Root layout
```

## User Flow

1. **Browse** - Explore team templates or community creations on the home page
2. **Select** - Tap a team for quick-start or "Create with AI" for custom design
3. **Customize** - Choose style, colors, add name & number
4. **Generate** - AI creates your unique jersey design
5. **Save & Order** - Save to your collection or proceed to order

## Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) via [NativeWind](https://www.nativewind.dev/)
- **UI Components**: [React Native Reusables](https://reactnativereusables.com/)
- **Animations**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **Backend**: [Appwrite](https://appwrite.io/) (Authentication)

## Roadmap

- [ ] Integrate AI image generation API (Stable Diffusion / DALL-E)
- [ ] Order management and checkout
- [ ] Social sharing of designs
- [ ] Team/group ordering
- [ ] AR jersey preview
- [ ] Design collaboration features

## License

This project is private and not open for public use.

## Acknowledgments

- Inspired by stadium jersey customization booths in Portugal
- Built with [React Native Reusables](https://github.com/founded-labs/react-native-reusables)

---

Made with ❤️ for football fans everywhere
