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
        if ($count == 1) {
            DB::table('projects')
                ->where('id', $tasks[0]->project_id)
                ->update([
                    'status' => 'in_process',
                ]);
        }
        $arr = ["task"=>$tasks, "count" => $count];
        return response()->json($arr);
    }

    public function delete_task (Request $request) {
        $tasks = 
        DB::table('users')
        ->select('users.name as name_of_doer','tasks.*')
        ->join('tasks','tasks.doer_id','=','users.id')
        ->where('tasks.id', '=', $request->task_id)
        ->get();
        DB::table('tasks')->where('id', '=', $request->task_id)->delete();

        
        $all_tasks = DB::table('tasks')
        ->select('tasks.*')
        ->where('tasks.project_id', '=',  $tasks[0]->project_id)
        ->get();
        $count = $all_tasks->count();
        
        $arr = ["message"=>'Задача удалена', "count" => $count];
        return response()->json($arr);
    }

    public function one_task (Request $request) {
        $select = DB::table('tasks')->where('id', '=', $request->task_id)->get();
        return response()->json($select);
    }

    
    public function edit_task (Request $request) {
        $validator = Validator::make($request->all(), [
                "name"=>["max:50"],
                "end"=>["after:start"],
            ],
            $messages = [
                'name.max' => 'Слишком длинное название проекта',
                'end.after' => 'Дата окончания не может быть раньше даты начала',
            ]
        );
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        else {
            DB::table('tasks')
                ->where('id', $request->task_id)
                ->update([
                    'name' => $request->name,
                    'description' => $request->description,
                    'start' => $request->start,
                    'end' => $request->end,
                    'priority' => $request->priority,
                ]);
            // DB::table('tasks')->where('project_id', '=', $request->project_id)->delete();
            // DB::table('projects')->where('id', '=', $request->project_id)->delete();
            return response()->json('Информация о задаче обновлена');
        }
    }

    public function edit_status (Request $request) {
        if ($request->status == 'completed') {
            DB::table('tasks')
            ->where('id', $request->task_id)
            ->update([
                'status' => 'in_process',
            ]);
        }
        else if ($request->status == 'created') {
            DB::table('tasks')
            ->where('id', $request->task_id)
            ->update([
                'status' => 'in_process',
            ]);
        }
        else if ($request->status == 'in_process') {
            DB::table('tasks')
            ->where('id', $request->task_id)
            ->update([
                'status' => 'completed',
            ]);
        }
        return response()->json('Статус задачи изменен');
    }

    public function get_comments (Request $request) {
        $select = DB::table('tasks')->select('tasks.comments')->where('id', '=', $request->task_id)->get();
        $comments = json_decode($select[0]->comments);
        return response()->json($comments);
    }

    public function send_comment (Request $request) {
        $comments = DB::table('tasks')
            ->select('tasks.comments')
            ->where('id', $request->task_id)
            ->get();
        $comments = json_decode($comments[0]->comments);
        // array_push($comments, "no" =>"no")
        // $comment = json_decode();
        return response()->json($comments);
        // DB::table('tasks')
        //     ->where('id', $request->task_id)
        //     ->update([
        //         'comments' => 'in_process',
        //     ]);
    }
}
