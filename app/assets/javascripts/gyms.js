$(() => {
  bindClickHandlers()
  userClickHandlers() 
});

const bindClickHandlers = () => {
  let admin = $('#admin').text();
  $('#list_gyms').on('click', function(e) {
    e.preventDefault();
    history.pushState(null, null, "/gyms")
    $.get('/gyms.json').done((gyms) => {
      $("#app-container").html('')
      gyms.forEach( function (gym) {
        let newGym = new Gym(gym)
        let gymHtml = newGym.formatIndex(admin)
        $("#app-container").append(gymHtml)
      })
    })
  })

  $(document).on("click", ".show-link", function(e) {
    e.preventDefault()
    let id = e.currentTarget.dataset.id;
    history.pushState(null, null, `/gyms/${id}`)

    $.get(`/gyms/${id}.json`).done((gym) => {
      $("#app-container").html('')
      let newGym = new Gym(gym)
      let newGymFormat = newGym.formatShow(admin)
      $("#app-container").append(newGymFormat)
    })
  })

  $(document).on("click", '.next_gym', function() {
    let isAdmin = $('#admin').text();
    $('#app-container').html("")
    let id = this.dataset.id
    $.get(`/gyms/${id}/next`).done(gym => {
    let buildGym = new Gym(gym)
    let gymHtml = buildGym.formatShow(isAdmin)
    $("#app-container").append(gymHtml)
    })
  })

  $("#new_review").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: this.action,
      data: $(this).serialize(),
      success: function(review) {

        let formSelectBoxes = $("#new_review select")

        $.each(formSelectBoxes, function(i, box) {
          box.value = ""
        })
        $("#new_review #review_description").val("")
        $("#new_review #review_complete_name").val("")

        var newReview = new Review(review);
        $("#app-container").append(newReview.formatReview())//maybe not now
      }
    })
  })
}

function Gym(gym) {
  this.id = gym.id
  this.name = gym.name
  this.location = gym.location
  this.classes = gym.classes
  this.reviews = gym.reviews
  this.users = gym.users
}

Gym.prototype.formatIndex = function(admin) {
  let gymHtml = `
  <div class="gym_div">
  <h2>${this.name}</h2>
  <h4><b>Location:</b> ${this.location} </h4>
  <h4><b>Classes:</b> ${this.classes} </h4>
  <a id=".show-link" data-id="${this.id}" href="/gyms/${this.id}">Click to Learn More</a>
  ${admin === 'true' ? `<a href="/gyms/${this.id}/edit">Edit Gym</a>` : ''}
  ${admin === 'true' ? `<a href="/gyms/${this.id}" data-method="delete">Delete Gym</a>` : ''}
  </div>
  `

  return gymHtml
}

Gym.prototype.formatShow = function(admin) {
  let gymHtml = `
  <div class="gym_div">
  <h2>${this.name}</h2>
  <h4><b>Location:</b> ${this.location} </h4>
  <h4><b>Classes:</b> ${this.classes} </h4>
  <h4><b>Owner:</b> ${this.users[0].user_name}</h4>
  <a id=".show-link" data-id="${this.id}" href="/gyms/${this.id}">Click to Learn More</a>
  <button class="next_gym" data-id="${this.id}">Next</button>
  </div>
  `

  return gymHtml
}

Gym.prototype.writeReview = function(admin) {
  let review = this.reviews[this.reviews.length - 1]

  if (review) {
    let reviewHtml = `
    <div id="reviews_div">
    <h3>Reviews</h3>
    `
  }
}

function Review(review) {
  this.id = review.id
  this.class_rating = review.class_rating
  this. personal_training_rating = review.personal_training_rating
  this.cleanliness_rating = review.cleanliness_rating
  this.description = review.description
  this.user = review.user_name
  this.complete_name = review.complete_name
}

Review.prototype.formatReview = function() {
  let newReview = `
  <div id="reviews_div">
  <h3>Reviews</h3>
  <h4><b>Class Rating: ${this.class_rating}</b></h4>
  <h4><b>Personal Training Rating: ${this.personal_training_rating}</b></h4>
  <h4><b>Cleanliness Rating: ${this.cleanliness_rating}</b></h4>
  <h4><b>Description: ${this.description}</b></h4>
  <h4><b>Reviewer: ${this.complete_name}</b></h4>
  </div>
  `

  return newReview

}

const userClickHandlers = () => {
  $("#user-profile").on("click", function (e) {
    e.preventDefault();
    $("#app-container").html("")
    $.get(this.href).done(user => {
    history.pushState(null, null, `/users/${user.id}`)
    $("#app-container").html("")
    $.get(`/users/${user.id}/gyms.json`).done(res => {
      res.forEach( function (gym) {
        var createGym = new Gym(gym)
        var formatRes = createGym.formatGym()
        $("#app-container").append(formatRes)
        })
      })  
    })
  })
}