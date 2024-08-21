document.addEventListener("DOMContentLoaded", () => {
    const editButtons = document.querySelectorAll('.edit-btn');
    const popup = document.getElementById('popup');
    const popupOverlay = document.getElementById('popup-overlay');
    const cancelPopupBtn = document.getElementById('cancel-popup-btn');
    const passwordLabel = document.querySelector('label[for="password"]');
    const submitButton = document.querySelector('#add-staff-form button[type="submit"]');

    editButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const firstName = event.target.closest('section').querySelector('[data-firstname]').getAttribute('data-firstname');
            const lastName = event.target.closest('section').querySelector('[data-lastname]').getAttribute('data-lastname');

            // Fetch the staff member's details using their first and last name
            const response = await fetch(`/admin/get-staff?firstName=${firstName}&lastName=${lastName}`);
            const staff = await response.json();

            if (response.ok) {
                // Populate the form fields with the staff member's details
                document.getElementById('firstName').value = staff.first_name;
                document.getElementById('lastName').value = staff.last_name;
                document.getElementById('holidayAllowance').value = staff.holiday_allowance_days;

                // Change the label to "Change Password" when editing
                passwordLabel.textContent = "Change Password";

                // Change the button text to "Edit Staff Member"
                submitButton.textContent = "Edit Staff Member";

                // Optionally, set the form's action to the update route
                document.getElementById('add-staff-form').action = "/admin/update-staff";
            } else {
                console.error("Error fetching staff details:", staff.error);
            }

            // Show the popup
            popup.style.display = 'block';
            popupOverlay.style.display = 'block';
        });
    });

    // Hide popup when 'Cancel' button is clicked or overlay is clicked
    cancelPopupBtn.addEventListener('click', () => {
        // Reset the password label and button text if the popup is canceled
        passwordLabel.textContent = "Set Password";
        submitButton.textContent = "Add Staff Member";

        popup.style.display = 'none';
        popupOverlay.style.display = 'none';
    });

    popupOverlay.addEventListener('click', () => {
        // Reset the password label and button text if the popup is closed
        passwordLabel.textContent = "Set Password";
        submitButton.textContent = "Add Staff Member";

        popup.style.display = 'none';
        popupOverlay.style.display = 'none';
    });
});
