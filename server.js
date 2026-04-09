import app from './src/app.js';

const PORT = 5000;

app.listen(PORT, () => {
    console.log("Coffee machine is unstable on port " + PORT + " ☕");
})