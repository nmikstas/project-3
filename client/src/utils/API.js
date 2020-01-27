import axios from "axios";

export default
{
    /******************************************* Users *******************************************/

    //Create a user
    createUser: userData =>
    {
        return axios.post("/api/users/signup/", userData);
    },

    //Login a user.
    loginUser: userData =>
    {
        return axios.post("/api/users/login/", userData);
    },

    //Verify a user is logged in.
    verify: () =>
    {
        return axios.post("/api/users/verify/", null);
    },

    //Get a user with their expanded forum data.
    getUser: username =>
    {
        return axios.get("/api/users/getuser/" + username);
    },

    //Log the user out.
    logout: () =>
    {
        return axios.get("/api/users/logout/");
    },

    //Change the user's password.
    password: password =>
    {
        return axios.post("/api/users/password", password);
    },

    //Save a User's game input.
    input: input =>
    {
        return axios.post("/api/users/input", input);
    },

    //Get all users.
    allusers: () =>
    {
        return axios.get("/api/users/allusers");
    },

    //Set target multiplayer forum.
    setForum: (forumData) =>
    {
        return axios.post("/api/users/setforum", forumData);
    },

    /******************************************* Games *******************************************/

    //Create a new game.
    createGame: (game) =>
    {
        return axios.post("/api/games/create", game);
    },

    //Update player scores.
    update: (player) =>
    {
        return axios.put("/api/games/update", player);
    },

    //Get top 100 single player scores.
    single100: () =>
    {
        return axios.get("/api/games/single100");
    },

    //Get a user's single player game scores.
    singleUser: (user) =>
    {
        return axios.get("/api/games/singleuser/" + user);
    },

    //Get top 100 multiplayer scores.
    multi100: () =>
    {
        return axios.get("/api/games/multi100");
    },

    //Get a user's multiplayer player game scores.
    multiUser: (user) =>
    {
        return axios.get("/api/games/multiuser/" + user);
    },

    /****************************************** Forums *******************************************/
    
    createForum: (forum) =>
    {
        return axios.post("/api/forums/create", forum);
    }
};


