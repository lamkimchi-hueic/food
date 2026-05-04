<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;

class AnalyticsController extends Controller
{
    private string $pythonApiUrl = 'http://localhost:8001';

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
            $response = Http::timeout(10)->get($this->pythonApiUrl . $endpoint);

            if ($response->successful()) {
                return response()->json($response->json());
            }

            return response()->json(['error' => 'Python API returned error'], $response->status());
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Không thể kết nối Python Analysis API',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
