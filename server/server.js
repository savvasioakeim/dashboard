require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');
const connectDB = require('./config/db');
const sessionConfig = require('./config/sessionConfig');
const userRoutes = require('./routes/userRoutes');


const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:3000", "http://localhost:5173"],
    credentials: true,
}));

app.use(sessionConfig);

app.use('/api', routes);
app.use('/api/users', userRoutes);


app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));


app.use(express.static(path.resolve(__dirname, '../client/dist')));


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
