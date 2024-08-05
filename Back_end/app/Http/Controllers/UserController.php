<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Session;

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
        // Validate the request
        $validator = Validator::make($request->all(), [            
            'nama' => 'required',
            'password' => 'required',            
        ]);

        if ($validator->fails()) {
            return response([
                'message' => 'Validation Error',
                'data' => $validator->errors()
            ], 400);
        }

        // Retrieve the user by email
        $user = User::where('nama', $request->nama)->first();

        if (!$user) {
            return response([
                'message' => 'Nama is not registered.',
                'data' => null
            ], 404);
        }

        // Check the password
        if (($request->password == $user->password)) {
            $token = $user->createToken('token')->accessToken;

            return response([
                'message' => 'Login success',
                'data' => $user,
                'token' => $token
            ], 200);
        } else {
            return response([
                'message' => 'Password is wrong',
                'data' => null
            ], 401);
        }
    }

}
