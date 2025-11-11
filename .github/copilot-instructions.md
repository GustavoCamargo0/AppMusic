# AI Agent Instructions for AppMusic

## Project Overview
AppMusic is a React Native mobile application built with Expo that allows users to search and browse music tracks using the Deezer API. The app features a bottom tab navigation system with Home and Search screens.

## Architecture & Structure

### Core Components
- `App.js`: Main component with bottom tab navigation setup using `@react-navigation/bottom-tabs`
- `Search.js`: Music search interface integrating with Deezer API
- `Home.js`: Landing screen (currently minimal implementation)

### Key Dependencies
```json
{
  "@react-navigation/bottom-tabs": "^7.5.0",
  "@react-navigation/native": "^7.1.18",
  "react-native-vector-icons": "^10.3.0"
}
```

## Development Workflow

### Setup & Running
1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Run on specific platform:
   - Android: `npm run android`
   - Web: `npm run web`
   - iOS: `npm run ios`

### API Integration
The app integrates with Deezer API for music search:
- Endpoint: `https://api.deezer.com/search/track`
- Search is triggered when query length > 2 characters
- Reference implementation in `Search.js`

## UI/UX Patterns

### Navigation
- Bottom tab navigation with icon-only tabs
- Icons using `react-native-vector-icons/Ionicons`
- See `App.js` for navigation configuration

### Styling Conventions
- Styles are co-located with components using `StyleSheet.create()`
- Common style patterns:
  ```js
  container: {
    flex: 1,
    backgroundColor: '#B0B0B0',
    alignItems: 'center',
    justifyContent: 'center',
  }
  ```

## Environment & Configuration
- Expo configuration in `app.json`
- Asset paths in `/assets` directory
- Environment variables should be placed in `.env.local` (gitignored)

## Common Patterns
1. Screen components accept `navigation` prop for routing
2. API calls use native `fetch` with async/await
3. State management uses React hooks (`useState`, `useEffect`)
4. List rendering with `FlatList` for performance

## Areas for Extension
- Implement music playback functionality
- Add favorites/playlist features
- Enhance Home screen with recommended tracks
- Add user authentication