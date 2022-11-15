const express = require('express');
const app = express();

let persons =  [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "6666",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      },
      {
        "name": "Erkki Mäkinen",
        "number": "666-777-888",
        "id": 6
      },
      {
        "name": "Alan Turing",
        "number": "88-99-10-99",
        "id": 7
      },
      {
        "name": "Seppo Savolainen",
        "number": "33-22-11",
        "id": 8
      },
      {
        "name": "William Gates",
        "number": "444-333-222",
        "id": 9
      },
      {
        "name": "Linus Torvalds",
        "number": "777-888-999",
        "id": 10
      }
    ];


app.get('/', (req, res) => {
  res.send('<h1>Hello Phonebook!</h1>');
})

app.get('/api/persons', (req, res) => {
  res.json(persons);
})

app.get('/info', (req, res) => {
    const day = Date();
    const numberOfPersons = persons.length;
    res.send(`Phonebook has info for ${numberOfPersons} people<br/>${day}`);
  })

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})