# Theme Architecture

This document describes the new unified theme architecture for Azir themes.

## Overview

The theme system is designed to maintain a single source of truth for theme definitions while supporting multiple editor platforms (VS Code, Zed, etc.).

## Architecture

### 1. Schema Layer (`src/schema.js`)

The **schema layer** is the single source of truth for all theme definitions.

- **Purpose**: Define colors and theme properties once
- **Input**: Theme type ('light', 'dark', etc.) and name
- **Output**: Unified theme schema object with all color definitions
- **Type Safety**: Full JSDoc type annotations for IDE support

**Key features**:
- Loads colors from Primer primitives
- Defines all UI colors (borders, backgrounds, text, etc.)
- Defines syntax highlighting colors
- Defines git decoration colors
- Defines status/severity colors
- Stores metadata for platform-specific adaptations

### 2. Adapter Layer (`src/adapters/`)

**Adapters** convert the unified schema to platform-specific formats.

#### VS Code Adapter (`src/adapters/vscode.js`)
- Converts unified schema to VS Code theme format
- Maps colors to VS Code theme keys
- Generates tokenColors for syntax highlighting
- Handles platform-specific properties

#### Zed Adapter (`src/adapters/zed.js`)
- Converts unified schema to Zed theme format
- Maps colors to Zed theme keys
- Generates syntax highlighting definitions
- Uses consistent RGBA format for alpha colors

### 3. Build Layer (`src/index.js`)

The build layer orchestrates theme generation:

1. Define theme configurations (type + name)
2. For each configuration:
   - Generate unified schema
   - Adapt to VS Code format
   - Adapt to Zed format
   - Write theme files

## Adding a New Platform

To add support for a new editor/platform:

1. Create a new adapter in `src/adapters/[platform].js`
2. Implement the adapter function:
   ```javascript
   function adaptToPlatform(schema) {
     const { name, colors, _meta } = schema
     
     return {
       // Platform-specific theme structure
       // Map unified colors to platform keys
     }
   }
   ```
3. Update `src/index.js` to include the new adapter
4. Update documentation

## Type Safety

The architecture uses JSDoc for type safety:

```javascript
/**
 * @typedef {'light' | 'dark' | 'light_high_contrast' | 'dark_high_contrast' | 'dark_dimmed'} ThemeType
 */

/**
 * @typedef {Object} UnifiedThemeSchema
 * @property {string} name
 * @property {ThemeType} type
 * @property {'light' | 'dark'} appearance
 * @property {ThemeColors} colors
 */
```

This provides:
- Auto-completion in VS Code
- Type checking
- Better documentation
- Easier maintenance

## Benefits

### 1. Single Source of Truth
- Define colors once in `schema.js`
- No duplication between platforms
- Easier to maintain consistency

### 2. Easy to Extend
- Add new platforms by creating an adapter
- No need to modify core schema
- Platform-specific overrides supported

### 3. Type Safety
- JSDoc type annotations
- IDE auto-completion
- Compile-time error detection

### 4. Separation of Concerns
- Schema: What colors exist
- Adapters: How to format for each platform
- Build: Orchestration logic

## Maintenance Guidelines

### Changing Colors

To change a color:
1. Update `src/schema.js` in the `getUnifiedThemeSchema` function
2. Run `pnpm build` to regenerate all themes
3. Both VS Code and Zed themes will update automatically

### Adding New Colors

To add a new color property:
1. Add it to the `UnifiedThemeSchema` typedef
2. Add it to the `colors` object in `getUnifiedThemeSchema`
3. Map it in each adapter (`vscode.js`, `zed.js`)

### Platform-Specific Overrides

If a platform needs a different color:
```javascript
// In the adapter
'platform.specific.color': schema._meta.isLight 
  ? specialLightColor 
  : specialDarkColor
```

## File Structure

```
src/
├── schema.js           # Unified theme schema (single source of truth)
├── adapters/
│   ├── vscode.js      # VS Code theme adapter
│   └── zed.js         # Zed theme adapter
├── index.js           # Build orchestration
├── colors.js          # Primer color loading
└── shared.js          # Shared utilities

themes/
├── light.json         # Generated VS Code themes
├── dark.json
├── ...
└── zed/              # Generated Zed themes
    ├── azir-light.json
    ├── azir-dark.json
    └── ...
```

## Migration from Old Architecture

The old architecture had:
- `theme.js` - VS Code theme generation
- `zed-theme.js` - Zed theme generation
- Duplicated color definitions

The new architecture consolidates this into:
- `schema.js` - Single source of truth
- `adapters/vscode.js` - VS Code-specific mapping
- `adapters/zed.js` - Zed-specific mapping

This reduces duplication and makes maintenance easier.
