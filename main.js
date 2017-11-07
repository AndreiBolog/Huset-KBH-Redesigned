function getAllEvents(){
    fetch("http://calindima.com/wordpress/wp-json/wp/v2/events?_embed").then(res=>res.json()).then(showEvents);
}
function showEvents(data){
   // console.log(data);

    let list = document.querySelector('#list');
    let template = document.querySelector('#eventTemplate').content;

    data.forEach(function(theEvent){
       console.log(theEvent);
    let clone = template.cloneNode(true);
    let title = clone.querySelector("h1");
    let excerpt = clone.querySelector(".excerpt");
    let price = clone.querySelector(".price span");
    let img = clone.querySelector("img");
    let link = clone.querySelector(".read-more");
    let id = theEvent.id;

img.setAttribute('src',theEvent._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url);
title.textContent=theEvent.title.rendered;
excerpt.innerHTML=theEvent.excerpt.rendered.slice(theEvent.excerpt.rendered.indexOf('<'),theEvent.excerpt.rendered.lastIndexOf('<a'));
price.textContent=theEvent.acf.price;
link.setAttribute('href','event.html/?id='+id);
list.appendChild(clone);
    });
}
getAllEvents();
