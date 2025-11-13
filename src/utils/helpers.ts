/**
 * Generates a unique identifier for menu items
 * Combines timestamp with random string for high probability of uniqueness
 * @returns Unique string identifier in format: item_[timestamp]_[randomString]
 * @example
 * // Returns "item_1701234567890_abc123def"
 * generateUniqueId()
 */
export const generateUniqueId = (): string => {
  return `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  // Breakdown:
  // - "item_" prefix for readability and identification
  // - Date.now() provides timestamp for uniqueness and sorting
  // - Math.random().toString(36) generates random base-36 string
  // - .substr(2, 9) removes "0." prefix and takes 9 characters
};

/**
 * Returns a color code associated with each course type for consistent UI theming
 * @param course - The course type ('starter', 'main', 'dessert', or any other)
 * @returns Hex color code for the specified course
 * @example
 * // Returns "#FF6B6B"
 * getCourseColor('starter')
 */
export const getCourseColor = (course: string): string => {
  switch (course) {
    case 'starter': return '#FF6B6B';  // Red color for starters
    case 'main': return '#4ECDC4';     // Teal color for main courses
    case 'dessert': return '#FFD166';  // Yellow color for desserts
    default: return '#8B4513';         // Brown color as fallback/default
  }
};

/**
 * Validates menu item form inputs before submission
 * Checks for required fields and valid price format
 * @param dishName - Name of the dish
 * @param description - Description of the dish
 * @param selectedCourse - Course type selected
 * @param price - Price input as string
 * @returns Error message string if validation fails, null if validation passes
 * @example
 * // Returns "Please fill in all fields"
 * validateMenuItem('', 'A delicious dish', 'main', '25.50')
 * 
 * // Returns "Please enter a valid price"
 * validateMenuItem('Pasta', 'Delicious pasta', 'main', '-10')
 * 
 * // Returns null (validation passed)
 * validateMenuItem('Pasta', 'Delicious pasta', 'main', '25.50')
 */
export const validateMenuItem = (
  dishName: string, 
  description: string, 
  selectedCourse: string, 
  price: string
): string | null => {
  // Check if any required field is empty
  if (!dishName || !description || !selectedCourse || !price) {
    return 'Please fill in all fields';
  }

  // Validate price is a positive number
  const priceValue = parseFloat(price);
  if (isNaN(priceValue) || priceValue <= 0) {
    return 'Please enter a valid price';
  }

  // Return null to indicate validation passed
  return null;
};