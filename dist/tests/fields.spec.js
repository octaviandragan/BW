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
const test_1 = require("@playwright/test");
const UserProfile_page_1 = require("../pages/UserProfile.page");
(0, test_1.test)('Verify required and optional fields', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
    const userProfile = new UserProfile_page_1.UserProfilePage(page);
    yield page.goto('https://qa-assessment.pages.dev/');
    // ❌ Submit form with all fields blank
    yield userProfile.submitForm();
    // ✅ Validate error messages for all required fields
    yield (0, test_1.expect)(userProfile.errorMessages).toContainText('First name is required');
    yield (0, test_1.expect)(userProfile.errorMessages).toContainText('Last name is required');
    yield (0, test_1.expect)(userProfile.errorMessages).toContainText('Email is required');
    yield (0, test_1.expect)(userProfile.errorMessages).toContainText('Password is required');
    yield (0, test_1.expect)(userProfile.errorMessages).toContainText('Confirm password is required');
    // ✅ Ensure no error messages for optional fields (they should not require input)
    yield (0, test_1.expect)(userProfile.errorMessages).not.toContainText('Gender is required');
    yield (0, test_1.expect)(userProfile.errorMessages).not.toContainText('Date of birth is required');
    yield (0, test_1.expect)(userProfile.errorMessages).not.toContainText('Phone number is required');
    yield (0, test_1.expect)(userProfile.errorMessages).not.toContainText('Address is required');
    yield (0, test_1.expect)(userProfile.errorMessages).not.toContainText('LinkedIn URL is required');
    yield (0, test_1.expect)(userProfile.errorMessages).not.toContainText('GitHub URL is required');
}));
