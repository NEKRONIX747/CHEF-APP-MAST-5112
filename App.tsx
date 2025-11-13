import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screen components
import HomeScreen from './src/components/HomeScreen';
import AddMenuItemScreen from './src/components/AddMenuItemScreen';
import GuestViewScreen from './src/components/GuestViewScreen';

// Create stack navigator for screen-to-screen navigation
const Stack = createStackNavigator();

/**
 * Main App component - Root component of the restaurant menu application
 * Sets up navigation and global state management for menu items
 */
export default function App() {
  // Global state for menu items - shared across all screens
  // menuItems: Array of all menu items in the application
  // setMenuItems: Function to update the menu items state
  const [menuItems, setMenuItems] = React.useState([]);

  return (
    // SafeAreaProvider ensures content renders within safe area boundaries on iOS
    <SafeAreaProvider>
      {/* NavigationContainer is required for React Navigation to work */}
      <NavigationContainer>
        {/* StatusBar component to control device status bar appearance */}
        <StatusBar style="auto" />
        
        {/* Stack Navigator manages the screen hierarchy and transitions */}
        <Stack.Navigator 
          initialRouteName="Home" // First screen to show when app launches
        >
          {/* Home Screen - Main dashboard */}
          <Stack.Screen name="Home">
            {(props) => (
              // Pass navigation props and menu state to HomeScreen
              <HomeScreen
                {...props} // Navigation props (navigation, route)
                menuItems={menuItems} // Current menu items array
                setMenuItems={setMenuItems} // Function to update menu items
              />
            )}
          </Stack.Screen>

          {/* Add Menu Item Screen - For creating and managing menu items */}
          <Stack.Screen 
            name="AddMenuItem" 
            options={{ title: 'Add Menu Item' }} // Custom header title
          >
            {(props) => (
              <AddMenuItemScreen
                {...props} // Navigation props
                menuItems={menuItems} // Current menu items for display
                setMenuItems={setMenuItems} // Function to add/remove items
              />
            )}
          </Stack.Screen>

          {/* Guest View Screen - Read-only menu display for customers */}
          <Stack.Screen 
            name="GuestView" 
            options={{ title: 'Menu for Guests' }} // Custom header title
          >
            {(props) => (
              <GuestViewScreen
                {...props} // Navigation props
                menuItems={menuItems} // Menu items to display (read-only)
                // Note: setMenuItems not passed - guest view is read-only
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}