document.addEventListener("DOMContentLoaded", function() {
    const resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', function() {
        // Get all input elements within the container box
        const inputElements = document.querySelectorAll('.input-box input[type="number"]');
        
        // Clear the value of each input element
        inputElements.forEach(input => {
            input.value = 0;
        });

        // Reset sliders to 0 and update their positions
        const sliders = document.querySelectorAll('.input-box input[type="range"]');
        sliders.forEach(slider => {
            slider.value = 0;
            slider.dispatchEvent(new Event('input', { bubbles: true }));
        });

    });
});
