// Wait until the entire DOM is loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
    const deleteButtons = document.querySelectorAll(".delete-btn");
    const deletePopup = document.getElementById("delete-popup");
    const deletePopupOverlay = document.getElementById("delete-popup-overlay");
    const cancelDeletePopupBtn = document.getElementById("cancel-delete-popup-btn");
    const deleteForm = document.getElementById("delete-staff-form");
    const deleteFirstNameInput = document.getElementById("delete-firstName");
    const deleteLastNameInput = document.getElementById("delete-lastName");

    // Loop through all the delete buttons and add a click event listener to each one
    deleteButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Get the first and last names of the staff member associated with this delete button (which is stored in the class "data-firstname" and "datalastname")
            const firstName = button.getAttribute("data-firstname");
            const lastName = button.getAttribute("data-lastname");

            // Set the hidden input fields in the form to the correct values for this staff member
            deleteFirstNameInput.value = firstName;
            deleteLastNameInput.value = lastName;

            // Show the delete confirmation popup and the overlay
            deletePopup.style.display = "block";
            deletePopupOverlay.style.display = "block";
        });
    });

    // Add a click event listener to the "No" button to close the popup without deleting the staff member
    cancelDeletePopupBtn.addEventListener("click", () => {
        // Hide the delete confirmation popup and the overlay
        deletePopup.style.display = "none";
        deletePopupOverlay.style.display = "none";
    });
});
