class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.text :description
      t.integer :class_rating
      t.integer :personal_training_rating
      t.text :cleanliness_rating
      t.date :date
      t.integer :gym_id
      t.integer :user_id

      t.timestamps
    end
  end
end
