<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

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
            $status = $user->status;
            if ($status == 'deleted') {
                return response()->json('вы заблокированы');
            }
            else {
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
            }
            
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
        ->where('status', '=', 'active')
        ->get();
        return response()->json($users);
    }

    public function get_bosses () {
        $users =  DB::table('users')
         ->select('users.id', 'users.name')
         ->where('role', 'boss')
         ->where('status', '=', 'active')
         ->get();
         return response()->json($users);
     }

     public function get_users (){
        $users = ['users'=>
        DB::table('users')
                ->select('users.*')
                ->where('users.role', '!=', 'admin')
                ->where('status', '=', 'active')
                ->orderBy('created_at', 'desc')
                ->get()];
        return response()->json($users);
    }

    public function one_user (Request $request) {
        $select = DB::table('users')->where('id', '=', $request->user_id)->get();
        return response()->json($select);
    }

    public function edit_user (Request $request) {
        $email_db = DB::table('users')
            ->select('users.email')
            ->where('id', '=', $request->user_id)
            ->get();
            $email_db = $email_db[0]->email;
            if ($email_db != $request->email) {
                $validator = Validator::make($request->all(), [
                    "email"=>["unique:users"],
                ],
                $messages = [
                    'email.unique' => 'Данная почта уже занята',
                ]
            );
            if ($validator->fails()) {
                return response()->json($validator->errors());
            }
            else {
                DB::table('users')
                   ->where('id', $request->user_id)
                   ->update([
                       'name' => $request->name,
                       'email' => $request->email,
                       'role' => $request->role,
                   ]);
                return response()->json('Информация о пользователе обновлена');
               }
            }
            else {
                    DB::table('users')
                       ->where('id', $request->user_id)
                       ->update([
                           'name' => $request->name,
                           'email' => $request->email,
                           'role' => $request->role,
                       ]);
                    return response()->json('Информация о пользователе обновлена');
                   }
            
      
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
    }
    public function create_user (Request $request) {
        $validator = Validator::make($request->all(), [
            "email"=>["unique:users"],
            "password"=>["min:8", Password::min(8)->letters()->numbers()],
        ],
        $messages = [
            'email.unique' => 'Данная почта уже занята',
            'password.min' => 'Минимум 8 символов в пароле',
        ]
    );
    if ($validator->fails()) {
        return response()->json($validator->errors());
    }
    else {
        $id = DB::table('users')
            ->insertGetId([
                'name' => $request->name,
                'email' => $request->email,
                'role' => $request->role,
                'password' => Hash::make($request->password),
            ]);
        
        return response()->json($id);
    }
    }

    public function one_user_for_create (Request $request) {
        $users = 
        DB::table('users')
        ->select('users.*')
        ->where('id', '=', $request->user_id)
        ->get();
        $all_users = 
        DB::table('users')
        ->select('users.*')
        ->where('users.role', '!=', 'admin')
        ->where('status', '=', 'active')
        ->get();
        $count = $all_users->count();
        $arr = ["user"=>$users, "count" => $count];
        return response()->json($arr);
    }

    public function delete_user (Request $request) {
        DB::table('users')
        ->where('id', '=', $request->user_id)
        ->update(
            [
                'status' => 'deleted',
            ]
        );

        $all_users = 
        DB::table('users')
        ->select('users.*')
        ->where('users.role', '!=', 'admin')
        ->where('status', '=', 'active')
        ->get();
        $count = $all_users->count();
        
        $arr = ["message"=>'Пользователь удален', "count" => $count];
        return response()->json($arr);
    }
}