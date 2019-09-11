window.addEventListener('load',()=>{
let long;
let lat;
let temperatureDescripition = document.querySelector('.temp-desc');
let temperatureDegree = document.querySelector('.temp-degree');
let locationTimezone = document.querySelector('.location-timezone');
let temperatureSection = document.querySelector('.temp');
const temperatureSpan = document.querySelector('.temp span'); 

if(navigator.geolocation)
{


navigator.geolocation.getCurrentPosition(position =>{
long=position.coords.longitude;
lat=position.coords.latitude;
const proxy= 'https://cors-anywhere.herokuapp.com/';
const api=`${proxy}https://api.darksky.net/forecast/12d8ebfd629f21d2079dce0fb17e8707/${lat},${long}`;
fetch(api)
    .then(response =>{
    	return response.json();
    })
    .then(data =>{
    	
console.log(position);
    	const {temperature,summary,icon}= data.currently;
    temperatureDegree.textContent=temperature;
    temperatureDescripition.textContent=summary;
    locationTimezone.textContent=data.timezone;
    
let celcius = (temperature-32)* (5/9);



     seticons(icon,document.querySelector('.icon'));
     temperatureSection.addEventListener('click',() =>
     {
     	if(temperatureSpan.textContent === "`F"){
     		temperatureSpan.textContent = "`C";  
     		temperatureDegree.textContent = Math.floor(celcius);	}
     		else
     		{
     			temperatureSpan.textContent = "`F";
     			temperatureDegree.textContent = temperature;
     		}

     })
     

    });
});

}

function seticons(icon, iconID)
{
	const skycons=new Skycons({color: "white"});
    const currentIcon=icon.replace(/-/g,"_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);



}




});