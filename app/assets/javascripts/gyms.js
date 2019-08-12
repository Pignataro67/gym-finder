$(document).ready(function() {
  bindClickHandlers()
  userClickHandlers() 
});

const bindClickHandlers = () => {
  let admin = $('#admin').text();
  $('#list_gyms').on('click', function(event) {
    event.preventDefault();
    history.pushState(null, null, "/gyms")
    $.get('/gyms.json').done((gyms) => {
      $("#gym-container").html('')
      gyms.forEach( function (gym) {
        let newGymInstance = new Gym(gym) 
        let gymHtml = newGymInstance.formatGym(admin)
        $("#gym-container").append(gymHtml)
        if(!gym.reviews.length !== 0) {
          $("#gym-container").append(newGymInstance.writeReview(admin))   
        }
      })
    });
  })

  $(document).on("click", "#learn-more", (event) => {
    event.preventDefault();
    let id = event.currentTarget.dataset.id;
    history.pushState(null, null, `/gyms/${id}`)

    $.get(`/gyms/${id}.json`).done((gym) => {
      $("#gym-container").html('')
      let newGym = new Gym(gym)
      let newGymFormat = newGym.formatGymShow(admin)
      $("#gym-container").append(newGymFormat)
      $("#gym-container").append(newGym.formatReviews())
    })
  })

  $(document).on("click", '.next_gym', function() {
    let isAdmin = $('#admin').text();
    $('#gym-container').html("")
    let id = this.dataset.id
    $.get(`/gyms/${id}/next`).done(gym => {
    let buildGym = new Gym(gym)
    let gymHtml = buildGym.formatGymShow(isAdmin)
    $("#gym-container").append(gymHtml)
    $("#gym-container").append(buildGym.formatReviews())
    })
  })

  $(document).on("click", '.previous_gym', function() {
    let isAdmin = $('#admin').text();
    $('#gym-container').html("")
    let id = this.dataset.id
    $.get(`/gyms/${id}/previous`).done(gym => {
    let buildGym = new Gym(gym)
    let gymHtml = buildGym.formatGymShow(isAdmin)
    $("#gym-container").append(gymHtml)
    $("#gym-container").append(buildGym.formatReviews())
    })
  })
  
  $(document).on("click", '.all_gym', function alphabetizeGym() {
    let gymDivs = $(".gym_div")
    let gymContainer = $("#gym-container")
    gymContainer.html("")
    gymDivs.sort(function(a, b) {
      var nameA = a.firstElementChild.innerHTML.toUpperCase(); 
      var nameB = b.firstElementChild.innerHTML.toUpperCase(); 
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    return 0;
    })
    debugger
    for (let i = 0; i < gymDivs.length; i++) {
      gymContainer.append(gymDivs[i])
    };
  })

  // $(document).on("click", '.all_gym', function() {
  //   console.log(gyms);
  //   let gymDivs = $(".gym_div")
  //   let gymContainer = $("#gym-container")
  //   $('#gym-container').html("")
  //   gymDivs.substr(0, 1) {}
  //   let id = this.dataset.id
  //   $.get(`/gyms/${id}/previous`).done(gym => {
  //   let buildGym = new Gym(gym)
  //   let gymHtml = buildGym.formatGymShow(isAdmin)
  //   $("#gym-container").append(gymHtml)
  //   $("#gym-container").append(buildGym.formatReviews())
  //   })
  // })

  $("#new_review").on("submit", function(event) {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: this.action,
      data: $(this).serialize(),
      success: function(review) {
          console.log(review)
        let formSelectBoxes = $("#new_review select")

        $.each(formSelectBoxes, function(i, box) {
          box.value = ""
        })
        $("#new_review #review_description").val("")
        $("#new_review #review_complete_name").val("")

        var newReview = new Review(review);
        $("#gym-container").append(newReview.formatReview())
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

Gym.prototype.formatGym = function(admin) {
  let gymHtml = `
  <div class="gym_div">
  <h2>${this.name}</h2>
  <h4><b>Location:</b> ${this.location} </h4>
  <h4><b>Classes:</b> ${this.classes} </h4>
  <a id="learn-more" data-id="${this.id}" href="/gyms/${this.id}">Click to Learn More</a>
  ${admin === 'true' ? '' : `<a id="write-review" data-id="${this.id}" href="/gyms/${this.id}">Please Write a Review</a>`}
  ${admin === 'true' ? `<a href="/gyms/${this.id}/edit">Edit Gym</a>` : ''}
  ${admin === 'true' ? `<a href="/gyms/${this.id}" data-method="delete">Delete Gym</a>` : ''}
  </div>
  `

  return gymHtml
}

Gym.prototype.formatGymShow = function(admin) {
  let gymHtml = `
  <div class="gym_div">
  <h2>${this.name}</h2>
  <h4><b>Location:</b> ${this.location} </h4>
  <h4><b>Classes:</b> ${this.classes} </h4>
  <h3><b>Owner:</b> ${this.users[0].user_name}</h3>
  <a id="learn-more" data-id="${this.id}" href="/gyms/${this.id}">Click to Learn More</a>
  ${admin === 'true' ? '' : `<a id="write-review" data-id="${this.id}" href="/gyms/${this.id}">Please Write a Review</a>`} 
  <button class="previous_gym" data-id="${this.id}">Previous</button>
  <button class="next_gym" data-id="${this.id}">Next</button>
  <button class="all_gym" data-id="${this.id}">All</button>
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
    <h4><b>Class Rating: ${review.class_rating}</b></h4>
    <h4><b>Personal Training Rating: ${review.personal_training_rating}</b></h4>
    <h4><b>Cleanliness Rating: ${review.cleanliness_rating}</b></h4>
    <h4><b>Description: ${review.description}</b></h4>
    <h4><b>Reviewerer: ${review.complete_name}</b></h4>
    ${admin === 'true' ? '' : `<a href="/reviews/${review.id}/edit">Edit Review</a>`}
    <br>
    </div>
    `

    return reviewHtml
  }
}

Gym.prototype.formatReviews = function () {
  let reviews = this.reviews
  let reviewsFolder = ''

  reviews.forEach((review) => {
    let reviewFile = `
    <div id="reviews_div">
    <h3>Reviews</h3>
    <h4><b>Class Rating: ${review.class_rating}</b></h4>
    <h4><b>Personal Training Rating: ${review.personal_training_rating}</b></h4>
    <h4><b>Cleanliness Rating: ${review.cleanliness_rating}</b></h4>
    <h4><b>Description: ${review.description}</b></h4>
    <h4><b>Reviewerer: ${review.complete_name}</b></h4>
    </div>
    `

    return reviewsFolder += reviewFile
  })

  return reviewsFolder
}

function findOwner(gym) {
  var owner = ""
  gym.users.forEach(user => {
    if(user.admin === true) {
      owner = user.user_name
    }
  })

  return owner
}

function Review(review) {
  this.id = review.id
  this.class_rating = review.class_rating
  this.personal_training_rating = review.personal_training_rating
  this.cleanliness_rating = review.cleanliness_rating
  this.description = review.description
  this.user = review.user.user_name
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
  <h4><b>Reviewerer: ${this.complete_name}</b></h4>
  </div>
  `

  return newReview

}

const userClickHandlers = () => {
  $("#user-profile").on("click", function (event) {
    event.preventDefault();
    $("#gym-container").html("")
    $.get(this.href).done(user => {
    history.pushState(null, null, `/users/${user.id}`)
    $("#gym-container").html("")
    $.get(`/users/${user.id}/gyms.json`).done(res => {
      res.forEach( function (gym) {
        var createGym = new Gym(gym)
        var formatRes = createGym.formatGym()
        $("#gym-container").append(formatRes)
 
        if (!gym.reviews.length !== 0) {
          $("#gym-container").append(createGym.writeReview())
        }
        })
      });  
    })
  })
}
