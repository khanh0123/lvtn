<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Admin\MainAdminController;
use App\Models\Config;
class ConfigController extends MainAdminController
{
	protected $model;
	protected $view_folder = 'admin/config/';

	public function __construct(Request $request) {
        $this->model = new Config;
        parent::__construct($request);
    }
}
