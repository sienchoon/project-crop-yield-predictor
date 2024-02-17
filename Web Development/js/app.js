document.addEventListener('DOMContentLoaded', function() {
    const cropTypeDropdown = document.getElementById('cropTypeDropdown');
    const seasonDropdown = document.getElementById('seasonDropdown');

    // Define your dropdown items
    const cropTypes = ['Arecanut', 'Arhar/Tur', 'Castor seed', 'Coconut ', 'Cotton(lint)',
        'Dry chillies', 'Gram', 'Jute', 'Linseed', 'Maize', 'Mesta',
        'Niger seed', 'Onion', 'Other  Rabi pulses', 'Potato',
        'Rapeseed &Mustard', 'Rice', 'Sesamum', 'Small millets',
        'Sugarcane', 'Sweet potato', 'Tapioca', 'Tobacco', 'Turmeric',
        'Wheat', 'Bajra', 'Black pepper', 'Cardamom', 'Coriander',
        'Garlic', 'Ginger', 'Groundnut', 'Horse-gram', 'Jowar', 'Ragi',
        'Cashewnut', 'Banana', 'Soyabean', 'Barley', 'Khesari', 'Masoor',
        'Moong(Green Gram)', 'Other Kharif pulses', 'Safflower',
        'Sannhamp', 'Sunflower', 'Urad', 'Peas & beans (Pulses)',
        'other oilseeds', 'Other Cereals', 'Cowpea(Lobia)',
        'Oilseeds total', 'Guar seed', 'Other Summer Pulses', 'Moth'];

    const seasonTypes = ['Whole Year', 'Kharif', 'Rabi', 'Autumn',
        'Summer', 'Winter'];
    
    // Function to generate dropdown items for crop type
    function generateCropTypeDropdownItems() {
        cropTypeDropdown.innerHTML = ''; // Clear existing items
        cropTypes.forEach(function (cropType) {
            var option = document.createElement('option');
            option.textContent = cropType;
            cropTypeDropdown.appendChild(option);
        });
    }
    // Function to generate dropdown items for season
    function generateSeasonDropdownItems() {
        seasonDropdown.innerHTML = ''; // Clear existing items
        seasonTypes.forEach(function (season) {
            var option = document.createElement('option');
            option.textContent = season;
            seasonDropdown.appendChild(option);
        });
    }

    // Event listener for changing the crop type dropdown
    cropTypeDropdown.addEventListener('change', function () {
        var selectedCropType = cropTypeDropdown.value;
    });

    // Event listener for changing the season dropdown
    seasonDropdown.addEventListener('change', function () {
        var selectedSeason = seasonDropdown.value;
    });

    // Call functions to generate dropdown items
    generateCropTypeDropdownItems();
    generateSeasonDropdownItems();




    // Get all input boxes
    const inputBoxes = document.querySelectorAll('.input-box');

    // Add event listener to each input box
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

    // Function to validate input value
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
        }, 3000); // Adjust the time as needed
    }

});