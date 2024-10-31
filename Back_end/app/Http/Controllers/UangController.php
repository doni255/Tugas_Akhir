<?php

namespace App\Http\Controllers;
use App\Models\Uang;
use Illuminate\Http\Request;

class UangController extends Controller
{
    //
    public function showUang(){
        $uang = Uang::all();
        return response()->json($uang);
    }
}
