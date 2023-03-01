<?php

use App\Http\Controllers\Api\SkuGeneratorController;
use App\Http\Controllers\Api\WR4Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix('v1')
    ->group(function(){
//        Route::get('/wr4', [WR4Controller::class, 'index']);
//        Route::get('/wr4/sku', [WR4Controller::class, 'index']);
//        Route::post('/wr4/sku', [WR4Controller::class, 'returnSku']);
//        Route::post('/wr4/calculate', [WR4Controller::class, 'calculateEffect']);
        Route::post('/{product}/sku', [SkuGeneratorController::class, 'index']);
    });
