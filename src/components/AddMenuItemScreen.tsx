import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ImageBackground,
  StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { MenuItem } from '../types';
import { DEFAULT_IMAGES, COURSES } from '../constants/images';
import { sharedStyles } from '../styles/sharedstyles';
import { generateUniqueId, validateMenuItem, getCourseColor } from '../utils/helpers';

// AddMenuItemScreen component - Screen for adding and managing menu items
const AddMenuItemScreen = ({ navigation, menuItems, setMenuItems }: any) => {
  // State variables for form inputs
  const [dishName, setDishName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [selectedCourse, setSelectedCourse] = React.useState('');
  const [price, setPrice] = React.useState('');

  // Function to generate appropriate AI image based on course type
  const generateAIImage = (course: string): string => {
    return DEFAULT_IMAGES[course as keyof typeof DEFAULT_IMAGES] || DEFAULT_IMAGES.main;
  };

  // Handle adding new menu item to the list
  const handleAddItem = () => {
    // Validate input fields before proceeding
    const validationError = validateMenuItem(dishName, description, selectedCourse, price);
    if (validationError) {
      Alert.alert('Error', validationError);
      return;
    }

    // Create new menu item object
    const priceValue = parseFloat(price);
    const newItem: MenuItem = {
      id: generateUniqueId(),
      dishName: dishName.trim(),
      description: description.trim(),
      course: selectedCourse,
      price: priceValue,
      imageUrl: generateAIImage(selectedCourse),
    };

    // Update menu items state with new item
    const updatedItems = [...menuItems, newItem];
    setMenuItems(updatedItems);

    // Reset form fields after successful addition
    setDishName('');
    setDescription('');
    setSelectedCourse('');
    setPrice('');

    Alert.alert('Success', 'Menu item added successfully!');
  };

  // Handle removal of menu item with confirmation dialog
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
            const updatedItems = menuItems.filter((item: MenuItem) => item.id !== id);
            setMenuItems(updatedItems);
            Alert.alert('Success', 'Menu item removed successfully!');
          },
        },
      ]
    );
  };

  return (
    // Main container with brown/orange gradient background
    <LinearGradient colors={['#8B4513', '#D2691E', '#F4A460']} style={sharedStyles.container}>
      {/* Background image with low opacity */}
      <ImageBackground
        source={{ uri: DEFAULT_IMAGES.background }}
        style={sharedStyles.backgroundImage}
        imageStyle={{ opacity: 0.2 }}
      >
        {/* Scrollable content area */}
        <ScrollView style={sharedStyles.scrollView}>
          {/* Header section */}
          <View style={sharedStyles.header}>
            <Text style={sharedStyles.title}>Manage Menu Items</Text>
            <Text style={sharedStyles.subtitle}>Add and manage your menu items</Text>
          </View>

          {/* Add New Item Form Section */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Add New Menu Item</Text>
            
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
                  maxLength={50}
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
                  maxLength={200}
                />
              </View>

              {/* Course Type Selection */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Course Type</Text>
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
                      {/* Dynamic icons based on course type */}
                      <Ionicons 
                        name={
                          course === 'starter' ? 'leaf' : 
                          course === 'main' ? 'restaurant' : 'ice-cream'
                        } 
                        size={16} 
                        color={selectedCourse === course ? 'white' : '#666'} 
                      />
                      <Text
                        style={[
                          styles.courseButtonText,
                          selectedCourse === course && styles.courseButtonTextSelected,
                        ]}
                      >
                        {/* Capitalize course name for display */}
                        {course.charAt(0).toUpperCase() + course.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Price Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Price (R)</Text>
                <TextInput
                  style={styles.textInput}
                  value={price}
                  onChangeText={setPrice}
                  placeholder="0.00"
                  placeholderTextColor="#999"
                  keyboardType="decimal-pad"
                />
              </View>

              {/* Add to Menu Button */}
              <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
                <Ionicons name="add-circle" size={22} color="white" />
                <Text style={styles.addButtonText}>Add to Menu</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Current Menu Items Display Section */}
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Current Menu Items ({menuItems.length})</Text>
            
            {/* Conditional rendering for empty state */}
            {menuItems.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="restaurant" size={50} color="#999" />
                <Text style={styles.emptyText}>No menu items yet</Text>
                <Text style={styles.emptySubtext}>Add your first menu item above</Text>
              </View>
            ) : (
              // Render list of current menu items
              menuItems.map((item: MenuItem) => (
                <View key={item.id} style={styles.menuItem}>
                  <View style={styles.menuItemContent}>
                    {/* Dish name and price header */}
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
                  
                  {/* Remove item button */}
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveItem(item.id)}
                  >
                    <Ionicons name="trash" size={18} color="#FF6B6B" />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>

          {/* Navigation back to home screen */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={18} color="#8B4513" />
            <Text style={styles.backButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </LinearGradient>
  );
};

// Styles for the AddMenuItemScreen component
const styles = StyleSheet.create({
  // Form section styling
  formSection: {
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
  // Section title styling
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 16,
    textAlign: 'center',
  },
  // Form container styling
  formContainer: {
    // Form styles remain the same as before
  },
  // Input group styling for form fields
  inputGroup: {
    marginBottom: 20,
  },
  // Label styling for form inputs
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 8,
  },
  // Text input styling
  textInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  // Text area styling for description field
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  // Course selection buttons container
  courseButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  // Individual course button styling
  courseButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 6,
  },
  // Selected course button styling
  courseButtonSelected: {
    backgroundColor: '#8B4513',
    borderColor: '#654321',
  },
  // Course button text styling
  courseButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 14,
  },
  // Selected course button text styling
  courseButtonTextSelected: {
    color: 'white',
  },
  // Add button styling
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
  // Add button text styling
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  // Menu section styling
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
  // Menu item content container
  menuItemContent: {
    flex: 1,
    marginRight: 12,
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
  // Remove button styling
  removeButton: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Empty state styling
  emptyState: {
    alignItems: 'center',
    padding: 20,
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
  // Back button styling
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    borderWidth: 2,
    borderColor: '#8B4513', // Brown border
  },
  // Back button text styling
  backButtonText: {
    color: '#8B4513',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
});

export default AddMenuItemScreen;