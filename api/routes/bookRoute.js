import express, { Router } from "express"

import {Book} from '../models/bookModel.js'

const router = express.Router();

router.post('/', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear) {
      return response.send.status(400).send({
        message: "Send all the required fields: title,author,publishYear"
      })
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear
    };

    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log('Error in creating book', error);
    response.status(500).send({ message: error.message })
  }
})


router.get('/', async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).send({
      count: books.length,
      data: books
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message })
  }
})

//Route to get one book from database by id
router.get('/:id', async (request, response) => {
  try {

    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).send({
      book
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message })
  }
})

router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).json({ message: 'Invalid data' });
    }

    const { id } = request.params;

    const results = await Book.findByIdAndUpdate(id, request.body)

    if (!results) {
      return response.status(404).json({ message: 'No Book Found' });
    }

    return response.status(200).send({message:"Book Updated successfully"});
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message })
  }
})


router.delete('/:id',async(request,response)=>{
  try{

    const {id} = request.params;
    const results = await Book.findByIdAndDelete(id);

    if(!results){ 
      return response.status(404).json({ message: 'No Book Found' });
    }

    return response.status(200).json({ message: 'Book Deleted Successfully' });

  }catch(error){
    console.log(error);
    response.status(500).send({ message: error.message })
  }
})

export default router;