$(document).ready(function(){
    if (typeof(window.DOC_VERSIONS) == "undefined") {
        window.DOC_VERSIONS = ["dev"];
    }
    var url_parts = /(.*:\/\/[^/]+\/)(.+?)(\/.*)/.exec(window.location.href);

    $(".dropdown > a").text(url_parts[2]);
    if(url_parts[3].length > 1 && url_parts[3][1] != "#") {
        $(".dropdown").click(function(evt){
            $(".dropdown > div.dropdown-menu").toggleClass("show");
            return false;
        });

        $('body').click(function(evt){
            if($(evt.target).closest('div.dropdown-menu').length) {
                return true;
            }
            if($(evt.target).closest('div.dropdown').length) {
                return true;
            }
            $(".dropdown > div.dropdown-menu").removeClass("show");
        });
    }

    var current_ver = url_parts[2].replace(/\.0+$/, '');

    $.each(DOC_VERSIONS, function(index, value) {
        if(value == current_ver) {
            // mobile
            $("select#version-selector").append(
                $('<option value="' + value + '" selected="selected">' + value + '</option>'));
            return;
        }
        // desktop
        $(".dropdown > div.dropdown-menu").append(
            $('<a class="dropdown-item" href="#">' + value + '</a>'));
        // mobile
        $("select#version-selector").append(
            $('<option value="' + value + '">' + value + '</option>'));
    });

    $(".dropdown > div.dropdown-menu > a").on("click", function() {
        var target_version = $(this).text().trim();
        if (target_version == url_parts[2]) return;
        window.location.href = url_parts[1] + target_version + url_parts[3];
    });

    $("select#version-selector").change(function() {
        var target_version = $("select#version-selector option:selected").text();
        if (target_version == url_parts[2]) return;
        window.location.href = url_parts[1] + target_version + url_parts[3];
    });
});
