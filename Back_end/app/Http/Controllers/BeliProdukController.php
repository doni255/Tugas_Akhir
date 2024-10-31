<?php

namespace App\Http\Controllers;
use App\Models\beli_produk;
use App\Models\histori_beli_produk;
use App\Models\Product;
use App\Models\User;
use App\Models\Pendapatan;
use App\Models\Uang;
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
                $beli_produk->harga_jual = $product->harga_jual;
                $beli_produk->tanggal = date('Y-m-d');
                $beli_produk->status = 'belum lunas';
                $beli_produk->status_pengiriman = 'not confirmed';
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
        ->where('status_pengiriman', 'not confirmed')
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
                'status_pengiriman' => $item->status_pengiriman,
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

    public function getBeliProductByStatusPengiriman($id_user)
    {

        $beli_produk = beli_produk::with(['user'])
        // Where id_user matches AND status is 'lunas'
        ->where('id_user', $id_user)
        ->where('status', 'lunas')
        // Use a group to handle the shipping status logic correctly
        ->where(function ($query) {
            $query->where('status_pengiriman', 'confirmed')
                  ->orWhere('status_pengiriman', 'shipped')
                  ->orWhere('status_pengiriman', 'delivered');
        })
        ->get();

        if ($beli_produk->isEmpty()) {
            return response()->json([
                'message' => 'No data',
                'data' => []
            ], 404);
        }

        $beliProductsArray = $beli_produk->map(function ($item) {
            return [
                'id_beli_produk' => $item->id_beli_produk,
                'id_product' => $item->id_product,
                'id_user' => $item->id_user,
                'bukti_pembayaran' => $item->bukti_pembayaran,
                'tanggal' => $item->tanggal,
                'status' => $item->status,
                'status_pengiriman' => $item->status_pengiriman,
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
                'bukti_pembayaran' => 'required|file|mimes:jpeg,png,jpg,gif', // Misalkan ini untuk gambar dalam format base64
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

    public function getBeliProductByStatus()
    {
        $beli_products = beli_produk::where('status', 'lunas')
            ->where('status_pengiriman', 'not confirmed')
            ->get();

        if ($beli_products) {
            return response()->json([
                'message' => 'Data found',
                'data' => $beli_products->map(function ($item) {

                    // There are 2 ways how to displays image with $filePath and $base64Image
                    $filePath = public_path('uploads/bukti_pembayaran/' . $item->bukti_pembayaran);
                    $base64Image = file_exists($filePath) ? base64_encode(file_get_contents($filePath)) : null;

                    return [
                        'id_beli_produk' => $item->id_beli_produk,
                        'id_product' => $item->id_product,
                        'bukti_pembayaran' => $base64Image, // Original image filename
                        'tanggal' => $item->tanggal,
                        'status' => $item->status,
                        // 'kontent_base64' => $base64Image // Base64 image data
                    ];
                }),
            ]);
        }

        return response()->json([
            'message' => 'Data not found',
            'data' => []
        ], 404);
    }

    public function getBeliProductByStatusPengirimanAdmin() 
    {
        $beli_products = beli_produk::with(['user'])
            ->where('status', 'lunas')
            ->where('status_pengiriman', 'confirmed')
            ->orWhere('status_pengiriman', 'shipped')
            ->orWhere('status_pengiriman', 'delivered')    
            ->get();

        if ($beli_products) {
            return response()->json([
                'message' => 'Data found',
                'data' => $beli_products->map(function ($item) {

                    // There are 2 ways how to displays image with $filePath and $base64Image
                    $filePath = public_path('uploads/bukti_pembayaran/' . $item->bukti_pembayaran);
                    $base64Image = file_exists($filePath) ? base64_encode(file_get_contents($filePath)) : null;

                    return [
                        'id_beli_produk' => $item->id_beli_produk,
                        'id_product' => $item->id_product,
                        'bukti_pembayaran' => $base64Image, // Original image filename
                        'tanggal' => $item->tanggal,
                        'status' => $item->status,
                        'status_pengiriman' => $item->status_pengiriman,
                        // 'kontent_base64' => $base64Image // Base64 image data
                        'user' => [
                            'id_user' => $item->user->id_user,
                            'nama' => $item->user->nama,
                            'email' => $item->user->email,
                            'alamat' => $item->user->alamat,
                            'no_telpon' => $item->user->no_telpon,
                            'role' => $item->user->role,
                        ]
                    ];
                }),
            ]);
        }

        return response()->json([
            'message' => 'Data not found',
            'data' => [],
        ], 404);
    }
    // konfirmasi pembayaran
    public function konfirmasiPembayaran($id_beli_produk) {
        $beli_produk = beli_produk::find($id_beli_produk);

        if($beli_produk){
            $beli_produk->status_pengiriman = 'confirmed';
            $beli_produk->confirmed_at = now();
            $beli_produk->save();

            return response()->json([
                'message' => 'Pembayaran berhasil',
                'data' => $beli_produk
            ], 200);
        }

        return response()->json([
            'message' => 'Data not found',
            'data' => []
        ], 404);
    }

    public function ubahStatusPengirimanProdukToShipped($id_beli_produk)
    {
        $beli_produk = beli_produk::find($id_beli_produk);

        if($beli_produk){
            $beli_produk->status_pengiriman = 'shipped';
            $beli_produk->save();

            return response()->json([
                'message' => 'Status pengiriman produk berhasil diubah menjadi shipped',
                'data' => $beli_produk
            ], 200);
        }

        return response()->json([
            'message' => 'Data not found',
            'data' => []
        ], 404);
    }

    public function ubahStatusPengirimanProdukToDelivered($id_beli_produk)
    {

        $beli_produk = beli_produk::find($id_beli_produk);

        if($beli_produk){
            $beli_produk->status_pengiriman = 'delivered';
            $beli_produk->save();

            return response()->json([
                'message' => 'Status pengiriman produk berhasil diubah menjadi delivered',
                'data' => $beli_produk
            ], 200);
        }

        return response()->json([
            'message' => 'Data not found',
            'data' => []
        ], 404);

    }

    public function getPembelianStatusConfirmed($id_beli_produk) {
        $beli_produk = beli_produk::find($id_beli_produk);

        if($beli_produk){
            return response()->json([
                'message' => 'Data found',
                'data' => $beli_produk
            ], 200);
        }

        return response()->json([
            'message' => 'Data not found',
            'data' => []
        ], 404);
    }

    public function receiveOrder($id_beli_produk) {
        $beli_produk = beli_produk::find($id_beli_produk);
        $product = Product::find($beli_produk->id_product);

        if($beli_produk){
             // Simpan data ke histori_beli_produk
             $histori = new histori_beli_produk();
             $histori->id_user = $beli_produk->id_user;             
             $histori->nama_product = $beli_produk->product->nama_product;
             $histori->gambar = $beli_produk->product->konten_base64; // Simpan gambar produk
             $histori->harga_jual = $beli_produk->product->harga_jual;
             $histori->tanggal = date('Y-m-d');             
             $histori->save();
 
             $pendapatan = new Pendapatan();
             $pendapatan->harga_jual = $beli_produk->product->harga_jual; // Tambahkan harga_total
             $pendapatan->pajak = $beli_produk->product->harga_jual * 25/100; // Tambahkan harga_total
             $pendapatan->harga_total = $beli_produk->product->harga_jual + $pendapatan->pajak; // Tambahkan harga_total
             $pendapatan->tanggal = date('Y-m-d');
             $pendapatan->nama_product = $beli_produk->product->nama_product;
             $pendapatan->save();

             $product->jumlah_stock = $product->jumlah_stock - 1;
                $product->save();
 
             $uang = Uang::find(1);
             $uang->jumlah_uang = $uang->jumlah_uang + $pendapatan->harga_total;
             $uang->save();
         
             $beli_produk->delete();

            return response()->json([
                'message' => 'Order received',
                'data' => [
                    $pendapatan,
                    $uang
                ]
            ], 200);
        }

        return response()->json([
            'message' => 'Data not found',
            'data' => []
        ], 404);

    }

    // buatkan fungsi yang dimana menghapus keranjangpembelian
    public function destroyEvidentPayment($id_beli_produk) {
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
