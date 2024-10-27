function getCandyList() {
    $.get("/getList", {}, updateCandy)
}
function getCandyList() {
    console.log("getCandyList is running");  // Debugging log
    $.get("/getList", {}, updateCandy);
}


//function updateImages(jsonList) {
 ///   console.log('jsonList', jsonList)
 ///}