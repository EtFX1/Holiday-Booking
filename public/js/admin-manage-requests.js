// admin-manage-requests.js

document.addEventListener('DOMContentLoaded', () => {
    const openPopupBtn = document.getElementById('open-popup-btn');
    const popup = document.getElementById('popup');
    const popupOverlay = document.getElementById('popup-overlay');
    const cancelPopupBtn = document.getElementById('cancel-popup-btn');
    const addStaffForm = document.getElementById('add-staff-form');
    const passwordInput = document.getElementById('password');
    const holidayAllowanceInput = document.getElementById('holidayAllowance');
    const passwordError = document.getElementById('password-error');
    const holidayAllowanceError = document.getElementById('holiday-allowance-error');

    // Show popup when 'Add Staff Member' button is clicked
    openPopupBtn.addEventListener('click', () => {
        popup.style.display = 'block';
        popupOverlay.style.display = 'block';
    });

    // Hide popup when 'Cancel' button is clicked or overlay is clicked
    cancelPopupBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        popupOverlay.style.display = 'none';
    });

    popupOverlay.addEventListener('click', () => {
        popup.style.display = 'none';
        popupOverlay.style.display = 'none';
    });

    // Validate form inputs on submit
    addStaffForm.addEventListener('submit', (e) => {
        let hasErrors = false;

        // Clear previous error messages
        passwordError.textContent = '';
        holidayAllowanceError.textContent = '';

        // Password validation
        if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password should be at least 8 characters long';
            hasErrors = true;
        }

        // Holiday allowance validation
        if (parseInt(holidayAllowanceInput.value, 10) > 30) {
            holidayAllowanceError.textContent = "Can't be greater than 30";
            hasErrors = true;
        }

        if (hasErrors) {
            e.preventDefault(); // Prevent form submission if there are errors
        }
    });
});

