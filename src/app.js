import express from 'express';

const app = express()

// Middleware to parse JSON bodies
app.use(express.json());

// Example user data (ideally you would store this in a database)
const users = [
    {id:1, email:'user@gmail.com', password:'12345' },
    {id:2, email:'user1@gmail.com', password:'54321' }
];

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find the user with the provided email
    const user = users.find(user => user.email === email);

    // If user not found or password doesn't match, respond with error
    if (!user || user.password !== password){
        return res.status(401).json({error: 'Invalid email or password'});
    }
    // If credentials are correct, respond with success
    res.json({message: 'login succesful', user});
});

export default app;