import { UserProfilePage } from '../pages/UserProfile.page';

//Fills the user profile form using default or overridden values.

export async function fillUserProfile(
    userProfile: UserProfilePage,
    overrides: Partial<{ 
        firstName: string; lastName: string; email: string;
        password: string; confirmPassword: string; gender?: 'male' | 'female' | 'preferNotToSay';
        dob: string; phone: string; address: string;
        linkedIn: string; gitHub: string;
    }> = {},
    includeOptionalFields = true
) {
    // Define a complete set of default values for all form fields (both required and optional).
    // These represent a valid user profile submission.
    const defaultData : {
        firstName: string; lastName: string; email: string;
        password: string; confirmPassword: string; gender?: 'male' | 'female' | 'preferNotToSay';
        dob: string; phone: string; address: string;
        linkedIn: string; gitHub: string;
    } = {
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

    // Merge the default values with any test-specific overrides.
    // This allows tests to focus only on the fields they want to vary.
    const formData = { ...defaultData, ...overrides };

    // Call the POM method to fill the form fields.
    // Required fields are always filled.
    // Optional fields are conditionally included based on the `includeOptionalFields` flag.
    await userProfile.fillUserProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        gender:  includeOptionalFields ? formData.gender : undefined,
        dob: includeOptionalFields ? formData.dob : undefined,
        phone: includeOptionalFields ? formData.phone : undefined,
        address: includeOptionalFields ? formData.address : undefined,
        linkedIn: includeOptionalFields ? formData.linkedIn : undefined,
        gitHub: includeOptionalFields ? formData.gitHub : undefined
    });
}
