var ID;

var check_pos = function() {
    var middle_of_screen = $(window).height()/2 + $(window).scrollTop();
    var button = $("[data-footnote-identifier="+ID+"]");  
    if (button.offset().top > middle_of_screen){
      $("aside").css("bottom", $(window).height()-button[0].getBoundingClientRect().bottom+10);
      $("aside").css("top", "auto");
                $(".footnote-tip").css("top", $("aside").height()-10);
        $(".footnote-tip").css("box-shadow", "4px 2px 2px 0px rgba(0,0,0,0.2)");
    } else {
      $("aside").css("top", button[0].getBoundingClientRect().bottom+10); 
      $("aside").css("bottom", "auto");
                $(".footnote-tip").css("top", -10);
        $(".footnote-tip").css("box-shadow", "-4px -2px 2px 0px rgba(0,0,0,0.2)");
    }
    var left_of_footnote = button[0].getBoundingClientRect().left - $("aside").width()/2;
    var right_of_footnote = button[0].getBoundingClientRect().right + $("aside").width()/2;  
    if (left_of_footnote < 0){
        $("aside").css("left", 10);
    } else if (right_of_footnote > $(window).width()){
        $("aside").css("left", $(window).width() - $("aside").width()-10);
    } else{
        $("aside").css("left", button[0].getBoundingClientRect().left - $("aside").width()/2);
    }
};

$(document).on("click", function () {
    if ($(event.target).hasClass("footnote-button")){ 
        if (($("aside").hasClass("active") && ($(event.target).attr("data-footnote-identifier")===ID))){
            $("aside").removeClass("active");
        } 
        else{
            $("aside").addClass("active");
            ID = $(event.target).attr("data-footnote-identifier");
            var content = $(event.target).attr("data-footnote-content");
            $("#footnote-text").text(content);
            check_pos();
        }
    }   
    else if (!$(event.target).hasClass('footnote-content-wrapper')){
        $("aside").removeClass('active');
    };
})

$(window).scroll(function(){
    if ($("aside").hasClass("active")){
        check_pos();
    }
})