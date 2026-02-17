// Pop Up On Image

$("#fixed-form-container .body").hide();
$("#fixed-form-container .image").on("click", function(e){
    $(this).next("#fixed-form-container div").slideToggle(400);
    $(this).toggleClass("expanded");
});