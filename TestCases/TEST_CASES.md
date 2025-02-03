I'll convert the document to Markdown format.





# PriceLabs Test Cases

## Manage Listings

### Functional Cases

#### Case 1: View All Listings
**Scenario:** Should allow a user to see all listings in Manage Listings

**Steps:**
1. Navigate to manage Listings Page
2. Close the filter pop up
3. Click on show all listing button to verify its functionality

**Expected Result:**
- All the available listings should be visible

##

#### Case 2: Add Tag to Listing
**Scenario:** Should allow a user to add a tag to a listing

**Steps:**
1. Navigate to manage Listings Page
2. Close the filter pop up
3. Click on show all listing button to verify its functionality
4. Search a listing in search bar
5. Add a tag to it with desired name

**Expected Result:**
- A Tag should be added to the listing with given name

##

#### Case 3: Delete Tag from Listing
**Scenario:** Should allow a user to delete a tag from listing

**Steps:**
1. Navigate to manage Listings Page
2. Close the filter pop up
3. Click on show all listing button to verify its functionality
4. Search a listing in search bar
5. Delete the tag

**Expected Result:**
- A Tag should be deleted from the desired listing

##

### Negative Cases

#### Case 1: Prevent Duplicate Group/Subgroup
**Scenario:** Should not allow a user to add same group name and sub-group name

**Steps:**
1. Navigate to manage Listings Page
2. Close the filter pop up
3. Click on show all listing button to verify its functionality
4. Search a listing in search bar
5. Click on the more options (3 vertical dots)
6. On the options available at the bottom of screen select the assign group/subgroup button
7. In the group/subgroup tab assign the same group and sub group

**Expected Result:**
- Error toast message should be visible and user will not be able to add same group and sub-group

##

#### Case 2: Hide Listing Restriction
**Scenario:** Hide listing when sync is on

**Steps:**
1. Navigate to manage Listings Page
2. Close the filter pop up
3. Click on show all listing button to verify its functionality
4. Search a listing in search bar
5. Click on the more options (3 vertical dots)
6. On the options available at the bottom of screen select the hide listing button

**Expected Result:**
- Error toast message should be visible and user will not be able to hide the listing if sync is on

##

### End-to-end Cases

#### Case 1: Create and Add Customization Group
**Scenario:** Should allow a user to create a new customization group and add to the listing

**Steps:**
1. Navigate to Customizations tab
2. Go to group and create a new group
3. Navigate to manage Listings Page
4. Close the filter pop up
5. Click on show all listing button to verify its functionality
6. Add the created group to the listing

**Expected Result:**
- User should be able to add the group to the listing

##

#### Case 2: Edit Group Name
**Scenario:** Should allow a user to edit the group name and the edited value should reflect in listings page

**Steps:**
1. Navigate to Customizations tab
2. Go to group and edit the created group
3. Navigate to manage Listings Page
4. Close the filter pop up
5. Click on show all listing button to verify its functionality
6. Search a listing in search bar
7. Verify if the edited group name is visible

**Expected Result:**
- Edited group name should be visible

##

## Multi Calendar DSO

### Functional Cases

#### Case 1: Apply Date-Specific Override (DSO)
**Scenario:** Should allow a user to apply a Date-Specific Override (DSO)

**Steps:**
1. Navigate to Multi-calendar page
2. Search for the desired listing
3. Click on the more options (3 vertical dots)
4. Click on add override button
5. Enter desired values
6. Click on Add button

**Expected Result:**
- User should see a success toaster and DSO should be added

##

#### Case 2: Modify Existing DSO
**Scenario:** Should allow a user to modify an existing DSO

**Steps:**
1. Navigate to Multi-calendar page
2. Search for the desired listing
3. Click on override button on calendar
4. Enter desired values
5. Click on update

**Expected Result:**
- DSO values should get updated

##

#### Case 3: Remove Existing DSO
**Scenario:** Should allow a user to remove an existing DSO

**Steps:**
1. Navigate to Multi-calendar page
2. Search for the desired listing
3. Click on override button on calendar
4. Click on delete button

