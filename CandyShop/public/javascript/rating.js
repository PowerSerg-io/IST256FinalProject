function loadAllRatings(){
    $.get('/getRatingsList', setList)
}

function setList(data){
    console.log('data: ', data)
    $.each(data, function(key, val) {
        var item = $('<button></button>').text(val.title)
        item.addClass('btn btn-primary mx-2')
        // item.click TODO
        $('#leftNav').append(item)
    })
    // TODO load an initial trip
    setRating(data[0])
}

function setRating(data){
    $('#idx').html(data.idx)
    $('#title').html(data.title)
    $('#photo').attr('src', './images/' + data.image)
}