import { test, UserProfilePage, fillUserProfile, assertDialogOrSuccess } from './fixtures';

test('Verify phone number rejects input longer than 10 digits', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await page.goto('https://qa-assessment.pages.dev/');
    console.log(`Testing form submission with a valid phone number`);
    // Fill the form with a future Date of Birth
    await fillUserProfile(userProfile, { phone: "123456789012" });
    // Click submit
    page.getByRole('button', { name: 'Submit' }).click();
    // Initiate the assertion function (assertDialogOrSuccess.ts from utils expecting an inline validation message from the phone input field
    await assertDialogOrSuccess(page, "validation", "Please match the requested format." , "#phone");
    })