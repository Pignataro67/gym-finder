class CreateGyms < ActiveRecord::Migration[5.1]
  def change
    create_table :gyms do |t|
      t.string :name
      t.string :location
      t.string :classes

      t.timestamps
    end
  end
end
