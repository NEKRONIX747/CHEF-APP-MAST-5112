import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// ===== TYPES AND INTERFACES =====
// Define the structure of a menu item
interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: number;
  imageUrl?: string;
}

// Define possible course types for TypeScript type safety
type CourseType = 'starter' | 'main' | 'dessert' | 'all';

// Define navigation parameters for TypeScript
type RootStackParamList = {
  Home: undefined;
  AddMenuItem: undefined;
  GuestView: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// ===== UTILITY FUNCTIONS =====
/**
 * Calculates average prices for each course type
 * @param menuItems - Array of all menu items
 * @returns Object with average prices for each course
 */
const calculateAveragePrices = (menuItems: MenuItem[]) => {
  const courses = ['starter', 'main', 'dessert'];
  const averages: { [key: string]: number } = {};

  courses.forEach(course => {
    // Filter items by course and calculate average
    const courseItems = menuItems.filter(item => item.course === course);
    if (courseItems.length > 0) {
      const total = courseItems.reduce((sum, item) => sum + item.price, 0);
      // Round to 2 decimal places for currency display
      averages[course] = Math.round((total / courseItems.length) * 100) / 100;
    }
  });

  return averages;
};

/**
 * Returns total count of menu items
 * @param menuItems - Array of all menu items
 * @returns Number of items in the menu
 */
const getTotalMenuItems = (menuItems: MenuItem[]) => {
  return menuItems.length;
};

// ===== HOME SCREEN COMPONENT =====
/**
 * Main screen showing menu overview, statistics, and navigation
 */
const HomeScreen = ({ navigation, menuItems, setMenuItems }: any) => {
  // Calculate statistics for display
  const averagePrices = calculateAveragePrices(menuItems);
  const totalItems = getTotalMenuItems(menuItems);

  /**
   * Handles removal of menu items with confirmation dialog
   * @param id - Unique identifier of item to remove
   */
  const handleRemoveItem = (id: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from the menu?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            // Filter out the item to be removed
            const updatedItems = menuItems.filter((item: MenuItem) => item.id !== id);
            setMenuItems(updatedItems);
          },
        },
      ]
    );
  };

  return (
    <LinearGradient colors={['#8B4513', '#D2691E', '#F4A460']} style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500' }}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.3 }}
      >
        <ScrollView style={styles.scrollView}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>Christoffel's Kitchen</Text>
            <Text style={styles.subtitle}>Private Chef Services</Text>
          </View>

          {/* Statistics Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{totalItems}</Text>
              <Text style={styles.statLabel}>Total Menu Items</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                R{averagePrices.starter || 0} {/* Changed from $ to R */}
              </Text>
              <Text style={styles.statLabel}>Avg Starter</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                R{averagePrices.main || 0} {/* Changed from $ to R */}
              </Text>
              <Text style={styles.statLabel}>Avg Main</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                R{averagePrices.dessert || 0} {/* Changed from $ to R */}
              </Text>
              <Text style={styles.statLabel}>Avg Dessert</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => navigation.navigate('AddMenuItem')}
            >
              <Ionicons name="add-circle" size={20} color="white" />
              <Text style={styles.buttonText}>Add Menu Item</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => navigation.navigate('GuestView')}
            >
              <Ionicons name="eye" size={20} color="white" />
              <Text style={styles.buttonText}>Guest View</Text>
            </TouchableOpacity>
          </View>

          {/* Menu Items List */}
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Current Menu</Text>
            {menuItems.length === 0 ? (
              // Empty state when no items exist
              <View style={styles.emptyState}>
                <Ionicons name="restaurant" size={50} color="#666" />
                <Text style={styles.emptyText}>No menu items yet</Text>
                <Text style={styles.emptySubtext}>Add some delicious dishes to get started!</Text>
              </View>
            ) : (
              // Display all menu items
              menuItems.map((item: MenuItem) => (
                <View key={item.id} style={styles.menuItem}>
                  <View style={styles.menuItemContent}>
                    <View style={styles.menuItemHeader}>
                      <Text style={styles.dishName}>{item.dishName}</Text>
                      <Text style={styles.price}>R{item.price}</Text> {/* Changed from $ to R */}
                    </View>
                    <Text style={styles.courseTag}>{item.course}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                  </View>
                  {/* Remove item button */}
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveItem(item.id)}
                  >
                    <Ionicons name="trash" size={20} color="#FF6B6B" />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </LinearGradient>
  );
};

// ===== ADD MENU ITEM SCREEN COMPONENT =====
/**
 * Screen for adding new menu items to the collection
 */
const AddMenuItemScreen = ({ navigation, menuItems, setMenuItems }: any) => {
  // Form state management
  const [dishName, setDishName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [selectedCourse, setSelectedCourse] = React.useState('');
  const [price, setPrice] = React.useState('');

  // Predefined course options
  const COURSES = ['starter', 'main', 'dessert'];

  /**
   * Generates AI food images based on course type
   * @param dish - Name of the dish (currently unused but available for future enhancement)
   * @param course - Type of course (starter, main, dessert)
   * @returns URL for appropriate food image
   */
  const generateAIImage = (dish: string, course: string): string => {
    const baseUrl = 'https://images.unsplash.com/photo-';
    const images: { [key: string]: string } = {
      starter: '1504674900247-0877df9cc836',
      main: '1565299624946-b28f40a0ca4b',
      dessert: '1563729785271-4c4eac99737f'
    };
    return `${baseUrl}${images[course] || images.main}?w=400`;
  };

  /**
   * Validates and adds new menu item to the collection
   */
  const handleAddItem = () => {
    // Form validation
    if (!dishName || !description || !selectedCourse || !price) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Price validation
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    // Create new menu item object
    const newItem: MenuItem = {
      id: Date.now().toString(), // Simple unique ID generation
      dishName,
      description,
      course: selectedCourse,
      price: priceValue,
      imageUrl: generateAIImage(dishName, selectedCourse),
    };

    // Update menu items array
    const updatedItems = [...menuItems, newItem];
    setMenuItems(updatedItems);

    // Reset form fields
    setDishName('');
    setDescription('');
    setSelectedCourse('');
    setPrice('');

    Alert.alert('Success', 'Menu item added successfully!');
  };

  return (
    <LinearGradient colors={['#8B4513', '#D2691E', '#F4A460']} style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500' }}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.2 }}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.title}>Add New Menu Item</Text>
          </View>

          <View style={styles.formContainer}>
            {/* Dish Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Dish Name</Text>
              <TextInput
                style={styles.textInput}
                value={dishName}
                onChangeText={setDishName}
                placeholder="Enter dish name"
                placeholderTextColor="#999"
              />
            </View>

            {/* Description Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter dish description"
                placeholderTextColor="#999"
                multiline
                numberOfLines={3}
              />
            </View>

            {/* Course Selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Course</Text>
              <View style={styles.courseButtons}>
                {COURSES.map((course) => (
                  <TouchableOpacity
                    key={course}
                    style={[
                      styles.courseButton,
                      selectedCourse === course && styles.courseButtonSelected,
                    ]}
                    onPress={() => setSelectedCourse(course)}
                  >
                    <Text
                      style={[
                        styles.courseButtonText,
                        selectedCourse === course && styles.courseButtonTextSelected,
                      ]}
                    >
                      {course.charAt(0).toUpperCase() + course.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Price Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Price (R)</Text> {/* Changed from $ to R */}
              <TextInput
                style={styles.textInput}
                value={price}
                onChangeText={setPrice}
                placeholder="Enter price in Rands" 
                placeholderTextColor="#999"
                keyboardType="decimal-pad"
              />
            </View>

            {/* Add Item Button */}
            <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
              <Ionicons name="add-circle" size={24} color="white" />
              <Text style={styles.addButtonText}>Add to Menu</Text>
            </TouchableOpacity>

            {/* Back to Home Button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={20} color="#8B4513" />
              <Text style={styles.backButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </LinearGradient>
  );
};

// ===== GUEST VIEW SCREEN COMPONENT =====
/**
 * Screen for guests to view and filter the menu
 */
const GuestViewScreen = ({ navigation, menuItems }: any) => {
  // State for course filtering
  const [selectedCourse, setSelectedCourse] = React.useState<CourseType>('all');

  // Filter items based on selected course
  const filteredItems = selectedCourse === 'all' 
    ? menuItems 
    : menuItems.filter((item: MenuItem) => item.course === selectedCourse);

  // Course filter options
  const courses: { value: CourseType; label: string }[] = [
    { value: 'all', label: 'All Courses' },
    { value: 'starter', label: 'Starters' },
    { value: 'main', label: 'Main Courses' },
    { value: 'dessert', label: 'Desserts' },
  ];

  /**
   * Returns color based on course type for visual distinction
   * @param course - Course type
   * @returns Color code for the course
   */
  const getCourseColor = (course: string) => {
    switch (course) {
      case 'starter': return '#FF6B6B';
      case 'main': return '#4ECDC4';
      case 'dessert': return '#FFD166';
      default: return '#8B4513';
    }
  };

  return (
    <LinearGradient colors={['#8B4513', '#D2691E', '#F4A460']} style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500' }}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.3 }}
      >
        <ScrollView style={styles.scrollView}>
          {/* Guest View Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Our Menu</Text>
            <Text style={styles.subtitle}>Carefully crafted by Chef Christoffel</Text>
          </View>

          {/* Course Filter Section */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Filter by Course:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {courses.map((course) => (
                <TouchableOpacity
                  key={course.value}
                  style={[
                    styles.filterButton,
                    selectedCourse === course.value && styles.filterButtonSelected,
                    selectedCourse === course.value && { backgroundColor: getCourseColor(course.value) },
                  ]}
                  onPress={() => setSelectedCourse(course.value)}
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      selectedCourse === course.value && styles.filterButtonTextSelected,
                    ]}
                  >
                    {course.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Filtered Menu Items Display */}
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>
              {selectedCourse === 'all' ? 'Complete Menu' : `${courses.find(c => c.value === selectedCourse)?.label}`}
              <Text style={styles.itemCount}> ({filteredItems.length} items)</Text>
            </Text>

            {filteredItems.length === 0 ? (
              // Empty state when no items match filter
              <View style={styles.emptyState}>
                <Ionicons name="search" size={50} color="#666" />
                <Text style={styles.emptyText}>No items found</Text>
                <Text style={styles.emptySubtext}>Try selecting a different course filter</Text>
              </View>
            ) : (
              // Display filtered menu items with images
              filteredItems.map((item: MenuItem) => (
                <View key={item.id} style={styles.menuItem}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.itemImage}
                    defaultSource={{ uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400' }}
                  />
                  <View style={styles.itemContent}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.dishName}>{item.dishName}</Text>
                      <Text style={styles.price}>R{item.price}</Text> {/* Changed from $ to R */}
                    </View>
                    {/* Course tag with colored background */}
                    <View style={[styles.courseTag, { backgroundColor: getCourseColor(item.course) }]}>
                      <Text style={styles.courseTagText}>
                        {item.course.charAt(0).toUpperCase() + item.course.slice(1)}
                      </Text>
                    </View>
                    <Text style={styles.description}>{item.description}</Text>
                  </View>
                </View>
              ))
            )}
          </View>

          {/* Back to Chef View Button */}
          <TouchableOpacity
            style={styles.backButtonGuest}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="white" />
            <Text style={styles.backButtonTextGuest}>Back to Chef View</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </LinearGradient>
  );
};

// ===== MAIN APP COMPONENT =====
/**
 * Root component managing global state and navigation
 */
export default function App() {
  // Global state for menu items - stored in memory array
  const [menuItems, setMenuItems] = React.useState<MenuItem[]>([]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="Home">
          {/* Home Screen Route */}
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} menuItems={menuItems} setMenuItems={setMenuItems} />}
          </Stack.Screen>
          {/* Add Menu Item Screen Route */}
          <Stack.Screen name="AddMenuItem" options={{ title: 'Add Menu Item' }}>
            {(props) => <AddMenuItemScreen {...props} menuItems={menuItems} setMenuItems={setMenuItems} />}
          </Stack.Screen>
          {/* Guest View Screen Route */}
          <Stack.Screen name="GuestView" options={{ title: 'Menu for Guests' }}>
            {(props) => <GuestViewScreen {...props} menuItems={menuItems} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// ===== STYLESHEET =====
/**
 * Centralized styling for all components
 * Uses consistent color scheme and design patterns
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginTop: 5,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    flex: 0.48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#8B4513',
  },
  secondaryButton: {
    backgroundColor: '#228B22',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  menuSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 15,
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#8B4513',
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  courseTag: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  removeButton: {
    padding: 5,
    marginLeft: 10,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  courseButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  courseButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  courseButtonSelected: {
    backgroundColor: '#8B4513',
    borderColor: '#654321',
  },
  courseButtonText: {
    color: '#666',
    fontWeight: 'bold',
  },
  courseButtonTextSelected: {
    color: 'white',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B4513',
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#8B4513',
  },
  backButtonText: {
    color: '#8B4513',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  filterButtonSelected: {
    borderColor: 'white',
  },
  filterButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  filterButtonTextSelected: {
    color: 'white',
  },
  itemCount: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'normal',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemContent: {
    flex: 1,
    padding: 15,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  courseTagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  backButtonGuest: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  backButtonTextGuest: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});