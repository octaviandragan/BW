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
const fixtures_1 = require("../fixtures");
const UserProfile_page_1 = require("../pages/UserProfile.page");
fixtures_1.test.describe('Password Field Tests', () => {
    let userProfile;
    fixtures_1.test.beforeEach((_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        yield page.goto('https://your-test-url.com');
        userProfile = new UserProfile_page_1.UserProfilePage(page);
    }));
    (0, fixtures_1.test)('should accept a valid password', () => __awaiter(void 0, void 0, void 0, function* () {
        yield userProfile.fillUserProfile({ password: 'P@ssw0rd!' });
        yield userProfile.submitForm();
        yield (0, fixtures_1.expect)(userProfile.errorMessages).not.toBeVisible();
    }));
    (0, fixtures_1.test)('should reject passwords shorter than 6 characters', () => __awaiter(void 0, void 0, void 0, function* () {
        yield userProfile.fillUserProfile({ password: 'P@ss1' });
        yield userProfile.submitForm();
        const errors = yield userProfile.getErrorMessages();
        (0, fixtures_1.expect)(errors).toContain('Password must be at least 6 characters long');
    }));
    (0, fixtures_1.test)('should reject password without special characters', () => __awaiter(void 0, void 0, void 0, function* () {
        yield userProfile.fillUserProfile({ password: 'Password1' });
        yield userProfile.submitForm();
        const errors = yield userProfile.getErrorMessages();
        (0, fixtures_1.expect)(errors).toContain('Password must contain at least one special character');
    }));
    (0, fixtures_1.test)('should be a mandatory field', () => __awaiter(void 0, void 0, void 0, function* () {
        yield userProfile.submitForm();
        const errors = yield userProfile.getErrorMessages();
        (0, fixtures_1.expect)(errors).toContain('Password is required');
    }));
});
