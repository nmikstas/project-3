import axios from "axios";

export default
{
    //Create a user
    createUser: userData =>
    {
        return axios.post("/api/users/signup/", userData);
    },

    //Gets all books.
    getBooks: () =>
    {
        return axios.get("/api/books/");
    },

    // Gets the book with the given information link
    getBook: title =>
    {
        return axios.get("/api/books/" + title);
    },

    //Deletes the book with the given id.
    deleteBook: id =>
    {
        return axios.delete("/api/books/" + id);
    },

    // Saves a book to the database.
    saveBook: bookData =>
    {
        return axios.post("/api/books/", bookData);
    },

    //Search Google books API.
    searchBooks: param =>
    {
      return axios.get("/api/search/" + param);
    }
};
