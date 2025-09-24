User Management Dashboard (React + Vite)
A simple, fast user management dashboard with filtering, searching, sorting, and pagination. Data is demo-fetched from https://jsonplaceholder.typicode.com/users.

Features
Add, edit, and delete users (delete uses a confirm dialog)
Filter by first name, last name, email, and company
Search across name, email, and company
Sort by ID, first name, last name, email, or company
Pagination with configurable rows per page
Loading states and basic error handling

Tech Stack
React + Vite
Axios for HTTP
React Context for state sharing
Utility CSS classes (Tailwind-style)
React Icons

Structure

src/
AddEditUser.jsx # Add/Edit modal
App.jsx # Main container: filters, search, sort, pagination
Filters.jsx # Filter inputs + Apply/Clear
Pagination.jsx # Pagination controls
Loader.jsx # Spinner
hooks/useUser.js # Access user context
UserContext.js # Context definition
UserProvider.jsx # Fetches users, provides state
main.jsx # App bootstrap
index.css # Global styles (and Tailwind setup if used)
