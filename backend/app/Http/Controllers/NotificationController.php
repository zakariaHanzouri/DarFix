<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index()
    {
        

        $notifications =auth()->user()->notifications()->latest()->paginate(10);

        return response()->json([
            'notifications' => NotificationResource::collection($notifications),
             'pagination' => [
                'current_page' => $notifications->currentPage(),
                'last_page' => $notifications->lastPage(),
                'per_page' => $notifications->perPage(),
                'total_items' => $notifications->total()
            ]
        ]);

    }

    public function makeAsRead(Notification $notification)
    {

        $this->authorize('update',$notification);

        $notification->update([
            'is_read' => true,
        ]);
        return response()->json([
            "message" => 'Notification marked as read'
        ]);
    }

    public function destroy(Notification $notification)
    {
        
        $this->authorize('delete',$notification);

        $notification->delete();

        return response()->json([
            "message" => 'delete notification successfully'
        ],204);

    }
}
