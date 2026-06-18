<?php

use App\Http\Controllers\ArtisanReservationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ServiceController;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');




Route::controller(AuthController::class)->group(function () {

    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::middleware('auth:sanctum')->group(function () {

        Route::post('/logout', 'logout');
        Route::get('/user', 'getUser');
    });

});

Route::controller(CategoryController::class)->middleware('auth:sanctum')->group(function () {

    Route::get('/categories', 'index');
    Route::post('/categories', 'store');
    Route::get('/categories/{id}', 'show');
    Route::put('/categories/{id}', 'update');
    Route::delete('/categories/{id}', 'destroy');


});
// ------------------------------------------------------------------------------------------------
Route::controller(ServiceController::class)->middleware('auth:sanctum')->group(function () {
    Route::post('/services', 'store');
    Route::get('/services/{service}', 'show');
    Route::put('/services/{service}', 'update');
    Route::delete('/services/{service}', 'destroy');
});

Route::get('/services', [ServiceController::class, 'index']);
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
Route::controller(ReservationController::class)->middleware('auth:sanctum')->group(function () {

    Route::get('/reservations', 'index');
    Route::post('/reservations', 'store');
    Route::get('/reservations/{reservation}', 'show');
    Route::put('/reservations/{reservation}/reschedule', 'update');
    Route::delete('/reservations/{reservation}', 'destroy');
    Route::patch('/reservations/{reservation}/complete', 'complete');

});
Route::controller(ArtisanReservationController::class)->middleware('auth:sanctum')->group(function () {

    Route::get('/artisan/reservations', 'index');
    Route::patch('/reservations/{reservation}/accept', 'accept');
    Route::patch('/reservations/{reservation}/reject', 'reject');


});


// ------------------------------------------------------------------------------------------------

Route::middleware('auth:sanctum')->get('/role-test', function () {

    return auth()->user()->load('role');

});