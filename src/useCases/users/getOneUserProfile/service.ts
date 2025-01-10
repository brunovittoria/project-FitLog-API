import { UserModel } from '@/models/User'

interface userProfileRequest {
  user_id: string
}

class GetOneUserProfileService {

  async execute({ user_id }: userProfileRequest) {
    const userProfile = await UserModel.findById(user_id).select('id name email weight height permissions subscriptionId')
    
    if (!userProfile) {
      throw new Error('User not found')
    }

    return userProfile
  }

}

export { GetOneUserProfileService }