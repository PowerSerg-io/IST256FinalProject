function getCandyList() {
    $.get("/getList", {}, updateCandy)
}

// function updateImages(jsonList) {
//     console.log('jsonList', jsonList)
// }