@extends('admin/layout' , ['message' => !empty($message) ? $message : []])
@section('title', "Danh sách user")
@section('main')
<div class="container-fluid">

    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header card-header-icon" data-background-color="purple">
                    <i class="material-icons">assignment</i>
                </div>
                <div class="card-content">
                    <h4 class="card-title">Danh sách user </h4>
                    <div class="toolbar">                        

                    </div>
                    @if(!empty($data['info']))
                    <form class="form-inline" method="GET" action="">
                        <!-- <div class="row"> -->
                            <div class="col-sm-12">
                                <div style="margin: 5px;width: 13%;display: inline-block">
                                    <span>Hiển thị</span>
                                    <select class="selectpicker col-4" data-style="btn btn-primary btn-round"  data-size="7" name="limit">
                                        <option value="10" {{ @$data['filter']['limit'] == 10 ? 'selected' : ''}}>10</option>
                                        <option value="20" {{ @$data['filter']['limit'] == 20 ? 'selected' : ''}}>20</option>
                                        <option value="30" {{ @$data['filter']['limit'] == 30 ? 'selected' : ''}}>30</option>
                                        <option value="40" {{ @$data['filter']['limit'] == 40 ? 'selected' : ''}}>40</option>
                                        <option value="80" {{ @$data['filter']['limit'] == 80 ? 'selected' : ''}}>80</option>
                                    </select>
                                    <!-- <span>Kết quả</span> -->
                                </div>
                                <div class="my-container" style="margin: 5px;width: 30%;display: inline-block">
                                    <span>Sắp xếp</span>
                                    <select class="selectpicker col-4" data-style="btn btn-primary btn-round"  data-size="7" style="width: 20% !important" name="sort">                                
                                        <option value="desc" {{ @$data['filter']['sort'] == 'desc' ? 'selected' : ''}}>Giảm dần</option>
                                        <option value="asc" {{ @$data['filter']['sort'] == 'asc' ? 'selected' : ''}}>Tăng dần</option>                     
                                    </select>
                                    <span>theo</span>
                                        <select class="selectpicker col-4" data-style="btn btn-primary btn-round"  data-size="7" style="width: 20% !important" name="orderBy">                                
                                        <option value="id" {{ @$data['filter']['orderBy'] == 'id' ? 'selected' : ''}}>ID</option>
                                        <option value="email" {{ @$data['filter']['orderBy'] == 'email' ? 'selected' : ''}}>Email</option>
                                        <option value="fb_id" {{ @$data['filter']['orderBy'] == 'fb_id' ? 'selected' : ''}}>ID FB</option>
                                        <option value="status" {{ @$data['filter']['orderBy'] == 'status' ? 'selected' : ''}}>Trạng thái</option>
                                        
                                        <option value="created_at" {{ @$data['filter']['orderBy'] == 'created_at' ? 'selected' : ''}}>Thời gian tạo</option>
                                        <option value="updated_at" {{ @$data['filter']['orderBy'] == 'updated_at' ? 'selected' : ''}}>Thời gian cập nhật</option>                     
                                    </select>
                                </div>
                                <div style="margin: 5px;width: 30%;display: inline-block">
                                    <span>Từ khóa tìm kiếm </span>
                                    <div class="form-group" style="margin: 0;padding-left: 10px">
                                        <input type="text" class="form-control" value="{{ @$data['filter']['content'] }}" name="content">

                                    </div>
                                </div>
                                <button class="btn btn-success btn-round" type="submit">Lọc<div class="ripple-container"></div></button>
                            </div>

                            
                        </div>
                    </form>
                    @endif
                    
                    <div class="material-datatables">
                        <table id="datatables" class="table table-striped table-no-bordered table-hover" cellspacing="0" width="100%" style="width:100%">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>ID FB</th>
                                    <th>Tên user</th>
                                    <th>Avatar</th>
                                    <th>Trạng thái</th>
                                    <th>Ngày tạo</th>
                                    <th>Lần cập nhật cuối</th>
                                    
                                    <th class="text-right">Hành động</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>ID FB</th>
                                    <th>Tên user</th>
                                    <th>Avatar</th>
                                    <th>Trạng thái</th>
                                    <th>Ngày tạo</th>
                                    <th>Lần cập nhật cuối</th>
                                    <th class="text-right">Hành động</th>
                                </tr>
                            </tfoot>
                            <tbody>
                                @foreach ($data['info'] as $value)
                                <tr>
                                    <td>{{ $value->id }}</td>
                                    <td>{{ $value->email }}</td>
                                    <td>{{ $value->fb_id }}</td>
                                    <td>{{ $value->name }}</td>
                                    <td><img style="width:40px" src="{{ $value->avatar }}" alt="avatar"></td>
                                    <td>{{ getStatus($value->status) }}</td>
                                    <td>{{ customDate($value->created_at , 'daytime') }}</td>
                                    <td>{{ customDate($value->updated_at , 'daytime') }}</td>
                                    <td class="text-right"> 
                                        <a href="{{ route('Admin.UserController.detail',$value->id) }}" class="btn btn-simple btn-warning btn-icon edit">Chi tiết</a>                                       
                                        @if (session()->get('permission')->canDelete && $value->status !== 1)
                                            <a href="{{ route('Admin.UserController.unlockuser',$value->id) }}" class="btn btn-simple btn-danger btn-icon remove">Mở khóa</a>
                                        @elseif(session()->get('permission')->canDelete)
                                            <a href="{{ route('Admin.UserController.lockuser',$value->id) }}" class="btn btn-simple btn-danger btn-icon remove">Khóa tài khoản</a><br>
                                            <a href="{{ route('Admin.UserController.lockcomment',$value->id) }}" class="btn btn-simple btn-danger btn-icon remove">Khóa bình luận</a>
                                        @endif
                                    </td>
                                </tr>
                                @endforeach
                                
                            </tbody>
                        </table>
                        @if( $data['info']->hasPages() )
                        <div class="row">
                            @if($data['info']->count() > 0)
                            <div class="col-sm-5">
                                <div class="dataTables_info" role="status" aria-live="polite">
                                    Hiển thị {{ $data['info']->count() == 0 ? '0 kết quả' : ( 'từ '.  (($data['info']->currentPage()-1)*$data['info']->perPage() + 1 ).' tới '. (($data['info']->currentPage()-1)*$data['info']->perPage() + $data['info']->count()) .' trong tổng số '. ($data['info']->total() .' kết quả') ) }}
                                </div>
                            </div>
                            @endif
                            
                            <div class="col-sm-7">
                                <div class="dataTables_paginate" style="text-align: right">
                                    <ul class="pagination" style="margin: 0">
                                        <li class="paginate_button previous {{ $data['info']->currentPage() <= 1 ? 'disabled' : ''}} " >
                                            <a href="{{ $data['info']->previousPageUrl() }}" aria-controls="datatables" data-dt-idx="0" tabindex="0">Trước</a>
                                        </li>
                                        <?php 
                                        $begin = ($data['info']->currentPage() - 5) < 1 ? 1 : $data['info']->currentPage() - 5;
                                        $end = ($data['info']->currentPage() + 5) > $data['info']->lastPage() ? $data['info']->lastPage() : $data['info']->currentPage() + 5;

                                        ?>
                                        @for($i = $begin ; $i <= $end ; $i++)
                                        <li class="paginate_button {{ $data['info']->currentPage() == $i ? 'active' : '' }}">
                                            <a href="{{ $data['info']->url($i) }}" aria-controls="datatables" data-dt-idx="1" tabindex="0">{{$i}}</a>
                                        </li>
                                        @endfor
                                        <li class="paginate_button next {{ $data['info']->currentPage() >= $data['info']->lastPage() ? 'disabled' : ''}}">
                                            <a href="{{ $data['info']->nextPageUrl() }}" aria-controls="datatables" data-dt-idx="2" tabindex="0">Sau</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                        </div>
                        <!-- end row -->
                        @endif
                    </div>
                    
                </div>
                <!-- end content-->
            </div>
            <!--  end card  -->
        </div>
        <!-- end col-md-12 -->
    </div>
    <!-- end row -->
    
    
    
