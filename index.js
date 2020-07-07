function fetchRepos(handle) {
    fetch(`https://api.github.com/users/${handle}/repos`)
        .then(response => response.json())
        .then(parsedResponse => displayResults(parsedResponse))
        .catch(e => $('.js-error-message').text(`Error: ${e}`));
}

function displayResults(responseJson) {
    $('#results-list').empty();
    if (responseJson.message === 'Not Found') {
        throw 'User not found.';
    }


    responseJson.forEach(repo => {
        $('#results-list').append(`<li><a href='${repo.html_url}' target='_blank'>${repo.name}</a>`);
    });
    $('.results').removeClass('hidden');
}

function listenToForm() {
    $('form').submit(e => {
        e.preventDefault();
        fetchRepos($('#githubHandle').val());
    });
}

$(listenToForm());