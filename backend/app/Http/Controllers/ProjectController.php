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
            ->select('users.name as name_of_user','projects.*')
            ->join('projects','projects.boss_id','=','users.id')
            ->get()];
           
        }
        else if ($request->role == 'boss') {
            $projects = ['projects'=>
            DB::table('users')
            ->select('users.name as name_of_user','projects.*')
            ->join('projects','projects.boss_id','=','users.id')
            ->where(['projects.boss_id' => $request->user_id])
            ->get()];
        }
        else if ($request->role = 'doer') {

            $select = DB::table('tasks')->select('project_id')->distinct()->where('doer_id', $request->user_id)->get();
            $projects = "select users.name as name_of_user, projects.* from projects join users on projects.boss_id = users.id where";
            
            foreach ($select as $val) {
                $projects .= ' projects.id = '.$val->project_id.' or';
                
            }
            $projects = substr($projects, 0, -3);
            $projects = ['projects'=>DB::select($projects)];
        }
       
        return response()->json($projects);
    }
}
