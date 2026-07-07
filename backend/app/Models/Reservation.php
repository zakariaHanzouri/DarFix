<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;
    // id client_id
        // service_id
        // booking_date
        // status
    protected $fillable=['client_id','service_id','reservation_date','status'];

    public function client(){
        return $this->belongsTo(User::class,"client_id");
    }

    public function service(){
        return $this->belongsTo(Service::class);
    }

    public function review(){
       return  $this->hasOne(Review::class);
    }
}
