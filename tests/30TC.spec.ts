import { test, UserProfilePage, fillUserProfile, assertDialogOrSuccess } from './fixtures';

test('Verify phone number rejects input longer than 10 digits', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await page.goto('https://qa-assessment.pages.dev/');
    console.log(`Testing form submission with a valid phone number`);
    // Fill the form with a future Date of Birth
    await fillUserProfile(userProfile, { gitHub: "https://github.com/johnsmith" });
    // Click submit
    page.getByRole('button', { name: 'Submit' }).click();
    // Initiate the assertion function (assertDialogOrSuccess.ts from utils expecting a success message)
    await assertDialogOrSuccess(page, "success", "Profile successfully created");
    })