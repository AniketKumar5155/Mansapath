const express = require('express');

const formSubmissionRoute = express.Router();
const {
    createSubmission,
    getAllSubmissions,
    softDeleteSubmission,
    restoreSubmission,
    archiveSubmission,
    unarchiveSubmission
} = require('../controllers/formSubmissionController');
const {
    validateFormSubmission
} = require('../middleware/validationMiddleware');

formSubmissionRoute.post('/submit', validateFormSubmission, createSubmission);
formSubmissionRoute.get('/submissions', getAllSubmissions);
formSubmissionRoute.patch('/soft-delete/:id', softDeleteSubmission);
formSubmissionRoute.patch('/restore/:id', restoreSubmission);


module.exports = formSubmissionRoute;