<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function updateStatus(Request $request, $id)
{
    $user = User::find($id);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    $user->usertype = $request->input('usertype');
    $user->save();

    return response()->json(['message' => 'User status updated successfully'], 200);
}
}
