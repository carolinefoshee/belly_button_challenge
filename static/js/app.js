// Use the D3 library to read in samples.json from the URL 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(url).then((data) => {
  console.log(data);
});

//////////////////////////////////////////////////////////////////////////////////////
// Dropdown menu

function init() {
     let dropdown = d3.select("#selDataset");

    // grabbing data to be put in dropdown menu
    d3.json(url).then(function(data) {
        let sample_names = data.names;
        
        // append sample names to the dropdown options
        sample_names.forEach((id) => {
            console.log(id);
            dropdown.append("option").text(id).property("value", id);
        });
        
        // initialize plots and dashboard using the first observation 
        let first = sample_names[0];
        console.log(first);
        barChart(first);
        metadata(first);
        bubbleChart(first);
    });
};  

//////////////////////////////////////////////////////////////////////////////////

// Bar Chart

function barChart(sample) {
   
    // initialize variables and fetch sample data
    d3.json(url).then((data) => {
        let samples = data.samples;
        let value = samples.filter(result => result.id == sample);
        let first = value[0];
        let otu_ids = first.otu_ids;
        let otu_labels = first.otu_labels;
        let sample_values = first.sample_values;
        console.log(otu_ids,otu_labels,sample_values);

        // set labels
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        // set title 
        let layout = {
            title: "Top 10 OTUs"
        };

        // plot data
        Plotly.newPlot("bar", [trace], layout)
    });
};

//////////////////////////////////////////////////////////////////////////////////////////

// Bubble Chart

function bubbleChart(sample) {
   
    // initialize variables and fetch sample data
    d3.json(url).then((data) => {
        let samples = data.samples;
        let value = samples.filter(result => result.id == sample);
        let first = value[0];
        let otu_ids = first.otu_ids;
        let otu_labels = first.otu_labels;
        let sample_values = first.sample_values;
        console.log(otu_ids,otu_labels,sample_values);
        
         // set title and labels
         let layout = {
        title: "Bacteria Cultures Per Sample",
        xaxis: {title:"OTU ID"},
      };
  
        let trace = {
        x: otu_ids ,
        y: sample_values ,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids
        }
      };
        
        // plot bubble chart
        Plotly.newPlot("bubble", [trace], layout); 
    });
};  

/////////////////////////////////////////////////////////////////////////////////////////
// Metadata 

function metadata(sample) {
    d3.json(url).then((data) => {
        
        // initialize variables and fetch data
        let meta = data.metadata;
        let value = meta.filter(result => result.id == sample);
        console.log(value)
        let valueData = value[0];
        
        // display key: value pairs for a given entry
        d3.select("#sample-metadata").html("");
        Object.entries(valueData).forEach(([key,value]) => {
            console.log(key,value);
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};

/////////////////////////////////////////////////////////////////////////////////////////
// Function that allows you to change the id of interest 

function optionChanged(id) { 
    console.log(id); 
    metadata(id);
    barChart(id);
    bubbleChart(id);
};

init();

// Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard.

// Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repo. Ensure that your repository has regular commits and a thorough README.md file




