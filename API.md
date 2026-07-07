    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::post('/logout', 'logout');
    Route::get('/user', 'getUser');




    Route::get('/categories', 'index');
    Route::post('/categories', 'store');
    Route::get('/categories/{id}', 'show');
    Route::put('/categories/{id}', 'update');
    Route::delete('/categories/{id}', 'destroy');


    Route::post('/services', 'store');
    Route::get('/services/{service}', 'show');
    Route::put('/services/{service}', 'update');
    Route::delete('/services/{service}', 'destroy');


    Route::get('/services', [ServiceController::class, 'index']);


    Route::get('/reservations', 'index');
    Route::post('/reservations', 'store');
    Route::get('/reservations/{reservation}', 'show');
    Route::put('/reservations/{reservation}/reschedule', 'update');
    Route::delete('/reservations/{reservation}', 'destroy');
    Route::patch('/reservations/{reservation}/complete', 'complete');


    Route::get('/artisan/reservations', 'index');
    Route::patch('/reservations/{reservation}/accept', 'accept');
    Route::patch('/reservations/{reservation}/reject', 'reject');



    Route::get('/artisans/{id}', 'show');



    Route::post('/reviews', 'store');



    Route::get("/admin/dashboard", [AdminDashboardController::class, 'index'])->middleware('auth:sanctum');


    Route::get('/admin/users', 'users');
    Route::get('/admin/artisans', 'artisans');
    Route::get('/admin/clients', 'clients');
    Route::patch('/admin/users/{user}/toggle-status', 'toggleStatus');

    Route::get('/admin/reviews', 'reviews');
    Route::delete('/admin/reviews/{review}', 'destroy');


    Route::get('/favorites', 'index');
    Route::post('/favorites/{service}', 'store');
    Route::delete('/favorites/{service}', 'destroy');


    Route::get('/notifications', 'index');
    Route::patch('/notifications/{notification}/read', 'makeAsRead');
    Route::delete('/notifications/{notification}', 'destroy');
