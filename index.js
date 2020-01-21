let gResponse;

function watchForm() {
    $('#videoForm').on('submit', (event)=> {
        event.preventDefault();
        fetchVideos('');
    })
}

function fetchVideos(token) {
    $('#results').empty();
    let searchTerm = $('#searchTerm').val();
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchTerm}&type=video&key=AIzaSyBKsnKTTZcLwtZdXMyDdMtpqqo0wRH4BDA${token}`

    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        success: function(responseJSON) {
            gResponse = responseJSON;
            displayResults(responseJSON);
        },
        error: function(err) {
            console.log(err);
        }
    })
}

function displayResults(response) {
    let container = $('#results');
    response.items.forEach((el)=> {
        container.append(`<div class="item">
            <a href="https://www.youtube.com/watch?v=${el.id.videoId}" target="_blank"><h2>${el.snippet.title}</h2></a>
            <a href="https://www.youtube.com/watch?v=${el.id.videoId}" target="_blank"><img src="${el.snippet.thumbnails.high.url}" alt="videoImage"></a>
        </div>`)
    })
}

function buttonFunctionality() {
    $('#previousButton').on('click', (event)=> {
        if(gResponse.hasOwnProperty('prevPageToken')) {
            fetchVideos(`&pageToken=${gResponse.prevPageToken}`);
        }
    })

    $('#nextButton').on('click', (event)=>{
        if(gResponse.hasOwnProperty('nextPageToken')) {
            fetchVideos(`&pageToken=${gResponse.nextPageToken}`);
        }
    })
}


function init() {
    watchForm();
    buttonFunctionality();
}

init();