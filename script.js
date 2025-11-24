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
      var table = answer.appendChild(document.createElement("table"));
      var thead = table.appendChild(document.createElement("thead"));
      var headerRow = thead.appendChild(document.createElement("tr"));
      
      headerRow.innerHTML = `
        <th>ID</th>
        <th>Title</th>
        <th>Body</th>
        <th>User ID</th>
      `;
      
      var tbody = table.appendChild(document.createElement("tbody"));

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
            data.forEach(element => {
              var row = tbody.appendChild(document.createElement("tr"));
              row.innerHTML = `
                <td>${element.id}</td>
                <td class='post-title'>${element.title}</td>
                <td class='post-body'>${element.body}</td>
                <td>${element.userId}</td>
              `;
            });
          } else {
            var row = tbody.appendChild(document.createElement("tr"));
            row.innerHTML = `
              <td>${data.id}</td>
              <td class='post-title'>${data.title}</td>
              <td class='post-body'>${data.body}</td>
              <td>${data.userId}</td>
            `;
            console.log("Wybrany post:", data);
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
