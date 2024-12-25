<?php

namespace App\Console\Commands;

use App\Http\Controllers\BeliProdukController;
use App\Models\beli_produk;
use Illuminate\Console\Command;

class AutoConfirmOrder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:name';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */

     
    public function handle()
    {
        // Get all confirmed orders that have passed the 4-hour threshold
        $expiredOrders = beli_produk::where('status_pengiriman', 'confirmed')
            ->where('confirmed_at', '<=', now()->subHours(4))
            ->get();
    
        foreach ($expiredOrders as $order) {
            app()->call([BeliProdukController::class, 'receiveOrder'], ['id_beli_produk' => $order->id_beli_produk]);
        }
    
        $this->info('Expired orders have been auto-confirmed.');
    }
}
