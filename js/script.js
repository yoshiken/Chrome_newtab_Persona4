function bookmarks_loop(ary) {
    ary.forEach(function(v, i) {
        //sp1にa class href属性を追加
        var sp1 = document.createElement("a");
        sp1.setAttribute("class", "bookmark_anchor");
        sp1.setAttribute("href", v['url']);
        var sp1_content = document.createTextNode(v['title']);
        sp1.appendChild(sp1_content);
        //sp2にコンテンツ属性を挿入
        var sp2 = document.getElementById("content");
        var parentDiv = sp2.parentNode;
        //改行のためにsp3にpを入れる
        var sp3 = document.createElement("p");
        //favicon取得
        var favget = "http://www.google.com/s2/favicons?domain=" + v['url'];
        var favicon = document.createElement("img");
        favicon.setAttribute("src", favget);
        //挿入開始
        parentDiv.insertBefore(favicon, sp2);
        parentDiv.insertBefore(sp1, sp2);
        parentDiv.insertBefore(sp3, sp2);
        //childrenの中を再帰
        if ('children' in v) {
            bookmarks_loop(v['children']);
        }
    });
}



var aElement = document.getElementById("bookmark");
aElement.onclick = function() {
      document.getElementById("content_frame").innerHTML = "<p id=" + "content" + "></p>";
    //BookmarkAPI呼び出してbookmarks_loopに投げる
    chrome.bookmarks.getTree(function(bookmark) {
        var bookmark_toolbar = bookmark[0]['children'];
        //console.log(bookmark_toolbar[0]['children']);
        bookmarks_loop(bookmark_toolbar[0]['children']);
    });

}


var aElement = document.getElementById("history");
aElement.onclick = function() {
  document.getElementById("content_frame").innerHTML = "<p id=" + "content" + "></p>";
    var query = {
        text: ''
    };
    chrome.history.search(query, function(results) {
        //console.table(results);
        bookmarks_loop(results);
    });
}


function Sorry_unimplemented(id_name){
  var aElement = document.getElementById(id_name).onclick = function() {
  
      document.getElementById("content_frame").innerHTML = "<p id=" + "content" + ">Sorry unimplemented</p>";
  }
}

Sorry_unimplemented("closetab");
Sorry_unimplemented("myapp");
Sorry_unimplemented("setting");
