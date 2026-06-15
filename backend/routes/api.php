<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
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

Route::controller(CategoryController::class)->middleware('auth:sanctum')->group(function(){

    Route::get('/categories','index');
    Route::post('/categories','store');
    Route::get('/categories/{id}','show');
    Route::put('/categories/{id}','update');
    Route::delete('/categories/{id}','destroy');


});

Route::middleware('auth:sanctum')->get('/role-test',function(){

    return auth()->user()->load('role');

});