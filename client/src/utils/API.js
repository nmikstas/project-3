import axios from "axios";

export default
{
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
    }
};
