<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Review;
use App\Models\Service;
use App\Models\User;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{


    public function index()
    {
         $user= auth()->user();  
        if ($user->role->name !== "admin") {
           abort(403);
        }

        $totalUsers = User::count();

        $totalClients = User::whereHas('role', function ($q) {
            $q->where('name', 'client');
        })->count();

        $totalArtisans = User::whereHas('role', function ($q) {
            $q->where('name', 'artisan');
        })->count();

        $totalServices = Service::count();

        $totalReservations = Reservation::count();

        $totalCompletedReservations = Reservation::where("status", "completed")->count();
        $totalAcceptedReservations = Reservation::where("status", "accepted")->count();
        $totalRejectedReservations = Reservation::where("status", "rejected")->count();
        $totalPendingReservations = Reservation::where("status", "pending")->count();

        $totalReviews = Review::count();

        return response()->json([
            'statistics' => [
                'users' => $totalUsers,
                'clients' => $totalClients,
                'artisans' => $totalArtisans,
                'services' => $totalServices,
                'reservations' => $totalReservations,
                'completed_reservations' => $totalCompletedReservations,
                'accepted_reservations' => $totalAcceptedReservations,
                'rejected_reservations' => $totalRejectedReservations,
                'pending_reservations' => $totalPendingReservations,
                'reviews' => $totalReviews,
            ]
        ]);
    }



}
