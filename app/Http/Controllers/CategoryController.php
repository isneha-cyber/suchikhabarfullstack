<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of categories for API.
     */
    public function index()
    {
        $categories = Category::all();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ], 200);
    }

/**
 * Display the category page with its news.
 */
public function showDetails($slug, Request $request)
{
    $perPage = 15;

    // Get category
    $category = Category::where('slug', $slug)->firstOrFail();

    // Get news for this category
    $news = News::where('category', $category->name)
        ->latest('published_at')
        ->paginate($perPage)
        ->withQueryString(); // Important for pagination

    return Inertia::render('CategoryPage', [
        'category' => [
            'id'   => $category->id,
            'name' => $category->name,
            'slug' => $category->slug,
        ],
        'news' => $news,
    ]);
}

    /**
     * Store a newly created category.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:categories,name|max:255',
        ]);

        $category = Category::create([
            'name' => $request->name,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Category created successfully',
            'data' => $category,
        ], 201);
    }

    /**
     * Update the specified category.
     */
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,'.$category->id,
        ]);

        $category->update([
            'name' => $request->name,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Category updated successfully',
            'data' => $category,
        ], 200);
    }

    /**
     * Remove the specified category.
     */
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        
        // Check if category has news (using string comparison)
        $newsCount = News::where('category', $category->name)->count();
        
        if ($newsCount > 0) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete category with associated news',
            ], 400);
        }

        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully',
        ], 200);
    }
}