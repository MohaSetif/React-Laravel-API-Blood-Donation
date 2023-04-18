<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotifyStatusCtrl extends Controller
{
    public function markAsRead(Request $request, $id)
    {
        $notification = Notification::find($id);

    if (!$notification) {
        return response()->json(['message' => 'Notification not found'], 404);
    }

    $notification->mark_as_read = $request->input('mark_as_read');
    $notification->save();

    return response()->json(['message' => 'Notification status updated successfully'], 200);
    }

    public function countNotification(){
        return response()->json(Notification::where('mark_as_read', 'not seen')->count());
    }
}
