const express = require('express');

const formSubmissionRoute = express.Router();
const {
    createSubmission,
    getAllSubmissions,
    getSubmissions,
    updateFormSubmission,
    // acceptSubmission,
    getAcceptedSubmissionsController,
    getSubmissionByIdController,
    getSubmissionCounts
} = require('../controllers/formSubmissionController');

const authMiddleware = require('../middleware/authMiddleware');
const {
    validateFormSubmission,
    validateUpdateSubmission,
} = require('../middleware/validationMiddleware');
const authorize = require('../middleware/authorize');

formSubmissionRoute.post('/submit', validateFormSubmission, createSubmission);
formSubmissionRoute.get("/count", authMiddleware, authorize(["SUPERADMIN"]), getSubmissionCounts)
formSubmissionRoute.get('/all-submissions', authMiddleware, getAllSubmissions);
formSubmissionRoute.get('/submissions', authMiddleware, getSubmissions);
formSubmissionRoute.get('/submission/:id', authMiddleware, getSubmissionByIdController);
formSubmissionRoute.get("/all-accepted-submissions", authMiddleware, authorize(["SUPERADMIN"]), getAcceptedSubmissionsController);
formSubmissionRoute.patch("/update-submission/:id", authMiddleware, validateUpdateSubmission, updateFormSubmission);
// formSubmissionRoute.patch("/accept/:id", authMiddleware, acceptSubmission);

module.exports = formSubmissionRoute;