<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Models\Heading;
use App\Models\Banner;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = News::latest()->get();

        return response()->json([
            'status' => true,
            'message' => 'News fetched successfully',
            'data' => $news,
        ]);
    }

    /**
     * API endpoint to get single news with related articles
     */
    public function getNewsBySlug($slug)
    {
        $news = News::where("slug", $slug)->firstOrFail();
        
        // Get related news from same category, excluding current news
        $related = News::where('category', $news->category)
            ->where('id', '!=', $news->id)
            ->latest()
            ->take(6)
            ->get();

        return response()->json([
            'status' => true,
            'data' => $news,
            'related' => $related
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'image'        => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'heading'      => 'required|string|max:255',
            'blog_by'      => 'required|string|max:255',
            'description'  => 'required|string',
            'published_at' => 'nullable|date',
            'category'     => 'nullable|string|max:255',
            'pdf'          => 'nullable|mimes:pdf|max:10000',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('news/images', 'public');
        }

        if ($request->hasFile('pdf')) {
            $validated['pdf'] = $request->file('pdf')->store('news/pdfs', 'public');
        }

        $news = News::create($validated);

        Log::create([
            'name' => Auth::check() ? Auth::user()->name : 'Guest',
            'ip_address' => $request->ip(),
            'title' => 'Created news: "' . $news->heading . '"',
        ]);

        return response()->json([
            'status' => true,
            'message' => 'News created successfully',
            'data' => $news,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);

        $validated = $request->validate([
            'image'        => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'heading'      => 'sometimes|required|string|max:255',
            'blog_by'      => 'sometimes|required|string|max:255',
            'description'  => 'sometimes|required|string',
            'published_at' => 'nullable|date',
            'category'     => 'nullable|string|max:255',
            'pdf'          => 'nullable|mimes:pdf|max:10000',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('news/images', 'public');
        }

        if ($request->hasFile('pdf')) {
            $validated['pdf'] = $request->file('pdf')->store('news/pdfs', 'public');
        }

        $news->update($validated);

        Log::create([
            'name' => Auth::check() ? Auth::user()->name : 'Guest',
            'ip_address' => $request->ip(),
            'title' => 'Updated news: "' . $news->heading . '"',
        ]);

        return response()->json([
            'status' => true,
            'message' => 'News updated successfully',
            'data' => $news,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $news = News::findOrFail($id);
        $heading = $news->heading;
        $news->delete();

        Log::create([
            'name' => Auth::check() ? Auth::user()->name : 'Guest',
            'ip_address' => request()->ip(),
            'title' => 'Deleted news: "' . $heading . '"',
        ]);

        return response()->json([
            'status' => true,
            'message' => 'News deleted successfully',
        ]);
    }

    public function newsShow($slug){
        $newsDetails = News::where("slug", $slug)->firstOrFail();
        return Inertia::render("MainPages/NewsDetails", [
            "slug" => $slug, // Pass the slug to the component
            "newsdetails" => $newsDetails // Also pass the news details for initial render
        ]);
    }

    public function home(){
    $today = Carbon::today();

    $todayNews = Heading::whereDate('published_at', $today)->get();

    $categories = News::select('category')
        ->distinct()
        ->pluck('category');

    $categoryNews = [];
    foreach ($categories as $category) {
        $categoryNews[$category] = News::where('category', $category)
            ->latest()
            ->take(8)
            ->get();
    }

    $bannerCategories = Banner::select('category')
        ->distinct()
        ->pluck('category');

    $categoryBanners = [];
    foreach ($bannerCategories as $bannerCategory) {
        $categoryBanners[$bannerCategory] = Banner::where('category', $bannerCategory)
            ->latest()
            ->get(); 
    }

    // Get latest 3 news for hero section
    $latestNews = News::latest()->take(3)->get();
    
    // Debug: Log to Laravel log
    \Log::info('Latest News Count: ' . $latestNews->count());
    \Log::info('Latest News Data:', $latestNews->toArray());

    return Inertia::render("MainPages/HomePage", [
        "todayNews"      => $todayNews,
        "categoryNews"   => $categoryNews,
        "categoryBanners"=> $categoryBanners,
        "latestNews"     => $latestNews,
    ]);
}
}