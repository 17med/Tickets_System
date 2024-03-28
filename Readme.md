## Ticket system for developers team

### Technologies
- Backend: Node.js, Express.js, MongoDB,Redis
- Frontend: React.js, shadcn, Material-UI
- CI/CD: github actions
- Hosting: Azure
- Security: Custom Token, bcrypt, helmet, cors, Synks

--------------------------------------------------------
#### update Number v0.1.12 2024/03/28
* Add the ability to promote a normal user to admin or demote an admin to a normal user.
* Ensure that the owner is protected from normal users who have the ability to promote a normal user to admin.
* Include a "Show Project" section that displays project details such as name, description, and tickets.
* Implement some animations for the user interface (UI).
----------------------------------------------------------------
#### update Number v0.1.11 2024/03/27
* Convert the UI components from Material-UI to Shadow DOM.
* Validate whether the user is accessing the application from a computer or mobile device to display the appropriate UI.
