document.addEventListener("DOMContentLoaded", function () {
    const toDropdown = document.getElementById('to');
    const selectedCountry = sessionStorage.getItem('selectedCountry');

    if (selectedCountry && toDropdown) {
        toDropdown.value = selectedCountry;
    }

    const hotelDropdown = document.getElementById('hotel');
    const selectedHotel = sessionStorage.getItem('selectedHotel');

    if (selectedHotel && hotelDropdown) {
        hotelDropdown.value = selectedHotel;
    }

    // Swap from and to locations
    const swapBtn = document.querySelector('.swap-btn');
    if (swapBtn) {
        swapBtn.addEventListener('click', function() {
            const fromInput = document.getElementById('from');
            const toInput = document.getElementById('to');
            if (fromInput && toInput) {
                const temp = fromInput.value;
                fromInput.value = toInput.value;
                toInput.value = temp;

                fromInput.classList.add('swapped');
                toInput.classList.add('swapped');

                setTimeout(() => {
                    fromInput.classList.remove('swapped');
                    toInput.classList.remove('swapped');
                }, 500);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Cannot Swap Locations',
                    text: 'Please fill both From and To fields to swap.',
                    confirmButtonColor: '#205781'
                });
            }
        });
    }

    const incrementBtn = document.querySelector('.increment');
    const decrementBtn = document.querySelector('.decrement');
    const passengerInput = document.getElementById('passengers');

    if (incrementBtn && decrementBtn && passengerInput) {
        incrementBtn.addEventListener('click', () => {
            let value = parseInt(passengerInput.value);
            if (value < 10) {
                passengerInput.value = value + 1;
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Too Many Passengers',
                    text: 'You can select up to 10 passengers only.',
                    confirmButtonColor: '#205781'
                });
            }
        });

        decrementBtn.addEventListener('click', () => {
            let value = parseInt(passengerInput.value);
            if (value > 1) {
                passengerInput.value = value - 1;
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'At Least One Passenger',
                    text: 'You must have at least 1 passenger.',
                    confirmButtonColor: '#205781'
                });
            }
        });
    }

    const seatCheckboxes = document.querySelectorAll('.seat-checkbox');
    seatCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const checkedSeats = document.querySelectorAll('.seat-checkbox:checked').length;
            if (checkedSeats > 6) {
                checkbox.checked = false;
                Swal.fire({
                    icon: 'warning',
                    title: 'Maximum Seats Reached',
                    text: 'You can select up to 6 seats only.',
                    confirmButtonColor: '#205781'
                });
            }
        });
    });

    // Set min dates for departure, return, check-in, and check-out
    const today = new Date().toISOString().split('T')[0];
    const departureInput = document.getElementById('departure');
    const returnInput = document.getElementById('return');
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');

    if (departureInput) departureInput.min = today;
    if (returnInput) returnInput.min = today;
    if (checkInInput) checkInInput.min = today;
    if (checkOutInput) checkOutInput.min = today;

    // Update return and check-in min date when departure changes
    if (departureInput) {
        departureInput.addEventListener('change', function() {
            if (returnInput) returnInput.min = this.value;
            if (checkInInput) checkInInput.min = this.value;
        });
    }

    // Update check-out min date when check-in changes
    if (checkInInput) {
        checkInInput.addEventListener('change', function() {
            if (checkOutInput) checkOutInput.min = this.value;
        });
    }

    const form = document.getElementById('flight-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // 1. Validate Flight Details
            const fromInput = document.getElementById('from');
            if (!fromInput?.value) {
                Swal.fire({
                    icon: 'error',
                    title: 'Departure Location Required',
                    text: 'Please enter your departure city.',
                    confirmButtonColor: '#205781'
                });
                return;
            }

            if (!toDropdown.value) {
                Swal.fire({
                    icon: 'error',
                    title: 'Destination Required',
                    text: 'Please select your destination city.',
                    confirmButtonColor: '#205781'
                });
                return;
            }

            const departureDate = departureInput?.value;
            if (!departureDate) {
                Swal.fire({
                    icon: 'error',
                    title: 'Departure Date Required',
                    text: 'Please select your departure date.',
                    confirmButtonColor: '#205781'
                });
                return;
            }

            if (departureDate < today) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Departure Date',
                    text: 'Departure date cannot be before today.',
                    confirmButtonColor: '#205781'
                });
                return;
            }

            const returnDate = returnInput?.value;
            const flightType = document.querySelector('input[name="flight-type"]:checked').nextElementSibling.textContent;
            if (flightType === 'Round Trip' && !returnDate) {
                Swal.fire({
                    icon: 'error',
                    title: 'Return Date Required',
                    text: 'Please select your return date for a round trip.',
                    confirmButtonColor: '#205781'
                });
                return;
            }

            if (returnDate && returnDate < departureDate) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Return Date',
                    text: 'Return date must be on or after departure date.',
                    confirmButtonColor: '#205781'
                });
                return;
            }

            const passengerInput = document.getElementById('passengers');
            const passengers = parseInt(passengerInput?.value);
            if (!passengerInput.value || isNaN(passengers) || passengers < 1 || passengers > 10) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Passenger Count',
                    text: 'Please select between 1 and 10 passengers.',
                    confirmButtonColor: '#205781'
                });
                return;
            }

            // 2. Validate Personal Information
            const fullname = document.getElementById('fullname')?.value;
            const ageInput = document.getElementById('age');
            const age = ageInput?.value ? parseInt(ageInput.value) : NaN;
            const passportNumber = document.getElementById('passport')?.value;

            if (!fullname) {
                Swal.fire({
                    icon: 'error',
                    title: 'Full Name Required',
                    text: 'Please enter your full name as it appears on your passport.',
                    confirmButtonColor: '#205781'
                });
                return;
            }

            if (!ageInput.value || isNaN(age) || age < 18 || age > 120) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Age Entered',
                    text: 'Age must be between 18 and 120.',
                    confirmButtonColor: '#205781'
                });
                return;
            }

            if (!passportNumber) {
                Swal.fire({
                    icon: 'error',
                    title: 'Passport Number Required',
                    text: 'Please enter your passport number.',
                    confirmButtonColor: '#205781'
                });
                return;
            }

            // 3. Validate Seat Selection (Optional, only check max limit)
            // No validation for unchecked seats, as instructed

            // 4. Validate Hotel Accommodation
            const roomTypeInput = document.getElementById('room-type');
            const checkInDate = checkInInput?.value;
            const checkOutDate = checkOutInput?.value;

            if (hotelDropdown.value && hotelDropdown.value !== "No hotel needed") {
                if (!roomTypeInput?.value) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Room Type Required',
                        text: 'Please select a room type for your hotel stay.',
                        confirmButtonColor: '#205781'
                    });
                    return;
                }

                if (!checkInDate) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hotel Check-in Date Required',
                        text: 'Please select your hotel check-in date.',
                        confirmButtonColor: '#205781'
                    });
                    return;
                }

                if (checkInDate < departureDate) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Hotel Check-in Date',
                        text: 'Hotel check-in date must be on or after departure date.',
                        confirmButtonColor: '#205781'
                    });
                    return;
                }

                if (!checkOutDate) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hotel Check-out Date Required',
                        text: 'Please select your hotel check-out date.',
                        confirmButtonColor: '#205781'
                    });
                    return;
                }

                if (checkOutDate <= checkInDate) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Hotel Check-out Date',
                        text: 'Hotel check-out date must be after check-in date.',
                        confirmButtonColor: '#205781'
                    });
                    return;
                }
            }

            // Success
            Swal.fire({
                icon: 'success',
                title: 'Booking Confirmed!',
                text: 'Your flight and hotel booking has been successfully confirmed!',
                confirmButtonColor: '#205781',
                timer: 2000,
                timerProgressBar: true,
                willClose: () => {
                    window.location.href = 'Home-Page.html';
                }
            }).then(() => {
                form.reset();
                seatCheckboxes.forEach(checkbox => checkbox.checked = false);
                passengerInput.value = 1;
            });
        });
    }
});