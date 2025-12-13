const express = require('express');

const formSubmissionRoute = express.Router();
const {
    createSubmission,
    getAllSubmissions,
    getSubmissions,
    // softDeleteSubmission,
    // restoreSubmission,
    // archiveSubmission,
    // unarchiveSubmission,
    updateFormSubmission,
    acceptSubmission
} = require('../controllers/formSubmissionController');

const authMiddleware = require('../middleware/authMiddleware');
const {
    validateFormSubmission,
    validateUpdateSubmission,
} = require('../middleware/validationMiddleware');
const authorize = require('../middleware/authorize');

formSubmissionRoute.post('/submit', validateFormSubmission, createSubmission);
formSubmissionRoute.get('/all-submissions', authMiddleware, getAllSubmissions)
formSubmissionRoute.get('/submissions', authMiddleware, getSubmissions);
// formSubmissionRoute.patch('/soft-delete/:id',authMiddleware, softDeleteSubmission);
// formSubmissionRoute.patch('/restore/:id',authMiddleware, restoreSubmission);
// formSubmissionRoute.patch('/archive/:id',authMiddleware, archiveSubmission);
// formSubmissionRoute.patch('/unarchive/:id',authMiddleware, unarchiveSubmission);
formSubmissionRoute.patch("/update-submission/:id", authMiddleware, validateUpdateSubmission, updateFormSubmission);
formSubmissionRoute.patch("/accept/:id", authMiddleware, acceptSubmission);

module.exports = formSubmissionRoute;