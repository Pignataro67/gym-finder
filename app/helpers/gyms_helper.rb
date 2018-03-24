module GymHelper

  def gym_owner(gym)
    owner = gym.users.where(admin: true).first
    owner == current_user ? true : false
  end
end

