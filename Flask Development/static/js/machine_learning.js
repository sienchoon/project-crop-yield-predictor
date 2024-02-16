/*
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// [JavaScript] Machine Learning Prediction ////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
*/

// Get the base URL of the current page
const baseURL = window.location.origin;


// Store the API route to get the list of all filter options
const optionAPI = '/api/v1.0/feature_options'

// Combine the API Route for the filter options with the Base URL; used to query the JSON dataset of all filter options
const optionURL = baseURL + optionAPI

// Using D3, select the Button HTML element
const predictButton = d3.select("#runModel");

const enableButtonClick = () => {
    // Renable the Search Button
    predictButton.attr('disabled', null);

    // Change color of button back to its original
    predictButton.style("background-color", '#FFFFFF');

    // Update the button text to reflect it can be used
    predictButton.text('PREDICT');
};

const disableButtonClick = () => {
    // Disable the Search Button
    predictButton.attr('disabled', true);

    predictButton.style("background-color", '#808080');

    predictButton.text('LOADING...');

};


d3.json(optionURL).then(jsonData => {
    disableButtonClick();
    // Using D3, fetch the JSON Dataset from the specified URL 
    // Once successful, THEN pass through the loaded JSON dataset as an argument to the following callback function where...
    // The loaded JSON Dataset is stored in the nominated variable
    const optionData = jsonData;
  
    const ddCrop = d3.select("#selCrop");
    const yieldCrops = optionData.crops;

    const ddSeason = d3.select("#selSeason");
    const yieldSeasons = optionData.seasons;

    // Populate the Dropdown Select Menus
    populate_Dropdowns(ddCrop, ddSeason, yieldCrops, yieldSeasons);

    enableButtonClick();
});

// Function to dynamically generate the URL for the Flask Dynamic API Route (based on options selected from the interactive elements) & trigger model prediction
// Triggered everytime the PREDICT button is clicked
const runPrediction = (event) => {
    disableButtonClick();
    
    // Return the values chosen using JQuery
    // For the Multiselect dropdown menus, trim() is used for every selected value string item to remove any spacing from either ends prior to URI encoding
    // encodeURIComponent() is used to replace the spacing in between the string item (e.g. "Castor seed") with '%20' to be HTML format friendly (e.g. "Castor%20seed")
    let crop_sel = $('#selCrop option:selected').map(function(a, item){return encodeURIComponent(item.value.trim());}).get();
    let season_sel = $('#selSeason option:selected').map(function(a, item){return encodeURIComponent(item.value.trim());}).get();
 
    let crop_str = crop_sel.join(',');
    let season_str = season_sel.join(',');
    let area_num = d3.select("#txtArea").node().value;
    let production_num = d3.select("#txtProduction").node().value;
    let annual_rainfall_num = d3.select("#txtRainfall").node().value;
    let fertilizer_num = d3.select("#txtFertilizer").node().value;
    let pesticide_num = d3.select("#txtPesticide").node().value;

    
    // Use backticks (``) in order to output template literals i.e. output something like how f-strings are written in Python
    // Dynamically generate the URL component for the Dynamic API Route based on the selected filter options
    // Combine it with the base URL
    let predictionAPI = `/api/v1.0/${crop_str}/${season_str}/${area_num}/${production_num}/${annual_rainfall_num}/${fertilizer_num}/${pesticide_num}`;
    let predictionURL = baseURL + predictionAPI;

    console.log(predictionURL)

    d3.json(predictionURL).then(jsonData => {
        // Using D3, call the the final Prediction URL and then pass the JSON Dataset
        // Store the JSON Dataset in a variable
        testData = jsonData

        let predictedValue = testData.predicted_value;

        d3.select("#predicted-value").text(predictedValue);

    });

    enableButtonClick();

};   



// Callback function to populate the Dropdown Select Menus
const populate_Dropdowns = (dropdownCrops, dropdownSeasons, arrayCrops, arraySeasons) => {

    console.log(arrayCrops);
    console.log(arraySeasons);

    // For every Crop element in the array of Crops...
    // Append the list of options in the dropdown menu with the current Crop element where...
    // The display text & value property of the appended option is the current Crop element
    arrayCrops.forEach(Crop => {
        dropdownCrops.append("option").text(Crop).property("value", Crop);
    });   

   
    // For every Season element in the array of Seasons...
    // Append the list of options in the dropdown menu with the current Season element where...
    // The display text & value property of the appended option is the current Season element
    arraySeasons.forEach(Season => {
        dropdownSeasons.append("option").text(Season).property("value", Season);
    });
};

