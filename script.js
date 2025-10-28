(function() {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')

  example.addEventListener("click", function() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        console.log(array)
        answer.innerHTML = JSON.stringify(array);
      })
  })

  cw1.addEventListener("click", function() {
    fetchGET();
  });

  function fetchGET(url) {
    answer.innerHTML = "Loading...";
    if (url == null) {
      url = "https://jsonplaceholder.typicode.com/posts";
    }

    setTimeout(function() {
      answer.innerHTML = "";
      var list = answer.appendChild(document.createElement("ul"));

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
            data.forEach(element => {
              var item = list.appendChild(document.createElement("li"));
              item.innerHTML = `
                <div class='postDiv'>
                  <b>ID: ${element.id}</b>
                  <p class='title'><u>Title:</u><br> ${element.title}</p>
                  <p><u>Body:</u><br> ${element.body}</p>
                  <p><u>User ID:</u><br> ${element.userId}</p>
                </div>
              `;
            });
          } else {
            var item = list.appendChild(document.createElement("li"));
            item.innerHTML = `
              <div class='postDiv'>
                <b>ID: ${data.id}</b>
                <p class='title'><u>Title:</u><br> ${data.title}</p>
                <p><u>Body:</u><br> ${data.body}</p>
                <p><u>User ID:</u><br> ${data.userId}</p>
              </div>
            `;
          }
        })
        .catch(error => {
          answer.innerHTML = "Error fetching data.";
          console.error(error);
        });

    }, 2000);
  }

  var select1 = document.getElementById("select1");
  select1.addEventListener("change", function() {
    fetchGET("https://jsonplaceholder.typicode.com/posts/" + select1.value);
  });


  function fetchPOST() {
    answer.innerHTML = "Processing...";

    const newPost = {
      title: "Mój nowy post",
      body: "To jest przykładowa treść nowego posta.",
      userId: 1
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(newPost)
    })
      .then(response => response.json())
      .then(data => {
        answer.innerHTML = `Dodano nowy post o ID = ${data.id}`;
        console.log("Odpowiedź serwera:", data);
      });
  }



  cw2.addEventListener("click", function() {
    fetchPOST();

  })

  cw3.addEventListener("click", function() {
    //TODO
  })

})();
