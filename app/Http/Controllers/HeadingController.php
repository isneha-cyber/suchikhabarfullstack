<?php

namespace App\Http\Controllers;

use App\Models\Heading;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class HeadingController extends Controller
{
    /**
     * Display a listing of headings.
     */
    public function index()
    {
        $headings = Heading::latest()->get();
        return response()->json($headings);
    }

    /**
     * Store a newly created heading.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'heading' => 'required|string|max:255',
            'blog_by' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'published_at' => 'nullable|date',
            'category' => 'nullable|string|max:100',
            'pdf' => 'nullable|file|mimes:pdf|max:5120',
        ]);

        // Check if a heading already exists for today
        $existingNews = Heading::whereDate('created_at', now()->toDateString())->first();

        if ($existingNews) {
            return response()->json([
                'message' => 'Only one news can be added per day. Please wait until the next day.'
            ], 403);
        }

        // Handle image upload
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('headings/images', 'public');
        }

        // Handle PDF upload
        if ($request->hasFile('pdf')) {
            $validated['pdf'] = $request->file('pdf')->store('headings/pdfs', 'public');
        }

        // Create the heading
        $heading = Heading::create($validated);

        // Log creation with heading
        Log::create([
            'name' => Auth::check() ? Auth::user()->name : 'Guest',
            'ip_address' => $request->ip(),
            'title' => 'Created Heading: "' . $heading->heading . '"',
        ]);

        return response()->json([
            'message' => 'Heading created successfully',
            'data' => $heading
        ], 201);
    }

    /**
     * Update the specified heading.
     */
    public function update(Request $request, $id)
    {
        $heading = Heading::findOrFail($id);

        $validated = $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'heading' => 'required|string|max:255',
            'blog_by' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'published_at' => 'nullable|date',
            'category' => 'nullable|string|max:100',
            'pdf' => 'nullable|file|mimes:pdf|max:5120',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            if ($heading->image) {
                Storage::disk('public')->delete($heading->image);
            }
            $validated['image'] = $request->file('image')->store('headings/images', 'public');
        } else {
            $validated['image'] = $heading->image;
        }

        // Handle PDF upload
        if ($request->hasFile('pdf')) {
            if ($heading->pdf) {
                Storage::disk('public')->delete($heading->pdf);
            }
            $validated['pdf'] = $request->file('pdf')->store('headings/pdfs', 'public');
        } else {
            $validated['pdf'] = $heading->pdf;
        }

        $heading->update($validated);

        // Log update with new heading
        Log::create([
            'name' => Auth::check() ? Auth::user()->name : 'Guest',
            'ip_address' => $request->ip(),
            'title' => 'Updated Heading: "' . $heading->heading . '"',
        ]);

        return response()->json([
            'message' => 'Heading updated successfully',
            'data' => $heading
        ], 200);
    }

    /**
     * Remove the specified heading.
     */
    public function destroy($id)
    {
        $heading = Heading::findOrFail($id);

        // Delete associated files
        if ($heading->image) {
            Storage::disk('public')->delete($heading->image);
        }
        if ($heading->pdf) {
            Storage::disk('public')->delete($heading->pdf);
        }

        $headingTitle = $heading->heading; // Save before deleting
        $heading->delete();

        // Log deletion with heading title
        Log::create([
            'name' => Auth::check() ? Auth::user()->name : 'Guest',
            'ip_address' => request()->ip(),
            'title' => 'Deleted Heading: "' . $headingTitle . '"',
        ]);

        return response()->json([
            'message' => 'Heading deleted successfully'
        ], 200);
    }
}
