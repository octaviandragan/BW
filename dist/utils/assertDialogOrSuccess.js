"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertDialogOrSuccess = assertDialogOrSuccess;
const test_1 = require("@playwright/test");
/**
 * Asserts that either an expected dialog message appears OR a success message is NOT detected.
 */
function assertDialogOrSuccess(page, expectedDialogMessage) {
    return __awaiter(this, void 0, void 0, function* () {
        let dialogMessage = "";
        let successDetected = false;
        yield page.waitForLoadState('domcontentloaded');
        console.log("🔎 Setting up observer to detect success message before reload...");
        // ✅ Ensure document.body is available
        yield page.evaluate(() => {
            if (!document.body) {
                console.error("❌ document.body is null! Observer cannot be attached.");
                return;
            }
            window.localStorage.removeItem('playwright_success_detected'); // Reset previous flag
            const observer = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    for (const node of mutation.addedNodes) {
                        if (node instanceof HTMLElement && node.matches('.success')) {
                            console.log("✅ Success message detected before reload!");
                            window.localStorage.setItem('playwright_success_detected', 'true');
                        }
                    }
                }
            });
            // ✅ Safely observe changes in the document body
            observer.observe(document.body, { childList: true, subtree: true });
        });
        // ✅ Listen for alert dialogs
        page.once('dialog', (dialog) => __awaiter(this, void 0, void 0, function* () {
            dialogMessage = dialog.message();
            console.log(`📢 Dialog detected: "${dialogMessage}"`);
            yield dialog.dismiss();
        }));
        // ✅ Wait briefly to allow the observer to capture changes
        yield page.waitForTimeout(500);
        // ✅ Check if success message was detected
        const successFlag = yield page.evaluate(() => window.localStorage.getItem('playwright_success_detected'));
        successDetected = successFlag === 'true';
        if (successDetected) {
            console.log("✅ Success message detected!");
            throw new Error("❌ Unexpected Success! Account should not be created.");
        }
        else {
            console.log("⚠️ No success message detected before reload.");
        }
        console.log(`📋 Final dialog message captured: "${dialogMessage}"`);
        // ✅ If no success and no dialog, fail test as inconclusive
        if (!successDetected && !dialogMessage) {
            throw new Error("❌ No error message or success message detected. Test inconclusive.");
        }
        // ✅ Validate the expected dialog message
        (0, test_1.expect)(dialogMessage).toContain(expectedDialogMessage);
    });
}
