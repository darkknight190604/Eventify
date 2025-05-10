// Array of events
const events = [
  { title: "Tech Meetup", date: "15-05-2025", location: "Bengaluru", image: "images/event1.png" },
  { title: "Music Festival", date: "20-05-2025", location: "Mumbai", image: "images/event2.png" },
  { title: "Standup Comedy Night", date: "25-05-2025", location: "Hyderabad", image: "images/event3.png" },
  { title: "Art Exhibition", date: "01-06-2025", location: "Delhi", image: "images/event4.png" },
  { title: "Food Carnival", date: "05-06-2025", location: "Chennai", image: "images/event 5.png" },
  { title: "Coding Bootcamp", date: "10-06-2025", location: "Pune", image: "images/event6.png" },
  { title: "Photography Workshop", date: "15-06-2025", location: "Kolkata", image: "images/event7.png" },
  { title: "Gaming Convention", date: "20-06-2025", location: "Ahmedabad", image: "images/event8.png" },
  { title: "Book Fair", date: "25-06-2025", location: "Jaipur", image: "images/event9.png" },
  { title: "Fitness Expo", date: "01-07-2025", location: "Lucknow", image: "images/event10.png" },
  { title: "Film Screening", date: "05-07-2025", location: "Chandigarh", image: "images/event11.png" },
  { title: "Charity Run", date: "10-07-2025", location: "Bhopal", image: "images/event 12.png" },
  { title: "Tech Conference", date: "15-07-2025", location: "Kochi", image: "images/event 13.png" },
  { title: "Cultural Fest", date: "20-07-2025", location: "Visakhapatnam", image: "images/event 14.png" },
  { title: "Startup Workshop", date: "25-07-2025", location: "Nagpur", image: "images/event 15.png" }
];

// Reserved dates for "Host an Event"
const reservedDates = events.map(event => event.date);

$(document).ready(function () {
  // Populate event list (if eventList div is present)
  if ($('#eventList').length) {
    events.forEach(event => {
      $("#eventList").append(`
        <div class="col-md-4 mb-4">
          <div class="card event-card">
            <img src="${event.image}" class="card-img-top" alt="${event.title}">
            <div class="card-body">
              <h5 class="card-title">${event.title}</h5>
              <p class="card-text"><strong>Date:</strong> ${event.date}</p>
              <p class="card-text"><strong>Location:</strong> ${event.location}</p>
              <a href="register.html" class="btn btn-primary">Register</a>
            </div>
          </div>
        </div>
      `);
    });
  }

  // Populate dropdown (if eventSelect is present)
  if ($('#eventSelect').length) {
    events.forEach(event => {
      $('#eventSelect').append(
        `<option value="${event.title}">${event.title} - ${event.date}</option>`
      );
    });
  }

  // Handle registration form submission
  $('#registrationForm').submit(function (e) {
    e.preventDefault();

    const registration = {
      name: $('#name').val(),
      email: $('#email').val(),
      event: $('#eventSelect').val(),
      time: new Date().toLocaleString()
    };

    let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    registrations.push(registration);
    localStorage.setItem('registrations', JSON.stringify(registrations));

    alert(`You have successfully registered for ${registration.event}`);
    this.reset();
    loadRegistrations();
  });

  // Load registrations (if registrationList exists)
  if ($('#registrationList').length) {
    loadRegistrations();
  }

  // Check if the selected date is already reserved
  $('#eventDate').on('change', function () {
    const selectedDate = $(this).val(); // Get the selected date in YYYY-MM-DD format
    const [year, month, day] = selectedDate.split("-"); // Split the date into parts
    const formattedDate = `${day}-${month}-${year}`; // Reformat to DD-MM-YYYY

    if (reservedDates.includes(formattedDate)) {
      $('#dateWarning').removeClass('d-none'); // Show warning
    } else {
      $('#dateWarning').addClass('d-none'); // Hide warning
    }
  });

  // Handle Host an Event form submission
  $('#hostEventForm').submit(function (e) {
    e.preventDefault();

    const selectedDate = $('#eventDate').val();
    const [year, month, day] = selectedDate.split("-");
    const formattedDate = `${day}-${month}-${year}`;

    if (reservedDates.includes(formattedDate)) {
      alert("This date is already reserved. Please choose another date.");
      return; // Prevent form submission
    }

    // Collect form data
    const eventData = {
      name: $('#eventName').val(),
      date: formattedDate,
      location: $('#eventLocation').val(),
      budget: $('#eventBudget').val(),
      description: $('#eventDescription').val()
    };

    // Add the selected date to reservedDates
    reservedDates.push(formattedDate);

    // Display thank-you message
    $('body').html(`
      <div class="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 class="text-success mb-3">Thank You!</h1>
        <p class="text-center">We have received your event details. Our team will contact you soon.</p>
        <a href="index.html" class="btn btn-primary mt-3">Back to Home</a>
      </div>
    `);
  });
});

// Function to load registrations
function loadRegistrations() {
  const regs = JSON.parse(localStorage.getItem('registrations')) || [];
  $('#registrationList').empty();

  if (regs.length === 0) {
    $('#registrationList').append('<li class="list-group-item">No registrations yet.</li>');
  } else {
    regs.forEach((reg, i) => {
      $('#registrationList').append(`
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>${reg.event}</strong><br>${reg.name} • ${reg.email}
          </div>
          <button class="btn btn-sm btn-danger" onclick="removeRegistration(${i})">Cancel</button>
        </li>
      `);
    });
  }
}

// Function to remove a registration
function removeRegistration(i) {
  let regs = JSON.parse(localStorage.getItem('registrations')) || [];
  regs.splice(i, 1);
  localStorage.setItem('registrations', JSON.stringify(regs));
  location.reload();
}