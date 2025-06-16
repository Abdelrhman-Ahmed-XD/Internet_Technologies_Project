document.addEventListener("DOMContentLoaded", function () {
    function generateRandomRating() {
        const minStars = 3;
        const maxStars = 7;
        const randomRating = Math.floor(Math.random() * (maxStars - minStars + 1)) + minStars;
        return '⭐'.repeat(randomRating);
    }

    for (let i = 1; i <= 7; i++) {
        const ratingElement = document.getElementById(`rating-${i}`);
        if (ratingElement) {
            ratingElement.innerHTML = generateRandomRating();
        }
    }

    const hotelElements = document.querySelectorAll('.tourism-box-link');

    const items = Array.from(hotelElements).map((el, index) => {
        const overlay = el.querySelector('.overlay');
        return {
            id: index,
            imageName: el.querySelector('img')?.getAttribute('src')?.split('/').pop() || '',
            name: overlay.querySelector('h2')?.innerText || '',
            country: overlay.querySelector('h3')?.innerText || '',
            description: overlay.querySelector('p')?.innerText || '',
            element: el
        };
    });

    const fuse = new Fuse(items, {
        keys: ['name', 'country', 'description', 'imageName'],
        threshold: 0.4
    });

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(null, args), delay);
        };
    };

    const filterHotels = () => {
        const query = document.getElementById('searchInput').value.trim();

        if (!query) {
            hotelElements.forEach(box => box.style.display = 'block');
            return;
        }

        const results = fuse.search(query);

        hotelElements.forEach(box => box.style.display = 'none');

        if (results.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'No Results Found',
                text: 'No hotels match your search. Try a different term.',
                confirmButtonColor: '#205781'
            });
        } else {
            results.forEach(result => {
                result.item.element.style.display = 'block';
            });
        }
    };

    const debouncedFilter = debounce(filterHotels, 300);

    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('searchInput');

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            filterHotels();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', debouncedFilter);
    }

    document.querySelectorAll('.book-now-btn').forEach(button => {
        button.addEventListener('click', function () {
            const selectedHotel = this.getAttribute('data-hotel');
            const countryElement = this.parentElement.querySelector('h3');
            const selectedCountry = countryElement ? countryElement.innerText : '';
            Swal.fire({
                icon: 'success',
                title: 'Hotel Selected!',
                text: `You have selected ${selectedHotel} in ${selectedCountry}. Redirecting to booking page...`,
                confirmButtonColor: '#205781',
                timer: 2000,
                timerProgressBar: true,
                willClose: () => {
                    sessionStorage.setItem('selectedHotel', selectedHotel);
                    sessionStorage.setItem('selectedCountry', selectedCountry);
                    window.location.href = '../Travel-Portal(HTML)/Booking-Page.html';
                }
            });
        });
    });
});