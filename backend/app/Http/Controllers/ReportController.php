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
            $id = DB::table('reports')
                ->insertGetId([
                    'user_id' => $request->user_id,
                    'type' => $request->type,
                    'start' => $request->start,
                    'end' => $request->end,
                ]);
            
            return response()->json($id);
        }
    }
}
