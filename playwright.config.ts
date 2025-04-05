import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests', // Path to your tests folder
  timeout: 30 * 1000, // Optional: global timeout per test
  retries: 0, // Optional: retry failed tests
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],

  // Use project configuration to define each browser
  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
        headless: true,
      },
    },
    {
      name: 'Firefox',
      use: {
        browserName: 'firefox',
        headless: true,
      },
    },
    {
      name: 'WebKit',
      use: {
        browserName: 'webkit',
        headless: true,
      },
    },
  ],
});
