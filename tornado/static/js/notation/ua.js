var ua = window.navigator.userAgent,
    className = " ",
    $html = document.documentElement;
className += ua.match(/iphone|ipod|ipad/i) ? "ios" : "other", $html.className += className;


