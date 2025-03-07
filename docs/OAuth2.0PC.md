# Steps to configure Azure AD SSO using SPA with Public Client

## Step 1: Register an Application in the Azure AD Portal
1. Log into the Azure Portal.
2. Navigate to **Azure Active Directory** > **App registrations** > **New registration**.
3. Enter the following details to create an application:
   - **Name**: `<Application name>`
   - **Account types**: Select single/multi-tenant account types.
   - **Redirect URI**: Select the platform as **SPA** from the dropdown.
4. Click **Register**.
   
   ![image](https://github.com/user-attachments/assets/ef3fc8a7-7dcd-44d5-bfe0-54dbb3910cba)



## Step 2: Configure Application for PKCE with SPA
1. After the application is registered, note the Application’s **Client Id** and **Directory (Tenant Id)**.
2. Click the **Redirect URIs** link to navigate to the platform configurations page.
3. Click **Add a platform** and select **Single-page-application** under the Web applications.
4. Enter the redirect URI of the application. Example:
   - `https://developer.apisec.ai/azureSPA.html`
5. Click **Configure** and save the platform configurations.
   
   ![CopyRedirectURI](https://github.com/user-attachments/assets/6ba2f08b-07ec-41db-882c-567236578caa)
   ![spa2 2configure](https://github.com/user-attachments/assets/74fb47b3-7f92-472e-b2ba-5d83497b03f3)
   ![configurespa2 3](https://github.com/user-attachments/assets/b2fd5517-f9d7-402e-a25d-b1f8504c6aa9)




## Step 3: Enter the Homepage URL
1. Click **Branding and properties** under the **Manage** section.
2. Enter the Homepage URL:
   - `https://{environment}.apisec.ai/?cid=client_id&tid=tenant_id`
   - Example: `https://developer.apisec.ai/?cid=ff81da46-e7af-4fd0-8777-000000000000&tid=00000000-708d-4303-8cdc-385dce520000`
3. Click **Save**.
   
   ![spahomepareuri3](https://github.com/user-attachments/assets/9a917c01-da8e-4ca0-b4d0-555107a387a6)


## Step 4: Generate a Client Secret (Optional for SPA)
1. Under the **Manage** section, click **Certificates & secrets**.
2. Click **New client secret**.
3. Enter description and expiry.
4. Click **Add**.
5. Copy the Client Secret value.
6. **Note**: Generating client secret code is optional for SPA  

## Step 5: Create and Assign App Roles
1. Click **App roles** under the **Manage** section.
2. Enter a display name such as “Admin”.
3. Select **Users/Groups** under Allowed member types.
4. Enter **Value** and **Description**.
5. Check the box **Do you want to enable this role?**.
6. Click **Apply**.

## Step 6: Assign Users/Groups with the Enterprise Application
1. Navigate to the **Enterprise Application** from the home page.
2. Search and select the application registered in **Step 1**.
3. Click **Assign users and groups** link on the Overview page.
4. Click **Add user/group**.
5. Select the users.
6. Select Roles & click **Assign**.

   ![Default directory enterprise app](https://github.com/user-attachments/assets/e4607a85-ea24-470a-a16e-c93e5223c867)

   ![allapplicationsspa6 2](https://github.com/user-attachments/assets/a99253eb-a72c-4140-8347-9c9933e8e135)

   ![spaoverview6 3](https://github.com/user-attachments/assets/e7fcfcee-b89c-49e0-a76d-6134a356bcca)

   ![addassignment6 4](https://github.com/user-attachments/assets/d08289e4-dab1-4eb5-a4a3-6d9feba356b6)

   ![userslist6 5](https://github.com/user-attachments/assets/b642d968-6d00-43ab-ba1b-4e379157f104)

   ![image](https://github.com/user-attachments/assets/02dbc612-38c9-4db0-80e7-d93c497110dd)


   ![spashowusers6 7](https://github.com/user-attachments/assets/9055d397-07e3-4451-8ae0-4852c27a7189)


### Step 6.2: Create & Assign Groups with the Application
1. Go to the **Home Overview** page.
2. Under **Manage**, click **Groups**.
3. Click **New group** & fill in the details:
   - Select Group type as **Security**.
   - Enter **Group name**.
   - Enter Membership type as **Assigned**.
4. In **Members** under the **Users** list, select the users & click **Select**.
5. Click **Create** to successfully add members to that specific group.

   ![spaoverviewmanage6 8](https://github.com/user-attachments/assets/f020ed8a-e872-4c68-ae14-272adff76a23)

   ![spanewgroupform6 9](https://github.com/user-attachments/assets/12a0cacc-f363-4b89-b7ee-38d95ac446f4)

   ![spanewgroupuserslist6 10](https://github.com/user-attachments/assets/128e209a-9d82-49c9-9537-7739e5a3c805)

Step 7: **Assign permissions for the group's resource**

        **To assign GroupMember.Read.All permissions**
         - Go to Application registrations page & select the registered app.
     
![appregistrations7 1new](https://github.com/user-attachments/assets/bca55601-7366-4132-9331-d53e282e1846)

         - Under manage click API Permissions.
         - Click Add a permission.
         - Under Microsoft APIs click Microsoft Graph.

![APIpermission 7 1 2](https://github.com/user-attachments/assets/b7e3e9b7-7ae9-49c6-bbd4-0fcae8482b8b)

         - Click Delegated permissions & search for GroupMember under Select permissions search field.
         - Expand GroupMember & check the GroupMember.Read.All box.
         - Click on Add permissions.

![image](https://github.com/user-attachments/assets/917d6172-84d7-467e-a4be-95c0e5d7356f)

![image](https://github.com/user-attachments/assets/1efa9fc1-1def-48a7-9d77-52eec404b63d)

   
## Step 8: Publish Application
1. Click **Properties** under the **Manage** section.
2. Click the toggle to enable **Visible to users?**.
3. Click **Apply changes**.

   ![spaprop9 1new](https://github.com/user-attachments/assets/8eb1367c-8c27-4bf9-9af8-1f000fc4d2b9)


## Step 9: Configure SSO in APIsec
1. Login to the APIsec application.
2. Click on **Configuration** from the APIsec dashboard.
3. Click on **SSO** and select SSO type as **Azure** from the dropdown.
4. Enter the secret code copied from **Step 4**.
5. Enter the **Client Id** and **Tenant Id** copied from **Step 2**.
6. Click the toggle to **Activate**.
7. Click **Save**.

   ![spa10](https://github.com/user-attachments/assets/7610705c-f409-46cf-99cc-8d8a8ff22bde)


## Step 10: Confirm Login with SSO using OAuth2.0 - SPA
1. Launch the URL `https://myapps.microsoft.com/` and select the registered application which redirects the user to the APIsec application dashboard.
2. Alternatively, the users may use the redirect link for the SP-initiated flow.

   ![APIsecdashboard11](https://github.com/user-attachments/assets/68573970-9e2e-4291-be0c-345f65b7409d)

