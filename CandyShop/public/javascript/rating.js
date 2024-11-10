function loadAllRatings() {
    $.get('/getRatingsList')
        .done(setList)
        .fail(function() {
            alert('Failed to load ratings list.');
        });
}

function setList(data) {
    console.log('data: ', data);
    $.each(data, function(key, val) {
        var item = $('<button></button>').text(val.title);
        item.addClass('btn btn-primary mx-2');
        item.click(function() {
            setRating(val);
        });
        $('#leftNav').append(item);
    });

    // Load an initial trip if data is not empty
    if (data.length > 0) {
        setRating(data[0]);
    } else {
        alert('No ratings available.');
    }
}

function setRating(data) {
    $('#idx').html(data.idx);
    $('#title').html(data.title);
    $('#photo').attr('src', './images/' + data.image);
    $('#date').html(data.date);
    $('label#daysLabel').html(data.days);
    $('label#locationLabel').html(data.location);

    // Display stars based on the current rating
    displayStars(data.rating);

    // Allow user to rate by clicking stars
    $('.star').each(function(index) {
        $(this).off('click').click(function() {
            var newRating = index + 1;  // Rating is 1-based
            displayStars(newRating);    // Update stars visually
            updateRating(newRating);    // Send rating to server
        });
    });
}

// Function to update star images based on rating
function displayStars(rating) {
    $('.star').each(function(index) {
        $(this).attr('src', index < rating ? './images/star.jpg' : './images/empty.png');
    });
}

function updateRating(rating) {
    const currentIdx = $('#idx').text(); // Assuming this holds the ID or index of the current rating
    const data = { rating: rating, idx: currentIdx };
    
    console.log('Sending data:', data); // Log the data sent to server

    $.post({
        url: '/submitRating',
        data: JSON.stringify(data),          // Ensure data is sent as JSON
        contentType: 'application/json',     // Specify JSON format
        success: function(response) {
            console.log('Server response:', response);
            if (response.success) {
                alert('Rating submitted successfully!');
                setRating(response.updatedData);  // Update display with new data
            } else {
                alert('Failed to submit rating. Response was not successful.');
            }
        },
        // error: function(jqXHR, textStatus, errorThrown) {
        //     console.error('Request failed:', textStatus, errorThrown);  // Log details of the failure
        //     alert('Error submitting rating. Please try again.');
        // }
    });
}




