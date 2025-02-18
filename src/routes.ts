import { Router } from 'express';
import { endpoint } from './middlewares/endpoint';
import { isAuthenticated } from './middlewares';
import { AuthUserController } from './useCases/Authentication/login/controller';
import { GetOneProfileController } from './useCases/users/getOneUserProfile/controller';
import { CreateUserController } from './useCases/Authentication/register/controller';
import { CheckSubsController } from './useCases/subscriptions/statusSubscription/controller';
import { SubsCreateController } from './useCases/subscriptions/createSubscription/controller';
import { createExerciseController } from './useCases/exercises/createExercise/controller';
import { getOneExerciseController, GetOneExerciseController } from './useCases/exercises/getOneExercise/controller';
import { removeExerciseController, RemoveExerciseController } from './useCases/exercises/removeExercise/controller';
import { updateExerciseController, UpdateExerciseController } from './useCases/exercises/updateExercise/controller';
import { createWorkoutController } from './useCases/workouts/createWorkout/controller';
import { getOneWorkoutController } from './useCases/workouts/getOneWorkout/controller';
import { removeWorkoutController } from './useCases/workouts/removeWorkout/controller';
import { updateWorkoutController } from './useCases/workouts/updateWorkout/controller';
import { updateUserController } from './useCases/users/updateUser/controller';
import { removeUserController } from './useCases/users/removeUser/controller';

const router = Router();

const authUserController = new AuthUserController();
const createUserController = new CreateUserController();
const checkSubsController = new CheckSubsController();
const subsCreateController = new SubsCreateController();
const getOneProfileController = new GetOneProfileController();

// ---- ROTAS USER ---- //

/**
 * Represents a RegisterPostRequestBody object
 * @typedef {object} RegisterPostRequestBody
 * @property {string} name - User name
 * @property {string} email - User Email
 * @property {string} password - User Password
 * @property {string} phone - User Phone
 */

/**
 * POST /register
 * @tags Authentication
 * @param {RegisterPostRequestBody} request.body.required
 * @return {AcessTokenResponse} 201 - success response
 * @return {Error} 500 - error response
 * @return {Error} 400 - User Already Exists
 */

/**
 * Represents a AcessTokenResponse object
 * @typedef {object} AcessTokenResponse
 * @property {string} token - Access Token
 */
router.post('/register', endpoint(createUserController.handle.bind(createUserController)));

/**
 * Represents a LoginPostRequestBody object
 * @typedef {object} LoginPostRequestBody
 * @property {string} email - User Email
 * @property {string} password - User Password
 */

/**
 * POST /login
 * @tags Authentication
 * @param {LoginPostRequestBody} request.body.required
 * @return {AcessTokenResponse} 201 - success response
 * @return {Error} 500 - error response
 * @return {Error} 401 - Invalid Credentials
 */

router.post('/login', endpoint(authUserController.handle.bind(authUserController)));

/**
 * Represents a ProfileGetRequestBody object
 * @typedef {object} ProfileGetRequestBody
 * @property {string} email - User Email
 * @property {string} phone - User Phone
 */

/**
 * GET /profile
 * @tags Profile
 * @security Bearer
 * @param {ProfileGetRequestBody} request.body.required
 * @return {ProfileResponse} 201 - success response
 * @return {Error} 500 - error response
 * @return {Error} 401 - Unauthorized
 */

/**
 * Represents a ProfileResponse object
 * @typedef {object} ProfileResponse
 * @property {User} user - User Object
 */

/**
 * Represents a User object
 * @typedef {object} User
 * @property {string} email - User Email
 * @property {string} phone - User Phone
 * @property {string} name - User name
 * @property {string} password - User Password
 */

router.get('/me', isAuthenticated, endpoint(getOneProfileController.handle.bind(getOneProfileController)));

router.put('/me', isAuthenticated, endpoint(updateUserController.handle.bind(updateUserController)));

router.delete('/me', isAuthenticated, endpoint(removeUserController.handle.bind(removeUserController)));

// ---- ROTAS SUBSCRIPTION ---- //

/**
 * Represents a SubsCreatePostRequestBody object
 * @typedef {object} SubsCreatePostRequestBody
 * @property {string} user_id - User Id
 */

/**
 * POST /Subscription Create
 * @tags Subscription
 * @security Bearer
 * @param {SubsCreatePostRequestBody} request.body.required
 * @return {AcessTokenResponse} 201 - success response
 * @return {Error} 500 - error response
 * @return {Error} 401 - Invalid Credentials
 */

router.post('/subcription/create', isAuthenticated , endpoint(subsCreateController.handle.bind(subsCreateController)));

/**
 * Represents a SubsStatusGetRequestBody object
 * @typedef {object} SubsStatusGetRequestBody
 * @property {string} user_id - User Id
 */

/**
 * GET /Subscription Status
 * @tags Subscription
 * @security Bearer
 * @param {SubsStatusGetRequestBody} request.body.required
 * @return {AcessTokenResponse} 201 - success response
 * @return {Error} 500 - error response
 * @return {Error} 401 - Invalid Credentials
 */

router.post('/subcription/status', isAuthenticated , endpoint(checkSubsController.handle.bind(checkSubsController)));

// ---- ROTAS EXERCISES ---- //

router.post('/exercises', isAuthenticated, endpoint(createExerciseController.handle.bind(createExerciseController)));

router.get('/exercises/:id', isAuthenticated, endpoint(getOneExerciseController.handle.bind(GetOneExerciseController)));

router.delete('/exercises/:id', isAuthenticated, endpoint(removeExerciseController.handle.bind(RemoveExerciseController)));

router.put('/exercises/:id', isAuthenticated, endpoint(updateExerciseController.handle.bind(UpdateExerciseController)));

// ---- ROTAS WORKOUT ---- //

router.post('/workout', isAuthenticated, endpoint(createWorkoutController.handle.bind(createWorkoutController)));

router.get('/workout/:id', isAuthenticated, endpoint(getOneWorkoutController.handle.bind(getOneWorkoutController)));

router.delete('/workout/:id', isAuthenticated, endpoint(removeWorkoutController.handle.bind(removeWorkoutController)));

router.put('/workout/:id', isAuthenticated, endpoint(updateWorkoutController.handle.bind(updateWorkoutController)));


export default router;

//SWAGGER DOC
/**
 * A ordinary Error response
 * @typedef {object} Error
 * @property {Array<string>} errors.required - Error message
 */

/**
 * Represents a validation error.
 * @typedef {object} ValidationError
 * @property {Array<ValidationErrorItem>} errors.required - Array of validation error items.
 */

/**
 * Represents an item in the validation error array.
 * @typedef {object} ValidationErrorItem
 * @property {string} code.required - The error code (e.g., 'INVALID_FIELD').
 * @property {string} message.required - The error message (e.g., 'Invalid field: name').
 * @property {string} path.required - The path of the invalid field (e.g., 'name').
 */
