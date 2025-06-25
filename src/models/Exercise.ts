import { Schema, Types } from 'mongoose'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { fitLogdbConnect } from '../shared'
import { collectionsData } from '@/utils/config'

const exerciseTypes = ['strength', 'cardio', 'mobility'] as const

export const ExerciseSchema = z.object({
  id: z.string().uuid(),
  workoutId: z.string().refine(val => Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId'
  }),
  name: z.string(),
  type: z.enum(exerciseTypes),
  category: z.string(),
  equipment: z.string(),
  reps: z.number().optional(),
  sets: z.number().optional(),
  weight: z.number().optional(),
  lastWeight: z.number().optional().nullable(),
  personalBest: z.number().optional().nullable(),
  duration: z.number().optional(),
  progressData: z.array(z.object({
    date: z.string(),
    weight: z.number(),
    reps: z.number().optional(),
    sets: z.number().optional(),
  })).optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional()
})

export type IExercise = {
  id: string
  workoutId: Types.ObjectId
  name: string
  type: (typeof exerciseTypes)[number]
  category: string,
  equipment: string,
  reps?: number
  sets?: number
  weight?: number
  lastWeight?: number,
  personalBest?: number,
  duration?: number
  progressData?: Array<{
    date: string
    weight: number
    reps?: number
    sets?: number
  }>
  created_at?: Date
  updated_at?: Date
}

const ExerciseModelSchema = new Schema<IExercise>(
  {
    id: { type: String, default: uuidv4, required: true },
    workoutId: { type: Schema.Types.ObjectId, ref: 'Workout', required: true },
    name: { type: String, required: true },
    type: { type: String, enum: exerciseTypes, required: true },
    category: { type: String, required: true },
    equipment: { type: String, required: true },
    reps: { type: Number },
    sets: { type: Number },
    weight: { type: Number },
    lastWeight: { type: Number, default: null },
    personalBest: { type: Number, default: null },
    duration: { type: Number, default: null },
    progressData: [{
      date: { type: String, required: true },
      weight: { type: Number, required: true },
      reps: { type: Number },
      sets: { type: Number }
    }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'exercises'
  }
)

export const ExerciseModel = fitLogdbConnect.model<IExercise>(collectionsData.Exercises.name, ExerciseModelSchema)
