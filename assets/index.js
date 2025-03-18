// a function that checks if the dimention is lg
function isLg() {
    return window.matchMedia("(min-width: 992px)").matches;
}



$(document).ready(function () {
    
    // set the sidebar disabled by default 
    $("#sidebar").mCustomScrollbar();

    if (isLg()) {
        if (localStorage.getItem('sidebarState') === 'true') {
            $('#sidebar').addClass('active');
            $('#brandIcon').addClass('active');
        }else{
            $('#sidebar').removeClass('active');
            $('#brandIcon').removeClass('active');
        }
        $('.sidebarCollapse').click(function () {
            $('#sidebar').toggleClass('active');
            $('#brandIcon').toggleClass('active');
            // store the state of the sidebar in the local storage
            localStorage.setItem('sidebarState', $('#sidebar').hasClass('active'));
        });
    }
    else {
        // if is toogle-icon is clicked then toggle the sidebar
        $('.toogle-icon').click(function () {
            $('#sidebar').toggleClass('active');
            $('#brandIcon').toggleClass('active');
        });
    }
    
    setTimeout(function () {
        $("#player-frame").attr("src", $(".watch-episode .ep-link").first().attr("data-src"));
    }, 10);

    $(".watch-episode .ep-link").click(function () {
        $("#player-frame").attr("src", $(this).attr("data-src"));
    });
});

function filterQuality(selector,quality) {
    if (quality === "الكل"){
        $(selector).each((i,value)=>{
            $(value).show()
        })
    }
    else{
        $(selector).each((i,value)=>{
            if ($(value).children(0).text()===quality) $(value).show();
            else $(value).hide();
        })
    }
}
function filterEpisode(selector,text) {
    if (text === "")
        $(selector).each((i,value)=>{
            $(value).show()
        })
    else
        $(selector).each((i,value)=>{
            if ($(value).text().includes(text)) $(value).show();
            else $(value).hide();
        })
}

$("#watch .nav-link").on("click",event=>{
    const quality = $(event.target).text();
    filterQuality("#watch .no-link",quality);
});
$("#download .nav-link").on("click",event=>{
    const quality = $(event.target).text();
    filterQuality("#download .no-link",quality);
});
$("#episode-search-input").on("input",function () {
    const episodenumber = $("#episode-search-input").val();
    filterEpisode("#suggestions .no-link",episodenumber)
});