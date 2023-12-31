function showConfirmation() {
    var emailInput = document.getElementById('email');
    var userConfirmed = confirm('Are you sure you want to edit your email? it affect the your login');
    
    if (!userConfirmed) {
        emailInput.blur(); // Remove focus if the user cancels
    }
}