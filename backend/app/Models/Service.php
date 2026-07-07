<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable=["title","description","price","duration","image","artisan_id","category_id"];

    public function artisan(){
        return $this->belongsTo(User::class,'artisan_id');
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function reservations(){
        return $this->hasMany(Reservation::class);
    }

    public function favoritedBy(){
        return $this->belongsToMany(User::class,'favorites','service_id','client_id');
    }

}
