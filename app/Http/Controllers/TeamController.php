<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    // Display all teams
    public function index()
    {
        $teams = Team::all();
        return response()->json([
            'success' => true,
            'data' => $teams
        ]);
    }

    // Store a new team
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
        ]);

        $team = Team::create($request->only(['name', 'designation']));

        return response()->json([
            'success' => true,
            'message' => 'Team member created successfully',
            'data' => $team
        ], 201);
    }

    // Update an existing team
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'designation' => 'sometimes|required|string|max:255',
        ]);

        $team = Team::findOrFail($id);
        $team->update($request->only(['name', 'designation']));

        return response()->json([
            'success' => true,
            'message' => 'Team member updated successfully',
            'data' => $team
        ]);
    }

    // Delete a team
    public function destroy($id)
    {
        $team = Team::findOrFail($id);
        $team->delete();

        return response()->json([
            'success' => true,
            'message' => 'Team member deleted successfully'
        ]);
    }
}
