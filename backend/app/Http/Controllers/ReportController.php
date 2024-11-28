<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ReportController extends Controller
{
    public function create_report (Request $request) {
        // SELECT projects.name, projects.status, count(tasks.id), (SELECT count(tasks.id) FROM tasks WHERE tasks.status = 'in_process' GROUP BY tasks.project_id) as in_process FROM `projects` JOIN tasks ON projects.id = tasks.project_id WHERE projects.status != 'created' GROUP BY projects.id
        // return response()->json($request->all());
        // SELECT projects.name, projects.status, count(tasks.id) as 'всего', (SELECT count(tasks.id) FROM tasks WHERE tasks.status = 'in_process' GROUP BY tasks.project_id) as 'в процессе' FROM `projects` JOIN tasks ON projects.id = tasks.project_id WHERE projects.status != 'created' GROUP BY projects.id
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
            if ($request->role == 'admin') {
                
                if ($request->type == 'projects') {
                    // return response()->json($request->all());
                    $array = DB::select("SELECT projects.name, projects.status, count(tasks.id) as 'all', (count(CASE
                                    WHEN tasks.status = 'in_process' THEN 1
                                    ELSE NULL
                                END)) as 'in_process', (count(CASE
                                    WHEN tasks.status = 'completed' THEN 1
                                    ELSE NULL
                                END)) as 'completed' FROM `projects` JOIN tasks ON projects.id = tasks.project_id WHERE projects.status != 'created' AND projects.start >= '".$request->start."' AND projects.end <= '".$request->end."' GROUP BY projects.id");
                $count = DB::table('projects')
                    ->select('projects.*')
                    ->where('projects.status', '!=', 'created')
                    ->where('projects.start', '>=', $request->start)
                    ->where('projects.end', '<=', $request->end)
                    ->get()->count();
                    $stats = ["count" =>  $count, "projects" => $array];
                    // return response()->json($stats);
                }
                // // $stats = дорогой дневник...
                $stats = json_encode($stats);
                // return response()->json($stats);
                 $id = DB::table('reports')
                ->insertGetId([
                    'user_id' => $request->user_id,
                    'type' => $request->type,
                    'start' => $request->start,
                    'end' => $request->end,
                    'stats' => $stats,
                ]);
            }
           
            
            return response()->json($id);
        }
    }

    public function get_reports (Request $request){
        $reports = ['reports'=>
        DB::table('reports')
                ->select('reports.*')
                ->where('user_id', '=', $request->user_id)
                ->orderBy('created_at', 'desc')
                ->get()];
        return response()->json($reports);
    }

    public function one_report_for_create (Request $request) {
        $reports = 
        DB::table('reports')
        ->select('reports.*')
        ->where('reports.id', '=', $request->report_id)
        ->get();
        $all_reports = DB::table('reports')
        ->select('reports.*')
        ->where('reports.user_id', '=', $request->user_id)
        ->get();
        $count = $all_reports->count();
        $arr = ["report"=>$reports, "count" => $count];
        return response()->json($arr);
    }
}
