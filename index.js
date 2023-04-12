//Variables
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sports");
const techBtn = document.getElementById("tech");
const entBtn = document.getElementById("ent");
const searchBtn = document.getElementById("search");

const newsQuery = document.getElementById("newsQuery");
const newstype = document.getElementById("newstype");
const newsDetails = document.getElementById("newsDetails");

//Array
var newsDataArr = []; 


//apis

const API_KEY = "aa82d6fab95e475aa833243ff32cd052";
const GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?country=us&apiKey=aa82d6fab95e475aa833243ff32cd052";
const BUSINESS_NEWS= "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=aa82d6fab95e475aa833243ff32cd052";
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=gb&category=sports&apiKey=aa82d6fab95e475aa833243ff32cd052";
const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=aa82d6fab95e475aa833243ff32cd052";
const TECH_NEWS = "https://newsapi.org/v2/top-headlines?country=de&category=technology&apiKey=aa82d6fab95e475aa833243ff32cd052";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q="

window.onload = function() {
    newstype.innerHTML = "<h4>Headlines</h4>";
    fetchHeadlines();
};

generalBtn.addEventListener("click",function() {
    newstype.innerHTML = "<h4>General News</h4>";
    fetchGeneralNews();

});
businessBtn.addEventListener("click",function() {
    newstype.innerHTML = "<h4>Business</h4>";

    fetchBusinessNews();
});

sportsBtn.addEventListener("click",function() {
    newstype.innerHTML = "<h4>Sports</h4>";

    fetchSportsNews();

});

techBtn.addEventListener("click",function() {
    newstype.innerHTML = "<h4>Tech</h4>";

    fetchTechNews();

});

entBtn.addEventListener("click",function() {
    newstype.innerHTML = "<h4>Entertainment</h4>";

    fetchEntNews();

});

searchBtn.addEventListener("click",function() {
    newstype.innerHTML = "<h4>Search : " +newsQuery.value+"</h4>";

    fetchQueryNews();

});

const fetchHeadlines = async() => {
    const response = await fetch(GENERAL_NEWS);

    if (response.status >= 200 && response.status<300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
        console.log(myJson);
    }else{

    }

    displayNews();
}

const fetchGeneralNews = async() => {
    const response = await fetch(GENERAL_NEWS);

    if (response.status >= 200 && response.status<300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
        console.log(myJson);
    }else{

    }

    displayNews();
}

const fetchBusinessNews = async() => {
    const response = await fetch(BUSINESS_NEWS);

    if (response.status >= 200 && response.status<300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
        
    }else{
        console.log(response.status,response.statusText);
    }

    displayNews();
}
const fetchSportsNews = async() => {
    const response = await fetch(SPORTS_NEWS);

    if (response.status >= 200 && response.status<300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
        
    }else{
        console.log(response.status,response.statusText);
    }

    displayNews();
}

const fetchEntNews = async() => {
    const response = await fetch(ENTERTAINMENT_NEWS);

    if (response.status >= 200 && response.status<300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
        
    }else{
        console.log(response.status,response.statusText);
    }

    displayNews();
}

const fetchTechNews = async() => {
    const response = await fetch(TECH_NEWS);

    if (response.status >= 200 && response.status<300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
        
    }else{
        console.log(response.status,response.statusText);
    }

    displayNews();
}

const fetchQueryNews = async ()=>{

    if(newsQuery.value ==null)
    return;

    const response = await fetch(SEARCH_NEWS+encodeURIComponent(newsQuery.value)+"&api_key="+API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status<300){
        const myJson = await response.json();
        newsDataArr = myJson; 
    }else{
        console.log(response.status,response.statusText);
    }
    displayNews();

}

function displayNews(){

    newsDetails.innerHTML = "";

    if(newsDataArr.length==0){
    newsDetails.innerHTML = "<h5>No data found</h5>" 
    return; 
    }else {
    newsDataArr.forEach(news => {
        var date = news.publishedAt.split("T");

        var col = document.createElement('div');
        col.className = "col-sm-2 col-md-4 col-lg-3 p-2"

        var card = document.createElement('div');
        card.className ="p-2";

        var image = document.createElement('img');
        image.setAttribute("height","matchparnt");
        image.setAttribute("width","100%");
        image.src = news.urlToImage;

        var cardBody = document.createElement('div');

        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];
        
        var description = document.createElement('p');
        description.className = "text-muted";
        description.innerHTML = news.description;

        var link = document.createElement('a');
        link.className = "btn btn-dark";
        link.setAttribute('target', '_blank');
        link.href = news.url;
        link.innerHTML ="Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);
       
        card.appendChild(image);
        card.appendChild(cardBody);

        

        col.appendChild(card);


        newsDetails.appendChild(col);
    });
    
    }
}