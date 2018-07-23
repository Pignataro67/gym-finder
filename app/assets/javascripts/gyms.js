$(() => {
  bindClickHandlers()
});

const bindClickHandlers = () => {
  let admin = $('#admin').text();
  $('#list_gyms').on('click', function(e) {
    e.preventDefault();
    $.get('/gyms.json').done((gyms) => {
      $("#app-container").html('')
    })
  })
}