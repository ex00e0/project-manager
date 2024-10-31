<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Validation\Rules\Password;

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
                return response()->json($id);
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
}