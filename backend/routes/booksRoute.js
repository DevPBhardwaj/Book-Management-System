
import express from "express";
import { Book } from '../models/bookModel.js';

const router = express.Router();

//Route for Get All Books from database 
router.get('/', async (request, response) => {

    try {

        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books,
        });

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message })
    }

});

// Route to handle POST requests to '/books'
router.post('/', async (request, response) => {
    try {
        // Checking if all required fields are provided in the request body
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: 'send all required fields: title, author, publishYear',
            });
        }

        // Creating a new book object from the request body
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        // Creating a new book document using the Book model and the newBook object
        const book = await Book.create(newBook);

        // Sending a response with the created book document
        return response.status(201).send(book);

    } catch (error) {
        console.log(error);
        // Sending a response with a status code 500 and error message if an error occurs
        response.status(500).send({ message: error.message });
    }
});


// Route for Get one book from database
router.get('/:id', async (request, response) => {

    try {

        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message })
    }

});

//Route for updating a book in database
router.put('/:id', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: "Send all require fields: title, author, publishYear",
            });
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: "Book not found" });
        }
        return response.status(200).send({ message: "Book updated successfully" });

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

//Route for deleting a book in database
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(500).send({ message: "Book not found" });
        }

        return response.status(200).send({ message: "Book deleted successfully" });

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }


});


export default router;