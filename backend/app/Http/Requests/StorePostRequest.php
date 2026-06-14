<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {
        return $this->merge([
            'role_id' => 1
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // User(id,name,email,password,phone,city, role_id,created_at,updated_at);
        return [
            "name" => "required|string|max:255",
            "email" => "required|email|unique:users,email",
            "phone" => "required|string",
            "city" => "required|string",
            "role_id" => "exists:roles,id",
            "password" => ["required", Password::min(8)->mixedCase()->symbols()->numbers(), 'confirmed']
        ];
    }
}
