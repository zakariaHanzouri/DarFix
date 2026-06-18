<?php

use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // reservations
        // id client_id
        // service_id
        // booking_date
        // status
        // created_at
        // updated_at
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class,'client_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignIdFor(Service::class)->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->date('reservation_date');
            $table->enum('status',['pending','accepted','rejected','completed']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
