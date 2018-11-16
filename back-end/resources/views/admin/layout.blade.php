<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <link rel="apple-touch-icon" sizes="76x76" href="http://demos.creative-tim.com/material-dashboard-pro/assets/img/apple-icon.png" />
    <link rel="icon" type="image/png" href="http://demos.creative-tim.com/material-dashboard-pro/assets/img/favicon.png" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>@yield('title')</title>
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
    <meta name="viewport" content="width=device-width" />

    <!-- Bootstrap core CSS     -->
    <link href="{{asset('assets/css/bootstrap.min.css')}}" rel="stylesheet" />
    <!--  Material Dashboard CSS    -->
    <link href="{{asset('assets/css/material-dashboard.css')}}" rel="stylesheet" />
    <!--  CSS for Demo Purpose, don't include it in your project     -->
    <link href="{{asset('assets/css/demo.css')}}" rel="stylesheet" />
    
    <!--     Fonts and icons     -->
    <link href="{{asset('assets/css/font-awesome.min.css')}}" rel="stylesheet" />
    <!-- <link href="http://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet"> -->
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons" />
    @yield('css')
</head>

<body>
    <div class="wrapper">
        <div class="sidebar" data-active-color="rose" data-background-color="black" data-image="/assets/img/sidebar-1.jpg">
            <!--
        Tip 1: You can change the color of active element of the sidebar using: data-active-color="purple | blue | green | orange | red | rose"
        Tip 2: you can also add an image using data-image tag
        Tip 3: you can change the color of the sidebar with data-background-color="white | black"
    -->
            <div class="logo">
                <a href="#" class="simple-text">
                    Quản Trị Hệ Thống
                </a>
            </div>
            <div class="logo logo-mini">
                <a href="#" class="simple-text">
                    CT
                </a>
            </div>
            <div class="sidebar-wrapper">
                <div class="user">
                    <div class="photo">
                        <img src="/assets/img/faces/card-profile1-square.jpg" />
                    </div>
                    <div class="info">
                        <a data-toggle="collapse" href="{{ base_url('admin#profile') }}" class="collapsed">
                            {{ session()->get('user')->first_name }} {{ session()->get('user')->last_name }} 
                            <b class="caret"></b>
                        </a>
                        <div class="collapse" id="profile">
                            <ul class="nav">
                                <li>
                                    <a href="/admin/profile">Trang cá nhân</a>
                                </li>
                                <li>
                                    <a href="/admin/settings">Thiết lập</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <ul class="nav menu-left-custom">
                    <li class="active">
                        <a href="{{ base_url('admin') }}">
                            <i class="material-icons">dashboard</i>
                            <p>Trang chính</p>
                        </a>
                    </li>
                    
                    @if (Session::get('permission')->isAdmin)
                    <li>
                        <a data-toggle="collapse" href="{{ base_url('admin#permission') }}">
                            <i class="material-icons">pan_tool</i>
                            <p>Quản Lý Quyền
                                <b class="caret"></b>
                            </p>
                        </a>
                        <div class="collapse" id="permission">
                            <ul class="nav">
                                <li class="show">
                                    <a href="{{ base_url('admin/permission') }}">Danh sách quyền</a>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li>
                        <a data-toggle="collapse" href="{{ base_url('admin#group') }}">
                            <i class="material-icons">group</i>
                            <p>Quản Lý Nhóm Admin
                                <b class="caret"></b>
                            </p>
                        </a>
                        <div class="collapse" id="group">
                            <ul class="nav">
                                <li class="show">
                                    <a href="{{ base_url('admin/group') }}">Danh sách nhóm</a>
                                </li>
                                <li class="add">
                                    <a href="{{ base_url('admin/group/add') }}">Thêm nhóm</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a data-toggle="collapse" href="{{ base_url('admin#user') }}">
                            <i class="material-icons">how_to_reg</i>
                            <p>Quản Lý Admin
                                <b class="caret"></b>
                            </p>
                        </a>
                        <div class="collapse" id="user">
                            <ul class="nav">
                                <li class="show">
                                    <a href="{{ base_url('admin/user') }}">Danh sách Admin</a>
                                </li>
                                <li class="add">
                                    <a href="{{ base_url('admin/user/add') }}">Thêm admin</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    @endif
                    <li>
                        <a data-toggle="collapse" href="{{ base_url('admin#movie') }}">
                            <i class="material-icons">movie</i>
                            <p>Quản Lý Phim
                                <b class="caret"></b>
                            </p>
                        </a>
                        <div class="collapse" id="movie">
                            <ul class="nav">
                                <li class="show">
                                    <a href="{{ base_url('admin/movie') }}">Danh sách phim</a>
                                </li>
                                @if (Session::get('permission')->canWrite)
                                <li class="add">
                                    <a href="{{ base_url('admin/movie/add') }}">Thêm phim mới</a>
                                </li>
                                @endif
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a data-toggle="collapse" href="{{ base_url('admin#category') }}">
                            <i class="material-icons">category</i>
                            <p>Quản Lý Danh Mục
                                <b class="caret"></b>
                            </p>
                        </a>
                        <div class="collapse" id="category">
                            <ul class="nav">
                                <li class="show">
                                    <a href="{{ base_url('admin/category') }}">Danh sách danh mục</a>
                                </li>
                                @if (Session::get('permission')->canWrite)
                                <li class="add">
                                    <a href="{{ base_url('admin/category/add') }}">Thêm danh mục</a>
                                </li>
                                @endif
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a data-toggle="collapse" href="{{ base_url('admin#country') }}">
                            <i class="material-icons">language</i>
                            <p>Quản Lý Quốc Gia
                                <b class="caret"></b>
                            </p>
                        </a>
                        <div class="collapse" id="country">
                            <ul class="nav">
                                <li class="show">
                                    <a href="{{ base_url('admin/country') }}">Danh sách quốc gia</a>
                                </li>
                                @if (Session::get('permission')->canWrite)
                                <li class="add">
                                    <a href="{{ base_url('admin/country/add') }}">Thêm quốc gia</a>
                                </li>
                                @endif
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a data-toggle="collapse" href="{{ base_url('admin#genre') }}">
                            <i class="material-icons">album</i>
                            <p>Quản Lý Thể Loại
                                <b class="caret"></b>
                            </p>
                        </a>
                        <div class="collapse" id="genre">
                            <ul class="nav">
                                <li class="show">
                                    <a href="{{ base_url('admin/genre') }}">Danh sách thể loại</a>
                                </li>
                                @if (Session::get('permission')->canWrite)
                                <li class="add">
                                    <a href="{{ base_url('admin/genre/add') }}">Thêm thể loại</a>
                                </li>
                                @endif
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a data-toggle="collapse" href="{{ base_url('admin#menu') }}">
                            <i class="material-icons">menu</i>
                            <p>Quản Lý Menu
                                <b class="caret"></b>
                            </p>
                        </a>
                        <div class="collapse" id="menu">
                            <ul class="nav">
                                <li class="show">
                                    <a href="{{ base_url('admin/menu') }}">Danh sách menu</a>
                                </li>
                                @if (Session::get('permission')->canWrite)
                                <li class="add">
                                    <a href="{{ base_url('admin/menu/add') }}">Thêm menu</a>
                                </li>
                                @endif
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a data-toggle="collapse" href="{{ base_url('admin#config') }}">
                            <i class="material-icons">build</i>
                            <p>Quản Lý Cấu hình
                                <b class="caret"></b>
                            </p>
                        </a>
                        <div class="collapse" id="config">
                            <ul class="nav">
                                <li class="show">
                                    <a href="{{ base_url('admin/config') }}">Danh sách cấu hình</a>
                                </li>
                                @if (Session::get('permission')->canWrite)
                                <li class="add">
                                    <a href="{{ base_url('admin/config/add') }}">Thêm cấu hình</a>
                                </li>
                                @endif
                            </ul>
                        </div>
                    </li>
                    
                    
                </ul>
            </div>
        </div>
        <div class="main-panel">
            <nav class="navbar navbar-transparent navbar-absolute">
                <div class="container-fluid">
                    <div class="navbar-minimize">
                        <button id="minimizeSidebar" class="btn btn-round btn-white btn-fill btn-just-icon">
                            <i class="material-icons visible-on-sidebar-regular">more_vert</i>
                            <i class="material-icons visible-on-sidebar-mini">view_list</i>
                        </button>
                    </div>
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#"> @yield('title') </a>
                    </div>
                    <div class="collapse navbar-collapse">
                        <ul class="nav navbar-nav navbar-right">
                            <li class="dropdown" title="Thông báo">
                                <a href="dashboard.html#" class="dropdown-toggle" data-toggle="dropdown">
                                    <i class="material-icons">notifications</i>
                                    <span class="notification">2</span>
                                    <p class="hidden-lg hidden-md">
                                        Thông báo
                                        <b class="caret"></b>
                                    </p>
                                </a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a href="dashboard.html#">Mike John responded to your email</a>
                                    </li>
                                    <li>
                                        <a href="dashboard.html#">You have 5 new tasks</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="dropdown" title="Admin">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <i class="material-icons">person</i>
                                    <p class="hidden-lg hidden-md">
                                    Trang cá nhân
                                        <b class="caret"></b>
                                    </p>
                                </a>
                                <form method="POST" action="{{base_url('admin/logout')}}" id="formLogout">
                                    @csrf
                                    <ul class="dropdown-menu">
                                        <li>
                                            <a href="admin/profile">Trang cá nhân</a>
                                        </li>

                                        <li>

                                            <a href="javascript:void(0)" onclick="document.getElementById('formLogout').submit()">Đăng xuất</a>
                                            <noscript>
                                              <input type="submit" value="Đăng xuất" />
                                          </noscript>

                                        </li>

                                    </ul>
                                </form>
                            </li>
                            <!-- <li class="separator hidden-lg hidden-md"></li> -->
                        </ul>
                        <form class="navbar-form navbar-right" role="search">
                            <div class="form-group form-search is-empty">
                                <input type="text" class="form-control" placeholder="Tìm kiếm">
                                <span class="material-input"></span>
                            </div>
                            <button type="submit" class="btn btn-white btn-round btn-just-icon">
                                <i class="material-icons">search</i>
                                <div class="ripple-container"></div>
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
            <div class="content">
                @yield('main')
            </div>
            <footer class="footer">
                <div class="container-fluid">
                    <nav class="pull-left">
                        <ul>
                            <li>
                                <a href="dashboard.html#">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="dashboard.html#">
                                    Company
                                </a>
                            </li>
                            <li>
                                <a href="dashboard.html#">
                                    Portfolio
                                </a>
                            </li>
                            <li>
                                <a href="dashboard.html#">
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <p class="copyright pull-right">
                        &copy;
                        <script>
                            document.write(new Date().getFullYear())
                        </script>
                        <a href="http://www.creative-tim.com">Creative Tim</a>, made with love for a better web
                    </p>
                </div>
            </footer>
        </div>
    </div>
    <div class="fixed-plugin">
        <div class="dropdown show-dropdown">
            <a href="dashboard.html#" data-toggle="dropdown">
                <i class="fa fa-cog fa-2x"> </i>
            </a>
            <ul class="dropdown-menu">
                <li class="header-title"> Sidebar Filters</li>
                <li class="adjustments-line">
                    <a href="javascript:void(0)" class="switch-trigger active-color">
                        <div class="badge-colors text-center">
                            <span class="badge filter badge-purple" data-color="purple"></span>
                            <span class="badge filter badge-blue" data-color="blue"></span>
                            <span class="badge filter badge-green" data-color="green"></span>
                            <span class="badge filter badge-orange" data-color="orange"></span>
                            <span class="badge filter badge-red" data-color="red"></span>
                            <span class="badge filter badge-rose active" data-color="rose"></span>
                        </div>
                        <div class="clearfix"></div>
                    </a>
                </li>
                <li class="header-title">Sidebar Background</li>
                <li class="adjustments-line">
                    <a href="javascript:void(0)" class="switch-trigger background-color">
                        <div class="text-center">
                            <span class="badge filter badge-white" data-color="white"></span>
                            <span class="badge filter badge-black active" data-color="black"></span>
                        </div>
                        <div class="clearfix"></div>
                    </a>
                </li>
                <li class="adjustments-line">
                    <a href="javascript:void(0)" class="switch-trigger">
                        <p>Sidebar Mini</p>
                        <div class="togglebutton switch-sidebar-mini">
                            <label>
                                <input type="checkbox" unchecked="">
                            </label>
                        </div>
                        <div class="clearfix"></div>
                    </a>
                </li>
                <li class="adjustments-line">
                    <a href="javascript:void(0)" class="switch-trigger">
                        <p>Sidebar Image</p>
                        <div class="togglebutton switch-sidebar-image">
                            <label>
                                <input type="checkbox" checked="">
                            </label>
                        </div>
                        <div class="clearfix"></div>
                    </a>
                </li>
                <li class="header-title">Images</li>
                <li class="active">
                    <a class="img-holder switch-trigger" href="javascript:void(0)">
                        <img src="/assets/img/sidebar-1.jpg" alt="" />
                    </a>
                </li>
                <li>
                    <a class="img-holder switch-trigger" href="javascript:void(0)">
                        <img src="/assets/img/sidebar-2.jpg" alt="" />
                    </a>
                </li>
                <li>
                    <a class="img-holder switch-trigger" href="javascript:void(0)">
                        <img src="/assets/img/sidebar-3.jpg" alt="" />
                    </a>
                </li>
                <li>
                    <a class="img-holder switch-trigger" href="javascript:void(0)">
                        <img src="/assets/img/sidebar-4.jpg" alt="" />
                    </a>
                </li>
                <li class="button-container">
                    <div class="">
                        <a href="http://www.creative-tim.com/product/material-dashboard-pro" target="_blank" class="btn btn-rose btn-block">Buy Now</a>
                    </div>
                    <div class="">
                        <a href="http://www.creative-tim.com/product/material-dashboard" target="_blank" class="btn btn-info btn-block">Get Free Demo</a>
                    </div>
                </li>
                <li class="header-title">Thank you for 95 shares!</li>
                <li class="button-container">
                    <button id="twitter" class="btn btn-social btn-twitter btn-round"><i class="fa fa-twitter"></i> &middot; 45</button>
                    <button id="facebook" class="btn btn-social btn-facebook btn-round"><i class="fa fa-facebook-square"> &middot;</i>50</button>
                </li>
            </ul>
        </div>
    </div>
