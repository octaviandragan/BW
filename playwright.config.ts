import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',  // Ensure this points to the correct folder
  use: {
    // Some default settings for all tests
    browserName: 'chromium',
    headless: true,
  },
});
