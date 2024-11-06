# Task App

A responsive, real-time task management application with sorting and task management features. This project consists of two servers:

1. **Backend**: ASP.NET Core Web API with repository pattern and SQL Server database.
2. **Frontend**: Angular 18 with Angular Material UI.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Task Management**: Create, update, and delete tasks.
- **Real-time Updates**: Tasks automatically update status based on their end times.
- **Sorting**: View tasks by various criteria (e.g., completed, missed, newest, oldest).
- **Responsive UI**: Angular Material for a user-friendly experience across devices.

## Technologies Used

### Backend
- ASP.NET Core Web API
- Entity Framework Core with SQL Server
- Repository Pattern for data access

### Frontend
- Angular 18
- Angular Material for responsive design
- RxJS for real-time data updates

---

## Getting Started

### Prerequisites

- [.NET SDK 8.0.403](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 20.12.2 and npm 10.5.0](https://nodejs.org/en/download)
- SQL Server

### Setup Backend

1. Clone the repository and navigate to the backend project folder.
   ```bash
   git clone https://github.com/aminul-islam-niloy/NextTaskAPI.git
   cd NextTaskAPI
   ```
2. Restore dependencies and build the project:
   ```bash
   dotnet restore
   dotnet build
   ```
3. Configure the SQL Server connection in `appsettings.json` file.
4. Run the database migrations:
   ```bash
   dotnet ef database update
   ```
5. Run the backend server:
   ```bash
   dotnet run
   ```

### Setup Frontend

1. Navigate to the frontend project folder.
   ```bash
   cd next-task-app
   ```
2. Install Angular dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   ng serve
   ```

4. Open `http://localhost:4200` in a browser to view the app.

---

## API Endpoints

### Tasks

- **GET** `/api/tasks` - Get all tasks
- **POST** `/api/tasks` - Create a new task
- **PUT** `/api/tasks/{id}` - Update an existing task
- **DELETE** `/api/tasks/{id}` - Delete a task

## Screenshots

![Screenshot Description](./next-task-app/public/screenshots/task%20app.png)


---

## Future Enhancements

- **User Authentication**: Add authentication and authorization for task access.
- **Notifications**: Set reminders for tasks.
- **Export to CSV**: Export task data for reporting.

---

## Contributing

Contributions are welcome! Please fork the repository and create a pull request for any changes.

---

## License

This project is licensed under the MIT License.

--- 

