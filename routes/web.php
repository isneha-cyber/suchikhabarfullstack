<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\HeadingController;


// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/home', function () {
    return Inertia::render('AdminPage/Home');
})->middleware(['auth', 'verified'])->name('home');


// Route::get('/home',function(){
    //     return Inertia::render('AdminPage/Home');
    // });

    Route::get("/news/{slug}",[NewsController::class,"newsShow"]);
    Route::get('/', [NewsController::class, 'home'])->name('home');

    Route::get('/',function(){
        return Inertia::render('Welcome');
    });

Route::middleware('auth')->group(function () {
    // Route for the Teams
    Route::get('/teams',function(){
        return Inertia::render('AdminPage/Teams');
    }); 
    Route::post('/team', [TeamController::class, 'store'])->name('team.store');     
    Route::put('/team/{id}', [TeamController::class, 'update'])->name('team.update'); 
    Route::delete('/team/{id}', [TeamController::class, 'destroy'])->name('team.destroy'); 

    // Route For the Category
    Route::get('/category',function(){
        return Inertia::render('AdminPage/Category');
    });
    Route::post('/cate', [CategoryController::class, 'store'])->name('cate.store');     
    Route::put('/cate/{id}', [CategoryController::class, 'update'])->name('cate.update'); 
    Route::delete('/cate/{id}', [CategoryController::class, 'destroy'])->name('cate.destroy');

    

    // Route for the News
    Route::get('/article',function(){
        return Inertia::render('AdminPage/News');
    });
    Route::post('/ournews', [NewsController::class, 'store'])->name('news.store');     
    Route::put('/ournews/{id}', [NewsController::class, 'update'])->name('news.update'); 
    Route::delete('/ournews/{id}', [NewsController::class, 'destroy'])->name('news.destroy');

    // Route for the Banners
    Route::get('/banners',function(){
        return Inertia::render('AdminPage/Banners');
    });
    Route::post('/banner', [BannerController::class, 'store'])->name('banner.store');     
    Route::put('/banner/{id}', [BannerController::class, 'update'])->name('banner.update'); 
    Route::delete('/banner/{id}', [BannerController::class, 'destroy'])->name('banner.destroy');

    // ROute For the User
    Route::get('/user',function(){
        return Inertia::render('AdminPage/UserManagement');
    });
    Route::get('/users', [UserController::class, 'index'])->name('users.index');       
    Route::post('/users', [UserController::class, 'store'])->name('users.store');      
    Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update'); 
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy'); 

    // ROute For the Logs
    Route::get('/log',function(){
        return Inertia::render('AdminPage/Logs');
    });
    Route::get('/logs', [LogController::class, 'index'])->name('logs.index');  

    // ROute For the heading
    Route::get('/heading',function(){
        return Inertia::render('AdminPage/Heading');
    });

    Route::post('/headings', [HeadingController::class, 'store'])->name('headings.store');      
    Route::put('/headings/{id}', [HeadingController::class, 'update'])->name('headings.update'); 
    Route::delete('/headings/{id}', [HeadingController::class, 'destroy'])->name('headings.destroy');
    
    
    Route::get('/category/{slug}',[CategoryController::class,'showDetails'])->name('ourcategory.showDetails');

    Route::get('/news/{slug}', [NewsController::class, 'newsShow'])->name('news.show');

      // Route For the Home
    // Route::get('/home',function(){
    //     return Inertia::render('AdminPage/Home');
    // });


    // Route::get('/categories', [CategoryController::class, 'index']);
    // Route::get('/categories/{slug}', [CategoryController::class, 'showBySlug']);

});

    Route::get('/team', [TeamController::class, 'index'])->name('team.index'); 
        Route::get('/cate', [CategoryController::class, 'index'])->name('cate.index'); 
            Route::get('/ournews', [NewsController::class, 'index'])->name('news.index');  
                Route::get('/banner', [BannerController::class, 'index'])->name('banner.index');  
                    Route::get('/headings', [HeadingController::class, 'index'])->name('headings.index');       
    
    
     
     


// Route::get('/cat',function(){
//         return Inertia::render('CategoryPage');
//     });

//    Route::get('/category',function(){
//         return Inertia::render('CategoryPage');
//     });
       Route::get('/detail',function(){
        return Inertia::render('DetailPage');
    });



    


require __DIR__.'/auth.php';
