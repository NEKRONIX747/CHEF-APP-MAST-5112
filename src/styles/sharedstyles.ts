import { StyleSheet } from 'react-native';

/**
 * Shared styles used across multiple screens in the application
 * Promotes consistency and reduces code duplication
 */
export const sharedStyles = StyleSheet.create({
  // Main container style - used as the root container for all screens
  container: {
    flex: 1, // Takes up full available space
  },
  // Background image container - used for the decorative food background
  backgroundImage: {
    flex: 1, // Expands to fill entire container
  },
  // Scroll view container - ensures content is scrollable on small screens
  scrollView: {
    flex: 1, // Takes up available space
    padding: 20, // Consistent padding around content
  },
  // Header section - used for screen titles and subtitles
  header: {
    alignItems: 'center', // Centers content horizontally
    marginBottom: 30, // Space below header
    marginTop: 50, // Space from top of screen (accounts for status bar)
  },
  // Main title text - used for screen titles
  title: {
    fontSize: 32, // Large, prominent text size
    fontWeight: 'bold', // Emphasized text
    color: 'white', // Contrast against dark background
    textAlign: 'center', // Centered alignment
  },
  // Subtitle text - used for secondary header information
  subtitle: {
    fontSize: 18, // Medium text size
    color: 'white', // Contrast against dark background
    marginTop: 5, // Small space above subtitle
    opacity: 0.9, // Slightly transparent for visual hierarchy
  },
  // Section titles - used for content section headings
  sectionTitle: {
    fontSize: 24, // Large but smaller than main title
    fontWeight: 'bold', // Emphasized text
    color: '#8B4513', // Brown color matching app theme
    marginBottom: 15, // Space below title
    textAlign: 'center', // Centered alignment
  },
  // Menu section container - white card-like container for menu content
  menuSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Semi-transparent white
    borderRadius: 16, // Rounded corners for card effect
    padding: 20, // Internal spacing
    marginBottom: 20, // Space below section
  },
  // Individual menu item card - used to display each menu item
  menuItem: {
    flexDirection: 'row', // Horizontal layout
    backgroundColor: 'white', // Solid white background
    padding: 15, // Internal spacing
    borderRadius: 12, // Rounded corners
    marginBottom: 10, // Space between items
    shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 1 }, // Bottom shadow
    shadowOpacity: 0.1, // Subtle shadow
    shadowRadius: 3, // Soft shadow edges
    elevation: 2, // Android shadow
    borderLeftWidth: 4, // Accent border on left
    borderLeftColor: '#8B4513', // Brown accent color
  },
  // Content area within menu item card
  menuItemContent: {
    flex: 1, // Takes up available space
  },
  // Header row within menu item (dish name and price)
  menuItemHeader: {
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'space-between', // Space out name and price
    alignItems: 'center', // Vertically center items
    marginBottom: 5, // Space below header
  },
  // Dish name text style
  dishName: {
    fontSize: 18, // Prominent text size
    fontWeight: 'bold', // Emphasized text
    color: '#333', // Dark gray for good readability
  },
  // Price text style
  price: {
    fontSize: 16, // Slightly smaller than dish name
    fontWeight: 'bold', // Emphasized text
    color: '#8B4513', // Brown color matching theme
  },
  // Description text style
  description: {
    fontSize: 14, // Standard text size
    color: '#666', // Medium gray for secondary text
    lineHeight: 20, // Improved readability with spacing
  },
  // Empty state container - shown when no content is available
  emptyState: {
    alignItems: 'center', // Center content horizontally
    padding: 40, // Generous padding
  },
  // Empty state main text
  emptyText: {
    fontSize: 18, // Prominent text size
    color: '#666', // Medium gray color
    marginTop: 10, // Space above text
  },
  // Empty state secondary text
  emptySubtext: {
    fontSize: 14, // Smaller text size
    color: '#999', // Light gray for less emphasis
    marginTop: 5, // Small space above
    textAlign: 'center', // Centered text
  },
  // Base button style - used for all interactive buttons
  button: {
    flexDirection: 'row', // Horizontal layout for icon + text
    alignItems: 'center', // Vertically center content
    justifyContent: 'center', // Horizontally center content
    padding: 15, // Comfortable touch target
    borderRadius: 12, // Rounded corners
    flex: 0.48, // Allows two buttons to fit side by side (48% width)
    shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 2 }, // Bottom shadow
    shadowOpacity: 0.2, // Visible shadow
    shadowRadius: 4, // Soft shadow edges
    elevation: 3, // Android shadow
  },
  // Primary button variant - main call-to-action buttons
  primaryButton: {
    backgroundColor: '#8B4513', // Brown color matching app theme
  },
  // Button text style
  buttonText: {
    color: 'white', // Contrast against colored background
    fontWeight: 'bold', // Emphasized text
    marginLeft: 8, // Space between icon and text
  },
});