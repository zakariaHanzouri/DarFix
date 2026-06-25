<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable,HasApiTokens;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // User(id,name,email,password,phone,city, role_id,created_at,updated_at);
    protected $fillable=["name","email","phone","city","password","role_id",'is_active'];

    public function role(){
        return $this->belongsTo(Role::class);
    }

    public function services(){
        return $this->hasMany(Service::class,'artisan_id');
    }

    public function reservations(){
        return $this->hasMany(Reservation::class,"client_id");
    }

    public function favoriteServices(){
        return $this->belongsToMany(Service::class,'favorites','client_id','service_id');
    }
}
