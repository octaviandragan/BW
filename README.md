README:

Make sure the system allows running scripts:
Windows: run the following code in Windows PowerShell (admin): Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
On macOS and Linux, this issue with execution policies (like in PowerShell) does not occur.

There is a total of 31 test cases, written in a brief manner, making use of fixtures to rapidly import all dependencies, as well as a special assessment function developed specifically for the 3 types of feedback loops provided by the tested webapp - A success message, an informational dialogue and a inline validation message for fields.
A default state for the correct input for fields is found in the fillUserProfile.ts file under utils. Defaults are declared in the UserProfile page.

Each is handled independently and the outcome is logged by this function.

For the setup, Playwright and TypeScript are required.