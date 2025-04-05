import { Page, Locator } from '@playwright/test';
/**
 * Page Object Model class for the User Profile form.
 * Encapsulates all form field locators and actions needed to interact with the page.
 */
export class UserProfilePage {
    // Store a reference to the Playwright Page instance
    readonly page: Page;
    // Locators for all form fields (required and optional)
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly confirmPassword: Locator;
    // Gender options (radio buttons)
    readonly genderMale: Locator;
    readonly genderFemale: Locator;
    readonly genderPreferNotToSay: Locator;
    // Additional profile information
    readonly dob: Locator;
    readonly phone: Locator;
    readonly address: Locator;
    readonly linkedIn: Locator;
    readonly gitHub: Locator;
    // Submit button and error messages
    readonly submitButton: Locator;
    readonly errorMessages: Locator;
  /**
     * Initializes the page object with locators for each form field and control.
     * @param page - Playwright Page instance passed from the test.
     */
    constructor(page: Page) {
        this.page = page;
        // Map all DOM selectors to readable class properties using Playwright's locator API
        this.firstName = page.locator('#firstName');
        this.lastName = page.locator('#lastName');
        this.email = page.locator('#email');
        this.password = page.locator('#password');
        this.confirmPassword = page.locator('#confirmPassword');

        this.genderMale = page.locator('#male');
        this.genderFemale = page.locator('#female');
        this.genderPreferNotToSay = page.locator('#preferNotToSay');

        this.dob = page.locator('#dob');
        this.phone = page.locator('#phone');
        this.address = page.locator('#address');
        this.linkedIn = page.locator('#linkedIn');
        this.gitHub = page.locator('#github');

        this.submitButton = page.locator('input[type="submit"]');
        this.errorMessages = page.locator('.error-message');
    }
        /**
     * Fills in the user profile form fields using the provided data.
     * All fields are optional, allowing selective population for different test scenarios.
     * 
     * @param data - Partial user profile information to populate the form.
     *               Only fields present in the object will be filled.
     */
    async fillUserProfile(data: {
        firstName?: string,
        lastName?: string,
        email?: string,
        password?: string,
        confirmPassword?: string,
        gender?: 'male' | 'female' | 'preferNotToSay',
        dob?: string,
        phone?: string,
        address?: string,
        linkedIn?: string,
        gitHub?: string
    }) {
        // Conditionally fill required and optional fields if they are provided in the data object
        if (data.firstName) await this.firstName.fill(data.firstName);
        if (data.lastName) await this.lastName.fill(data.lastName);
        if (data.email) await this.email.fill(data.email);
        if (data.password) await this.password.fill(data.password);
        if (data.confirmPassword) await this.confirmPassword.fill(data.confirmPassword);
        // Handle gender radio button selection based on the provided value
        if (data.gender) {
            switch (data.gender) {
                case 'male':
                    await this.genderMale.check();
                    break;
                case 'female':
                    await this.genderFemale.check();
                    break;
                case 'preferNotToSay':
                    await this.genderPreferNotToSay.check();
                    break;
            }
        }
        // Fill optional additional information if provided
        if (data.dob) await this.dob.fill(data.dob);
        if (data.phone) await this.phone.fill(data.phone)
        if (data.address) await this.address.fill(data.address);
        if (data.linkedIn) await this.linkedIn.fill(data.linkedIn);
        if (data.gitHub) await this.gitHub.fill(data.gitHub);
        }
        
    }