<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\GenerateSku;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SkuGeneratorController extends Controller
{
    use GenerateSku;
    //
    public function index(Request $request, $product)
    {

//        produkt.produkt
//        produkt.produktlangder[x].langd
//        produkt.produktdata[i].typ
//        produkt.produktdata[i].hojd
//        produkt.produktlangder[x].sektioner

        $validated = $request->validate([
            'data.productName' => 'string',
            'data.product_id' => 'string',
            'data.type' => 'string',
            'data.height' => 'string',
            'data.length' => 'string',
            'data.side' => 'string',
            'data.sections' => 'string'
        ]);



        if($validated)
        {
           $readyToProcess = $this->sanitizeData($validated['data']);
           return $this->generateSku($readyToProcess);
        }

        return "validation was not successful";
    }


    public function sanitizeData($data) {
        foreach ($data as $key => $value) {
            if (is_string($value)) {
                $data[$key] = htmlspecialchars($value, ENT_QUOTES | ENT_HTML5, 'UTF-8');
            }
        }
        return $data;
    }
}
