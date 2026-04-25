/**
 * Utility Functions Module
 * Provides reusable UI and validation functions for the GradConnect application
 */

/**
 * Display a message to the user
 * @param {string} message - The message text to display
 * @param {string} type - Message type: 'success', 'error', or 'info'
 */
function showMessage(message, type) {
  // Remove any existing message
  const existingMessage = document.querySelector('.message-box');
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create message element
  const messageBox = document.createElement('div');
  messageBox.className = `message-box message-${type}`;
  messageBox.textContent = message;
  
  // Style the message box
  messageBox.style.position = 'fixed';
  messageBox.style.top = '20px';
  messageBox.style.right = '20px';
  messageBox.style.padding = '15px 20px';
  messageBox.style.borderRadius = '5px';
  messageBox.style.zIndex = '10000';
  messageBox.style.fontFamily = 'Arial, sans-serif';
  messageBox.style.fontSize = '14px';
  messageBox.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  messageBox.style.maxWidth = '300px';
  messageBox.style.wordWrap = 'break-word';
  
  // Apply type-specific styling
  if (type === 'success') {
    messageBox.style.backgroundColor = '#4CAF50';
    messageBox.style.color = 'white';
  } else if (type === 'error') {
    messageBox.style.backgroundColor = '#f44336';
    messageBox.style.color = 'white';
  } else {
    messageBox.style.backgroundColor = '#2196F3';
    messageBox.style.color = 'white';
  }
  
  // Add to document
  document.body.appendChild(messageBox);
  
  // Auto-remove after 3 seconds
  setTimeout(() => {
    messageBox.remove();
  }, 3000);
}

/**
 * Toggle loading state on a button
 * @param {boolean} show - Whether to show or hide the loader
 * @param {string} buttonId - The ID of the button element (optional)
 */
function toggleLoader(show, buttonId) {
  let button;
  
  if (buttonId) {
    button = document.getElementById(buttonId);
  } else {
    // If no buttonId provided, find the active button
    button = document.activeElement;
    if (!button || button.tagName !== 'BUTTON') {
      button = document.querySelector('button[type="submit"]');
    }
  }
  
  if (!button) {
    console.warn('toggleLoader: No button found');
    return;
  }
  
  if (show) {
    // Store original text and disable button
    button.dataset.originalText = button.textContent;
    button.textContent = 'جاري التحميل...';
    button.disabled = true;
    button.style.opacity = '0.6';
    button.style.cursor = 'not-allowed';
  } else {
    // Restore original text and enable button
    if (button.dataset.originalText) {
      button.textContent = button.dataset.originalText;
      delete button.dataset.originalText;
    }
    button.disabled = false;
    button.style.opacity = '1';
    button.style.cursor = 'pointer';
  }
}

/**
 * Validate email format
 * @param {string} email - The email address to validate
 * @returns {boolean} - True if email is valid, false otherwise
 */
function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  // Basic email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate password strength
 * @param {string} password - The password to validate
 * @returns {object} - Object with valid (boolean) and message (string) properties
 */
function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    return {
      valid: false,
      message: 'كلمة المرور مطلوبة'
    };
  }
  
  if (password.length < 6) {
    return {
      valid: false,
      message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
    };
  }
  
  return {
    valid: true,
    message: ''
  };
}

/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} input - The input string to sanitize
 * @returns {string} - Sanitized string
 */
function sanitizeInput(input) {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  // Create a temporary div element
  const temp = document.createElement('div');
  temp.textContent = input;
  
  // Get the sanitized text (HTML entities are escaped)
  return temp.innerHTML;
}

/**
 * Format Firestore timestamp for display with Arabic date formatting
 * @param {object} timestamp - Firestore Timestamp object
 * @returns {string} - Formatted date/time string
 */
function formatTimestamp(timestamp) {
  if (!timestamp) {
    return '';
  }
  
  let date;
  
  // Handle Firestore Timestamp object
  if (timestamp.toDate && typeof timestamp.toDate === 'function') {
    date = timestamp.toDate();
  } 
  // Handle JavaScript Date object
  else if (timestamp instanceof Date) {
    date = timestamp;
  }
  // Handle timestamp in milliseconds
  else if (typeof timestamp === 'number') {
    date = new Date(timestamp);
  }
  // Handle timestamp with seconds property (Firestore format)
  else if (timestamp.seconds) {
    date = new Date(timestamp.seconds * 1000);
  }
  else {
    return '';
  }
  
  // Format date in Arabic locale
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  
  try {
    return date.toLocaleString('ar-SA', options);
  } catch (error) {
    // Fallback to default formatting if Arabic locale fails
    return date.toLocaleString('en-US', options);
  }
}

// Make functions globally available
window.showMessage = showMessage;
window.toggleLoader = toggleLoader;
window.validateEmail = validateEmail;
window.validatePassword = validatePassword;
window.sanitizeInput = sanitizeInput;
window.formatTimestamp = formatTimestamp;
