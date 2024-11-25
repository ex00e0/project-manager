<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\DB;

//Password::min(8)->letters()->numbers()
class UserController extends Controller
{
    public function login (Request $request) {
        // $c = $request->validate([
        //     "email"=>["required", "email"],
        //     "password"=>["required"]
        // ]);

        // return response()->json($c == false);
        // if($request->validate([
        //     "email"=>["required", "email"],
        //     "password"=>["required"]
        // ])){
        $user = User::where('email', $request->email)->exists();
            if ($user != false) {
            $user = User::where('email', $request->email)->first();
            $pass = $user->password;
            $id = $user->id;
            $role = $user->role;
            //     foreach ($user as $row) {
            //     $pass = $row->password;
            //     $id = $row->id;
            //     $role = $row->role;
            
            if (Hash::check($request->password, $pass)) {
                
                Auth::login(User::find($id));
                $arr = ["id" => $id, "role" => $role];
                return response()->json($arr);
            } else {
                return response()->json('неверный пароль');
            // if (Auth::attempt(['email' => $email,
            // 'password' => $password])) {
            // $request->session()->regenerate();
           
            
        // }
       
            // return back()->onlyInput('email')->withErrors(
            // ['email' => 'Не найден пользователь с указанными ' .
            // 'адресом и паролем']);
         }  
        // }
            }
           else {
            return response()->json('неверный логин');

        } 
        // else {
        //         return response()->json('валидация не прошла');
        // }
        //    } 
        
    }

    public function get_doers () {
       $users =  DB::table('users')
        ->select('users.id', 'users.name')
        ->where('role', 'doer')
        ->get();
        return response()->json($users);
    }

    public function get_bosses () {
        $users =  DB::table('users')
         ->select('users.id', 'users.name')
         ->where('role', 'boss')
         ->get();
         return response()->json($users);
     }

     public function get_users (){
        $users = ['users'=>
        DB::table('users')
                ->select('users.*')
                ->where('users.role', '!=', 'admin')
                ->orderBy('created_at', 'desc')
                ->get()];
        return response()->json($users);
    }

    public function one_user (Request $request) {
        $select = DB::table('users')->where('id', '=', $request->user_id)->get();
        return response()->json($select);
    }

    public function edit_user (Request $request) {
        // $role_db = DB::table('users')
        //     ->select('users.role')
        //     ->where('id', '=', $request->user_id)
        //     ->get();
        //     $role_db = $role_db[0]->role;
        // if ($role_db == $request->role) {
             DB::table('users')
                ->where('id', $request->user_id)
                ->update([
                    'name' => $request->name,
                    'email' => $request->email,
                    'role' => $request->role,
                ]);
             return response()->json('Информация о пользователе обновлена');
        // }
        // else {
        //     if ($role_db == 'boss') {
        //         $projects = DB::table('projects')
        //             ->select('projects.*')
        //             ->where('boss_id', '=', $request->user_id)
        //             ->get();
        //         $projects = $projects->count();
                
        //     }
        // }
           
            // DB::table('tasks')
            //     ->where('id', $request->task_id)
            //     ->update([
            //         'name' => $request->name,
            //         'description' => $request->description,
            //         'start' => $request->start,
            //         'end' => $request->end,
            //         'priority' => $request->priority,
            //     ]);
            // // DB::table('tasks')->where('project_id', '=', $request->project_id)->delete();
            // // DB::table('projects')->where('id', '=', $request->project_id)->delete();
            // return response()->json('Информация о задаче обновлена');
    }
}