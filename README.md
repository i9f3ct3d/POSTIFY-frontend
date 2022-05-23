# POSTIFY-frontend

Positfy is a social media app created using MERN stack. This particular repository is representing the frontend part of Postify that is mainly based on ReactJS.  

# Links
[Live link](https://postify-sushanta.vercel.app)
[Link to POSTIFY-backend](https://github.com/i9f3ct3d/POSTIFY-backend)
[Link to POSTIFY-socket](https://github.com/i9f3ct3d/POSTIFY-socket)

# Features

- Write about your day so far and let it get shared with the whole **Postify** community
- Authentication  (`OAuth 2.0`)
- Paginated post rendering
- Lazy loading for better performance
- Customize your profile to make it stand out
- Visit others profiles and ask them to be your friend
- Get notified when your post gets a star or a comment
- Delete your post in no time
- Live chatting with friends

## Setup

- Clone the repository
- Navigate to the root folder of the repository through terminal
- Run `npm i` to install all the required packages
- Run `npm start`
- The app will start automatically in your default browser (in case it doesn't then open http://localhost:3000 in your browser)

## Working

- This React project is consist of multiple pages. Login and Signup routes are there for handling authentication and storing the auth token as a cookie in your local storage.
- If authenticated then you'll get redirected to home route which is the post feed of Postify. There user will get connected to socket to share live status with other users. Users can find out the other online users and get into a live chatting session with them and if any of those users receive a message from other users then they will get notified.
- If not authenticated user will get redirected to Login page. The authentication is checked in the backend when the frontend sends the user cookie (or token) to the backend where it will get verified using `JWT` and then matched with the hash that is stored in `MongoDB`.
- While logging out the user cookie gets deleted from the local storage.
- Chats, Posts, Users data and all are saved in `MongoDB` through the backend and the process is triggered by the frontend with a request using the `REST apis`
- Deleting a post, searching a user, starring a post, commenting on a post etc. are handled by `REST apis`
