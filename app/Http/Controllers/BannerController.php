<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Log; // Import your Log model
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth; // To get logged-in user
use Illuminate\Validation\ValidationException;

class BannerController extends Controller
{
    /**
     * Display a listing of the banners.
     */
    public function index()
    {
        $banners = Banner::all();

        // Add full image URLs using storage URL
        $banners = $banners->map(function ($banner) {
            if ($banner->image) {
                $banner->image = asset('storage/' . $banner->image);
            }
            return $banner;
        });

        // Log access
        Log::create([
            'name' => Auth::check() ? Auth::user()->name : 'Guest',
            'ip_address' => request()->ip(),
            'title' => 'Viewed banners list',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Banners retrieved successfully.',
            'data' => $banners
        ], 200);
    }

    /**
     * Store a newly created banner in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'category' => 'required|string|in:Rectangle,Square',
            'link' => 'nullable|url|max:2048',
        ], [
            'category.in' => 'The category must be either Rectangle or Square.',
            'image.required' => 'An image is required.',
            'image.image' => 'The file must be an image.',
        ]);

        // Store the uploaded image
        $path = $request->file('image')->store('banners', 'public');

        $banner = Banner::create([
            'image' => $path,
            'category' => $validated['category'],
            'link' => $validated['link'],
        ]);

        // Append full URL
        $banner->image = asset('storage/' . $banner->image);

        // Log creation
        Log::create([
            'name' => Auth::check() ? Auth::user()->name : 'Guest',
            'ip_address' => $request->ip(),
            'title' => 'Created new banner (ID: ' . $banner->id . ')',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Banner created successfully.',
            'data' => $banner
        ], 201);
    }

    /**
     * Update the specified banner.
     */
    public function update(Request $request, $id)
    {
        $banner = Banner::findOrFail($id);

        $validated = $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'category' => 'required|string|in:Rectangle,Square',
            'link' => 'nullable|url|max:2048',
        ], [
            'category.in' => 'The category must be either Rectangle or Square.',
        ]);

        $oldData = $banner->replicate(); // Keep old data if needed

        if ($request->hasFile('image')) {
            if ($banner->image && Storage::disk('public')->exists($banner->image)) {
                Storage::disk('public')->delete($banner->image);
            }
            $banner->image = $request->file('image')->store('banners', 'public');
        }

        $banner->category = $validated['category'];
        $banner->link = $validated['link'];
        $banner->save();

        $banner->image = asset('storage/' . $banner->image);

        // Log update
        Log::create([
            'name' => Auth::check() ? Auth::user()->name : 'Guest',
            'ip_address' => $request->ip(),
            'title' => 'Updated banner (ID: ' . $banner->id . ')',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Banner updated successfully.',
            'data' => $banner
        ], 200);
    }

    /**
     * Remove the specified banner.
     */
    public function destroy($id)
    {
        $banner = Banner::findOrFail($id);

        if ($banner->image && Storage::disk('public')->exists($banner->image)) {
            Storage::disk('public')->delete($banner->image);
        }

        $bannerId = $banner->id;
        $banner->delete();

        // Log deletion
        Log::create([
            'name' => Auth::check() ? Auth::user()->name : 'Guest',
            'ip_address' => request()->ip(),
            'title' => 'Deleted banner (ID: ' . $bannerId . ')',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Banner deleted successfully.'
        ], 200);
    }
}