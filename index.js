const path = require("path"); // Load the path module for working with file and directory paths
const express = require("express"); // Import the Express framework for creating the web server
const multer = require('multer'); // Import the Multer middleware for handling file uploads

const app = express(); // Create an instance of the Express application
const PORT = 8000; // Set the port number for the server to listen on

// Configure Multer storage settings
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads'); // Specify the folder to store uploaded files
    },
    filename: function (req, file, cb) {
        // Set custom file name with timestamp and original name to avoid conflicts
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Initialize Multer with the storage configuration
const upload = multer({ storage });

// Set up EJS as the view engine for rendering HTML templates
app.set("view engine", "ejs");
app.set("views", path.resolve("./views")); // Specify the views directory

// Middleware to parse URL-encoded form data (e.g., from a form submission)
app.use(express.urlencoded({ extended: false }));

// Route to handle requests to the home page (GET request to '/')
app.get("/", (req, res) => {
    return res.render("homepage"); // Render the homepage view
});

// Route to handle file upload (POST request to '/upload')
app.post("/upload", upload.single('profileimage'), (req, res) => {
    // Log the request body and file metadata to the console for debugging
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/"); // Redirect the user back to the homepage after uploading
});

// Export the app for use in other modules (e.g., for testing)
module.exports = app;

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server listening at ${PORT}`));
