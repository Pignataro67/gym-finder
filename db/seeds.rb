# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Gym.create([ {name: "Signature", location: "Belleville, NJ", classes: "Weights, Yoga, Aerobics"},

  {name: "Strong and Shapely", location: "Rutherford, NJ", classes: "Barbells and Dumbbells"}, 
  
  {name: "Bev Francis", location: "Syosset, NY", classes: "Dumbbells and Barbells"}, 
  
  {name: "Planet Fitness", location: "Hoboken, NJ", classes: "Machines"}, 
  
  {name: "Gold's Gym", location: "Venice, CA", classes: "Barbells and Dumbbells"} ])
  
   Review.create([ {class_rating: 2, personal_training_rating: 2, 
  cleanliness_rating: 2, description: "Good Music, a lot of Meatheads", date: Date.today, gym_id: 1, user_id: 1}, 
  
  {class_rating: 2, personal_training_rating: 1, cleanliness_rating: 1, description: "some meatheads, a lot of diversity", date: Date.today, gym_id: 2, user_id: 1},
  
  {class_rating: 2, personal_training_rating: 1, cleanliness_rating: 2, description: "a lot of bodybuilders, old school vibe", date: Date.today, gym_id: 3, user_id: 2},
   
  {class_rating: 2, personal_training_rating: 1, cleanliness_rating: 2, description: "a lot of preppies/yuppies, no one working out hard, just going through the motions", date: Date.today, gym_id: 4, user_id: 2}, 
  
  {class_rating: 2, personal_training_rating: 1, cleanliness_rating: 2, description: "The Mecca of Bodybuilding, nuff said!", date: Date.today, gym_id: 5, user_id: 2} ]) 
  
  User.create([ {user_name: "Xander", email: "Xander@email.com", password: "password"}, {user_name: "Makenzie", email: "Makenzie@email.com", password: "password"} ]) 