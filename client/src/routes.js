/** 

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

//  React layouts
import Dashboard from "layouts/dashboard";
import MainDashboard from "layouts/MainDashboard";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import HomePage from "layouts/HomePage/homepage";
import ProjectView from "layouts/ProjectView";
import Task from "layouts/Project/taskIndex";
import Bug from "layouts/Project/bugIndex";
import TaskView from "layouts/Project/taskView";
import MemberTable from "layouts/Project/memberTable";
import SettingOverview from "layouts/Project/setting";
import ProjectCreateForm from "layouts/Project/projectCreateForm";
import TaskForm from "layouts/Project/components/taskForm";
import TaskCreateForm from "layouts/Project/taskCreateForm";
import Files from "layouts/Project/file";
import Invites from "layouts/invites";

const routes = [
  {
    type: "collapse",
    name: "HomePage",
    key: "homepage",
    icon: <Icon fontSize="small">HomePage</Icon>,
    isAuth: false,
    isProject: false,
    route: "/",
    component: <HomePage />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    isAuth: true,
    isProject: false,
    isProject: false,
    route: "/dashboard",
    component: <MainDashboard />,
  },

  {
    type: "collapse",
    name: "Files",
    key: "files",
    icon: <Icon fontSize="small">dashboard</Icon>,
    isAuth: true,
    isProject: false,
    isProject: false,
    route: "/files",
    component: <Files type={"Private"} />,
  },
  {
    type: "collapse",
    name: "Invites",
    key: "invites",
    icon: <Icon fontSize="small">dashboard</Icon>,
    isAuth: true,
    isProject: false,
    isProject: false,
    route: "/invites",
    component: <Invites />,
  },
  {
    type: "collapse",
    name: "Own Project",
    key: "project",
    icon: <Icon fontSize="small">dashboard</Icon>,
    isAuth: true,
    isProject: false,
    route: "/project",
    component: <ProjectView />,
  },
  {
    type: "collapse",
    name: "Browse Projects",
    key: "public/project",
    icon: <Icon fontSize="small">dashboard</Icon>,
    isAuth: true,
    isProject: false,
    isProject: false,
    route: "/public/project",
    component: <ProjectView type={"Public"} />,
  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   isAuth: true,
  //   isProject: false,
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   isAuth: true,
  //   isProject: false,
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   isAuth: true,
  //   isProject: false,
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   isAuth: true,
  //   isProject: false,
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    isAuth: true,
    isProject: false,
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Log In",
    key: "login",
    isAuth: false,
    isProject: false,
    icon: <Icon fontSize="small">login</Icon>,
    route: "/login",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Register",
    key: "register",
    isAuth: false,
    isProject: false,
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/register",
    component: <SignUp />,
  },
  {
    type: "divider",
    title: "projectDivider",
    key: "projectDivider",
    isAuth: true,
    isProject: true,
  },
  {
    type: "title",
    title: "Project",
    key: "projectTitle",
    isAuth: true,
    isProject: true,
  },
  {
    name: "Task",
    key: "project/create",
    icon: <Icon fontSize="small">dashboard</Icon>,
    isAuth: true,
    isProject: true,
    route: `/project/create`,
    component: <ProjectCreateForm />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "project/:projectName",
    icon: <Icon fontSize="small">dashboard</Icon>,
    isAuth: true,
    isProject: true,
    route: `/project/:projectName`,
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Task",
    key: "project/:projectName/tasks",
    icon: <Icon fontSize="small">dashboard</Icon>,
    isAuth: true,
    isProject: true,
    route: `/project/:projectName/tasks`,
    component: <Task />,
  },
  {
    name: "Task",
    key: "project/:projectName/tasks/create",
    icon: <Icon fontSize="small">dashboard</Icon>,
    isAuth: true,
    isProject: true,
    route: `/project/:projectName/tasks/create`,
    component: <TaskCreateForm />,
  },
  {
    name: "Task",
    key: "project/:projectName/tasks/:taskId",
    icon: <Icon fontSize="small">dashboard</Icon>,
    isAuth: true,
    isProject: true,
    route: `/project/:projectName/tasks/:taskId`,
    component: <TaskView />,
  },
  {
    type: "collapse",
    name: "Bug",
    key: "project/:projectName/bugs",
    icon: <Icon fontSize="small">dashboard</Icon>,
    isAuth: true,
    isProject: true,
    route: `/project/:projectName/bugs`,
    component: <Bug />,
  },
  {
    name: "Bug",
    key: "project/:projectName/bugs/create",
    icon: <Icon fontSize="small">dashboard</Icon>,
    isAuth: true,
    isProject: true,
    route: `/project/:projectName/bugs/create`,
    component: <TaskCreateForm />,
  },
  {
    name: "Bug",
    key: "project/:projectName/bugs/:taskId",
    icon: <Icon fontSize="small">dashboard</Icon>,
    isAuth: true,
    isProject: true,
    route: `/project/:projectName/bugs/:taskId`,
    component: <TaskView />,
  },
  {
    type: "collapse",
    name: "Files",
    key: "project/:projectName/files",
    icon: <Icon fontSize="small">dashboard</Icon>,
    isAuth: true,
    isProject: true,
    route: `/project/:projectName/files`,
    component: <Files />,
  },
  {
    type: "collapse",
    name: "Members",
    key: "project/:projectName/member",
    isAuth: true,
    isProject: true,
    icon: <Icon fontSize="small">table_view</Icon>,
    route: `/project/:projectName/member`,
    component: <MemberTable />,
  },
  {
    type: "collapse",
    name: "Setting",
    key: "project/:projectName/setting",
    isAuth: true,
    isProject: true,
    icon: <Icon fontSize="small">table_view</Icon>,
    route: `/project/:projectName/setting`,
    component: <SettingOverview />,
  },
];

export default routes;
