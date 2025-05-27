export const themeData = {
  colors: {
    // Background colors
    background: "#0B1113",     // Main background color
    cardBackground: "black",   // Card background color
    
    // Text colors
    primaryText: "#4ADE80",    // Primary text color (green)
    secondaryText: "#22C55E",  // Secondary text color (darker green)
    accentText: "#BBF7D0",     // Accent text color (lighter green)
    
    // Border colors
    border: "#4ADE80",         // Border color for cards and elements
    
    // Status colors
    active: "#4ADE80",         // Active/online status color
    inactive: "#EF4444",       // Inactive/offline status color
    
    // Animation colors
    glow: "#22C55E",           // Glow effect color
    pulse: "#4ADE80",          // Pulse animation color
    
    // Scanline effect
    scanlineColor: "rgba(0, 255, 0, 0.1)"  // Scanline overlay color
  },
  
  // Font settings
  fonts: {
    main: "font-mono",         // Main font family
    sizes: {
      xs: "text-xs",           // Extra small text
      sm: "text-sm",           // Small text
      base: "text-base",       // Base text size
      lg: "text-lg",           // Large text
      xl: "text-xl",           // Extra large text
      "2xl": "text-2xl",       // 2X large text
      "3xl": "text-3xl"        // 3X large text
    }
  },
  
  // Animation settings
  animations: {
    typing: 100,               // Typing speed in ms
    loading: 50,               // Loading progress update interval in ms
    messageTimeout: 3000       // Message timeout duration in ms
  }
}; 