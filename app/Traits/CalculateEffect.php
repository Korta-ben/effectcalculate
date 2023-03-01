<?php

namespace App\Traits;
trait CalculateEffect
{
    private function getEffect($data): string
    {

        $productName = "WR4"; // user input
        $height = '300'; // user input
        $type = '11'; // user input
        $length = '300'; // user input
        $n = '1.2965';  // product info pulled from the url based on name, type, height, length
        $wm = '428'; // product info pulled from the url based on name, type, height, length
        $inputTemp = '55'; // user input
        $outputTemp = '45'; // user input
        $roomTemp = '20'; // user input
        $deltat = ($inputTemp - $outputTemp) / log(($inputTemp - $roomTemp) / ($outputTemp - $roomTemp));
        $deltan = $deltat/49.83;
        $deltaupp = pow($deltan, $n);

        $totalEffect = ($wm * $deltaupp) * ($length / 1000);

        // round this for production
        return $totalEffect . "W";
    }

    private function getEffectForTowelWarmer(): string
    {
        $productName = "WR4"; // user input
        $height = '300'; // user input
        $type = '11'; // user input
        $length = '300'; // user input
        $n = '1.2965';  // product info pulled from the url based on name, type, height, length
        $wm = '428'; // product info pulled from the url based on name, type, height, length
        $inputTemp = '55'; // user input
        $outputTemp = '45'; // user input
        $roomTemp = '20'; // user input
        $deltat = ($inputTemp - $outputTemp) / log(($inputTemp - $roomTemp) / ($outputTemp - $roomTemp));
        $deltan = $deltat/49.83;
        $deltaupp = pow($deltan, $n);
//            var totaleffekt = (produkt.produktdata[i].wm * deltaupp) * (produkt.produktdata[i].typ / 1000);
        $totalEffect = ($wm * $deltaupp) * ($type/1000);
        return $totalEffect . "W";
    }
}
