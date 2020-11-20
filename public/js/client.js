// gallery starts
fetch (`${window.location.origin}/api/v0/gallery`)
.then(function(response){
  // json returned from server, we need to convert it into a js object
  return response.json();
})
.then(function(tickets){
  // data js object 
  console.log(tickets);

  let output = '';

  tickets.forEach(function(tickets) {
    output += `<figure class="gallery-item">
                <a href="/gallery/${tickets.id}"><img src="images/${tickets.imagePath}.jpg" alt="catJAMMERS: ${tickets.title}" width="${tickets.width}" height="${tickets.height}"></a>
                <figcaption>
                ${tickets.title} - <a href="${tickets.credit}" target="_blank">Photog</a> - <a href="${tickets.url}" target="_blank">Source</a>
                </figcaption>
               </figure>`;
  });

  // container for images
  document.querySelector('.gallery').innerHTML = output;
})

.catch(function(error){
  if (error) {
    console.log ('ERROR');
  }
});

// gallery ends