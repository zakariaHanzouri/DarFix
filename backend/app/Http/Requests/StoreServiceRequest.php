<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreServiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return ( auth()->check() && auth()->user()->role->name==='admin' )  or   ( auth()->check() && auth()->user()->role->name==='artisan'  );
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // "title","description","price","duration","image","artisan_id","category_id"
        return [
            
            "title"=>'required|string|max:100',
            "description"=>'required|string|max:255',
            "price"=>'required|numeric',
            "duration"=>'required|integer',
            "image"=>'required|string',
            "artisan_id"=>[Rule::requiredIf(fn()=> $this->user()->role->name==="admin"),"exists:users,id"],
            "category_id"=>"required|exists:categories,id",
        ];
    }

    public function messages(){
        return [
            "artisan_id.required"=>"Artisan field is required",
            "category_id.required"=>"Category field is required"
        ];
    }
}
