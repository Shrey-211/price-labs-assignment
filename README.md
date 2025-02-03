# PriceLabs Cypress Test Automation

This project contains automated end-to-end tests using Cypress with TypeScript. It includes features like Mochawesome reporting, and various test suites for smoke, sanity, and regression testing.

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)
- Chrome browser (for running tests)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Project Structure

```
project-root/
├── cypress/
│   ├── e2e/           # Test specifications (.spec.ts files)
│   ├── fixtures/      # Test data
│   ├── support/       # Custom commands and configurations
│   └── reports/       # Generated test reports
├── cypress.config.ts  # Cypress configuration
├── tsconfig.json      # TypeScript configuration
└── package.json      # Project dependencies and scripts
```

## Available Scripts

- **Run all tests:**
  ```bash
  npm run cypress:run
  ```

- **Run smoke tests:**
  ```bash
  npm run cypress:run:smoke
  ```

- **Run sanity tests:**
  ```bash
  npm run cypress:run:sanity
  ```

- **Run regression tests:**
  ```bash
  npm run cypress:run:regression
  ```

- **Generate and view reports:**
  ```bash
  npm run full:run    # Runs tests and generates reports
  ```

## Key Features

- **TypeScript Support**: Full TypeScript support for better code completion and type checking
- **Test Categorization**:
  - Smoke Tests
  - Sanity Tests
  - Regression Tests

## Reports

After running tests, reports can be found in the `cypress/reports` directory. The project supports:
- Mochawesome HTML reports

## Environment Preparation
Pre-Test Environment Setup
Before running tests, especially for 01_regression.spec.ts in Manage Listings, perform the following steps:

### Group Cleanup:
Ensure no existing groups with these names:

 - Test Group Shreyas
 - Test Group Shreyas Edited

### Manual Cleanup Methods:

 - If groups exist in the application, manually delete them before running tests
 - Use the application's UI to search and remove these groups

### Recommendations:

- Always start with a clean test environment
- Remove any pre-existing test data that might interfere with test execution
- Verify no conflicting groups exist before running the test suite

- Note: Failure to remove these groups may cause test failures or unexpected behavior in the 01_regression.spec.ts test case.

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## Troubleshooting

If you encounter any issues:
1. Ensure all dependencies are installed
2. Clear Cypress cache: `npx cypress cache clear`
3. Delete `node_modules` and run `npm install` again