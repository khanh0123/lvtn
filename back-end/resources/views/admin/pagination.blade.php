@if( isset($data['info']) && $data['info']->hasPages() )
<div class="row">
    <div class="col-sm-5">
        <div class="dataTables_info" role="status" aria-live="polite">
            Hiển thị {{ $data['info']['info']->count() == 0 ? '0 kết quả' : ( 'từ '.  (($data['info']['info']->currentPage()-1)*$data['info']['info']->perPage() + 1 ).' tới '. (($data['info']['info']->currentPage()-1)*$data['info']['info']->perPage() + $data['info']['info']->count()) .' trong tổng số '. ($data['info']['info']->total() .' kết quả') ) }}
        </div>
    </div>
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