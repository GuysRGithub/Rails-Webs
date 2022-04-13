class UsersController < ApplicationController
  def index
    @user = User.new
  end

  def create
    user = User.new(user_params)
    if user.save
        redirect_to players_path
    else
        flash[:erros] = user.errors.full_messages
        redirect_back(fallback_location: "new player path")
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
