<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(){
        return response()->json(Survey::all());
    }
}
