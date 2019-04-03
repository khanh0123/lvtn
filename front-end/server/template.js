export default function htmlTemplate({reactDom, reduxState, helmetData, version}) {
    let staticDomain = '';
    return `<!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${ helmetData && helmetData.title ? helmetData.title.toString() : ''}
            ${ helmetData && helmetData.meta ? helmetData.meta.toString() : ''}
            ${ helmetData && helmetData.script ? helmetData.script.toString() : ''}
            ${ helmetData && helmetData.link  ? helmetData.link.toString() : ''}

            <link href="${staticDomain}/assets/images/favicon.png" rel="icon" />
            <!-- bootstrap css -->
            <link href="${staticDomain}/assets/vendors/bootstrap/bootstrap.min.css" rel="stylesheet" />
            <!-- <link href="${staticDomain}/assets/css/bootstrap-select.min.css" rel="stylesheet" /> -->
            <!-- / bootstrap css -->
            <!-- owl carousel css -->
            <link href="${staticDomain}/assets/vendors/owlcarousel/owl.carousel.css" rel="stylesheet" />
            <!-- / owl carousel css -->
            <!--  icon css -->
            <link href="${staticDomain}/assets/css/font-awesome.min.css" rel="stylesheet" />
            <link href="${staticDomain}/assets/css/flaticon.css" rel="stylesheet" />
            <link href="${staticDomain}/assets/css/icofont.css" rel="stylesheet" />
            <!-- / icon css -->
            <!-- animations css -->
            <link href="${staticDomain}/assets/vendors/animations/animate.css" rel="stylesheet" />
            <!-- <link href="${staticDomain}/assets/vendors/video/video.popup.css" rel="stylesheet" /> -->
            <!-- <link href="https://vjs.zencdn.net/7.2.2/video-js.css" rel="stylesheet"> -->
            <!-- / animations css -->
            <!-- animations css -->
            <link href="${staticDomain}/assets/vendors/navmenu/bootsnav.css" rel="stylesheet" />
            <!-- / animations css -->
            <!-- slider css -->
            <link rel="stylesheet" href="${staticDomain}/assets/vendors/bootstrap-slider/bootstrap-touch-slider.css">
            <!-- / slider css -->
            <!--  style css -->
            <link href="${staticDomain}/assets/css/style.css" rel="stylesheet" />
            <!-- / style css -->
            <!--  media css -->
            <link href="${staticDomain}/assets/css/media.css" rel="stylesheet" />
            
            <!-- / media css -->
            <link href="${staticDomain}/assets/css/loginsignup.css" rel="stylesheet" />
            <!-- / font css -->
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
                integrity="sha384-OHBBOqpYHNsIqQy8hL1U+8OXf9hH6QRxi0+EODezv82DfnZoV7qoHAZDwMwEJvSw" crossorigin="anonymous">
            <link href='https://fonts.googleapis.com/css?family=Roboto:100,200,300,400,500,600,700,900' rel='stylesheet'
                type='text/css'>
            <link rel="stylesheet" href="//vjs.zencdn.net/5.12/video-js.css" />

            
            
            </head>

            <body style="overflow: hidden">
              <div id="fb-root"></div>
              <noscript>
              You need to enable JavaScript to run this app.
            </noscript>
            <div class="main" id="root">${ reactDom}</div>
            
              <script>
                window.__REDUX_DATA__ = ${ JSON.stringify(reduxState)}
            </script>
              <script>
                (function (l) {
                  if (l.search) {
                    var q = {};
                    l.search.slice(1).split('&').forEach(function (v) {
                      var a = v.split('=');
                      q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
                    });
                    if (q.p !== undefined) {
                      window.history.replaceState(null, null,
                        l.pathname.slice(0, -1) + (q.p || '') +
                        (q.q ? ('?' + q.q) : '') +
                        l.hash
                      );
                    }
                  }
                }(window.location))</script>
            
              <script>
                window.fbAsyncInit = function () {
                  FB.init({
                    appId: '361492804618262',
                    cookie: true,  // enable cookies to allow the server to access 
                    // the session
                    xfbml: true,  // parse social plugins on this page
                    version: 'v3.1' // The Graph API version to use for the call
                  });
            
                };
                // Load the SDK asynchronously
                (function (d, s, id) {
                  var js, fjs = d.getElementsByTagName(s)[0];
                  if (d.getElementById(id)) return;
                  js = d.createElement(s); js.id = id;
                  js.src = "https://connect.facebook.net/en_US/sdk.js";
                  fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));</script>

              <script src="${staticDomain}/assets/js/jquery-1.12.4.min.js"></script>
              <script src="${staticDomain}/assets/vendors/bootstrap/bootstrap.min.js"></script>
              <!-- <script src="${staticDomain}/assets/js/bootstrap-select.js"></script> -->
              <script src="${staticDomain}/assets/vendors/navmenu/bootsnav.js"></script>
              <!-- <script src="${staticDomain}/assets/vendors/animations/wow.min.js"></script> -->
              <script src="${staticDomain}/assets/vendors/owlcarousel/owl.carousel.min.js"></script>
              <!-- <script src="${staticDomain}/assets/js/jquery.mixitup.min.js"></script> -->
              <!-- <script src="${staticDomain}/assets/js/tab.js"></script> -->
              <script src="//vjs.zencdn.net/5.12/video.js"></script>
              <script src="${staticDomain}/app.bundle.js?v=${version}" type="text/javascript"></script>
            
              <script>
                $(function () {
                  $('body').on('click', '#back-top', function () {
                    $("html, body").animate({
                      scrollTop: 0
                    }, 1000);
                    return false;
                  });
                });</script>
            </body>
            
            </html>
    `;
}