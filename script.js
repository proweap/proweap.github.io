// script.js
// Ensure to run JavaScript in strict mode for better error checking
'use strict';

// DOMContentLoaded ensures the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  // Event listener for the Hero Button
  const heroButton = document.querySelector('.hero-button');
  heroButton.addEventListener('click', () => {
    scrollToSection('about');
  });

  // Event listener for the Contact Form
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission
    handleContactFormSubmit();
  });
});

/**
 * Scroll smoothly to a specific section of the page
 * @param {string} sectionId - The id of the section to scroll to
 */
function scrollToSection(sectionId) {
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' });
    console.log(`Scrolled to section: ${sectionId}`);
  } else {
    console.error(`Section with id "${sectionId}" not found.`);
  }
}

/**
 * Handle the submission of the contact form
 */
function handleContactFormSubmit() {
  // Get form data
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  // Simple validation
  if (!name || !email) {
    alert('Please fill out all fields before submitting.');
    return;
  }

  // Log the form data (in a real app, send it to a server)
  console.log('Form Submitted:', { name, email });

  // Display a thank-you message to the user
  alert(`Thank you, ${name}! We have received your message.`);

  // Clear the form
  document.getElementById('contactForm').reset();
}

/**
 * Register Service Worker for PWA functionality
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

/**
 * Dynamic Feature Highlighting (Optional)
 * Adds hover animations or interactivity to feature items
 */
const featureItems = document.querySelectorAll('.feature-item');
featureItems.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'scale(1.05)';
    item.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = 'scale(1)';
    item.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
  });
});
