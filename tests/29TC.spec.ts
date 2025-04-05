import { test, UserProfilePage, fillUserProfile, assertDialogOrSuccess } from './fixtures';

test('Verify LinkedIn URL rejects invalid format', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await page.goto('https://qa-assessment.pages.dev/');
    console.log(`Testing form submission with an invalid LinkedIn URL`);
    // Fill the form with an invalid LinkedIn URL
    await fillUserProfile(userProfile, { linkedIn: "linkedin.com/in/johnsmit" });
    // Click submit
    page.getByRole('button', { name: 'Submit' }).click();
    // Initiate the assertion function (assertDialogOrSuccess.ts from utils expecting an inline validation message from the linkedin input field
    await assertDialogOrSuccess(page, "validation", "a URL", "#linkedIn");
    })