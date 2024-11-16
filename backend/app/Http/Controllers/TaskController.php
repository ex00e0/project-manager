<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Task;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function get_tasks (Request $request){
        if ($request->project_id != null) {
        if ($request->role == 'doer') {
            $tasks = ['tasks'=>
            DB::table('users')
            ->select('users.name as name_of_doer', 'tasks.*')
            ->join('tasks', 'users.id','=','tasks.doer_id')
            ->where('tasks.project_id', $request->project_id)
            ->where('tasks.doer_id', $request->user_id)
            ->orderBy('created_at', 'desc')
            ->get()];
        }
        else if ($request->role == 'boss' || $request->role == 'admin') {
            $tasks = ['tasks'=>
            DB::table('users')
            ->select('users.name as name_of_doer', 'tasks.*')
            ->join('tasks', 'users.id','=','tasks.doer_id')
            ->where('tasks.project_id', $request->project_id)
            ->orderBy('created_at', 'desc')
            ->get()];
        }
    }
        else {
            if ($request->role == 'doer') {
                $tasks = ['tasks'=>
                DB::table('users')
                ->select('users.name as name_of_doer', 'tasks.*')
                ->join('tasks', 'users.id','=','tasks.doer_id')
                ->where('tasks.doer_id', $request->user_id)
                ->orderBy('created_at', 'desc')
                ->get()];
            }
            else if ($request->role == 'boss' || $request->role == 'admin') {
                $tasks = ['tasks'=>
                DB::table('users')
                ->select('users.name as name_of_doer', 'tasks.*')
                ->join('tasks', 'users.id','=','tasks.doer_id')
                ->orderBy('created_at', 'desc')
                ->get()];
            }
        }
        // else if ($request->role == 'doer') {

        //     $select = DB::table('tasks')->select('project_id')->distinct()->where('doer_id', $request->user_id)->get();
        //     $projects = "select users.name as name_of_user, projects.* from projects join users on projects.boss_id = users.id where";
            
        //     foreach ($select as $val) {
        //         $projects .= ' projects.id = '.$val->project_id.' or';
                
        //     }
        //     $projects = substr($projects, 0, -3);
        //     $projects = ['projects'=>DB::select($projects)];
        // }
       
        return response()->json($tasks);
    }
    public function create_task (Request $request) {
        
        // return response()->json($request->all());
        $validator = Validator::make($request->all(), [
                "end"=>["after:start"],
            ],
            $messages = [
                'end.after' => 'Дата окончания не может быть раньше даты начала',
            ]
        );
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        else {
            $id = DB::table('tasks')
                ->insertGetId([
                    'name' => $request->name,
                    'description' => $request->description,
                    'start' => $request->start,
                    'end' => $request->end,
                    'doer_id' => $request->doer_id,
                    'priority' => $request->priority,
                    'project_id' => $request->project_id,
                ]);
            
            return response()->json($id);
        }
    }

    public function one_task_for_create (Request $request) {
        $tasks = 
        DB::table('users')
        ->select('users.name as name_of_doer','tasks.*')
        ->join('tasks','tasks.doer_id','=','users.id')
        ->where('tasks.id', '=', $request->task_id)
        ->get();
        $all_tasks = DB::table('tasks')
        ->select('tasks.*')
        ->where('tasks.project_id', '=', $tasks[0]->project_id)
        ->get();
        $count = $all_tasks->count();
        $arr = ["task"=>$tasks, "count" => $count];
        return response()->json($arr);
    }
}
