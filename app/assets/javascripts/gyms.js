$(() => {
  bindClickHandlers()
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

const userClickHandlers = () => {
  $("#user-profile").on("click", function (e) {
    e.preventDefault();
    $("#app-container").html("")
    $.get(this.href).done(user => {
    history.pushState(null, null, `/users/${user.id}`)
    $("#app-container").html("")
    $.get(`/users/${user.id}/gyms.json`).done(res => {
      res.forEach( function (gym) {
        var createGym =  new Gym(gym)
        var formatRes = createGym.formatGym()
        $("#app-container").append(formatRes)
      })
    })  
    })
  })
}