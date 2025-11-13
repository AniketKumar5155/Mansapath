const express = require('express');

const formSubmissionRoute = express.Router();
const {
    createSubmission,
    getAllSubmissions,
    softDeleteSubmission,
    restoreSubmission,
    archiveSubmission,
    unarchiveSubmission,
} = require('../controllers/formSubmissionController');

const authMiddleware = require('../middleware/authMiddleware');
const { validateZod } = require('../middleware/validationMiddleware');
const { formSubmissionSchema } = require('../validator/formSchema');

formSubmissionRoute.post('/submit',createSubmission);
formSubmissionRoute.get('/submissions', validateZod(formSubmissionSchema), authMiddleware, getAllSubmissions);
formSubmissionRoute.patch('/soft-delete/:id', validateZod(formSubmissionSchema), authMiddleware, softDeleteSubmission);
formSubmissionRoute.patch('/restore/:id', validateZod(formSubmissionSchema), authMiddleware, restoreSubmission);
formSubmissionRoute.patch('/archive/:id', validateZod(formSubmissionSchema), authMiddleware, archiveSubmission);
formSubmissionRoute.patch('/unarchive/:id', validateZod(formSubmissionSchema), authMiddleware, unarchiveSubmission);


module.exports = formSubmissionRoute;