

var logTexts = function () {
    document.querySelectorAll('.userContentWrapper').forEach(function (wrapper) {
        let post = '';
        wrapper.querySelectorAll('.userContent p').forEach(function (content) {
            post += content.innerText;
            post += '\n';
        });

        //let postAuthor = wrapper.querySelector('span.fwb');

        //console.log('Post author: ', postAuthor);
        console.log('Post: ', post);

        wrapper.querySelectorAll('div._6qw3').forEach(function (comment) {
            // let author = comment.querySelector('a._6qw4').innerText;
            let commentWrapper = comment.querySelector('div._72vr');
                if(commentWrapper) {
                    if (commentWrapper.querySelector('span')) {
                        let commentText = commentWrapper.querySelector('span').innerText;
                        console.log('Comment: ', commentText);
                    }

                }

            // console.log('Comment author: ', author);

        })
    });
};

var scroller = function (by) {
    window.scrollBy(0, by)
};

var logLinks = function () {
    document.querySelectorAll('a._3084').forEach(function(element) { console.log(element.getAttribute('href'))});
};

var startScrollInterval = function (scrollBy, speed, endby) {
    var scrollInterval = setInterval(() => {
        this.scroller(scrollBy)
    }, speed * 1000);

    setTimeout(() => {
        clearInterval(scrollInterval);
        logLinks()
    }, endby * 1000)

};

startScrollInterval(5000, 0.5, 30);

// https://www.facebook.com/groups/175716329122592/search/?query=*&epa=FILTERS&filters=eyJycF9jcmVhdGlvbl90aW1lIjoie1wibmFtZVwiOlwiY3JlYXRpb25fdGltZVwiLFwiYXJnc1wiOlwie1xcXCJzdGFydF9tb250aFxcXCI6XFxcIjIwMTQtMDNcXFwiLFxcXCJlbmRfbW9udGhcXFwiOlxcXCIyMDE0LTAzXFxcIn1cIn0ifQ%3D%3D

