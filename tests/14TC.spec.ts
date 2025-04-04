import { test, UserProfilePage, fillUserProfile, assertDialogOrSuccess } from './fixtures';

test('Verify password rejects missing special characters', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await page.goto('https://qa-assessment.pages.dev/');
    console.log(`Testing form submission with an incomplete password`);
    // Fill in the password field with an invalid psk - missing spechial characters
    await fillUserProfile(userProfile, { password: "Password1", confirmPassword: "Password1" });
    //Click submit
    page.getByRole('button', { name: 'Submit' }).click();
    // Initiate the assertion function (assertDialogOrSuccess.ts from utils expecting an error dialog with a specific message)
    await assertDialogOrSuccess(page, "dialog", "Password must contain special character");
    })   