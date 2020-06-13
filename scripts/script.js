/*
Aaron Van Cleave
avanclea@cs.uoregon.edu
951604863
*/

class Phrase {

    constructor(in_text, in_count, in_category, in_d_count, in_r_count, in_d_percent, in_r_percent)
	{
        this.pText = in_text;

        this.pCount = in_count;
		
		this.pCat = in_category

        this.dCount = in_d_count;
		
		this.rCount = in_r_count;
		
		this.dPer = in_d_percent;
		
		this.rPer = in_r_percent;
    }
}


//Reused JSON load function from project 4
function load_data(path, callback) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                let data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}

//takes json array and creates Phrase objects 
function setup_data(data)
{
	phrase_list = [];
	
	//convert JSON objects to phrase objects
	for (let p of data)
	{
		let new_p = new Phrase(p["phrase"], p["total"], p["category"], p["d_speeches"], p["r_speeches"], p["percent_of_d_speeches"], p["percent_of_r_speeches"]);
		
		phrase_list.push(new_p);
	}
	
	return phrase_list;
}

function render_table(data)
{	
  //function for applying classes to bars to give them the right fill color
  function apply_category_class(item)
  {
	  var class_text;
	  var temp = item.pCat;
	  
	  if(temp == "economy/fiscal issues")
	  {
		  class_text = "economy_rect";
	  }
	  else if(temp == "energy/environment")
	  {
		  class_text = "environment_rect";
	  }
	  else if(temp == "crime/justice")
	  {
		  class_text = "crime_rect";
	  }
	  else if(temp == "education")
	  {
		  class_text = "education_rect";
	  }
	  else if(temp == "health care")
	  {
		  class_text = "health_rect";
	  }
	  else
	  {
		  class_text = "default_rect";
	  }
	  
	  return class_text;
  }
  
  
  //Phrase text boxes  
  let phraseEnter = d3.select("#phraseTable").selectAll("text")
    .data(data)
	.enter();
	
  let phraseExit = d3.select("#phraseTable").selectAll("text")
    .data(data)
	.exit();
	
  phraseExit.remove();
  
  phraseEnter.append("text")
    .attr("x", 0)
	.attr("y", function(d, i){return i * 22;})
	.text(function(d){ return d.pText;});
	
  let phraseTable = d3.select("#phraseTable").selectAll("text")
    .data(data)
	.text(function(d){ return d.pText;});

  //Frequency bars  
  let freTableEnter = d3.select("#frequencyTable").selectAll("rect")
    .data(data)
	.enter();
	
  let freTableExit = d3.select("#frequencyTable").selectAll("rect")
    .data(data)
	.exit();
	
  freTableExit.remove();
  
  freTableEnter.append("rect")
    .attr("height", 20)
	.attr("transform", function(d, i){return "translate(0, " + i * 22 + ") scale(1, 1)";});
	
  let frequencyTable = d3.select("#frequencyTable").selectAll("rect")
    .data(data)
	.attr("class", function(d){ return apply_category_class(d);})
	.attr("width", function(d){return d.pCount;});
	
  //Percentage Bars, left set
  let per1TableEnter = d3.select("#percentTable1").selectAll("rect")
    .data(data)
	.enter();
	
  let per1TableExit = d3.select("#percentTable1").selectAll("rect")
    .data(data)
	.exit();
	
  per1TableExit.remove();
  
  per1TableEnter.append("rect")
    .attr("height", 20)
	.attr("transform", function(d, i){return "translate(0, " + i * 22 + ") scale(-1, 1)";});
	
  let per1Table = d3.select("#percentTable1").selectAll("rect")
    .data(data)
	.attr("class", "d_per_rect")
	.attr("width", function(d){return ((d.dPer) / 100) * 50;});
	
  //Percentage Bars, right set
  let per2TableEnter = d3.select("#percentTable2").selectAll("rect")
    .data(data)
	.enter();
	
  let per2TableExit = d3.select("#percentTable2").selectAll("rect")
    .data(data)
	.exit();
	
  per2TableExit.remove();
  
  per2TableEnter.append("rect")
    .attr("height", 20)
	.attr("transform", function(d, i){return "translate(0, " + i * 22 + ") scale(1, 1)";});
	
  let per2Table = d3.select("#percentTable2").selectAll("rect")
    .data(data)
	.attr("class", "r_per_rect")
	.attr("width", function(d){return ((d.rPer) / 100) * 75;});
	
  //Total number text boxes  
  let totalEnter = d3.select("#totalTable").selectAll("text")
    .data(data)
	.enter();
	
  let totalExit = d3.select("#totalTable").selectAll("text")
    .data(data)
	.exit();
	
  totalExit.remove();
  
  totalEnter.append("text")
    .attr("x", 0)
	.attr("y", function(d, i){return i * 22;})
	.text(function(d){ return d.pCount;});
	
  let totalTable = d3.select("#totalTable").selectAll("text")
    .data(data)
	.text(function(d){ return d.pCount;});
  
	



	
	
	
}



console.log("start test");

load_data('data/words.json', function(data) {
    console.log(data);
	
	//this is the data that will be used for the visualization
	let phrases = setup_data(data);
	
	render_table(phrases);
});

console.log("end test");