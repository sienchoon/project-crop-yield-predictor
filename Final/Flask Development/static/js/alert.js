document.addEventListener("DOMContentLoaded", function() {
    const inputBoxes = document.querySelectorAll('.input-box');

    inputBoxes.forEach(box => {
        const numberInput = box.querySelector('input[type="number"]'); 
        const rangeInput = box.querySelector('input[type="range"]');
        
        // Update number input when range input changes
        rangeInput.addEventListener('input', function() {
            numberInput.value = this.value;
            validateInput(numberInput, rangeInput);
        });

        // Listen for blur event on number input
        numberInput.addEventListener('blur', function() {
            validateInput(numberInput, rangeInput);
        });

        // Update range input when number input changes
        numberInput.addEventListener('input', function() {
            rangeInput.value = this.value;
        });
    });
});

function validateInput(input, rangeInput) {
    // Convert the input value to a floating point number
    let value = parseFloat(input.value);
    if (isNaN(value)) {
        return;
    } else if (value < 0) {
        input.value = 0;
        rangeInput.value = 0;
        alert("Invalid input! Please enter a positive number.");
    }
}

function showAlert(message) {
    var alertBox = document.getElementById('alertBox');
    alertBox.textContent = message;
    alertBox.style.display = 'block'; 
    setTimeout(function() {
        alertBox.style.display = 'none'; 
    }, 3000); 
}
