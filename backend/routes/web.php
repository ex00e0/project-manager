<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
// Route::get('/posts', 'PostController@index')->name('posts');
// Route::post('/posts', 'PostController@store')->name('posts.store');
Route::post('/users/login', [UserController::class, 'login'])->name('login');
