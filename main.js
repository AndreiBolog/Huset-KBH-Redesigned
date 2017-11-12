document.querySelector('.navibar span').addEventListener('click',openNav);

document.querySelector('#mySidenav a').addEventListener('click',closeNav);

function openNav() {
    document.querySelector('#mySidenav').style.width = "100%";
}

function closeNav() {
    document.querySelector('#mySidenav').style.width = "0";
}

//JSON DATA Manipulation
function getAllEvents(){
    fetch("http://calindima.com/wordpress/wp-json/wp/v2/events?_embed&categories=18").then(res=>res.json()).then(showEvents);
}
function getEventsBySearch(searchId){
    fetch("http://calindima.com/wordpress/wp-json/wp/v2/events?_embed&categories=18&search="+searchId).then(e=>e.json()).then(showEvents);
}

function getEventsByGenre(genreId){
    fetch("http://calindima.com/wordpress/wp-json/wp/v2/events?_embed&categories="+genreId).then(res=>res.json()).then(showEvents);
}

function getSingleEvent(eventId){
    fetch("http://calindima.com/wordpress/wp-json/wp/v2/events/"+eventId+"/?_embed").then(res=>res.json()).then(showSingleEvent);
}

function getMenu(){
    fetch("http://calindima.com/wordpress/wp-json/wp/v2/categories").then(res=>res.json()).then(showMenu);
}

function showMenu(genres){
    //console.log(genres);
    let linkTemplate = document.querySelector('#linkTemplate').content;
    genres.forEach(function(genre){
        if(genre.count > 0 && genre.parent == 18 ){
            let clone = linkTemplate.cloneNode(true);
            let parent = document.querySelector('.genre-menu');

            clone.querySelector('a').textContent=genre.name;
            clone.querySelector('a').setAttribute('href','index.html?genreid='+genre.id);

            parent.appendChild(clone);}});
}

function showSingleEvent(data){
    //console.log(data);
    document.querySelector('#single h1').textContent=data.title.rendered;
    document.querySelector('.date span').textContent=data.date.slice(0,data.date.indexOf('T'));
    document.querySelector('#single img').setAttribute('src',data._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url);
    document.querySelector('.content').innerHTML=data.content.rendered;
    document.querySelector('.price span').textContent=data.acf.price;
    document.querySelector('.venue span').textContent=data.acf.venue;


}
function showEvents(data){
    // console.log(data);

    let list = document.querySelector('#list');
    let template = document.querySelector('#eventTemplate').content;

    data.forEach(function(theEvent){
        //console.log(theEvent);
        let clone = template.cloneNode(true);
        let title = clone.querySelector("h1");
        let excerpt = clone.querySelector(".excerpt");
        let price = clone.querySelector(".price span");
        let img = clone.querySelector("img");
        let link = clone.querySelector("a.read-more");

        img.setAttribute('src',theEvent._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url);
        title.textContent=theEvent.title.rendered;
        excerpt.innerHTML=theEvent.excerpt.rendered.slice(theEvent.excerpt.rendered.indexOf('<'),theEvent.excerpt.rendered.lastIndexOf('<a'));
        price.textContent=theEvent.acf.price;
        link.setAttribute('href','event.html?id='+theEvent.id);
        list.appendChild(clone);
    });
}

let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");
let genreid = searchParams.get('genreid');
let searchid = searchParams.get('search');

getMenu();

if(id){
    getSingleEvent(id);
}
else if(searchid){
    getEventsBySearch(searchid);
}
else if(genreid){
    getEventsByGenre(genreid);
}
else{
    getAllEvents();
}

//Genres are actually subcategories in the WP website. I was lazy //and didn't replace genres/genre with categories/category.
