/**
 * Example Plain Userscript
 * 
 * A simple userscript that demonstrates usage of the common library
 * without any additional frameworks like Vue or Tailwind.
 */

import { DOM, Utils } from '@grease/common';

// Simple utility functions for this userscript
function truncateString(str: string, maxLength: number): string {
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
}

function formatDate(date: Date): string {
  return date.toLocaleString();
}

// Wait for the page to be ready
DOM.onReady(() => {
  console.log('Example Plain Userscript loaded!');
  
  // Add some basic styles for our userscript elements
  const css = `
    .grease-userscript-banner {
      position: fixed;
      top: 10px;
      right: 10px;
      background: #4CAF50;
      color: white;
      padding: 10px 15px;
      border-radius: 5px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      z-index: 9999;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .grease-userscript-banner:hover {
      background: #45a049;
      transform: translateY(-2px);
    }
    
    .grease-userscript-info {
      margin-top: 5px;
      font-size: 12px;
      opacity: 0.9;
    }
  `;
  
  DOM.addStyles(css);
  
  // Create a banner element to show that the userscript is active
  const banner = DOM.createElement('div', {
    className: 'grease-userscript-banner',
    title: 'Click to toggle userscript info'
  }, [
    'Grease Userscript Active!'
  ]);
  
  // Add click handler to show some info
  let infoVisible = false;
  banner.addEventListener('click', () => {
    if (!infoVisible) {
      const info = DOM.createElement('div', {
        className: 'grease-userscript-info'
      }, [
        `Page URL: ${truncateString(window.location.href, 50)}`
      ]);
      banner.appendChild(info);
      infoVisible = true;
    } else {
      const info = banner.querySelector('.grease-userscript-info');
      if (info) {
        info.remove();
        infoVisible = false;
      }
    }
  });
  
  // Add the banner to the page
  document.body.appendChild(banner);
  
  // Example of waiting for a specific element (if it exists)
  DOM.waitForElement('main, .main, #main')
    .then((mainElement) => {
      console.log('Main content area found:', mainElement);
      
      // Add a subtle indicator that we found the main content
      const indicator = DOM.createElement('div');
      indicator.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 3px;
        height: 20px;
        background: #4CAF50;
        z-index: 1000;
      `;
      
      const htmlElement = mainElement as HTMLElement;
      if (htmlElement.style.position === '' || htmlElement.style.position === 'static') {
        htmlElement.style.position = 'relative';
      }
      mainElement.appendChild(indicator);
    })
    .catch(() => {
      console.log('No main content area found - that\'s okay!');
    });
  
  // Log some debug info using the utils
  console.log('Userscript info:', {
    timestamp: formatDate(new Date()),
    url: window.location.href,
    domain: Utils.getCurrentDomain(),
    userAgent: navigator.userAgent
  });
});