<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;

class AnalyticsController extends Controller
{
    private string $pythonApiUrl;

    public function __construct()
    {
        $this->pythonApiUrl = rtrim(env('PYTHON_API_URL', 'http://localhost:8001'), '/');
    }

    public function customerInterest()
    {
        return $this->proxyPython('/api/analysis/customer-interest');
    }

    public function categoryPopularity()
    {
        return $this->proxyPython('/api/analysis/category-popularity');
    }

    public function revenueByCategory()
    {
        return $this->proxyPython('/api/analysis/revenue-by-category');
    }

    public function orderTrends()
    {
        return $this->proxyPython('/api/analysis/order-trends');
    }

    public function topCustomers()
    {
        return $this->proxyPython('/api/analysis/top-customers');
    }

    private function proxyPython(string $endpoint)
    {
        try {
            $response = Http::timeout(60)->connectTimeout(60)->get($this->pythonApiUrl . $endpoint);

            if ($response->successful()) {
                return response()->json($response->json());
            }

            return response()->json([
                'error' => 'Python API returned error',
                'status' => $response->status(),
                'url' => $this->pythonApiUrl . $endpoint,
                'body' => $response->body(),
            ], $response->status());
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Không thể kết nối Python Analysis API',
                'url' => $this->pythonApiUrl . $endpoint,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
