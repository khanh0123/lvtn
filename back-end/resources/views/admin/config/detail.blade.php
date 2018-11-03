@extends('admin/layout')
@section('title', 'Cấu hình')
@section('main')
<div class="container-fluid">
    <div class="alert alert-light" role="alert">
        <strong class="">Chi tiết cấu hình</strong>
    </div>
    <form action="">
        <div class="row">
            <div class="col-md-9">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header card-header-text" data-background-color="rose">
                                <h4 class="card-title">Chi tiết</h4>
                            </div>
                            <div class="card-content form-horizontal">
                                <div class="row">
                                    <label class="col-sm-2 label-on-left">Khóa</label>
                                    <div class="col-sm-10">
                                        <div class="form-group label-floating is-empty">
                                            <label class="control-label"></label>
                                            <input type="text" class="form-control" name="key" value="{{ $data['key'] }}">
                                            <span class="material-input"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-sm-2 label-on-left">Giá trị</label>
                                    <div class="col-sm-10">
                                        <div class="form-group label-floating is-empty">
                                            <label class="control-label"></label>
                                            <input type="text" class="form-control" name="value" value="{{ $data['value'] }}">
                                            <span class="material-input"></span>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
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

                                <button type="submit" class="btn btn-info" href=""><i class="material-icons">check</i>Xác Nhận<div class="ripple-container"></div></button>
                                <a class="btn" href="">Hủy bỏ<div class="ripple-container"></div></a>
                                <a class="btn btn-danger" href=""><i class="material-icons">close</i>Xóa<div class="ripple-container"></div></a>
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
    @stop

    @section('js')
    <!--  DataTables.net Plugin    -->
<!-- <script src="/assets/js/jquery.datatables.js"></script>
--><script type="text/javascript">
    $(document).ready(function() {

    });
</script>
@stop