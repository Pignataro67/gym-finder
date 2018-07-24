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
  </div>
  `

  return gymHtml
}