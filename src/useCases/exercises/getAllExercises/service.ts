import { ExerciseModel, IExercise } from '@/models/Exercise';
import { GetAllExercisesDTO } from './validation';
import { UserModel } from '@/models/User';
import { WorkoutModel } from '@/models/Workout';

export class GetAllExercisesService {
    async execute({ userId }: GetAllExercisesDTO): Promise<IExercise[]> {
        // Verifica se o usuário existe
        const user = await UserModel.findOne({ id: userId });
        if (!user) {
            throw new Error('User not found');
        }

        // Busca todos os workouts do usuário
        const workouts = await WorkoutModel.find({ userId: user.id });
        
        // Extrai os IDs dos exercícios de todos os workouts
        const exerciseIds = workouts.reduce((ids: string[], workout) => {
            return [...ids, ...workout.exercises];
        }, []);

        // Busca todos os exercícios
        const exercises = await ExerciseModel.find({
            _id: { $in: exerciseIds }
        }).sort({ created_at: -1 }); // Ordena do mais recente para o mais antigo

        return exercises.map(exercise => exercise.toObject());
    }
}
