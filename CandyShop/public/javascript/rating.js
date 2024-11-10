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

    // Set up star rating display
    $('.star').each(function(index) {
        $(this).attr('src', index < data.rating ? './images/star.jpg' : './images/empty.png');

        // Allow user to rate by clicking stars
        $(this).off('click').click(function() {
            var newRating = index + 1;  // Rating is 1-based
            updateRating(newRating);
        });
    });
}

function updateRating(rating) {
    const currentIdx = $('#idx').text(); // Assuming this holds the ID or index of the current rating
    const data = { rating: rating, idx: currentIdx };
    
    console.log('Sending data:', data); // Log the data sent to server

    $.post('/submitRating', data)
        .done(function(response) {
            console.log('Server response:', response);
            if (response.success) {
                alert('Rating submitted successfully!');
                setRating(response.updatedData);  // Update display with new data
            } else {
                alert('Failed to submit rating. Response was not successful.');
            }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Request failed:', textStatus, errorThrown);  // Log details of the failure
            alert('Error submitting rating. Please try again.');
        });
}

app.post('/submitRating', function(req, res) {
    const { idx, rating } = req.body;

    // Find the candy with the matching idx
    const candy = rating.find(item => item.idx === idx);
    if (candy) {
        candy.rating = rating;  // Update the rating

        // Write the updated ratings back to the file
        fs.writeFile('./public/data/rating.json', JSON.stringify(rating, null, 2), (err) => {
            if (err) return res.status(500).json({ success: false, error: 'Failed to save rating.' });
            res.json({ success: true, updatedData: candy });
        });
    } else {
        res.status(404).json({ success: false, error: 'Candy not found.' });
    }
});

