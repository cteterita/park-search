// put your own value below!
const apiKey = '0f8uUcVFOmRJOXcehf8hLCg93YgWoNHv1lUJtzRZ'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function fetchParks(stateString, maxResults) {
    const params = {
        stateCode: stateString,
        limit: maxResults,
        api_key: apiKey,
    };

    fetch(`${searchURL}?${formatParams(params)}`)
        .then(response => response.json())
        .then(parsedResponse => displayResults(parsedResponse, maxResults))
        .catch(e => $('.js-status-message').text(`${e}`));
}

function formatParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

function displayResults(responseJson, maxResults) {
    $('.js-status-message').text(``);

    numResults = responseJson.data.length;
    if (numResults === 0) {
        throw 'No parks found.';
    }

    $('#results-heading').html(`${numResults} Parks Found`);

    responseJson.data.forEach(park => {
        $('#results-list').append(`<li>
        <a href='${park.url}' target='_blank'>${park.fullName}</a>
        <p>${park.description}</p>
        <p>
            ${park.addresses[0].line1}<br>
            ${park.addresses[0].line2} ${park.addresses[0].line2 ? '<br>' : ''}
            ${park.addresses[0].line3} ${park.addresses[0].line3 ? '<br>' : ''}
            ${park.addresses[0].city}, ${park.addresses[0].stateCode}, ${park.addresses[0].postalCode}
        </p>
        </li>`);
    });
    $('.results').removeClass('hidden');
}

function listenToForm() {
    $('form').submit(e => {        
        e.preventDefault();

        //Empty previous results
        $('.js-status-message').text(`Searching...`);
        $('#results-list').empty();
        $('.results').addClass('hidden'); // Hide in case results aren't valid

        //Validate maxResults
        let maxResults = $('#maxResults').val();
        if (maxResults < 1) {
            $('.js-status-message').text(`Enter a number of results to return of at least 1.`);
        } else {
            fetchParks($('#stateString').val(),maxResults);
        }
    });
}

$(listenToForm());