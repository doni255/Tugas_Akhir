<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
         // Mendapatkan semua data dari tabel users
        $user = User::all();
        
        // Mengembalikan data dalam bentuk JSON response
        return response()->json($user);
    }

    public function destroy($id)
    {
        // Menghapus user berdasarkan ID yang diberikan
        User::destroy($id);
        
        // Mengembalikan respons JSON dengan kode status 204 (No Content)
        return response()->json(null, 204);
    }

    public function login(Request $request)
    {
         // Validasi input
    $validator = Validator::make($request->all(), [
        'nama' => 'required|string',
        'password' => 'required|string',
    ]);

    if ($validator->fails()) {
        return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
    }

    $credentials = $request->only('nama', 'password');

    if (Auth::attempt($credentials)) {
         // Jika login berhasil, ambil user dan generate token
        $user = Auth::user();
        // Generate token atau data lain jika perlu
        return response()->json(['message' => 'Login successful', 'user' => $user], 200);
    } else {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
    }
}
