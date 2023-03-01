<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\WR4Request;
use App\Traits\CalculateEffect;
use App\Traits\GenerateSku;
use Illuminate\Http\Request;

class WR4Controller extends Controller
{
    //
    use GenerateSku, CalculateEffect;

    public function index()
    {
        return "nothing here";
    }

    public function returnSku(WR4Request $WR4Request) :string
    {
        $data = [
            "product_name"=>$WR4Request->product_name,
            "product_id"=>$WR4Request->product_id,
            "type"=>$WR4Request->type,
            "length"=>substr("0".$WR4Request->length/100,-2),
            "height"=>$WR4Request->height/100,
            "side"=>$WR4Request->side
        ];
        return json_encode($this->generateSku($data));
    }

    public function calculateEffect(Request $request): string
    {
        //validate the request first
        return $this->getEffect($request);
    }


}
