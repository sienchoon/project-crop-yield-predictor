document.addEventListener('DOMContentLoaded', function() {
    const predictButton = document.getElementById('button-box');
    const loadingSpinner = document.getElementById('loading-spinner');

    predictButton.addEventListener('click', function() {
        // Show the loading spinner
        loadingSpinner.classList.remove('d-none');
        
        // Simulate a delay (replace this with your actual prediction logic)
        setTimeout(function() {
            // Hide the loading spinner after a delay (replace this with the completion of your prediction logic)
            loadingSpinner.classList.add('d-none');
        }, 3000); // Adjust the delay time as needed
    });
});

