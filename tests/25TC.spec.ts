import { test, UserProfilePage, fillUserProfile, assertDialogOrSuccess } from './fixtures';

test('Verify phone number rejects invalid format', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await page.goto('https://qa-assessment.pages.dev/');
    console.log(`Testing form submission with an invalid phone number`);
    // Fill the form with an invalid phone number - using special characters
    await fillUserProfile(userProfile, { phone: "123-??**" });
    // Click submit
    page.getByRole('button', { name: 'Submit' }).click();
    // Initiate the assertion function (assertDialogOrSuccess.ts from utils expecting an inline validation message from the phone input field
    await assertDialogOrSuccess(page, "validation", "Please match the requested format", "#phone");
    })