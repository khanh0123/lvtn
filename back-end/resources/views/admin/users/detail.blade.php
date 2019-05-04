@extends('admin/layout' , ['message' => !empty($message) ? $message : []])
@section('title', 'Chi tiết user')
@section('main')
<div class="container-fluid">
    <div class="alert alert-light" role="alert">
        <strong class="">Chi tiết user </strong>
    </div>
    <form action="" method="post" enctype="multipart/form-data" id="detail-users">
        {{ csrf_field() }}
        <div class="row">

            <div class="col-sm-9">
                <!--      Wizard container        -->
                <div class="wizard-container">
                    <div class="card wizard-card" data-color="green" id="wizardProfile">
                        <!--        You can switch " data-color="purple" "  with one of the next bright colors: "green", "orange", "red", "blue"       -->
                        <div class="wizard-header">
                            <h3 class="wizard-title">
                                Chi tiết user
                            </h3>
                        </div>
                        <div class="wizard-navigation">
                            <ul>
                                <li class="wizard-menu-top">
                                    <a href="/admin/movie#info" data-toggle="tab">Thông tin user</a>
                                </li>                                
                            </ul>
                        </div>
                        <div class="tab-content">
                            <div class="tab-pane" id="info">
                                <div class="card-content form-horizontal">
                                    <div class="row">
                                        <div class="col-sm-9">
                                            <div class="row">
                                                <label class="col-sm-4 label-on-left">Email <small style="color:red">*</small></label>
                                                <div class="col-sm-8">
                                                    <div class="form-group label-floating is-empty">
                                                        <label class="control-label"></label>
                                                        <input type="text" class="form-control" name="email" value="{{ $data['info']->email }}" required data-name="Email">
                                                        <span class="material-input"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="row">
                                                <label class="col-sm-4 label-on-left">Tên <small style="color:red">*</small></label>
                                                <div class="col-sm-8">
                                                    <div class="form-group label-floating is-empty">
                                                        <label class="control-label"></label>
                                                        <input type="text" class="form-control" name="name" value="{{ $data['info']->name }}" data-name="Tên">
                                                        <span class="material-input"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <label class="col-sm-4 label-on-left">Facebook ID </label>
                                                <div class="col-sm-8">
                                                    <div class="form-group label-floating is-empty">
                                                        <label class="control-label">{{ $data['info']->fb_id }}</label>                                                       
                                                        <span class="material-input"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <label class="col-sm-4 label-on-left">Trạng thái </label>
                                                <div class="col-sm-8">
                                                    <div class="form-group label-floating is-empty">
                                                        <label class="control-label">{{ getStatus($data['info']->status) }}</label>                                                       
                                                        <span class="material-input"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- end col 6 -->
                                        

                                    </div>
                                </div>
                            </div>
                            <!-- end info -->
                            
                        </div>

                    </div>
                </div>
                <!-- wizard container -->
            </div>
            <!-- end col-8 -->
            <div class="col-md-3">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header card-header-text" data-background-color="rose">
                                <h4 class="card-title">Hành động</h4>
                            </div>
                            <div class="card-content">
                                @if(session()->get('permission')->canUpdate)
                                    <button type="submit" class="btn btn-info using-tooltip" data-toggle="tooltip" data-placement="top" title="Xác nhận thay đổi" onClick="return validateUsers();"><i class="material-icons">check</i>Xác nhận<div class="ripple-container"></div></button>

                                    @if((int)$data['info']->status !== 1)
                                        <a href="{{ route('Admin.UserController.unlockuser',$data['info']->id) }}" class="btn btn-danger using-tooltip"><i class="material-icons">close</i>Mở khóa</a>

                                    @else
                                        <a href="{{ route('Admin.UserController.lockuser',$data['info']->id) }}" class="btn btn-danger using-tooltip"><i class="material-icons">close</i>Khóa tài khoản</a>
                                        <a href="{{ route('Admin.UserController.lockcomment',$data['info']->id) }}" class="btn btn-warning using-tooltip"><i class="material-icons">lock</i>Khóa bình luận</a>
                                    @endif
                                @endif


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end row -->
        </form>
        <!-- end form -->
        

    </div>
    @stop

    @section('css')
    <!-- add custom css here -->
    <!-- Latest compiled and minified CSS -->
    <!-- <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/css/jasny-bootstrap.min.css"> -->
    @stop

    @section('js')

    <!--  Plugin for the Wizard -->
    <script src="/assets/js/jquery.bootstrap-wizard.js"></script>
    <!-- Select Plugin -->
    <script src="/assets/js/jquery.select-bootstrap.js"></script>
    <!--    Plugin for Fileupload, full documentation here: http://www.jasny.net/bootstrap/javascript/#fileinput -->
    <script src="/assets/js/jasny-bootstrap.min.js"></script>

    <script type="text/javascript">
        $(document).ready(function() {
            $('.using-tooltip').tooltip({animation:true});
            $('.menu-left-custom >li.active').removeClass('active');
            $('#users').parent('li').addClass('active');
            // $('#movie .add').addClass('active');
            $('#users').collapse();

            $('input[name="title"]').on('keyup', function(event) {
                event.preventDefault();
                $('input[name="slug"]').val(create_slug($(this).val()));
            });
            demo.initMaterialWizard();

            
        });
        function validateUsers(){
            var input = $('#detail-users  input[required]');
            var select = $('#detail-users  select[required]');
            for(var k = 0; k < input.length; k++){
                if($(input[k]).val() == ''){
                    var name = $(input[k]).data('name');
                    showNotification('warning' , `${name} không được để trống` , 3000);
                    return false;
                }
            }
            for(var k = 0; k < select.length; k++){
                if($(select[k]).val() == ''){
                    var name = $(select[k]).data('name');
                    showNotification('warning' , `${name} không được để trống` , 3000);
                    return false;
                }
            }
            return true;
        }
        
    </script>
    @stop