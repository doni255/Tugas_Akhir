<?php

namespace App\Http\Controllers;
use App\Models\beli_produk;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class BeliProdukController extends Controller
{
    //
    public function keranjangPembelian(Request $request, $id_user) 
    {
        $user = User::find($id_user);
        
        if($user){
            $validator = Validator::make($request->all(), [
                'id_product' => 'required'
            ]);

            if($validator->fails()){
                return response()->json($validator->errors(), 422);
            }

            $product = Product::find($request->id_product);

            if($product) {
                $beli_produk = new beli_produk();
                $beli_produk->id_product = $product->id_product;
                $beli_produk->id_user = $id_user;
                $beli_produk->bukti_pembayaran = null;
                $beli_produk->tanggal = date('Y-m-d');
                $beli_produk->status = 'belum lunas';
                $beli_produk->save();

                return response()->json([
                    'message' => 'Product added to cart',
                    'data' => $beli_produk
                ]);
            }

            return response()->json([
                'message' => 'Product not found',
                'data' => []
            ], 404);
        }

        return response()->json([
            'message' => 'User not found',
            'data' => []
        ], 404); 
    }

    public function getKeranjangPembelian($id_user) {
        $beli_produk = beli_produk::with(['product'])
        ->where('id_user', $id_user)
        ->get();

        if($beli_produk->isEmpty()){
            return response()->json([
                'message' => 'No data',
                'data' => []
            ], 404);
        }

        $beliProductsArray = $beli_produk->map(function($item){
            return [
                'id_beli_produk' => $item->id_beli_produk,
                'id_product' => $item->id_product,
                'id_user' => $item->id_user,
                'bukti_pembayaran' => $item->bukti_pembayaran,
                'tanggal' => $item->tanggal,
                'status' => $item->status,
                'product' => [
                    'id_product' => $item->product->id_product,
                    'nama_product' => $item->product->nama_product,
                    'kategori_produk' => $item->product->kategori_produk,
                    'harga_beli' => $item->product->harga_beli,
                    'harga_jual' => $item->product->harga_jual,
                    'jumlah_stock' => $item->product->jumlah_stock,
                    'konten_base64' => $item->product->konten_base64
                ]
            ];
        });

        return response()->json([
            'message' => 'Retrieve data success',
            'data' => $beliProductsArray
        ], 200);
    }
    
    public function beliProduct(Request $request, $id_beli_produk) {
        
        $beli_produk = beli_produk::find($id_beli_produk);
        
        if($beli_produk){
            $validator = Validator::make($request->all(), [
                'bukti_pembayaran' => 'required|file|mimes:jpeg,png,jpg,gif|max:2048', // Misalkan ini untuk gambar dalam format base64
            ]);

            if($validator->fails()){
                return response()->json($validator->errors(), 422);
            }
            $beli_produk->status = 'lunas';

            if($request->hasFile('bukti_pembayaran')){
                $file = $request->file('bukti_pembayaran');
                $fileName = time().'_'.$file->getClientOriginalName();
                $file->move(public_path('uploads/bukti_pembayaran'), $fileName);
                $beli_produk->bukti_pembayaran = $fileName;
            }

            $beli_produk->save();

            return response()->json([
                'message' => 'Product purchased successfully',
                'data' => [
                    'id_beli_produk' => $beli_produk->id_beli_produk,
                    'id_product' => $beli_produk->id_product,
                    'id_user' => $beli_produk->id_user,
                    'bukti_pembayaran' => $beli_produk->bukti_pembayaran,
                    'tanggal' => $beli_produk->tanggal,
                    'status' => $beli_produk->status
                ]
            ]);
        }

        return response()->json([
            'message' => 'Product not found',
            'data' => []
        ], 404);
    }


    // BUAT ADMIN
    public function getBeliProductByStatus() {
        $beli_produk = beli_produk::where('status', 'lunas')->get();

        if($beli_produk->isEmpty()){
            return response()->json([
                'message' => 'No data',
                'data' => []
            ], 404);
        }

        return response()->json([
            'message' => 'Retrieve data success',
            'data' => $beli_produk
        ], 200);
    }

    // buatkan fungsi yang dimana menghapus keranjangpembelian
    public function destroyCartProduct($id_beli_produk) {
        $beli_produk = beli_produk::find($id_beli_produk);

        if($beli_produk){
            $beli_produk->delete();

            return response()->json([
                'message' => 'Delete keranjang pembelian success',
                'data' => $beli_produk
            ], 200);
        }

        return response()->json([
            'message' => 'Data not found',
            'data' => []
        ], 404);
    }
    
}
