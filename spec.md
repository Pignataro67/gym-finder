# Specifications for the Rails Assessment

Specs:
- [x] Using Ruby on Rails for the project -- RoR was used for the project
- [x] Include at least one has_many relationship (x has_many y e.g. User has_many Recipes) -- e.g. gym has_many reviews
- [x] Include at least one belongs_to relationship (x belongs_to y e.g. Post belongs_to User) -- e.g. review belongs_to user
- [x] Include at least one has_many through relationship (x has_many y through z e.g. Recipe has_many Items through Ingredients) -- e.g. user has_many gyms through reviews
- [x] The "through" part of the has_many through includes at least one user submittable attribute (attribute_name e.g. ingredients.quantity) -- review.class_rating & review.cleanliness_rating
- [x] Include reasonable validations for simple model objects (list of model objects with validations e.g. User, Recipe, Ingredient, Item) -- User, Gym, Review
- [x] Include a class level ActiveRecord scope method (model object & class method name and URL to see the working feature e.g. User.most_recipes URL: /users/most_recipes) -- Gym.best_classes_gyms & Gym.best_pt_gym
- [x] Include signup (how e.g. Devise) -- rolled out my own signup
- [x] Include login (how e.g. Devise) -- rolled out my own login
- [x] Include logout (how e.g. Devise) -- rolled out my own logout
- [x] Include third party signup/login (how e.g. Devise/OmniAuth) -- Github/OmniAuth
- [x] Include nested resource show or index (URL e.g. users/2/recipes) -- users/1(:id)/gyms
- [x] Include nested resource "new" form (URL e.g. recipes/1/ingredients) -- users/1(:id)gyms/new
- [x] Include form display of validation errors (form URL e.g. /recipes/new) --/reviews/new

Confirm:
- [x] The application is pretty DRY -- Yes
- [x] Limited logic in controllers -- Yes
- [x] Views use helper methods if appropriate -- did not use
- [x] Views use partials if appropriate -- Yes partials were used