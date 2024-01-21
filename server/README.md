<div align="center">
  
  ![GitHub repo size](https://img.shields.io/github/repo-size/abhishekprajapati29/assign-project)
  ![GitHub stars](https://img.shields.io/github/stars/abhishekprajapati29/assign-project?style=social)
  ![GitHub forks](https://img.shields.io/github/forks/abhishekprajapati29/assign-project?style=social)
  [![Maintenance](https://img.shields.io/badge/maintained-yes-green.svg)](https://github.com/abhishekprajapati29/assign-project/commits/main)
  [![Website shields.io](https://img.shields.io/badge/website-up-yellow)](https://assign-project.onrender.com/)
  [![Ask Me Anything !](https://img.shields.io/badge/ask%20me-linkedin-1abc9c.svg)](https://www.linkedin.com/in/abhishekprajapati29/)
  [![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

  <br />
  <br />
  
  <img src="./client/public/logo.png" />

  <h2 align="center">Assign Project - Project Management Application</h2>

Welcome to our innovative Project Management Application! This powerful tool is designed to revolutionize the way you manage projects, tasks, and team collaboration. Seamlessly combining efficiency and user-friendly design, our application brings together essential project management features to enhance your workflow.

<a href="https://assign-project.onrender.com/"><strong>➥ Project Live</strong></a>

</div>

<br />

## 🔥 Website Preview
<img src="./../client/public/assign-project.gif" width="900">

## 📋 Key Features
⚡️ **Dashboard**: Get a comprehensive overview of your projects, tasks, and deadlines in one centralized dashboard.\
⚡️ **Task Tracking**: Effortlessly monitor the progress of individual tasks and ensure every team member stays on track.\
⚡️ **Bug Reporting**: Quickly identify and report bugs, facilitating swift resolution and maintaining project integrity.\
⚡️ **File Storage**: Organize and access project-related files with ease, ensuring documents are readily available when needed.\
⚡️ **Activity Tracking**: Visualize project progress through a dynamic activity tracking system, turning progress into a visual masterpiece.

## 💡 MERN Tech Stack
- [MongoDB](https://www.mongodb.com/): A NoSQL database that provides high performance, high availability, and easy scalability.
- [Express.js](https://expressjs.com/): A fast, unopinionated, minimalist web framework for Node.js, providing a robust set of features.
- [React](https://reactjs.org/): A JavaScript library for building user interfaces, enabling the creation of dynamic and interactive web applications.
- [Node.js](https://nodejs.org/): A JavaScript runtime built on Chrome's V8 JavaScript engine, facilitating server-side development.
- And more...

## 🌐 NPM Package
| Name          | Version   | Description                                               |
| ------------- | --------- | --------------------------------------------------------- |
| Express       | ^4.18.2   | A fast, unopinionated, minimalist web framework for Node.js. |
| Mongoose      | ^8.0.0    | An elegant MongoDB object modeling tool designed for Node.js. |
| Bcrypt        | ^5.1.1    | A library for securely hashing passwords.                 |
| Cors          | ^2.8.5    | Middleware for handling Cross-Origin Resource Sharing.    |
| Jsonwebtoken  | ^9.0.2    | JSON Web Token (JWT) implementation for authentication.   |
| Dotenv        | ^16.3.1   | Loads environment variables from a .env file into process.env. |
| Multer        | ^1.4.5-lts.1 | Middleware for handling multipart/form-data, primarily used for file uploads. |
| Body-Parser   | ^1.20.2   | Node.js body parsing middleware.                           |
| Nodemon       | ^3.0.1    | A tool that helps develop Node.js applications by automatically restarting the node application when file changes are detected. |
| Node-Schedule | ^2.1.1    | A cron-like and not-cron-like job scheduler for Node.js.   |

## 🍼 How It Works

1. **Dashboard Insights:**
   - Instantly view project summaries, pending tasks, and upcoming deadlines for effective project oversight.

2. **Task Management:**
   - Create, assign, and monitor tasks, promoting transparency and accountability within your team.

3. **Bug Reporting Made Simple:**
   - Streamline the bug reporting process, ensuring quick identification and resolution.

4. **Efficient File Storage:**
   - Easily upload and organize project files, ensuring everyone has access to the latest documents.

5. **Visualize Progress:**
   - Track project activities visually, turning progress into an engaging and insightful experience.

## 🧊 Why Choose Our Project Management Application?

- **User-Friendly Interface:**
  - Navigate through the application effortlessly, making project management a breeze for everyone.

- **Efficiency Boost:**
  - Increase productivity and reduce development time with our carefully crafted features.

- **Reliability:**
  - Rely on our robust backend and frontend technologies, including NodeJS, Apollo GraphQL, and ReactJS.

- **Enhanced User Experience:**
  - Our focus on bug reduction and system optimization leads to a 40% increase in user retention and satisfaction.

## 🔬 Get Started

Ready to take your project management to the next level? Sign up today and experience the difference our Project Management Application can make in streamlining your workflow.

[Sign Up Now](https://assign-project.onrender.com/register)


## 🛠️ Prerequisites
Before you begin, ensure you have met the following requirements:

- [Git](https://git-scm.com/downloads "Download Git") must be installed on your operating system.
- npm (comes with Node.js) or yarn (Recommended: [Yarn](https://yarnpkg.com/))

## ⭐ Environment Variables
To run the project locally, you need to set up the following environment variables. Create a `.env` file in the root of your project and add the following:

```env
MONGO_ATLAS_PW = <mongodb password>
JWT_KEY = <jwt scret>
host = http://localhost:3001/
```


## 📦 Installation
1. **Clone the repository:**

   ```bash
   git clone https://github.com/abhishekprajapati29/assign-project.git
   ```
   
2. **Navigate to the project directory:**

   ```bash
   cd assign-project/server
   ```
   
3. **Install dependencies:**

   ```bash
   npm install   # or yarn install
   ```
   
4. **Start the development server:**

   ```bash
   npm start     # or yarn start
   ```
   
5. **Backend:**
   Follow similar steps
    
6. **Deployment:**
   To deploy your website, first you need to create github repository with name `<your-github-username>.github.io` and push the generated code to the `master` branch.


## 🪒 Project Structure

- **api**: Contains the backend logic of the application.
  - **controllers**: Handles the application's business logic.
    - **Project**: Specific controllers related to the "Project" entity.
  - **middleware**: Houses middleware functions used in the application.
  - **models**: Defines data models representing entities in the application.
  - **routes**: Defines routes and API endpoints.

- **defaultImage**: Stores default images used in the application.

- **modules**: Houses modular components or features of the application.

- **uploads**: Stores user uploads.
  - **project**: Uploaded files related to projects.
  - **storage**: General storage for uploaded files.
  - **userprofile**: User profile pictures or related uploads.

Feel free to adjust the project structure based on specific requirements.


## 🚶 Contributing

Feel free to contribute to this project! Whether it's reporting bugs, suggesting enhancements, or adding new features, your contributions are welcome. Please follow the [contribution guidelines](CONTRIBUTING.md).

### 📝 License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for visiting my portfolio! If you have any questions or suggestions, feel free to reach out.
