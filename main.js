
//WEATHER API 
const api= {
    key: 'b4015e6a425025c751c407cb041d5e7a',
    url: new URL('https://api.openweathermap.org/data/2.5/weather?'),
};

//DOM manipulation
const input= document.getElementById('inp-location');
const btn= document.querySelector('.btn');
const weatherDegrees= document.querySelector('.weather-info h1');
const weatherInfo= document.querySelector('.weather-info p');
const weatherRange= document.querySelector('.weather-info h3');
const place= document.querySelector('.location-info h1');
const date= document.querySelector('.location-info p');

window.addEventListener('load', ()=>{
    let long;
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            lat= position.coords.latitude;
            long= position.coords.longitude;

            fetch(`${api.url}lat=${lat}&lon=${long}&units=metric&&appid=${api.key}`)
                .then(res=>{
                    return res.json();
                })
               .then(data=>{
                    const degrees= Math.round(data.main.temp);
                    const descrip= data.weather[0].description;
            
                    weatherDegrees.textContent= `${degrees} ºC`;
                    weatherInfo.textContent= descrip;
                    weatherRange.textContent= `${Math.round(data.main.  temp_min)} / ${Math.round(data.main.temp_max)} ºC`;
                
                    place.innerText= `${data.name}, ${data.sys.country}`;
                    date.innerText= `${new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
                }`;
               });
        })};
});

btn.addEventListener('click', ()=>{
    let value= input.value;
    apiQuery(value);
});

input.addEventListener('keypress',enter)

function enter (e){
    if(e.keyCode==13){
        apiQuery(input.value)
    }
};


async function apiQuery (query=''){
    const response= await fetch(`${api.url}q=${query}&units=metric&appid=${api.key}`);
    const data= await response.json();

    const degrees= Math.round(data.main.temp);
    const descrip= data.weather[0].description;

    weatherDegrees.textContent= `${degrees} ºC`;
    weatherInfo.textContent= descrip;
    weatherRange.textContent= `${Math.round(data.main.temp_min)} / ${Math.round(data.main.temp_max)} ºC`;
    
    place.innerText= `${data.name}, ${data.sys.country}`;

    //fetch(`${api.url}q=${query}&APPID=${api.key}`)  
        //.then(response=>{
            //return response.json()
       // }).then(data=>{
           // console.log(data)
       // })
}

