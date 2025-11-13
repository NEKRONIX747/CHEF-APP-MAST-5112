import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// GuestViewScreen component - Public-facing menu view for customers
const GuestViewScreen = ({ navigation, menuItems }: any) => {
  // State for currently selected course filter
  const [selectedCourse, setSelectedCourse] = React.useState('all');
  
  // Filter function to show items by course type
  const filterItemsByCourse = (items: any[], course: string) => {
    if (course === 'all') return items; // Show all items when 'all' is selected
    return items.filter((item: any) => item.course === course); // Filter by specific course
  };

  // Apply filter to menu items based on selected course
  const filteredItems = filterItemsByCourse(menuItems, selectedCourse);

  // Function to get color for each course type
  const getCourseColor = (course: string): string => {
    switch (course) {
      case 'starter': return '#FF6B6B'; // Red for starters
      case 'main': return '#4ECDC4';    // Teal for main courses
      case 'dessert': return '#FFD166'; // Yellow for desserts
      default: return '#8B4513';        // Brown for default/all
    }
  };

  // Available course filters for the menu
  const COURSE_FILTERS = [
    { value: 'all', label: 'All Courses' },
    { value: 'starter', label: 'Starters' },
    { value: 'main', label: 'Main Courses' },
    { value: 'dessert', label: 'Desserts' },
  ];

  // Default images for each course type and background
  const DEFAULT_IMAGES = {
    starter: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
    main: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
    dessert: 'https://images.unsplash.com/photo-1563729785271-4c4eac99737f?w=400',
    background: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500'
  };

  // Get dynamic section title based on selected filter
  const getSectionTitle = () => {
    if (selectedCourse === 'all') return 'Complete Menu';
    const course = COURSE_FILTERS.find(c => c.value === selectedCourse);
    return course ? course.label : 'Menu';
  };

  return (
    // Main container with brown/orange gradient background
    <LinearGradient colors={['#8B4513', '#D2691E', '#F4A460']} style={styles.container}>
      {/* Background image with reduced opacity */}
      <ImageBackground
        source={{ uri: DEFAULT_IMAGES.background }}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.3 }}
      >
        {/* Scrollable content area */}
        <ScrollView style={styles.scrollView}>
          {/* Header section with restaurant branding */}
          <View style={styles.header}>
            <Text style={styles.title}>Our Menu</Text>
            <Text style={styles.subtitle}>Carefully crafted by Chef Christoffel</Text>
          </View>

          {/* Course Filter Section */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Filter by Course:</Text>
            {/* Horizontal scrollable filter buttons */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {COURSE_FILTERS.map((course) => (
                <TouchableOpacity
                  key={course.value}
                  style={[
                    styles.filterButton,
                    selectedCourse === course.value && styles.filterButtonSelected,
                    selectedCourse === course.value && { backgroundColor: getCourseColor(course.value) },
                  ]}
                  onPress={() => setSelectedCourse(course.value)}
                >
                  {/* Dynamic icons for each course type */}
                  <Ionicons 
                    name={
                      course.value === 'starter' ? 'leaf' : 
                      course.value === 'main' ? 'restaurant' : 
                      course.value === 'dessert' ? 'ice-cream' : 'fast-food'
                    } 
                    size={16} 
                    color={selectedCourse === course.value ? 'white' : 'white'} 
                  />
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

          {/* Menu Items Display Section */}
          <View style={styles.menuSection}>
            <View style={styles.sectionHeader}>
              {/* Dynamic title showing current filter and item count */}
              <Text style={styles.sectionTitle}>
                {getSectionTitle()} • {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
              </Text>
            </View>

            {/* Conditional rendering for empty state */}
            {filteredItems.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="search" size={50} color="#999" />
                <Text style={styles.emptyText}>No items found</Text>
                <Text style={styles.emptySubtext}>Try selecting a different course filter</Text>
              </View>
            ) : (
              // Render filtered menu items
              filteredItems.map((item: any) => (
                <View key={item.id} style={styles.menuItem}>
                  {/* Dish image - fallback to default if not available */}
                  <Image
                    source={{ uri: item.imageUrl || DEFAULT_IMAGES[item.course as keyof typeof DEFAULT_IMAGES] || DEFAULT_IMAGES.starter }}
                    style={styles.itemImage}
                  />
                  <View style={styles.itemContent}>
                    {/* Header with dish name and price */}
                    <View style={styles.menuItemHeader}>
                      <Text style={styles.dishName} numberOfLines={1}>{item.dishName}</Text>
                      <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
                    </View>
                    
                    {/* Course type tag with colored background */}
                    <View style={[styles.courseTag, { backgroundColor: getCourseColor(item.course) }]}>
                      <Text style={styles.courseTagText}>
                        {item.course.charAt(0).toUpperCase() + item.course.slice(1)}
                      </Text>
                    </View>
                    
                    {/* Dish description */}
                    <Text style={styles.description} numberOfLines={2}>
                      {item.description}
                    </Text>
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
            <Ionicons name="arrow-back" size={18} color="white" />
            <Text style={styles.backButtonTextGuest}>Back to Chef View</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </LinearGradient>
  );
};

// Styles for the GuestViewScreen component
const styles = StyleSheet.create({
  // Main container styling
  container: {
    flex: 1,
  },
  // Background image styling
  backgroundImage: {
    flex: 1,
  },
  // Scroll view styling
  scrollView: {
    flex: 1,
    padding: 20,
  },
  // Header section styling
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 50,
  },
  // Main title styling
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  // Subtitle styling
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginTop: 5,
    opacity: 0.9,
  },
  // Filter section styling
  filterSection: {
    marginBottom: 20,
  },
  // Filter title styling
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
  },
  // Horizontal filter scroll view
  filterScroll: {
    flexGrow: 0,
  },
  // Individual filter button styling
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 6,
  },
  // Selected filter button styling
  filterButtonSelected: {
    borderColor: 'white', // White border for selected state
  },
  // Filter button text styling
  filterButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  // Selected filter button text styling
  filterButtonTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  // Menu section styling (white card)
  menuSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  // Section header styling
  sectionHeader: {
    marginBottom: 16,
  },
  // Section title styling
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
  },
  // Individual menu item card styling
  menuItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#8B4513', // Brown accent border
  },
  // Dish image styling
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  // Item content container (text area)
  itemContent: {
    flex: 1,
    paddingLeft: 16,
  },
  // Menu item header (dish name and price)
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  // Dish name styling
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 12,
  },
  // Price styling
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
    minWidth: 70,
    textAlign: 'right',
  },
  // Course type tag styling
  courseTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  // Course tag text styling
  courseTagText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  // Description text styling
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  // Empty state styling
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  // Empty state text styling
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 12,
    textAlign: 'center',
  },
  // Empty state subtext styling
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 6,
    textAlign: 'center',
  },
  // Back button styling (transparent with white border)
  backButtonGuest: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  // Back button text styling
  backButtonTextGuest: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
});

export default GuestViewScreen;