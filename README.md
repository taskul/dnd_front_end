![image of a dragon](public/dragon_resized.png)

https://dnd-game.onrender.com/

DND Den is a live chat based Dungeons and Dragons game that has features like live chat, bilding 2d maps to share in live chat for fun setting visualization, character bulider with avatar and character sheet, and dice rolling. Chat and dice rolling are saved in the database and can be accessed by game users at any time.

# DND DEN - a live chat based dungeon and dragons game.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Packages
### `npm install` or `npm i` to install packages from package.json file
    "axios": "^1.4.0" - used for making API calls
    "dotenv": "^16.3.1" - used to accessing environment variables
    "formik": "^2.4.3" - helps to manage react forms
    "immutability-helper": "^3.1.1" - used in Map Builder for updating objects quickly
    "jwt-decode": "^3.1.2" - used for JWT token management for authentication
    "react": "^18.2.0" - react front end frame work
    "react-dnd": "^16.0.1" - drag and drop library that is used in Map Builder 
    "react-dnd-html5-backend": "^16.0.1" - drag and drop library that is used in Map Builder
    "react-dom": "^18.2.0" - react DOM manipulation
    "react-router-dom": "^6.14.2" - react router, handles all routes for static react page
    "react-scripts": "5.0.1" - this package includes scripts and configuration used by Create React App.
    "socket.io-client": "^4.5.1" - used for web socket management for live chat
    "uuid": "^9.0.0" - creates unique id that are used to create "key" for certain components in the application

# Project structure
- API directory - has api file that manages all API calls from frontend to backend.
- Context directy - has AuthContext used for all user authentication and API calls. Also has MapAssetsContext which helps to load saved maps and store map tiles information that can be shared across routes
- DragDropImgComponents directory - This is where all of the components and functionality for Map Builder are stored.
- GeneralComponenets directory - stores CSS files that are used by multiple components, and it stores some components that are reused accross application.
- Hooks directory - stores useLocalStorage and useToken hooks
- MapBuilder directory - stores the map builder menu components and CSS styles.
- Pages directory stores all user dashboard routes, menus and game chat components
  - Game directory - stores all of the game chat functionality, socket connections and chat components
  - home directory - home page components
  - User directory:
    - CampaignDashbaord - all components related to managing game campains: create campaign, add players to campaign, delete campaign
    - CharacterDashboard - all components related to managing character builder: create character, change avatar, update character stats/info, delete characer
    - DashboardSideMenu - all components related to managing user dashboard menu which has buttons for campaigns, guilds, character, maps
    - GuildsDashboard - all components related to managing game guilds: create guilds, add players to guilds, delete guilds
    - MapsDashboard - all components related to managing game maps: create maps, save maps, delete maps
- Routes directory - manages all of the application routes.



