import { CourseType } from '../types';

export const DEFAULT_IMAGES = {
  starter: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
  main: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
  dessert: 'https://images.unsplash.com/photo-1563729785271-4c4eac99737f?w=400',
  background: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500'
};

export const COURSES = ['starter', 'main', 'dessert'];

export const COURSE_FILTERS: { value: CourseType; label: string }[] = [
  { value: 'all', label: 'All Courses' },
  { value: 'starter', label: 'Starters' },
  { value: 'main', label: 'Main Courses' },
  { value: 'dessert', label: 'Desserts' },
];