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

    public function getTotalUsers()
    {
        // Menghitung total user berdasarkan id_user
        $totalUsers = User::count();

        // Mengembalikan hasil dalam format JSON
        return response()->json(['totalUsers' => $totalUsers]);
    }

    public function update(Request $request, $id)
    {
        // Input Validation
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'alamat' => 'required|string|max:255',
            'kota' => 'required|string|max:255',
            'no_telpon' => 'required|string|regex:/^[0-9]+$/|max:20',
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        // FInd user by id
        $user = User::find($id);
        if (!$user){
            return response()->json(['message' => 'User not found'], 404);
        }

     
        // Update data user
        $user->nama = $request->input('nama');
        $user->email = $request->input('email');
        $user->alamat = $request->input('alamat');
        $user->kota = $request->input('kota');
        $user->no_telpon = $request->input('no_telpon');
        $user->save();
        
        return response()->json($user, 200);

    }
    
    public function destroy($id)
    {  

        $user = User::find($id);

        if(!$user){
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User Deleted succesfully']); 

        // Menghapus user berdasarkan ID yang diberikan
        User::destroy($id);
        
        // Mengembalikan respons JSON dengan kode status 204 (No Content)
        return response()->json(null, 204);
    }

    public function store(Request $request)
    {   
        // Validasi data yang masuk 
        $validator = Validator::make($request->all(), [
        'nama' => 'required|string|max:255|unique:users,nama',
        'email' => 'required|email|unique:users,email',
        'no_telpon' => 'required|string|max:20',
        'role' => 'required|string|max:50',
        'kota' => 'required|string|max:100',
        'alamat' => 'required|string|max:255',
        'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Membuat user baru 
        $user = User::create([
            'nama' => $request->nama,
            'email' => $request->email,
            'no_telpon' => $request->no_telpon,
            'role' => $request->role,
            'kota' => $request->kota,
            'alamat' => $request->alamat,
            'password' => Hash::make($request->password),
        ]);

           return response()->json([
            'message' => 'User created successfully',
            'user' => $user,
        ], 201);
    }

    public function storeUser(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255|unique:users,nama',
            'email' => 'nullable|email|unique:users,email',
            'no_telpon' => 'required|string|max:20',
            'kota' => 'required|string|max:100',
            'alamat' => 'required|string|max:255',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response([
                'message' => 'Validation Error',
                'data' => $validator->errors()
            ], 400);
        }

        // Create the user
        $user = User::create([
            'nama' => $request->nama,
            'email' => $request->email,
            'no_telpon' => $request->no_telpon,
            'role' => 'user', // Set role menjadi "user"
            'kota' => $request->kota,
            'alamat' => $request->alamat,
            'password' => Hash::make($request->password),
        ]);

        return response([
            'message' => 'User created successfully',
            'data' => $user
        ], 201);
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

    // Retrieve the user by nama
    $user = User::where('nama', $request->nama)->first();

    if (!$user) {
        return response([
            'message' => 'Nama is not registered.',
            'data' => null
        ], 404);
    }

    // Check the password using Hash::check
    if (Hash::check($request->password, $user->password)) {
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
