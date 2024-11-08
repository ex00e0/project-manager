<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Project;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    public function user_projects (Request $request){
        //  $projects = ['projects'=>Project::latest()->get()]; 
        // $projects = ['projects'=>Project::where('boss_id', $request->user_id)->latest()->get()];
        if ($request->role == 'admin') {
            $projects = ['projects'=>
            DB::table('users')
            ->select('users.id','users.name','projects.*')
            ->join('projects','projects.boss_id','=','users.id')
            ->get()];
           
        }
        else if ($request->role == 'boss') {
            $projects = ['projects'=>
            DB::table('users')
            ->select('users.id','users.name','projects.*')
            ->join('projects','projects.boss_id','=','users.id')
            ->where(['boss_id' => $request->user_id])
            ->get()];
        }
        else if ($request->role = 'doer') {

            $projects = DB::table('tasks')->select('project_id')->where('doer_id', $request->user_id)->get();
            $select = 'select users.id, users.name, projects.* from projects join users on projects.boss_id = users.id where ';
            
            // foreach ($arr as $val) {
            //     $select += $val;
            // }
            // $users = DB::select(, [0]);
            // $projects = ['projects'=>
            // DB::table('users')
            // ->select('users.id','users.name','projects.*')
            // ->join('projects','projects.boss_id','=','users.id')
            // ->where(['boss_id' => $request->user_id])
            // ->get()];
        }
       
        return response()->json($projects);
    }
}
