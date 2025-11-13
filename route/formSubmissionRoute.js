const express = require('express');

const formSubmissionRoute = express.Router();
const {
    createSubmission,
    getAllSubmissions,
    softDeleteSubmission,
    restoreSubmission,
    archiveSubmission,
    unarchiveSubmission,
    changeSubmissionStatus
} = require('../controllers/formSubmissionController');

const authMiddleware = require('../middleware/authMiddleware');
const {
    validateFormSubmission
} = require('../middleware/validationMiddleware');

formSubmissionRoute.post('/submit', validateFormSubmission, createSubmission);
formSubmissionRoute.get('/submissions', authMiddleware, getAllSubmissions);
formSubmissionRoute.patch('/soft-delete/:id',authMiddleware, softDeleteSubmission);
formSubmissionRoute.patch('/restore/:id',authMiddleware, restoreSubmission);
formSubmissionRoute.patch('/archive/:id',authMiddleware, archiveSubmission);
formSubmissionRoute.patch('/unarchive/:id',authMiddleware, unarchiveSubmission);
formSubmissionRoute.patch('/change-status/:id',authMiddleware, changeSubmissionStatus);


module.exports = formSubmissionRoute;