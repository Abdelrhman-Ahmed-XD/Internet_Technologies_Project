document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-id");
    const searchForm = document.getElementById("search-form");
    const boxes = document.querySelectorAll(".tourism-box-link");

    // Debounce function to limit frequent input events
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(null, args), delay);
        };
    };

    const filterBoxes = () => {
        if (!searchInput) return;
        const searchTerm = searchInput.value.toLowerCase().trim();

        let hasResults = false;
        boxes.forEach((box) => {
            const title = box.querySelector("h2").textContent.toLowerCase();
            const isVisible = title.includes(searchTerm);
            box.style.display = isVisible ? "block" : "none";
            if (isVisible) hasResults = true;
        });

        if (!hasResults && searchTerm) {
            Swal.fire({
                icon: 'info',
                title: 'No Results Found',
                text: 'No destinations match your search. Try a different term.',
                confirmButtonColor: '#205781'
            });
        }
    };

    // Debounced filter function for input events
    const debouncedFilter = debounce(filterBoxes, 300);

    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            filterBoxes();
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", debouncedFilter);
    }
});