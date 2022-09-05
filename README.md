[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=8181109&assignment_repo_type=AssignmentRepo)
# React Solo Project
Plan events with people in different timezones. 
website: 
https://timezone-planner.web.app/

## Requirements


## Getting Started

We are using "yarn" instead of "npm" in this project.

1. Install yarn. `npm install -g yarn`
2. Install all node modules. `yarn install`
3. Boot up the server. `yarn start`

### Hosting (Necessary for sprint 1)

1. Go to the official Firebase website and set up a project.
2. Enable Firebase Hosting by going into the hosting section under Build dropdown.
3. Inside your repo run the following commands (one at a time):
4. `npm install -g firebase-tools`
5. `firebase login`
6. `firebase init`
7. `yarn build` (*remember to always build before deploying your code to production*).
8. `firebase deploy`
9. If you run into trouble take a look at: https://www.geeksforgeeks.org/how-to-deploy-react-project-on-firebase/

### Firebase (if you need authentication or a database in your project)

1. If you don't need authentication or a db, you can ignore the 'login', 'firebase' and 'authSlice' files and skip this section.
2. Go to the official Firebase website and set up a project.
3. Enable Firebase Firestore if you need a database or Firestore Authentication if you need user authentication.
4. If you need user authentication, make sure to enable google authentication in the settings.
5. If you used `yarn` to install all dependencies, you shouldn't need to install anything else.
6. Change the name of the '.env.local.example' file to '.env.local' and write your api key and other information (can be found in the settings of your project on the firebase website).
7. The 'Login' component is commented out in 'App.js'. If you don't need it, delete it. If you do need it, move it to the page where you need it.
8. You can import the 'Login' component on the page you want the user to log in. At the moment the logic is set up to support authorization with Google. If you want to add others (email, username and password, github) You will have to implement this on your own.
9. Clicking on the "Continue with Google" button should open a pop-up that logs you in. If this doesn't work, check your firebase keys and if you have google authentication enabled. Once you are logged in, it will automatically update the state in the 'authSlice' reducer with your information (display name, email and access token). If you need any of these, you can get them with a useSelector hook in the component where you need them.
10. You can check if the user is signed in by checking the state of the 'authSlice'. If user is false (empty), the user isn't signed in.
11. You are free to style the buttons or the login component as you see fit. You can (probably a good idea) move the log out button somewhere else, depending on your project. as long as you import all the necessary things and don't change the function/logic, it should work.

### Folder Structure And Advice

1. You can adjust the folder structure if you have other preferances.
2. The "redux" folder contains an example reducer (counter). You can delete this.
3. You can use whichever CSS library you wish, or just plain CSS/SASS (preferably modules).
4. You may modify the boilerplate (e.g. delete dummy text in App.js, the counter, the the logo.svg, etc.)
5. V1 of this project is due in 3 weeks. Remeber to KISS (Keep It Simple, Stupid). You need to think of v1 as a conceptual boundary of constraints; anything *outside those boundaries must be saved for a future version*.

<!---
*** WHEN YOU ARE UP AND RUNNING, YOU MAY DELETE EVERYTHING ABOVE -EXCEPT- THE VERY TOP LINE. ***
-->

## Final Deliverable for v1
Meeting planner for people with different timezones. 

### Features
1. Sign in with google
2. Request location
3. Set name and timezone
4. Add availability on calendar
5. Invite other people
6. Show mutual availabities on calendar
7. Set meeting time
8. Add meeting to google calendar


## Sprint Progress

### Sprint1
[V] Deploy app to production server. I suggest Firebase.
App homepage must be publicly accessible.

[V] Whatever you chose as your technical component must be 10% complete.

-implement calendar with timeline selection.




### Sprint2

[V] Begin 1 advanced task
ex)
Hook up database,
Implement redux,
Integrate with API,

[V] Whatever you chose as your technical component must be 40% complete.
- implement redux store for each user
1. Sign in with google
2. Request location
3. Set name and timezone
4. Add availability on calendar
5. Invite other people
6. Show mutual availabities on calendar
7. Set meeting time
-write store data to firebase

### Sprint3
[V] Complete 1 advanced task

[V] Whatever you chose as your technical component must be 100% complete.


[V] Deploy app after PR merge


## Project Overview

### Public URL

[Timezone Planner](https://timezone-planner.web.app/)

### Description


### Mockups

*View `README.md` to see how to replace me with mockups.*

 ![mockup](/mockups/mockup.jpg) 