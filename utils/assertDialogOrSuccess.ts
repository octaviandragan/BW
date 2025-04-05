import { expect, Page } from '@playwright/test';

/**
 * Asserts that either:
 *  - A success message appears,
 *  - A dialog appears, or
 *  - A validation message appears and matches `expectedValidationMessage`.
 */
export async function assertDialogOrSuccess(
    page: Page,
    expectedOutcome: 'success' | 'dialog' | 'validation',
    expectedValidationMessage: string = '',
    inputSelector: string = '' // Required only for validation scenario
) {
     // Declare variables to hold potential message values and flags
    let dialogMessage = '';
    let successDetected = false;
    let successMessage = '';
    let validationMessage = '';

    await page.waitForLoadState('domcontentloaded');

    console.log('Setting up observer to detect success message before reload...');

    // Set up a MutationObserver in the browser context to listen for elements with the .success class
    // When found, we set a localStorage flag that we can later read from the Node context
    await page.evaluate(() => {
        if (!document.body) {
            console.error('document.body is null! Observer cannot be attached.');
            return;
        }
        // Remove any previous success flag
        window.localStorage.removeItem('playwright_success_detected');

        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (node instanceof HTMLElement && node.matches('.success')) {
                        console.log('Success message detected before reload!');
                        window.localStorage.setItem('playwright_success_detected', 'true');
                    }
                }
            }
        });
        // Start observing the entire document body for added nodes
        observer.observe(document.body, { childList: true, subtree: true });
    });

    // Attach a one-time listener for any browser alert/dialog that appears
    // Capture the message and dismiss the dialog
    page.once('dialog', async (dialog) => {
        dialogMessage = dialog.message();
        console.log(`Dialog detected: "${dialogMessage}"`);
        await dialog.dismiss();
    });
    // If we're expecting a native browser validation message,
    // extract it from the specified input field using DOM validation APIs
    if (expectedOutcome === 'validation' && inputSelector) {
        const inputField = page.locator(inputSelector);
        validationMessage = await inputField.evaluate(
            (input) => (input as HTMLInputElement).validationMessage
        );
    }

    // Wait briefly to allow the page to process DOM updates or observer events
await page.waitForTimeout(500);

    // Try to detect a success message directly from the DOM
const successLocator = page.locator('.success');
if (await successLocator.count() > 0) {
    // Found success element directly
    successMessage = await successLocator.innerText();
    successDetected = true;
} else {
    // If not found directly, check if the MutationObserver caught it and stored a flag
    const successFlag = await page.evaluate(() => window.localStorage.getItem('playwright_success_detected'));
    successDetected = successFlag === 'true';
}
    // Log all relevant captured data to help with debugging
    console.log(` Final captured messages:
    - Success Detected: ${successDetected}
    - Success Message: "${successMessage}"
    - Dialog Message: "${dialogMessage}"
    - Validation Message: "${validationMessage}"
    - Expected Outcome: "${expectedOutcome}"
    - Expected Validation Message: "${expectedValidationMessage}"
    `);
    // Now check for each expected outcome and throw an error if expectations are not met
        // Success scenario
    if (expectedOutcome === 'success') {
        if (!successDetected) {
            throw new Error('❌ Expected a success message, but none was detected! Test FAILS!');
        }
        console.log('✔️ Expected success message appeared. Test PASSES!');
        // Dialog scenario
    } else if (expectedOutcome === 'dialog') {
        if (!dialogMessage) {
            throw new Error('❌ Expected a dialog message but none was detected. Test FAILS!');
        }
        if (!dialogMessage.includes(expectedValidationMessage)) {
            throw new Error(`❌ Expected dialog message to contain: "${expectedValidationMessage}" but got: "${dialogMessage}". Test FAILS!`);
        }
        console.log('✔️ Expected dialog message appeared. Test PASSES!');
            // Validation message scenario
    } else if (expectedOutcome === 'validation') {
        if (!validationMessage) {
            throw new Error('❌ Expected a validation message, but none was detected! Test FAILS!');
        }
        if (!validationMessage.includes(expectedValidationMessage)) {
            throw new Error(`❌ Expected validation message to contain: "${expectedValidationMessage}" but got: "${validationMessage}". Test FAILS!`);
        }
        console.log('✔️ Expected validation message appeared. Test PASSES!');
    } else {
        throw new Error('❌ Unexpected test case scenario! Ensure expectedOutcome is "success", "dialog", or "validation".');
    }
}
