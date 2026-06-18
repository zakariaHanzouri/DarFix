<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->role->name==='client';
    }

    public function prepareForValidation(){
        return $this->merge([
            'client_id'=>auth()->user()->id
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'client_id'=>'exists:users,id',
            'service_id'=>'required|exists:services,id',
            'reservation_date'=>'required|date',
            'status'=>'in:pending,accepted,rejected,completed'
        ];
    }

    public function messages(){
        return [
            "service_id.exists"=>"Selected Service is NOT exist",
            "service_id.required"=>"Service is required",
        ];
    }
}
