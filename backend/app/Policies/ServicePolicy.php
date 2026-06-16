<?php

namespace App\Policies;

use App\Models\Service;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ServicePolicy
{

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool

    
    {
        
        return $user->role->name === "admin" || $user->role->name === "artisan";
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Service $service): bool
    {
        if ($user->role->name === "admin") {
            return true;
        }

        return $user->role->name === "artisan" && $user->id === $service->artisan_id;

    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Service $service): bool
    {
        if ($user->role->name === "admin") {
            return true;
        }
        return $user->role->name === "artisan" && $user->id === $service->artisan_id;
    }


}
