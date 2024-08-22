document.addEventListener('DOMContentLoaded', () => {
    const holidayAllowance = parseInt(document.querySelector('p').innerText, 10);
    const startDateInput = document.getElementById('start-date-picker');
    const endDateInput = document.getElementById('end-date-picker');
    const numberOfDaysDisplay = document.getElementById('number-of-days');
    const sendRequestButton = document.querySelector('button');
    const errorMessage = document.getElementById('error-message');
    const daysRequestedInput = document.getElementById('days-requested');  // Hidden input

    // Form submission validation
    document.querySelector("form").addEventListener("submit", function (event) {
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;
        const daysRequested = parseInt(daysRequestedInput.value, 10);

        if (!startDate || !endDate) {
            alert("Start date or end date is missing!");
            event.preventDefault(); // Prevent form submission
        } else if (isNaN(daysRequested) || daysRequested < 1) {
            alert("The number of days requested must be at least 1.");
            event.preventDefault(); // Prevent form submission
        }
    });

    // Initialize Flatpickr for both date inputs
    flatpickr(startDateInput, {
        dateFormat: "F j, Y",  // Format: March 8, 2024
        onChange: updateDays
    });

    flatpickr(endDateInput, {
        dateFormat: "F j, Y",  // Format: March 8, 2024
        onChange: updateDays
    });

    function updateDays() {
        const startDate = startDateInput._flatpickr.selectedDates[0];
        const endDate = endDateInput._flatpickr.selectedDates[0];

        if (startDate && endDate && endDate >= startDate) {
            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Include both start and end days

            numberOfDaysDisplay.textContent = `${diffDays} days`;
            daysRequestedInput.value = diffDays;  // Store the number of days in the hidden input

            if (diffDays > holidayAllowance) {
                alert('Selected range exceeds your holiday allowance.');
                endDateInput._flatpickr.clear();
                sendRequestButton.disabled = true;
                errorMessage.textContent = 'Please select a range within your holiday allowance.';
            } else {
                sendRequestButton.disabled = false;
                errorMessage.textContent = '';
            }
        } else {
            numberOfDaysDisplay.textContent = '0 days';
            daysRequestedInput.value = '';  // Clear the hidden input
            sendRequestButton.disabled = false;
            errorMessage.textContent = '';
        }
    }
});
