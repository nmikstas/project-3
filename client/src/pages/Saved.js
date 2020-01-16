import React from "react";
import SavedItems from "../components/SavedItems";
import SavedItem from "../components/SavedItem";
import API from "../utils/API";

class Search extends React.Component
{
    state =
    {
        savedBooks: []
    }

    componentDidMount = () =>
    {
        API.getBooks()
        .then(res =>
        {
            this.setState({ savedBooks: res.data });
        })
        .catch(err => console.log(err));
    }

    //Go to the information website.
    clickView = (index) =>
    {
        window.location.href = this.state.savedBooks[index].link;
    }

    //Delete the chosen book.
    clickDelete = (index) =>
    {
        API.deleteBook(this.state.savedBooks[index]._id)
        .then(() => { return API.getBooks(); })
        .then(res => { this.setState({ savedBooks: res.data }); })
        .catch(err => console.log(err));
    }

    render = () =>
    {
        return (
            <div>
                <SavedItems>
                    <h4>Saved Books</h4>
                    {this.state.savedBooks.length ? 
                    (
                        this.state.savedBooks.map((book, i) => (
                            <SavedItem
                                key={i}
                                id={i}
                                delete={this.clickDelete}
                                view={this.clickView}
                                authors={book.authors}
                                description={book.description}
                                image={book.image}
                                link={book.infoLink}
                                title={book.title}
                            />
                        ))
                    ) : (
                        <h3>No Results to Display</h3>
                    )}
                </SavedItems>
            </div>
        );
    }
}

export default Search;