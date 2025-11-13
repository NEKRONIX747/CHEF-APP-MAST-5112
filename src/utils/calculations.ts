import { MenuItem, CourseType } from '../types';

/**
 * Calculates the average price for each course type (starter, main, dessert)
 * @param menuItems - Array of menu items to calculate averages from
 * @returns Object containing average prices for each course type
 * @example
 * // Returns { starter: 75.50, main: 120.00, dessert: 45.25 }
 * calculateAveragePrices(menuItems)
 */
export const calculateAveragePrices = (menuItems: MenuItem[]): { [key: string]: number } => {
  // Initialize result object to store averages for each course
  const averages: { [key: string]: number } = {};
  // Define the course types we want to calculate averages for
  const courses = ['starter', 'main', 'dessert'];
  
  // Loop through each course type to calculate its average
  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    // Array to store items belonging to the current course
    const courseItems: MenuItem[] = [];
    
    // Filter menu items for the current course type
    for (let j = 0; j < menuItems.length; j++) {
      if (menuItems[j].course === course) {
        courseItems.push(menuItems[j]);
      }
    }
    
    // Calculate average if there are items for this course
    if (courseItems.length > 0) {
      let total = 0;
      // Sum all prices for the course
      for (let k = 0; k < courseItems.length; k++) {
        total += courseItems[k].price;
      }
      // Calculate average and round to 2 decimal places
      averages[course] = Math.round((total / courseItems.length) * 100) / 100;
    } else {
      // Set average to 0 if no items exist for this course
      averages[course] = 0;
    }
  }
  
  return averages;
};

/**
 * Counts the total number of menu items in the array
 * @param menuItems - Array of menu items to count
 * @returns Total number of menu items
 * @example
 * // Returns 15
 * getTotalMenuItems(menuItems)
 */
export const getTotalMenuItems = (menuItems: MenuItem[]): number => {
  let count = 0;
  let index = 0;
  
  // Iterate through the array using while loop to count items
  while (index < menuItems.length) {
    count++;
    index++;
  }
  
  return count;
};

/**
 * Filters menu items by course type
 * @param items - Array of menu items to filter
 * @param course - Course type to filter by ('starter', 'main', 'dessert', or 'all')
 * @returns Filtered array of menu items matching the specified course
 * @example
 * // Returns only starter items
 * filterItemsByCourse(menuItems, 'starter')
 */
export const filterItemsByCourse = (items: MenuItem[], course: CourseType): MenuItem[] => {
  // Return all items if 'all' course is selected
  if (course === 'all') return items;
  
  // Filter items that match the specified course
  const filtered: MenuItem[] = [];
  // Using for...in loop to iterate through array indices
  for (const index in items) {
    if (items[index].course === course) {
      filtered.push(items[index]);
    }
  }
  return filtered;
};