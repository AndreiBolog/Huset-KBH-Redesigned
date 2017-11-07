function getEvents(){
    fetch("http://calindima.com/wordpress/wp-json/wp/v2/events?_embed")
    .then(res=>res.json())
    .then(showMusicEvent);
}

function showMusicEvent(data){
//    console.log(data);
    let list = document.querySelector("#list");
    let template = document.querySelector("#event-template").content;

    data.forEach(function(event){
//      console.log(event);
    let clone = template.cloneNode(true);
    let title = clone.querySelector("h1");
    let excerpt = clone.querySelector(".excerpt p");
    let price = clone.querySelector(".price span");
    let img =clone.querySelector("img");


        title.textContent = event.title.rendered;
        excerpt.innerHTML = event.excerpt.rendered;
        price.textContent = event.acf.price;
        console.log(event._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
        img.setAttribute("src", event._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
    list.appendChild(clone);
    })

}

getEvents();
