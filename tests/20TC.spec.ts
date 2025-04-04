import { test, expect, UserProfilePage, fillUserProfile, assertDialogOrSuccess } from './fixtures';

test('Verify form submission without selecting gender', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await page.goto('https://qa-assessment.pages.dev/');

    console.log(`Testing form submission without selecting gender`);

    // Fill the form WITHOUT selecting gender
    await fillUserProfile(userProfile, { gender: undefined });

    // Ensure each radio button is NOT checked
    await expect(page.locator('#male')).not.toBeChecked();
    await expect(page.locator('#female')).not.toBeChecked();
    await expect(page.locator('#preferNotToSay')).not.toBeChecked();


        page.waitForURL('https://qa-assessment.pages.dev/', { waitUntil: 'domcontentloaded' }),
        //Click submit
        page.getByRole('button', { name: 'Submit' }).click()

        await assertDialogOrSuccess(page, "success", "Profile successfully created");
    })