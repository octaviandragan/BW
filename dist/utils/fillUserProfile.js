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
exports.fillUserProfile = fillUserProfile;
function fillUserProfile(userProfile_1) {
    return __awaiter(this, arguments, void 0, function* (userProfile, overrides = {}, includeOptionalFields = true) {
        // Default valid values
        const defaultData = {
            firstName: "John",
            lastName: "Smith",
            email: "john.smith@example.com",
            password: "P@ssw0rd123",
            confirmPassword: "P@ssw0rd123",
            gender: "male",
            dob: "1990-01-01",
            phone: "1234567890",
            address: "123 Main St, Apt 1",
            linkedIn: "https://www.linkedin.com/in/johndoe",
            gitHub: "https://github.com/johndoe"
        };
        // Apply overrides for specific tests
        const formData = Object.assign(Object.assign({}, defaultData), overrides);
        // Fill required fields
        yield userProfile.fillUserProfile({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            gender: includeOptionalFields ? formData.gender : undefined,
            dob: includeOptionalFields ? formData.dob : undefined,
            phone: includeOptionalFields ? formData.phone : undefined,
            address: includeOptionalFields ? formData.address : undefined,
            linkedIn: includeOptionalFields ? formData.linkedIn : undefined,
            gitHub: includeOptionalFields ? formData.gitHub : undefined
        });
    });
}
