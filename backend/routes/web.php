<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
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
Route::post('get_doers', [UserController::class, 'get_doers'])->name('get_doers');
Route::post('get_bosses', [UserController::class, 'get_bosses'])->name('get_bosses');
Route::post('get_users', [UserController::class, 'get_users'])->name('get_users');
Route::post('one_user', [UserController::class, 'one_user'])->name('one_user');
Route::post('edit_user', [UserController::class, 'edit_user'])->name('edit_user');

Route::post('user_projects', [ProjectController::class, 'user_projects'])->name('user_projects');
Route::post('delete_project', [ProjectController::class, 'delete_project'])->name('delete_project');
Route::post('close_project', [ProjectController::class, 'close_project'])->name('close_project');
Route::post('edit_project', [ProjectController::class, 'edit_project'])->name('edit_project');
Route::post('create_project', [ProjectController::class, 'create_project'])->name('create_project');
Route::post('one_project', [ProjectController::class, 'one_project'])->name('one_project');
Route::post('one_project_for_create', [ProjectController::class, 'one_project_for_create'])->name('one_project_for_create');
Route::post('get_doers_of_project', [ProjectController::class, 'get_doers_of_project'])->name('get_doers_of_project');
Route::post('edit_team', [ProjectController::class, 'edit_team'])->name('edit_team');

Route::post('get_tasks', [TaskController::class, 'get_tasks'])->name('get_tasks');
Route::post('create_task', [TaskController::class, 'create_task'])->name('create_task');
Route::post('one_task_for_create', [TaskController::class, 'one_task_for_create'])->name('one_task_for_create');
Route::post('delete_task', [TaskController::class, 'delete_task'])->name('delete_task');
Route::post('one_task', [TaskController::class, 'one_task'])->name('one_task');
Route::post('edit_task', [TaskController::class, 'edit_task'])->name('edit_task');
Route::post('edit_status', [TaskController::class, 'edit_status'])->name('edit_status');
Route::post('get_comments', [TaskController::class, 'get_comments'])->name('get_comments');
Route::post('send_comment', [TaskController::class, 'send_comment'])->name('send_comment');
