<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Project;

class ProjectController extends Controller
{
    public function user_projects (Request $request){
        $projects = ['projects'=>Project::where('boss_id', $request->user_id)->latest()->get()];
        return response()->json($projects);
    }
}
