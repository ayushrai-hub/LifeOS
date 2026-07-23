# Overlay Text Box Extension

A Chrome browser extension that provides an overlay text box to simulate typing into text fields on any webpage.

## Description

The Overlay Text Box extension allows users to input text into an overlay interface and have it automatically typed character-by-character into target text fields on web pages. This is particularly useful for:

- Filling out forms with repetitive or long text
- Simulating user input for testing purposes
- Avoiding direct interaction with problematic input fields
- Providing a more comfortable typing experience

## Features

- **Overlay Interface**: Clean, resizable text area for input
- **Trigger Button**: Appears next to clicked text fields
- **Simulated Typing**: Character-by-character input simulation with random delays
- **Start/Stop Controls**: Full control over the typing process
- **Visual Feedback**: Status indicators and disabled state for target fields during typing
- **Universal Compatibility**: Works on all websites with text input fields

## Installation

1. Download or clone this repository
2. Open Chrome browser
3. Navigate to `chrome://extensions/`
4. Enable "Developer mode" in the top right corner
5. Click "Load unpacked" button
6. Select the directory containing the extension files
7. The extension should now appear in your extensions list

## Usage

### Method 1: Using the Extension Icon
1. Click the extension icon in the Chrome toolbar
2. Click "Toggle Overlay" in the popup
3. The content script will be injected into the current tab

### Method 2: Using the Popup
1. Click the extension icon in the Chrome toolbar
2. Click "Toggle Overlay" in the popup

### Using the Overlay
1. On any webpage, click on a text input field (input or textarea)
2. A blue "Enable Typing" button will appear next to the field
3. Click the "Enable Typing" button
4. An overlay window will appear with:
   - A text area for your input
   - "Start Typing" button
   - "Stop Typing" button (appears during typing)
   - Close button (X) in the top right
5. Type or paste your text into the overlay text area
6. Click "Start Typing" to begin the simulation
7. The text will be typed character-by-character into the target field
8. Use "Stop Typing" to halt the process at any time
9. Click the X or click outside to close the overlay

## Permissions

The extension requires the following permissions:

- `scripting`: To inject and execute scripts on web pages
- `activeTab`: To access the currently active tab
- `tabs`: To query and manipulate tabs
- `host_permissions` for `<all_urls>`: To work on any website

## Technical Details

- **Manifest Version**: 3 (Chrome Extension Manifest V3)
- **Content Script**: Injects on all URLs to provide overlay functionality
- **Background Script**: Handles extension icon clicks
- **Popup**: Provides alternative activation method

## Files

- `manifest.json`: Extension configuration and permissions
- `background.js`: Service worker for handling extension actions
- `content.js`: Main functionality for overlay and typing simulation
- `popup.html`: Extension popup interface
- `popup.js`: Popup script (currently unused)
- `icon.png`: Extension icon

## Testing

### Manual Testing Steps

1. **Installation Test**:
   - Load the extension in Chrome developer mode
   - Verify it appears in the extensions list
   - Check that the icon is visible in the toolbar

2. **Basic Functionality Test**:
   - Open a webpage with text input fields (e.g., any form page)
   - Click on an input field
   - Verify the "Enable Typing" button appears
   - Click the button and check overlay appears

3. **Typing Simulation Test**:
   - Enter text in the overlay textarea
   - Click "Start Typing"
   - Verify text is typed character-by-character into the target field
   - Check that the target field is visually disabled during typing

4. **Control Tests**:
   - Test "Stop Typing" functionality
   - Test overlay close button
   - Test clicking outside to dismiss

5. **Edge Cases**:
   - Test with different input field types (input, textarea)
   - Test on various websites
   - Test with long text inputs
   - Test rapid clicking of controls

### Automated Testing

The extension uses standard web APIs and should work across different Chrome versions. For automated testing, consider:

- Unit tests for individual functions in content.js
- Integration tests using Chrome's extension testing framework
- End-to-end tests with tools like Puppeteer

## Browser Compatibility

- Chrome 88+ (required for Manifest V3)
- Chromium-based browsers (Edge, Opera, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source. Please check the license file for details.

## Version

Current version: 1.0

