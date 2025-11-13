// MenuItem interface defines the structure for a menu item in the application
export interface MenuItem {
  id: string;                    // Unique identifier for the menu item
  dishName: string;              // Name of the dish
  description: string;           // Description of the dish
  course: string;                // Course type (starter, main, dessert)
  price: number;                 // Price of the dish
  imageUrl?: string;             // Optional URL for dish image
}

// CourseType defines the possible course categories in the menu system
export type CourseType = 'starter' | 'main' | 'dessert' | 'all';
// - 'starter': Appetizers or first courses
// - 'main': Main courses or entrees  
// - 'dessert': Dessert courses
// - 'all': Special type used for filtering to show all courses

// RootStackParamList defines the navigation structure and screen parameters for React Navigation
export type RootStackParamList = {
  Home: undefined;               // Home screen - no parameters required
  AddMenuItem: undefined;        // Add/Manage menu items screen - no parameters required
  GuestView: undefined;          // Guest/customer view screen - no parameters required
};