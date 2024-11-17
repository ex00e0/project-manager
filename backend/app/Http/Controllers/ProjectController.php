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
            ->orderBy('created_at', 'desc')
            ->get()];
           
        }
        else if ($request->role == 'boss') {
            $projects = ['projects'=>
            DB::table('users')
            ->select('users.name as name_of_user','projects.*')
            ->join('projects','projects.boss_id','=','users.id')
            ->where(['projects.boss_id' => $request->user_id])
            ->orderBy('created_at', 'desc')
            ->get()];
        }
        else if ($request->role == 'doer') {

            $select = DB::table('tasks')->select('project_id')->distinct()->where('doer_id', $request->user_id)->get();
            $projects = "select users.name as name_of_user, projects.* from projects join users on projects.boss_id = users.id where";
            
            foreach ($select as $val) {
                $projects .= ' projects.id = '.$val->project_id.' or';
                
            }
            $projects = substr($projects, 0, -3);
            $projects .= ' order by created_at desc';
            $projects = ['projects'=>DB::select($projects)];
        }
       
        return response()->json($projects);
    }

    public function delete_project (Request $request) {
        DB::table('tasks')->where('project_id', '=', $request->project_id)->delete();
        DB::table('projects')->where('id', '=', $request->project_id)->delete();
        $all_projects = DB::table('projects')
        ->select('projects.*')
        ->where('projects.boss_id', '=', $request->user_id)
        ->get();
        $count = $all_projects->count();
        $arr = ["message"=>'Проект удален', "count" => $count];
        return response()->json($arr);
    }
    public function close_project (Request $request) {
        // DB::table('tasks')->where('project_id', '=', $request->project_id)->update([
        //     'status' => 'completed',
        // ]);
        DB::table('projects')->where('id', '=', $request->project_id)->update([
            'status' => 'completed',
        ]);
        return response()->json('Проект обновлен');
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

    public function one_project_for_create (Request $request) {
        $projects = 
        DB::table('users')
        ->select('users.name as name_of_user','projects.*')
        ->join('projects','projects.boss_id','=','users.id')
        ->where('projects.id', '=', $request->project_id)
        ->get();
        $all_projects = DB::table('projects')
        ->select('projects.*')
        ->where('projects.boss_id', '=', $request->user_id)
        ->get();
        $count = $all_projects->count();
        $arr = ["projects"=>$projects, "count" => $count];
        return response()->json($arr);
    }
    public function create_project (Request $request) {
        
        // return response()->json($request->all());
        $validator = Validator::make($request->all(), [
                "name"=>["min:3","max:50", "unique:projects"],
                "end"=>["after:start"],
                "team"=>["required"],
            ],
            $messages = [
                'name.min' => 'Слишком короткое название проекта',
                'name.max' => 'Слишком длинное название проекта',
                'name.unique' => 'Название не уникально',
                'end.after' => 'Дата окончания не может быть раньше даты начала',
                'team.required' => 'Нужно выбрать хотя бы одного исполнителя'
            ]
        );
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        else {
            $team = explode(',', $request->team);
            $team = json_encode(["doers" => $team]);
            $id = DB::table('projects')
                ->insertGetId([
                    'name' => $request->name,
                    'description' => $request->description,
                    'start' => $request->start,
                    'end' => $request->end,
                    'boss_id' => $request->user_id,
                    'team' => $team,
                ]);
            
            return response()->json($id);
        }
    }

    public function get_doers_of_project (Request $request) {
        $projects = 
        DB::table('projects')
        ->select('projects.team')
        ->where('projects.id', '=', $request->project_id)
        ->get();
        $team = json_decode($projects[0]->team)->doers;
        $array_users = [];
        foreach ($team as $id) {
                    $users = 
                DB::table('users')
                ->select('users.name')
                ->where('users.id', '=', $id)
                ->get();
                $name = $users[0]->name;
                array_push($array_users, [$name => $id]);
                
        }
        return response()->json($array_users);
    }
}
