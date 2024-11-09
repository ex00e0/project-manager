<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectController;
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
Route::post('login', [UserController::class, 'login'])->name('login');
Route::post('user_projects', [ProjectController::class, 'user_projects'])->name('user_projects');
Route::post('delete_project', [ProjectController::class, 'delete_project'])->name('delete_project');
Route::post('edit_project', [ProjectController::class, 'edit_project'])->name('edit_project');