</body>
<!--   Core JS Files   -->
<script src="/assets/js/jquery-3.1.1.min.js" type="text/javascript"></script>
<script src="/assets/js/jquery-ui.min.js" type="text/javascript"></script>
<script src="/assets/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/assets/js/material.min.js" type="text/javascript"></script>
<script src="/assets/js/perfect-scrollbar.jquery.min.js" type="text/javascript"></script>
<!-- Forms Validations Plugin -->
<!-- <script src="/assets/js/jquery.validate.min.js"></script> -->
<!--  Plugin for Date Time Picker and Full Calendar Plugin-->
<!-- <script src="/assets/js/moment.min.js"></script> -->

<!--  Notifications Plugin    -->
<script src="/assets/js/bootstrap-notify.js"></script>
<!--   Sharrre Library    -->
<!-- <script src="/assets/js/jquery.sharrre.js"></script> -->
<!-- DateTimePicker Plugin -->
<!-- <script src="/assets/js/bootstrap-datetimepicker.js"></script> -->

<!-- Sliders Plugin -->
<!-- <script src="/assets/js/nouislider.min.js"></script> -->

<!-- Select Plugin -->
<!-- <script src="/assets/js/jquery.select-bootstrap.js"></script> -->

<!-- Sweet Alert 2 plugin -->
<!-- <script src="/assets/js/sweetalert2.js"></script> -->
<!--	Plugin for Fileupload, full documentation here: http://www.jasny.net/bootstrap/javascript/#fileinput -->
<!-- <script src="/assets/js/jasny-bootstrap.min.js"></script> -->
<!--  Full Calendar Plugin    -->
<!-- <script src="/assets/js/fullcalendar.min.js"></script> -->
<!-- TagsInput Plugin -->
<!-- <script src="/assets/js/jquery.tagsinput.js"></script> -->
<!-- Material Dashboard javascript methods -->
<script src="/assets/js/material-dashboard.js"></script>
<!-- Material Dashboard DEMO methods, don't include it in your project! -->

<script src="/assets/js/demo.js"></script>
<script src="/assets/js/main.js"></script>
@yield('js')
<script>
    $(document).ready(function() {
        $('li.disabled>a,li.active>a').click(function(event) {
            event.preventDefault();
        });

        @if(!empty($message))
            var type = '{{$message['type'] == 'success' ? 'success' : 'danger'}}';
            var message = '{{ $message['message'] }}';
            showNotification( type , message , 4000);
        @endif

    });
</script>



</html>