<ul class="nav menu-left-custom">
                    <li class="active">
                        <a href="{{ base_url('admin') }}">
                            <i class="material-icons">dashboard</i>
                            <p>Trang chính</p>
                        </a>
                    </li>
                    
                    @if (Session::get('permission')->isAdmin)
                    <li>
                        <a data-toggle="collapse" href="{{ base_url('admin#groupAdmin') }}">
                            <i class="material-icons">group</i>
                            <p>Quản Lý Admin
                                <b class="caret"></b>
                            </p>
                        </a>
                        <div class="collapse" id="groupAdmin">
                            <ul class="nav">
                                <li class="group show">
                                    <a href="{{ base_url('admin/group') }}">Danh sách nhóm</a>
                                </li>
                                <li class="group add">
                                    <a href="{{ base_url('admin/group/add') }}">Thêm nhóm</a>
                                </li>
                                <li class="admin show">
                                    <a href="{{ base_url('admin/user') }}">Danh sách Admin</a>
                                </li>
                                <li class="admin add">
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
                        <a data-toggle="collapse" href="{{ base_url('admin#catcotgen') }}">
                            <i class="material-icons">category</i>
                            <p>Quản Lý DM QG TL
                                <b class="caret"></b>
                            </p>
                        </a>
                        <div class="collapse" id="catcotgen">
                            <ul class="nav show">
                                <li class="category">
                                    <a href="{{ base_url('admin/category') }}">Danh sách danh mục</a>
                                </li>
                                <li class="country">
                                    <a href="{{ base_url('admin/country') }}">Danh sách quốc gia</a>
                                </li>
                                <li class="genre">
                                    <a href="{{ base_url('admin/genre') }}">Danh sách thể loại</a>
                                </li>
                                
                            </ul>
                            @if (Session::get('permission')->canWrite)
                            <ul class="nav add">
                                
                                
                                <li class="category">
                                    <a href="{{ base_url('admin/category/add') }}">Thêm danh mục</a>
                                </li>

                                <li class="country">
                                    <a href="{{ base_url('admin/country/add') }}">Thêm quốc gia</a>
                                </li>
                                <li class="genre">
                                    <a href="{{ base_url('admin/genre/add') }}">Thêm thể loại</a>
                                </li>
                                
                            </ul>
                            @endif
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
                        <a data-toggle="collapse" href="{{ base_url('admin#banner') }}">
                            <i class="material-icons">swap_horizontal_circle</i>
                            <p>Quản Lý Banner
                                <b class="caret"></b>
                            </p>
                        </a>
                        <div class="collapse" id="banner">
                            <ul class="nav">
                                <li class="show">
                                    <a href="{{ base_url('admin/banner') }}">Danh sách banner</a>
                                </li>
                                @if (Session::get('permission')->canWrite)
                                <li class="add">
                                    <a href="{{ base_url('admin/banner/add') }}">Thêm banner</a>
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