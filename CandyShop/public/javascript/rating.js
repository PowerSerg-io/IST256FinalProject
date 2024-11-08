function loadAllRatings(){
    $.get('/getRatingsList', setList)
}

function setList(data){
    console.log('data: ', data)
    $.each(data, function(key, val) {
        var item = $('<button></button>').text(val.title)
        item.addClass('btn btn-primary mx-2')
        // item.click TODO
        item.click(function(){
            setRating(val)
        })
        $('#leftNav').append(item)
    })
    // TODO load an initial trip
    setRating(data[0])
}

function setRating(data){
    $('#idx').html(data.idx)
    $('#title').html(data.title)
    $('#photo').attr('src', './images/' + data.image)
    $('#date').html(data.date);
    $('label:first').html(data.days);
    $('label:first').html(data.location);
    $('.star:gt('+ (parseInt(data.rating) -1) + ")")
    .attr("src", "images/empty.png")
}

// function loadAllRatings(){
//     $.get('/getRatingsList', setList);
// }

// function setList(data){
//     console.log('data: ', data);
//     $.each(data, function(key, val) {
//         var item = $('<button></button>').text(val.title);
//         item.addClass('btn btn-primary mx-2');
//         item.click(function(){
//             getRating(val);
//         });
//         $('#leftNav').append(item);
//     });
//     setRating(data[0]);  // Load the initial trip
// }

// function setRating(data){
//     $('#idx').html(data.idx);
//     $('#title').html(data.title);
//     $('#photo').attr('src', './images/' + data.image);
//     $('#date').html(data.date);
//     $('label:first').html(data.days);
//     $('label:last').html(data.location); // Fixed the location display
    
//     // Set up star rating
//     $('.star').each(function(index) {
//         $(this).attr('src', index < data.rating ? 'images/full.png' : 'images/empty.png');

//         // Allow user to rate by clicking stars
//         $(this).off('click').click(function() {
//             var newRating = index + 1;  // Rating is 1-based
//             updateRating(newRating);
//         });
//     });
// }

// function updateRating(rating) {
//     $.post('/submitRating', { rating: rating }, function(response) {
//         if (response.success) {
//             alert('Rating submitted successfully!');
//             setRating(response.updatedData);  // Optionally update the display
//         } else {
//             alert('Failed to submit rating.');
//         }
//     });
// }
//  21:35