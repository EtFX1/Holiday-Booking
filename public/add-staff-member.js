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

    //! Hide and show popup
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

    //!Validate form inputs on submit
    //function that capitalises the first letter
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    addStaffForm.addEventListener('submit', (e) => {
        let hasErrors = false;

        // Clear previous error messages
        passwordError.textContent = '';
        holidayAllowanceError.textContent = '';

        // Capitalize the first letter of first and last names
        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        firstNameInput.value = capitalizeFirstLetter(firstNameInput.value);
        lastNameInput.value = capitalizeFirstLetter(lastNameInput.value);

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

