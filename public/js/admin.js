// asynchronous fetch for subscribe form
export const subscribers = fetch(`${window.location.origin}/api/v0/subscribers`)
  .then((response) => {
    // JSON returned from server
    // We need to convert it into a Javascript object
    return response.json();
  })
  .then((subscribers) => {
    // `data Javascript object
    console.log(subscribers);
    let output = '';
    subscribers.forEach((subscriber) => {
      output += `
        <div class="admin-item">
          <p>Name: ${subscriber.name}</p>
          <p>Email: ${subscriber.email}</p>
        </div>
      `;
    });
    // Output to DOM
    document.querySelector('.admin-data').innerHTML = output;
  })
  .catch((error) => {
    console.log('Oooooooops!');
  });