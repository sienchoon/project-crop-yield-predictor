document.addEventListener('DOMContentLoaded', function() {
    const predictButton = document.getElementById('predict-button');
    const loadingAnimation = document.getElementById('loading-animation');

    predictButton.addEventListener('click', function() {
        // Show loading animation
        loadingAnimation.classList.remove('d-none');
        // Hide the Predict button temporarily
        predictButton.classList.add('d-none');
        setTimeout(function() {
            loadingAnimation.classList.add('d-none');
            predictButton.classList.remove('d-none');
        }, 3000); // Adjust the timeout duration as needed
    });
});
