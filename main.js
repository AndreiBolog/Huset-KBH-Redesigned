function getEvents(){
    fetch("http://calindima.com/wordpress/wp-json/wp/v2/events?_embed")
    .then(res=>res.json())
    .then(showMusicEvent);
}

function showMusicEvent(data){
    console.log(data);
    let list = document.querySelector("#list");
    let template = document.querySelector("#event-template").content;

    data.forEach(function(event){
      console.log(event);
    let clone = template.cloneNode(true);
    let title = clone.querySelector("h1");
    let execerpt =
        title.textContent = event.title.rendered;
    list.appendChild(clone);
    })

}

getEvents();
