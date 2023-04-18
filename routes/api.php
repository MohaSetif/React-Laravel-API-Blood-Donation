<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AppointmentsController;
use App\Http\Controllers\BloodBankCtrl;
use App\Http\Controllers\BloodCtrl;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\InteractionController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\NotifyStatusCtrl;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\SeeInteractionsCtrl;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::apiResource('survey', SurveyController::class);
    Route::resource('/blood_bank', BloodBankCtrl::class);
    Route::resource('/blood_groups', BloodCtrl::class);
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::resource('/users',UsersController::class);
    Route::put('/users/{id}/status', [AdminController::class, 'updateStatus'])->name('users.updateStatus');
    Route::get('/profile', [SeeInteractionsCtrl::class, 'getInteractions']);
    Route::resource('/notifications', NotificationController::class);
    Route::put('/notifications/{id}/status', [NotifyStatusCtrl::class, 'markAsRead']);
    Route::get('/notifications/count', [NotifyStatusCtrl::class, 'countNotification']);
    Route::resource('/appointments', AppointmentsController::class);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::resource('/doc_blood_bank', BloodBankCtrl::class);
    Route::resource('/doc_blood_groups', BloodCtrl::class);
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::resource('/doc_users',DoctorController::class);
    Route::resource('/users_files',FileController::class);
    Route::resource('/interactions',InteractionController::class);
    Route::resource('/patients',PatientController::class);
    Route::put('/doc_users/{id}/status', [AdminController::class, 'updateStatus'])->name('doc_users.updateStatus');
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
