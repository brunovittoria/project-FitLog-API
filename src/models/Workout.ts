import { Schema, Types } from 'mongoose'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { fitLogdbConnect } from '../shared'
import { collectionsData } from '@/utils/config'

const workoutStatus = ['active', 'inactive'] as const

export const WorkoutSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().refine(val => Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId'
  }),
  name: z.string(),
  description: z.string().optional(),
  status: z.enum(workoutStatus),
  exercises: z.array(z.string()),
  created_at: z.date().optional(),
  updated_at: z.date().optional()
})

export type IWorkout = z.infer<typeof WorkoutSchema>

const WorkoutModelSchema = new Schema<IWorkout>(
  {
    id: { type: String, default: uuidv4, required: true, unique: true },
    userId: { type: String, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: String, enum: workoutStatus, required: false },
    exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise', required: true }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: collectionsData.Workouts.collection
  }
)

export const WorkoutModel = fitLogdbConnect.model<IWorkout>(collectionsData.Workouts.name, WorkoutModelSchema)
