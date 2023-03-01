<?php

namespace App\Http\Requests\Api;

use http\Exception;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class WR4Request extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
//    public function authorize(): bool
//    {
//        return false;
//    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            //
            'product_name' => 'required',
            'product_id' => 'required|numeric',
            'type' => 'required|numeric',
            'length' =>'required|numeric',
            'height'=> 'required|numeric',
            'side' => 'nullable'
        ];
    }

    public function failedValidation(Validator $validator): Exception
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation error',
            'data' => $validator->errors()
        ]));
    }
}
