function bookmarks_loop(ary) {
    ary.forEach(function(v, i) {
        tmp = v['title'];　
        var sp1 = document.createElement("a");
        sp1.setAttribute("class", "bookmark_anchor");
        sp1.setAttribute("href", v['url']);
        var sp1_content = document.createTextNode(tmp);
        sp1.appendChild(sp1_content);
        var sp2 = document.getElementById("content");
        var parentDiv = sp2.parentNode;
        parentDiv.insertBefore(sp1, sp2);

        if ('children' in v) {
            bookmarks_loop(v['children']);
        }
    });
}

var aElement = document.getElementById("bookmark");
aElement.onclick = function() {
    chrome.bookmarks.getTree(function(bookmark) {
        var bookmark_toolbar = bookmark[0]['children'];
        console.log(bookmark_toolbar[0]['children']);
        bookmarks_loop(bookmark_toolbar[0]['children']);
    });

}


var aElement = document.getElementById("history");
aElement.onclick = function() {
    document.getElementById("js").innerHTML = "<p>history</p>";
}

var aElement = document.getElementById("closetab");
aElement.onclick = function() {
    document.getElementById("js").innerHTML = "<p>Close tab</p>";
}

var aElement = document.getElementById("myapp");
aElement.onclick = function() {
    document.getElementById("js").innerHTML = "<p>My App</p>";
}

var aElement = document.getElementById("setting");
aElement.onclick = function() {
    document.getElementById("js").innerHTML = "<p>Setting</p>";
}
