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

    /******************************************* Games *******************************************/

    //Create a new game.
    createGame: (game) =>
    {
        return axios.post("/api/games/create", game);
    },

    //Update player 1 scores.
    update1: (player1) =>
    {
        return axios.put("/api/games/update1", player1);
    },

    //Update player 2 scores.
    update2: (player2) =>
    {
        return axios.put("/api/games/update2", player2);
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
    }
};