</div>
@stop

@section('css')
<!-- add custom css here -->
@stop

@section('js')
<!--  DataTables.net Plugin    -->
<script src="/assets/js/jquery.datatables.js"></script>
<!-- Select Plugin -->
<script src="/assets/js/jquery.select-bootstrap.js"></script>
<!--    Plugin for Fileupload, full documentation here: http://www.jasny.net/bootstrap/javascript/#fileinput -->
<script type="text/javascript">
    $(document).ready(function() {

        $('.menu-left-custom >li.active').removeClass('active');
        $('#users').parent('li').addClass('active');
        $('#users .show').addClass('active');
        $('#users').collapse();

        $('#datatables').DataTable({
            paging: false,
            // pagingType: "full_numbers",
            ordering:  false,
            "bInfo" : false,
            // "lengthMenu": [
            // [10, 25, 50, -1],
            // [10, 25, 50, "All"]
            // ],
            responsive: true,
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Tìm kiếm trong trang",
                paginate:
                {
                    previous: "Trước",
                    next: "Sau",
                    first: "",
                    last: ""
                },
                emptyTable: "Không có dữ liệu nào"
            },
            page:{

            }

        });


        $('select[name="how_creating"]').on('change', function(event) {
           event.preventDefault();
           if($(this).val() == 'default'){
            $('.epis_needed').addClass('hidden');
            $('.epis_needed').find('select').removeAttr('name');
        } else if($(this).val() == 'options') {
            $('.epis_needed').removeClass('hidden');
            $('.epis_needed').find('select').attr('name', 'needs');;
        }
    });

        $('.card .material-datatables label').addClass('form-group');
    });
</script>
@stop