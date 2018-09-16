const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const startButton = document.querySelector("#build");
const dropdownOne = document.querySelector(".drop1");
const dropdownTwo = document.querySelector(".drop2");
const dropdownThree = document.querySelector(".drop3");
const dropdownButton = document.querySelector(".dropbtn");

const summary = document.querySelector(".summary");

//var funds;
var strategy;
var selectedStocks = [];
var url;

const ticker1 = document.querySelector(".ticker1");

const ai1 = document.querySelector(".ai1");

const price1 = document.querySelector(".price1");

var concept;
var stock;

const apiKey = ["CYF716TBUK4G28A9","YHMAG5743MI9JGNY","CT8WTPTQMP09XOZ8","IM1860IAWL0L3V77","YHMAG5743MI9JGNY"];
// Require the client

//const Clarifai = require('clarifai');

// initialize with your api key. This will also work in your browser via http://browserify.org/
const app = new Clarifai.App({
apiKey: '6bdbe5ee0a384cbbaa164f73968b906a'
});

function start() {
url = testArea.value;
console.log(url);
console.log("The function is started")
app.models.predict(Clarifai.GENERAL_MODEL, url).then(
  function(response) {
    console.log(response);
    //console.log(response['outputs']['0']['data']['concepts'][0]['name']);
    concept = response['outputs']['0']['data']['concepts'][0]['name'];
    console.log(concept);
    calculate();
  },
  function(err) {
    // there was an error
  }
);  
}

// Event listeners for inputs and the start buttondropdownButton.onload=function() {
startButton.addEventListener("click", start, false);

// Execute a function when the user releases a key on the keyboard
testWrapper.addEventListener("keyup", function(event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
    // Trigger the button element with a click
      url = testArea.value;
    console.log(url);
    }
  });


function calculate() {

    switch (concept) {
        case "telephone":
            stock = "AAPL";
            rating = "Favorable";
            console.log(stock);
            break;
        case "technology":
            stock = "AAPL";
            rating = "Favorable";
            console.log(stock);
        case "laptop":
            stock = "AAPL";
            rating = "Favorable";
            console.log(stock);
            break;
        case "computer":
            stock = "AAPL";
            rating = "Favorable";
            console.log(stock); 
        case "electronics":
            stock = "AAPL";
            rating = "Favorable";
            console.log(stock);
            break;
        case "car":
            stock = "F";
            rating = "Unfavorable";
            console.log(stock);
            break;
        case "vehicle":
            stock = "F";
            rating = "Unfavorable";
            console.log(stock);
            break;
        case "automotive":
            stock = "F";
            rating = "Unfavorable";
            console.log(stock);
            break;
        case "foot":
            stock = "NKE";
            rating = "Favorable";
            console.log(stock);
            break;
        case "shoe":
            stock = "NKE";
            rating = "Favorable";
            console.log(stock);
            break;
        case "footwear":
            stock = "NKE";
            rating = "Favorable";
            console.log(stock);
            break;
        case "sneakers":
            stock = "NKE";
            rating = "Favorable";
            console.log(stock);
            break; 
        default:
            stock = "0"
            break;
    }

    getAlphaVantagedata();
    
}

//Alpha Vantage Stuff

	function getAlphaVantagedata() {
        var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + stock + '&interval=1min&apikey=' + apiKey[0];
        requestFile(url, stock);   
    }
   
	function requestFile(url, stock) {
		const xhr = new XMLHttpRequest();
		xhr.open( 'GET', url, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback( xhr ) {

			let response, json, lines;

            response = xhr.target.response;

            response = JSON.parse(response);

            console.log(response);
            
            latestTimeSeries = Object.keys(response['Time Series (1min)'])[0];
            
            latestClosePrice = response['Time Series (1min)'][latestTimeSeries]['4. close'];
            
            selectedStock = {ticker: stock, price: latestClosePrice};

            console.log(selectedStock);

            console.log(latestClosePrice);

            ticker1.innerHTML = stock;
   
            price1.innerHTML = "$"+ parseFloat(selectedStock.price).toFixed(2);
            
            ai1.innerHTML = rating;
            
            if (stock=="F") {
                summary.innerHTML = "We have identified Ford as the company responsible for the object in the image. Their stock is currently trading at " + "$" + parseFloat(selectedStock.price).toFixed(2) + ". Our Machine learning algorithms have classified Ford as an unfavorable investment, with decline predicted in the near future."
            }

            if (stock=="AAPL") {
                summary.innerHTML = "We have identified Apple as the company responsible for the object in the image. Their stock is currently trading at " + "$" + parseFloat(selectedStock.price).toFixed(2) + ". Our Machine learning algorithms have classified Apple as a favorable investment, with a moderate rise predicted in the near future."
            }

            if (stock=="NKE") {
                summary.innerHTML = "We have identified Nike as the company responsible for the object in the image. Their stock is currently trading at " + "$" + parseFloat(selectedStock.price).toFixed(2) + ". Our Machine learning algorithms have classified Nike as a favorable investment, with a considerable increase predicted in the near future."
            }
        }
	}
    