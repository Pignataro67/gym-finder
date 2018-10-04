class AddCompleteNameToReviews < ActiveRecord::Migration[5.1]
  def change
    add_column :reviews, :complete_name, :string
  end
end
