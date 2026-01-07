First I created an .env file. I put the API url there, so that axios.js only has a single source of truth. I also added CORS policy in program.cs since browser is blocking connection of backend and frontend. In controller, create is returning a single task so i created GetById function. UserId is also a foreign key and is required so i created a seeder to insert dummy users.

I implemented
-Insert
-Delete
-Edit
-Toggle done/not done
which only update the affected task in local state instead of refetching everything from the database

I also added filter by user since there is users table so i figured i'll just use it. Also, UserId is required so the add button is disabled if no specific user is selected. In order to fetch users I added UserController and a get function.

I also seperated all api calls in services folder for cleaner structure.

How to test changes

1. Start the frontend

   Navigate to the frontend folder

   Run:
   npm install
   npm run dev

   Make sure Node.js and npm are installed. Axios is included.

2. Start the backend

   Navigate to the backend folder

   Run migrations if needed:
   dotnet ef database update

   Run the backend:
   dotnet run

   Make sure .NET SDK is installed

3. Verify user filtering

   Select a user from the list → only that user’s tasks are displayed

   If no user is selected → all tasks are displayed

   Add Task button is disabled if no user is selected

4. Verify task CRUD operations

   Add Task: Enter a task and click Add → should appear immediately without refreshing

   Edit Task: Edit a task title → should update immediately

   Toggle Done: Click the toggle → ✅ or ❌ should change immediately

   Delete Task: Delete a task → should disappear immediately
