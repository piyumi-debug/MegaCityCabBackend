const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController'); // Import controller
const multer = require('multer'); // For handling file uploads

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save uploaded files to the "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Rename file to avoid conflicts
    },
});

const upload = multer({ storage });

// POST /vehicles - Add a new vehicle
router.post('/vehicles', upload.single('image'), vehicleController.addVehicle);

// GET /vehicles - Fetch all vehicles
router.get('/vehicles', vehicleController.fetchVehicles);

// GET /vehicles?category={category} - Fetch vehicles by category
router.get('/vehicles', vehicleController.fetchVehiclesByCategory);

// DELETE /vehicles/:id - Delete a vehicle by ID
router.delete('/vehicles/:id', vehicleController.deleteVehicle);

module.exports = router;