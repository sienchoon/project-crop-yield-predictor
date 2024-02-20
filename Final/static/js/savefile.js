// Function to save data as CSV
function saveDataAsCSV(data, filename) {
    // Format data as CSV string
    const csvContent = "data:text/csv;charset=utf-8," + data.map(row => row.join(",")).join("\n");

    // Create Blob object
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create object URL
    const url = URL.createObjectURL(blob);

    // Create anchor element
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;

    // Trigger click event
    document.body.appendChild(anchor);
    anchor.click();

    // Cleanup
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
}

// Function to handle prediction and saving
function handlePredictionAndSave() {
    // Run prediction
    runPrediction();

    // Gather input values and predicted result
    const empty = '';                                                                // Temp value; to allow value-feature alignment when saved to CSV
    const area = document.getElementById('txtArea').value;
    const production = document.getElementById('txtProduction').value;
    const annualRainfall = document.getElementById('txtRainfall').value;
    const fertilizer = document.getElementById('txtFertilizer').value;
    const pesticide = document.getElementById('txtPesticide').value;
    const predictedValue = document.getElementById('predicted-value').textContent;

    // Format data for CSV
    const data = [
        ['Area', 'Production', 'Annual Rainfall', 'Fertilizer', 'Pesticide', 'Predicted Value'],
        [empty, area, production, annualRainfall, fertilizer, pesticide, predictedValue]
    ];

    // Save data as CSV
    saveDataAsCSV(data, 'prediction_data.csv');
}

// Attach event listener to the save button
document.getElementById('savebutton').addEventListener('click', handlePredictionAndSave);
