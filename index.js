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
        .catch(e => $('.js-error-message').text(`Error: ${e}`));
}

function formatParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

function displayResults(responseJson, maxResults) {
    $('#results-list').empty();
    $('.results').addClass('hidden'); // Hide in case results aren't valid

    numResults = responseJson.data.length;
    if (numResults === 0) {
        throw 'No parks found.';
    } else if (numResults > maxResults) { //This happens when maxResults is set to 0 or less
        throw 'Enter a number of max results of at least 1.';
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
        fetchParks($('#stateString').val(),$('#maxResults').val());
    });
}

$(listenToForm());