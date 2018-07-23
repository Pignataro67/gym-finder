$(() => {
  bindClickHandlers()
});

const bindClickHandlers = () => {
  let admin = $('#admin').text();
  $('#list_gyms').on('click', function(e) {
    e.preventDefault();
    $.get('/gyms.json').done((gyms) => {
      $("#app-container").html('')
      gyms.forEach( function (gym) {
        let newGym = new Gym(gym)
      })
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