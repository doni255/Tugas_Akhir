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
    // public function keranjangPembelian(Request $request, $id_user) 
    // {
    //     $user = User::find($id_user);
        
    //     if($user){
    //         $validator = Validator::make($request->all(), [
    //             'id_product' => 'required'
    //         ]);

    //         if($validator->fails()){
    //             return response()->json($validator->errors(), 422);
    //         }

    //         $product = Product::find($request->id_product);

    //         if($product) {
    //             $beli_produk = new beli_produk();
    //             $beli_produk->id_product = $product->id_product;
    //             $beli_produk->id_user = $id_user;
    //             $beli_produk->bukti_pembayaran = null;
    //             $beli_produk->harga_jual = $product->harga_jual;
    //             $beli_produk->tanggal = date('Y-m-d');
    //             $beli_produk->status = 'belum lunas';
    //             $beli_produk->status_pengiriman = 'not confirmed';
    //             $beli_produk->save();

    //             return response()->json([
    //                 'message' => 'Product added to cart',
    //                 'data' => $beli_produk
    //             ]);
    //         }

    //         return response()->json([
    //             'message' => 'Product not found',
    //             'data' => []
    //         ], 404);
    //     }

    //     return response()->json([
    //         'message' => 'User not found',
    //         'data' => []
    //     ], 404); 
    // }
    
    public function keranjangPembelian(Request $request, $id_user) 
    {
        $user = User::find($id_user);
        $product = Product::find($request->id_product);
    
        if ($user) {
            // Validate the input
            $validator = Validator::make($request->all(), [
                'id_product' => 'required|exists:products,id_product',
                'jumlah' => 'required|integer|min:1', // Validate the product quantity
            ]);
    
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }
    
            // Check if the product exists
            if ($product) {
                // Calculate the total quantity in the cart for this product
                $existingCart = beli_produk::where('id_user', $id_user)
                                           ->where('id_product', $product->id_product)
                                           ->first();
    
                $totalQuantityInCart = $existingCart ? $existingCart->jumlah : 0;
                $requestedQuantity = $request->jumlah;
                $totalQuantity = $totalQuantityInCart + $requestedQuantity;

                 // jika tidak ada produk sama sekali di keranjang
                if (!$existingCart) {
                    
                    // Add the product to the cart if it doesn't already exist
                    $beli_produk = new beli_produk();
                    $beli_produk->id_product = $product->id_product;
                    $beli_produk->id_user = $id_user;
                    $beli_produk->bukti_pembayaran = null;
                    $beli_produk->harga_jual = $product->harga_jual;
                    $beli_produk->harga_total_jual = $product->harga_total_jual;
                    $beli_produk->jumlah = $requestedQuantity; // Set the requested quantity
                    $beli_produk->tanggal = date('Y-m-d');
                    $beli_produk->status = 'belum lunas';
                    $beli_produk->status_pengiriman = 'not confirmed';
                    $beli_produk->save();
    
                    return response()->json([
                        'message' => 'Product added to cart',
                        'data' => $beli_produk
                    ]);
                }

                // Check if the requested quantity exceeds available stock
                if ($totalQuantity > $product->jumlah_stock) {
                    return response()->json([
                        'message' => 'Jumlah yang Anda pilih melebihi stok yang tersedia.',
                    ], 400); // Return 400 status if stock is insufficient
                }

                // Update the cart if the product already exists
                if ($existingCart) {
                    if ($existingCart->status === 'belum lunas') {
                        $existingCart->jumlah = $totalQuantity; // Update the quantity in the cart
                        $existingCart->save();
    
                        return response()->json([
                            'message' => 'Product quantity updated in cart',
                            'data' => $existingCart
                        ]);
                    }

                    if ($existingCart->status === 'lunas') {
                        // jika ada produk yang sudah lunas, maka akan mencari produk yang belum lunas
                        $existingCart = beli_produk::where('id_user', $id_user)
                            ->where('id_product', $product->id_product)
                            ->where('status', 'belum lunas')
                            ->first();

                            $totalQuantityInCart = $existingCart ? $existingCart->jumlah : 0;
                            $requestedQuantity = $request->jumlah;
                            $totalQuantity = $totalQuantityInCart + $requestedQuantity;

                        if ($existingCart) {
                            $existingCart->jumlah = $totalQuantity; // Update the quantity in the cart
                            $existingCart->save();
        
                            return response()->json([
                                'message' => 'Product quantity updated in cart',
                                'data' => $existingCart
                            ]);
                        }

                        // Add the product to the cart if it doesn't already exist
                        $beli_produk = new beli_produk();
                        $beli_produk->id_product = $product->id_product;
                        $beli_produk->id_user = $id_user;
                        $beli_produk->bukti_pembayaran = null;
                        $beli_produk->harga_jual = $product->harga_jual;
                        $beli_produk->harga_total_jual = $product->harga_total_jual;
                        $beli_produk->jumlah = $requestedQuantity; // Set the requested quantity
                        $beli_produk->tanggal = date('Y-m-d');
                        $beli_produk->status = 'belum lunas';
                        $beli_produk->status_pengiriman = 'not confirmed';
                        $beli_produk->save();
        
                        return response()->json([
                            'message' => 'Product added to cart',
                            'data' => $beli_produk
                        ]);
                    }
                }
               
    
                // else {
                //     // Add the product to the cart if it doesn't already exist
                //     $beli_produk = new beli_produk();
                //     $beli_produk->id_product = $product->id_product;
                //     $beli_produk->id_user = $id_user;
                //     $beli_produk->bukti_pembayaran = null;
                //     $beli_produk->harga_jual = $product->harga_jual;
                //     $beli_produk->harga_total_jual = $product->harga_total_jual;
                //     $beli_produk->jumlah = $requestedQuantity; // Set the requested quantity
                //     $beli_produk->tanggal = date('Y-m-d');
                //     $beli_produk->status = 'belum lunas';
                //     $beli_produk->status_pengiriman = 'not confirmed';
                //     $beli_produk->save();
    
                //     return response()->json([
                //         'message' => 'Product added to cart',
                //         'data' => $beli_produk
                //     ]);
                // }
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
            'harga_total_jual' => $item->jumlah * $item->product->harga_total_jual,
            'status' => $item->status,
            'status_pengiriman' => $item->status_pengiriman,
            'jumlah' => $item->jumlah,  // Menambahkan jumlah produk yang dipesan
            'product' => [
                'id_product' => $item->product->id_product,
                'nama_product' => $item->product->nama_product,
                'kategori_produk' => $item->product->kategori_produk,
                'harga_beli' => $item->product->harga_beli,
                'harga_total_jual' => $item->product->harga_total_jual,
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


    // public function getKeranjangPembelian($id_user) {
    //     $beli_produk = beli_produk::with(['product'])
    //     ->where('id_user', $id_user)
    //     ->where('status_pengiriman', 'not confirmed')
    //     ->get();

    //     if($beli_produk->isEmpty()){
    //         return response()->json([
    //             'message' => 'No data',
    //             'data' => []
    //         ], 404);
    //     }

    //     $beliProductsArray = $beli_produk->map(function($item){
    //         return [
    //             'id_beli_produk' => $item->id_beli_produk,
    //             'id_product' => $item->id_product,
    //             'id_user' => $item->id_user,
    //             'bukti_pembayaran' => $item->bukti_pembayaran,
    //             'tanggal' => $item->tanggal,
    //             'status' => $item->status,
    //             'status_pengiriman' => $item->status_pengiriman,
    //             'product' => [
    //                 'id_product' => $item->product->id_product,
    //                 'nama_product' => $item->product->nama_product,
    //                 'kategori_produk' => $item->product->kategori_produk,
    //                 'harga_beli' => $item->product->harga_beli,
    //                 'harga_jual' => $item->product->harga_jual,
    //                 'jumlah_stock' => $item->product->jumlah_stock,
    //                 'konten_base64' => $item->product->konten_base64
    //             ]
    //         ];
    //     });

    //     return response()->json([
    //         'message' => 'Retrieve data success',
    //         'data' => $beliProductsArray
    //     ], 200);
    // }

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

            $beli_produk->harga_total_jual = $beli_produk->jumlah * $beli_produk->harga_total_jual;
            $beli_produk->save();

            return response()->json([
                'message' => 'Product purchased successfully',
                'data' => [
                    'id_beli_produk' => $beli_produk->id_beli_produk,
                    'id_product' => $beli_produk->id_product,
                    'id_user' => $beli_produk->id_user,
                    'bukti_pembayaran' => $beli_produk->bukti_pembayaran,
                    'tanggal' => $beli_produk->tanggal,
                    'status' => $beli_produk->status,
                    'harga_total_jual' => $beli_produk->harga_total_jual
                ]
            ]);
        }

        return response()->json([
            'message' => 'Product not found',
            'data' => []
        ], 404);
    }


    public function beliAllProducts(Request $request) {
        // Get all cart items for the user
        $cartItems = beli_produk::where('id_user', 51) // Filter by user ID
                                ->where('status', '!=', 'lunas') // Filter out already paid products
                                ->get();
    
        // Check if there are any items in the cart
        if ($cartItems->isEmpty()) {
            return response()->json([
                'message' => 'No products in the cart',
                'data' => []
            ], 404);
        }
    
        // Validate payment proof file
        $validator = Validator::make($request->all(), [
            'bukti_pembayaran' => 'required|file|mimes:jpeg,png,jpg,gif|max:10240', // Add file size limit (10MB for example)
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        // Process each product in the cart
        foreach ($cartItems as $beli_produk) {
            $beli_produk->status = 'lunas'; // Mark the product as paid
    
            // Handle payment proof file upload
            if ($request->hasFile('bukti_pembayaran')) {
                $file = $request->file('bukti_pembayaran');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('uploads/bukti_pembayaran'), $fileName); // Save file in 'public/uploads/bukti_pembayaran'
                $beli_produk->bukti_pembayaran = $fileName;
            }
    
            // Save the updated product
            $beli_produk->save();
        }
    
        // Return success response after processing all products
        return response()->json([
            'message' => 'All products purchased successfully',
            'data' => $cartItems->map(function($item) {
                return [
                    'id_beli_produk' => $item->id_beli_produk,
                    'id_product' => $item->id_product,
                    'id_user' => $item->id_user,
                    'bukti_pembayaran' => $item->bukti_pembayaran,
                    'tanggal' => $item->tanggal,
                    'status' => $item->status
                ];
            })
        ]);
    }
    
    


    // BUAT ADMIN

    public function getBeliProductByStatus()
    {
        $beli_products = beli_produk::where('status', 'lunas')
            ->where('status_pengiriman', 'not confirmed')
            ->with('user') // memuat relasi dengan modal user
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
                        'jumlah' => $item->jumlah,
                        'tanggal' => $item->tanggal,
                        'status' => $item->status,
                        // 'kontent_base64' => $base64Image // Base64 image data

                        'user' => [
                            'id_user' => $item->user->id_user ?? null,
                            'nama_user' => $item->user->nama ?? 'Unknown', // Nama pengguna
                            'email_user' => $item->user->email ?? 'Unknown', // Email pengguna
                            'no_telpon_user' => $item->user->no_telpon ?? 'Unknown', // Nomor telepon pengguna
                            'kota_user' => $item->user->kota ?? 'Unknown', // Kota pengguna
                            'alamat_user' => $item->user->alamat ?? 'Unknown', // Alamat pengguna
                        ],
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


    public function konfirmasiPembayaran($id_beli_produk) {
        $beli_produk = beli_produk::find($id_beli_produk);
        $product = Product::find($beli_produk->id_product);
    
        if($beli_produk) {
            // Update the order status to 'confirmed' and set the confirmation timestamp
            $beli_produk->status_pengiriman = 'confirmed';
            $beli_produk->save();
    
  
    
            // Calculate revenue and tax, then save to `Pendapatan`
            $pendapatan = new Pendapatan();
            $pendapatan->harga_jual = $product->harga_jual;
            $pendapatan->jumlah = $beli_produk->jumlah;
            $pendapatan->pajak = $product->pajak * $beli_produk->jumlah;
            $pendapatan->harga_total_jual = ($pendapatan->harga_jual * $pendapatan->jumlah) + $pendapatan->pajak; // Corrected calculation
            $pendapatan->tanggal = date('Y-m-d');
            $pendapatan->nama_product = $product->nama_product;
            $pendapatan->save();
    
    
            // Update product stock
            $product->jumlah_stock -= $beli_produk->jumlah;
            $product->save();
    
            // Update cash balance in `Uang`
            $uang = Uang::find(1);
            $uang->jumlah_uang += $pendapatan->harga_total_jual;
            $uang->save();
    
            return response()->json([
                'message' => 'Pembayaran berhasil dan pendapatan tercatat.',
                'data' => [
                    'order' => $beli_produk,
                    'pendapatan' => $pendapatan,
                    'uang' => $uang
                ]
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

    // public function receiveOrder($id_beli_produk) {
    //     $beli_produk = beli_produk::find($id_beli_produk);
    //     $product = Product::find($beli_produk->id_product);
    
    //     if ($beli_produk && $beli_produk->status_pengiriman === 'confirmed') {
    //         // Check if the order has already been received
    //         if ($beli_produk->received_at) {
    //             return response()->json([
    //                 'message' => 'Order has already been received.',
    //             ], 400);
    //         }

    //                   // Save data to order history
    //         $histori = new histori_beli_produk();
    //         $histori->id_user = $beli_produk->id_user;
    //         $histori->nama_product = $product->nama_product;
    //         $histori->gambar = $product->konten_base64;
    //         $histori->harga_jual = $product->harga_jual;
    //         $histori->tanggal = date('Y-m-d');
    //         $histori->save();
    //         $beli_produk->delete();
    
    //         return response()->json([
    //             'message' => 'Order received successfully.',
    //             'data' => $beli_produk.$histori
    //         ], 200);
    //     }
    
    //     return response()->json([
    //         'message' => 'Data not found or order not confirmed.',
    //         'data' => []
    //     ], 404);
    // }

    public function receiveOrder($id_beli_produk) {
        $beli_produk = beli_produk::find($id_beli_produk);
    
        if (!$beli_produk) {
            return response()->json(['message' => 'Order not found.'], 404);
        }
    
       // Allow receiving if status is 'confirmed', 'shipped', or 'delivered'
        if (!in_array($beli_produk->status_pengiriman, ['confirmed', 'shipped', 'delivered'])) {
            return response()->json([
                'message' => 'Order status is not eligible for receiving.',
                'current_status' => $beli_produk->status_pengiriman,
            ], 400);
        }

    
        // Check if the order has already been received
        if ($beli_produk->received_at) {
            return response()->json(['message' => 'Order has already been received.'], 400);
        }
    
        // Save to history and delete the order
        $product = Product::find($beli_produk->id_product);
        if ($product) {
            $histori = new histori_beli_produk();
            $histori->id_user = $beli_produk->id_user;
            $histori->nama_product = $product->nama_product;
            $histori->gambar = $product->konten_base64;
            $histori->harga_jual = $product->harga_jual + $product->pajak;
            $histori->jumlah = $beli_produk->jumlah;
            $histori->harga_total_jual = $histori->harga_jual * $histori->jumlah;
            $histori->tanggal = now();
            $histori->save();
    
            $beli_produk->delete();
            return response()->json(['message' => 'Order received successfully.'], 200);
        }
    
        return response()->json(['message' => 'Product not found.'], 404);
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
