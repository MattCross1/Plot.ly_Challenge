function getPlots(id) {
// Pulling in data with d3
   d3.json("samples.json").then((sampledata) => { 
      console.log(sampledata)
// getting the top 10
      var sample_values = sampledata.samples[0].sample_values.slice(0, 10).reverse();
      console.log(sample_values)
   
      var otu_ids = sampledata.samples[0].otu_ids.slice(0, 10).reverse();
      console.log(otu_ids)

      var otu_labels = sampledata.samples[0].otu_labels.slice(0, 10).reverse();
      console.log(otu_labels)

   // creating bar graph
      var trace = {
         x: sampledata.samples[0].sample_values,
         y: otu_ids.map((otu_id) => `OTU_ID ${otu_id}`),
         marker: {
            color: 'blue',
            size: 100
         },
         type: "bar",
         orientation: "h"
      };

      var chart1 = [trace];
      var margins = {
         margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 30
         }
      };
   Plotly.newPlot("bar", chart1, margins);

   // bubble chart
      var trace1 = {
         x: sampledata.samples[0].otu_ids,
         y: sampledata.samples[0].sample_values,
         text: otu_labels,
         mode: "markers",
         marker: {
            color: sampledata.samples[0].otu_ids,
            size: sampledata.samples[0].sample_values,
            colorscale: "Earth"
         }
      };
   //console.log(bubbles)
      var chart2 = [trace1];
   
      var layout = {
         height: 600,
         width: 1000,
         xaxis: {title: "OTU ID"}
      };
   Plotly.newPlot("bubble", chart2, layout);
   });
}

function getDemoInfo(id) {
       d3.json("samples.json").then((data) => {
           var metadata = data.metadata;
           console.log(metadata)

           var result = metadata.filter(meta => meta.id.toString() === id)[0];
           var demographicInfo = d3.select("#sample-metadata");
           demographicInfo.html("");
   
           Object.entries(result).forEach((key) => {
               demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
           });
       });
      } 
function optionChanged(id) {
   getPlots(id);
   getDemoInfo(id);
}

function init() {
   var ids = d3.select("#selDataset");
   d3.json("samples.json").then((sample) => { 
      console.log(sample)

      sample.names.forEach(function (name) {
         ids.append("option").text(name).property("value");
      });

      getPlots(sample.names[0]);
      getDemoInfo(sample.names[0]);
   });
   
}
init();