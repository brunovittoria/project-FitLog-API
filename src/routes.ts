import { Router } from 'express';
import { endpoint } from './middlewares/endpoint';
import { isAuthenticated } from './middlewares';

import { authUserController } from './useCases/Authentication/login/controller';
import { createUserController } from './useCases/Authentication/register/controller';

import { checkSubsController } from './useCases/subscriptions/statusSubscription/controller';
import { subsCreateController } from './useCases/subscriptions/createSubscription/controller';

import { createExerciseController } from './useCases/exercises/createExercise/controller';
import { getOneExerciseController } from './useCases/exercises/getOneExercise/controller';
import { removeExerciseController } from './useCases/exercises/removeExercise/controller';
import { updateExerciseController } from './useCases/exercises/updateExercise/controller';

import { createWorkoutController } from './useCases/workouts/createWorkout/controller';
import { getOneWorkoutController } from './useCases/workouts/getOneWorkout/controller';
import { removeWorkoutController } from './useCases/workouts/removeWorkout/controller';
import { updateWorkoutController } from './useCases/workouts/updateWorkout/controller';

import { getOneProfileController } from './useCases/users/getOneUserProfile/controller';
import { updateUserController } from './useCases/users/updateUser/controller';
import { removeUserController } from './useCases/users/removeUser/controller';
import { getAllWorkoutsController } from './useCases/workouts/getAllWorkouts/controller';

const router = Router();

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

router.post('/exercise', isAuthenticated, endpoint(createExerciseController.handle.bind(createExerciseController)));

router.get('/exercise/:id', isAuthenticated, endpoint(getOneExerciseController.handle.bind(getOneExerciseController)));

router.delete('/exercise/:id', isAuthenticated, endpoint(removeExerciseController.handle.bind(removeExerciseController)));

router.put('/exercise/:id', isAuthenticated, endpoint(updateExerciseController.handle.bind(updateExerciseController)));

// ---- ROTAS WORKOUT ---- //

router.post('/workout', isAuthenticated, endpoint(createWorkoutController.handle.bind(createWorkoutController)));

router.get('/workouts', isAuthenticated, endpoint(getAllWorkoutsController.handle.bind(getAllWorkoutsController)))

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