**Expected Result:**
- DSO should be deleted

##

### Negative Cases

#### Case 1: Prevent Negative Values in DSO
**Scenario:** Should not allow a user to apply a Date-Specific Override (DSO) with negative values

**Steps:**
1. Navigate to Multi-calendar page
2. Search for the desired listing
3. Click on the more options (3 vertical dots)
4. Click on add override button
5. Enter desired -ve values

**Expected Result:**
- After entering the values, the values should disappear and user should get an error toast message

##

#### Case 2: Disable Sync Toggle
**Scenario:** Should not allow a user to sync when sync toggle is disabled

**Steps:**
1. Navigate to Multi-calendar page
2. Search for the desired listing
3. Disable the sync toggle
4. Click on sync

**Expected Result:**
- User should not be able to sync the values

##

### End-to-end Cases

#### Case 1: Apply and Sync DSO
**Scenario:** Should allow a user to apply a Date-Specific Override (DSO)

**Steps:**
1. Navigate to Multi-calendar page
2. Search for the desired listing
3. Click on the more options (3 vertical dots)
4. Click on add override button
5. Enter desired values
6. Click on Add button
7. Click on sync button

**Expected Result:**
- User should see a success toaster and DSO should be added

##

#### Case 2: Map Listings
**Scenario:** Should allow a user to apply a Date-Specific Override (DSO)

**Steps:**
1. Navigate to Multi-calendar page
2. Click on map button present on toolbar below navigation bar
3. Select parent and child listings
4. Click on map button

**Expected Result:**
1. Navigate to manage listing
2. Click on mapped listing button
3. User should be able to verify the mapping on this page

##

## API Testing

### 1. User Authentication
**Description:** Verify user authentication and token generation

**Pre-conditions:**
- Application identifier: 'jioeUUYx3h8p'
- Subscriber ID: '123641'

**Test Steps:**
1. Send POST request to login endpoint
2. Verify response status code
3. Validate token in response
4. Validate user profile data
5. Verify cookies are set correctly

**Expected Results:**
- Status code should be 201 (Created)
- Response should contain valid token
- Profile data should match:
  - ID: '6607b4366df43c247adccef5'
  - First Name: 'QA'
  - Last Name: 'Hiring'
- Cookies should be present and valid

##

### 2. Organization Details Retrieval
**Description:** Verify organization details can be fetched successfully

**Pre-conditions:**
- Valid authentication token
- Required headers set

**Test Steps:**
1. Send GET request to organization endpoint with auth token
2. Verify response status code
3. Validate organization data structure
4. Verify branding information

**Expected Results:**
- Status code should be 200 (OK)
- Organization data should match:
  - ID: '66032532f43359bff28c011f'
  - Name: 'PriceLabs'
- Branding details should include:
  - Color: '#f47373'
  - Logo URL: Present and valid
  - Font Family: 'inherit'

##

### 3. Unseen Notifications Check
**Description:** Verify unseen notifications count

**Pre-conditions:**
- Valid authentication token
- Required headers set

**Test Steps:**
1. Send GET request to unseen notifications endpoint
2. Verify response status code
3. Validate count data

**Expected Results:**
- Status code should be 200 (OK)
- Response should contain count property
- Count should be 0

##

### 4. Unread Notifications Check
**Description:** Verify unread notifications count

**Pre-conditions:**
- Valid authentication token
- Required headers set

**Test Steps:**
1. Send GET request to unread notifications endpoint
2. Verify response status code
3. Validate count data

**Expected Results:**
- Status code should be 200 (OK)
- Response should contain count property
- Count should be 1

##

## Notes
- All tests require valid authentication token obtained through login
- Headers should include:
  - Authorization: Bearer token
  - Accept: application/json
- Push price status test is currently skipped (marked with it.skip)
- All responses should be in JSON format
- Error handling and negative test cases should be added in future iterations


I've converted the document to a comprehensive Markdown format, preserving all the original information and maintaining a clear, structured hierarchy of test cases and scenarios.