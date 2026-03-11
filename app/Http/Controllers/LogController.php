<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Illuminate\Http\Request;

class LogController extends Controller
{
    /**
     * Display a listing of the logs.
     */
    public function index()
    {
        // Get all logs (you can add pagination if needed)
        $logs = Log::latest()->get();

        // If using Blade view
        // return view('logs.index', compact('logs'));

        // If using Inertia.js
        // return Inertia::render('Logs/Index', ['logs' => $logs]);

        // If API response
        return response()->json($logs);
    }
}
