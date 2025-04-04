import { test, expect, UserProfilePage, fillUserProfile, assertDialogOrSuccess } from './fixtures';

test('Verify form submission with different gender options', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await page.goto('https://qa-assessment.pages.dev/');

    const genderOptions = ["male", "female", "preferNotToSay"] as const;

    for (const gender of genderOptions) {
        console.log(`Testing form submission with gender: ${gender}`);

        // Fill the form with the selected gender
        await fillUserProfile(userProfile, { gender });

        // Ensure the correct radio button is selected
        await expect(page.locator(`input[name="gender"][value="${gender}"]`)).toBeChecked();

        // Click submit
        page.getByRole('button', { name: 'Submit' }).click();

        // Assert the success message using shared utility
        await assertDialogOrSuccess(page, 'success');

        console.log(`Success message confirmed with gender: ${gender}`);

        // Reload the page for the next iteration
        await page.reload();
    }
    })