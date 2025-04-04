import { test, UserProfilePage, fillUserProfile, assertDialogOrSuccess } from './fixtures';

test('Verify password rejects less than minimum characters (e.g., 6)', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await page.goto('https://qa-assessment.pages.dev/');
    console.log(`Testing form submission with a too short password`);
    // Fill in the password field with an invalid psk - too short
    await fillUserProfile(userProfile, { password: "P@ss1", confirmPassword: "P@ss1" });
    //Click submit
    page.getByRole('button', { name: 'Submit' }).click();
    // Initiate the assertion function (assertDialogOrSuccess.ts from utils expecting an error dialog with a specific message)
    await assertDialogOrSuccess(page, "dialog", "Password must contain more than 6 characters");
    })   