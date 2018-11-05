<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Admin\MainAdminController;
use App\Models\Rule;
use Validator;
class RuleController extends MainAdminController
{
	protected $model;
	protected $view_folder = 'admin/rule/';
	

	public function __construct(Request $request) {
        $this->model = new Rule;
        parent::__construct($request);
    }

    public function add(Request $request)
    {
    	return abort('404');
    }
    public function store(Request $request)
    {
    	return abort('404');
    }
    public function delete(Request $request,$id)
    {
    	return abort('404');
    }
    public function update(Request $request,$id)
    {
    	return abort('404');
    }
    public function detail(Request $request,$id)
    {
    	return abort('404');
    }
}
