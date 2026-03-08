/**
 * Centralized image paths for the application
 * These variables ensure images work correctly after deployment
 */

// Base path for GitHub Pages - works with both local dev and deployed
const BASE_PATH = process.env.PUBLIC_URL || '';

// Course-related images
export const HOME_IMAGE = `${BASE_PATH}/images/home.webp`;
export const REGISTER_IMAGE = `${BASE_PATH}/images/register.png`;

// Brand images
export const LOGO_IMAGE = `${BASE_PATH}/images/logo.png`;
export const LOGIN_GIF = `${BASE_PATH}/images/Login.gif`;

// Payment images
export const FAWRY_IMAGE = `${BASE_PATH}/images/fawry.png`;

export default {
  HOME_IMAGE,
  REGISTER_IMAGE,
  LOGO_IMAGE,
  LOGIN_GIF,
  FAWRY_IMAGE
};
