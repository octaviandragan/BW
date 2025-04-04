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
    let dialogMessage = '';
    let successDetected = false;
    let successMessage = '';
    let validationMessage = '';

    await page.waitForLoadState('domcontentloaded');

    console.log('🔎 Setting up observer to detect success message before reload...');

    // ✅ Setup observer for .success messages
    await page.evaluate(() => {
        if (!document.body) {
            console.error('❌ document.body is null! Observer cannot be attached.');
            return;
        }
        window.localStorage.removeItem('playwright_success_detected');

        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (node instanceof HTMLElement && node.matches('.success')) {
                        console.log('✔️ Success message detected before reload!');
                        window.localStorage.setItem('playwright_success_detected', 'true');
                    }
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    });

    // ✅ Capture dialog message
    page.once('dialog', async (dialog) => {
        dialogMessage = dialog.message();
        console.log(`📢 Dialog detected: "${dialogMessage}"`);
        await dialog.dismiss();
    });

    // ✅ Capture validation message (if applicable)
    if (expectedOutcome === 'validation' && inputSelector) {
        const inputField = page.locator(inputSelector);
        validationMessage = await inputField.evaluate(
            (input) => (input as HTMLInputElement).validationMessage
        );
    }

// ✅ Wait briefly to allow DOM updates or observer triggers
await page.waitForTimeout(500);

// ✅ First try to get the success message directly
const successLocator = page.locator('.success');
if (await successLocator.count() > 0) {
    successMessage = await successLocator.innerText();
    successDetected = true;
} else {
    // Fallback: check if the MutationObserver set a flag
    const successFlag = await page.evaluate(() => window.localStorage.getItem('playwright_success_detected'));
    successDetected = successFlag === 'true';
}

    console.log(`📋 Final captured messages:
    - Success Detected: ${successDetected}
    - Success Message: "${successMessage}"
    - Dialog Message: "${dialogMessage}"
    - Validation Message: "${validationMessage}"
    - Expected Outcome: "${expectedOutcome}"
    - Expected Validation Message: "${expectedValidationMessage}"
    `);

    if (expectedOutcome === 'success') {
        if (!successDetected) {
            throw new Error('❌ Expected a success message, but none was detected! Test FAILS!');
        }
        console.log('✔️ Expected success message appeared. Test PASSES!');
    } else if (expectedOutcome === 'dialog') {
        if (!dialogMessage) {
            throw new Error('❌ Expected a dialog message but none was detected. Test FAILS!');
        }
        if (!dialogMessage.includes(expectedValidationMessage)) {
            throw new Error(`❌ Expected dialog message to contain: "${expectedValidationMessage}" but got: "${dialogMessage}". Test FAILS!`);
        }
        console.log('✔️ Expected dialog message appeared. Test PASSES!');
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
