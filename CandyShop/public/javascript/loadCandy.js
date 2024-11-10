function getCandyList() {
    $.get("/getList")
        .done(updateCandy)
        .fail(function() {
            alert('Failed to load the candy list.');
        });
}

function updateCandy(jsonList) {
    console.log('jsonList', jsonList);

    // Assuming 'jsonList' is an array of candy objects with properties like 'name' and 'image'
    $('#candyContainer').empty();  // Clear previous items if needed
    $.each(jsonList, function(index, candy) {
        // Create an image element for each candy
        var candyItem = $('<div class="candy-item"></div>');
        var candyImage = $('<img>').attr('src', './images/' + candy.image).addClass('candy-image');
        var candyName = $('<p></p>').text(candy.name).addClass('candy-name');

        candyItem.append(candyImage).append(candyName);
        $('#candyContainer').append(candyItem);
    });
}
