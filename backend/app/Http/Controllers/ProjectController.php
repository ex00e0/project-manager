<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Project;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

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
        else if ($request->role == 'doer') {

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

    public function delete_project (Request $request) {
        DB::table('tasks')->where('project_id', '=', $request->project_id)->delete();
        DB::table('projects')->where('id', '=', $request->project_id)->delete();
        return response()->json('Проект удален');
    }

    public function edit_project (Request $request) {
        $validator = Validator::make($request->all(), [
                "name"=>["max:50"],
            ],
            $messages = [
                'name.max' => 'Слишком длинное название проекта',
            ]
        );
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        else {
            DB::table('projects')
                ->where('id', $request->id)
                ->update([
                    'name' => $request->name,
                    'description' => $request->description,
                    'end' => $request->end,
                ]);
            // DB::table('tasks')->where('project_id', '=', $request->project_id)->delete();
            // DB::table('projects')->where('id', '=', $request->project_id)->delete();
            return response()->json('Информация о проекте обновлена');
        }
    }

    public function one_project (Request $request) {
        $select = DB::table('projects')->where('id', '=', $request->project_id)->get();
        return response()->json($select);
    }
}
