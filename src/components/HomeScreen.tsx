import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  ImageBackground,
  StyleSheet 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { MenuItem } from '../types';
import { calculateAveragePrices, getTotalMenuItems } from '../utils/calculations';
import { DEFAULT_IMAGES } from '../constants/images';
import { sharedStyles } from '../styles/sharedstyles';
import { getCourseColor } from '../utils/helpers';

// HomeScreen component - Main dashboard for the restaurant management app
const HomeScreen = ({ navigation, menuItems, setMenuItems }: any) => {
  // Calculate average prices for each course and total menu items count
  const averagePrices = calculateAveragePrices(menuItems);
  const totalItems = getTotalMenuItems(menuItems);

  // Calculate overall average price across all menu items
  const calculateOverallAverage = () => {
    if (menuItems.length === 0) return 0; // Handle empty menu case
    const total = menuItems.reduce((sum: number, item: MenuItem) => sum + item.price, 0);
    return Math.round((total / menuItems.length) * 100) / 100; // Round to 2 decimal places
  };

  const overallAverage = calculateOverallAverage();

  return (
    // Main container with brown/orange gradient background
    <LinearGradient colors={['#8B4513', '#D2691E', '#F4A460']} style={sharedStyles.container}>
      {/* Background image with opacity */}
      <ImageBackground
        source={{ uri: DEFAULT_IMAGES.background }}
        style={sharedStyles.backgroundImage}
        imageStyle={{ opacity: 0.3 }}
      >
        {/* Scrollable content area */}
        <ScrollView style={sharedStyles.scrollView}>
          {/* Header section with restaurant name */}
          <View style={sharedStyles.header}>
            <Text style={sharedStyles.title}>Christoffel's Kitchen</Text>
            <Text style={sharedStyles.subtitle}>Private Chef Services</Text>
          </View>

          {/* Overall Statistics Card */}
          <View style={styles.overallStatsSection}>
            <Text style={sharedStyles.sectionTitle}>Menu Overview</Text>
            
            <View style={styles.overallStatsContainer}>
              {/* Total menu items stat card */}
              <View style={styles.overallStatCard}>
                <View style={styles.statIcon}>
                  <Ionicons name="restaurant" size={28} color="#8B4513" />
                </View>
                <Text style={styles.statNumber}>{totalItems}</Text>
                <Text style={styles.statLabel}>Total Items</Text>
              </View>
              
              {/* Overall average price stat card */}
              <View style={styles.overallStatCard}>
                <View style={styles.statIcon}>
                  <Ionicons name="stats-chart" size={28} color="#8B4513" />
                </View>
                <Text style={styles.statNumber}>R{overallAverage}</Text>
                <Text style={styles.statLabel}>Overall Average</Text>
              </View>
            </View>
          </View>

          {/* Average Prices by Course Section */}
          <View style={styles.averagePricesSection}>
            <Text style={sharedStyles.sectionTitle}>Average Prices by Course</Text>
            
            <View style={styles.averagePricesContainer}>
              {/* Starter course average price */}
              <View style={styles.averagePriceCard}>
                <View style={[styles.courseIcon, { backgroundColor: getCourseColor('starter') }]}>
                  <Ionicons name="leaf" size={20} color="white" />
                </View>
                <Text style={styles.averagePriceLabel}>Starters</Text>
                <Text style={styles.averagePriceValue}>R{averagePrices.starter || 0}</Text>
              </View>
              
              {/* Main course average price */}
              <View style={styles.averagePriceCard}>
                <View style={[styles.courseIcon, { backgroundColor: getCourseColor('main') }]}>
                  <Ionicons name="restaurant" size={20} color="white" />
                </View>
                <Text style={styles.averagePriceLabel}>Main Courses</Text>
                <Text style={styles.averagePriceValue}>R{averagePrices.main || 0}</Text>
              </View>
              
              {/* Dessert course average price */}
              <View style={styles.averagePriceCard}>
                <View style={[styles.courseIcon, { backgroundColor: getCourseColor('dessert') }]}>
                  <Ionicons name="ice-cream" size={20} color="white" />
                </View>
                <Text style={styles.averagePriceLabel}>Desserts</Text>
                <Text style={styles.averagePriceValue}>R{averagePrices.dessert || 0}</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons Section */}
          <View style={styles.actionButtons}>
            {/* Primary button to manage menu items */}
            <TouchableOpacity
              style={[sharedStyles.button, sharedStyles.primaryButton]}
              onPress={() => navigation.navigate('AddMenuItem')}
            >
              <Ionicons name="add-circle" size={20} color="white" />
              <Text style={sharedStyles.buttonText}>Manage Menu Items</Text>
            </TouchableOpacity>

            {/* Secondary button for guest view */}
            <TouchableOpacity
              style={[sharedStyles.button, styles.secondaryButton]}
              onPress={() => navigation.navigate('GuestView')}
            >
              <Ionicons name="eye" size={20} color="white" />
              <Text style={sharedStyles.buttonText}>Guest View</Text>
            </TouchableOpacity>
          </View>

          {/* Menu Items List Section */}
          <View style={styles.menuSection}>
            <View style={styles.sectionHeader}>
              <Text style={sharedStyles.sectionTitle}>Current Menu</Text>
              <Text style={styles.itemCount}>{menuItems.length} items</Text>
            </View>
            
            {/* Conditional rendering for empty state */}
            {menuItems.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="restaurant" size={50} color="#999" />
                <Text style={styles.emptyText}>No menu items yet</Text>
                <Text style={styles.emptySubtext}>Add some delicious dishes to get started!</Text>
              </View>
            ) : (
              // Menu items list with dish names and prices
              <View style={styles.menuItemsContainer}>
                {menuItems.map((item: MenuItem) => (
                  <View key={item.id} style={styles.menuItem}>
                    <Text style={styles.dishName} numberOfLines={1}>
                      {item.dishName}
                    </Text>
                    <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </LinearGradient>
  );
};

// Styles for the HomeScreen component
const styles = StyleSheet.create({
  // Overall statistics section styling
  overallStatsSection: {
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
  overallStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  overallStatCard: {
    flex: 1,
    backgroundColor: 'rgba(139, 69, 19, 0.1)', // Semi-transparent brown background
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513', // Brown color
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    textAlign: 'center',
  },
  
  // Average prices section styling
  averagePricesSection: {
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
  averagePricesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  averagePriceCard: {
    alignItems: 'center',
    flex: 1,
    padding: 8,
  },
  courseIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  averagePriceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    textAlign: 'center',
    fontWeight: '600',
  },
  averagePriceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
  },
  
  // Action buttons styling
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  secondaryButton: {
    backgroundColor: '#228B22', // Forest green color
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  menuItemsContainer: {
    gap: 8,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#8B4513', // Brown accent border
  },
  dishName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
    minWidth: 80,
    textAlign: 'right',
  },
  
  // Empty state styling
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 12,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 6,
    textAlign: 'center',
  },
});

export default HomeScreen;