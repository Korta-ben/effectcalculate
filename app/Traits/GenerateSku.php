<?php

namespace App\Traits;
trait GenerateSku
{
    private function generateSku(array $data)
    {

        switch ($data['productName'])
        {
            case 'WRK':
                return $this->wrkSku($data);
                break;
            case 'WRKI':
                return $this->wrkiSku($data);
                break;
            case 'WKK':
                return $this->wkkSku($data);
                break;
            case 'WRL':
                return $this->wrlSku($data);
                break;
            case 'WRB':
                return $this->wrbSku($data);
                break;
            case 'WKT':
                return $this->wktSku($data);
                break;
            case 'WRV':
                return $this->wrvSku($data);
                break;
            case 'WRR':
                return $this->wrrSku($data);
                break;
            case 'WRRI':
                return $this->wrriSku($data);
                break;
            case 'WRRH':
                return $this->wrrhSku($data);
                break;
            case 'WRRHI':
                return $this->wrrhiSku($data);
                break;
            case  'WRS' || 'WRI' || 'WRP' || 'WRPI'|| 'WRH'|| 'WRHI'|| 'WR4':
                return $this->oneSku($data);
                break;
            case 'WKS' || 'WKH' || 'WKI' || 'WKL':
                return $this->wksSku($data);
                break;
        }
    }
    private function oneSku(array $data): array
    {
//                dd($data);
        $name = $data['productName'] . " " . $data['type'] . "-" . $data['height'] . $data['length'] . " " . $data['side'];
        $articleNumber = $data['type'] . $data['height'] . $data['length'] . $data['product_id'] . substr($data['side'], 0, 1);
        return [
            "product_model" => $name,
            "article_number" => $articleNumber
        ];
    }
    private function wrkSku(array $data) :array
    {
//        return $data;
        //                produkt.produkt+produkt.produktdata[i].typ+"-"+produkt.produktdata[i].hojd+"x"+produkt.produktlangder[x].langd+
//                 "("+produkt.produktlangder[x].sektioner.replace('sektioner', '').replace('sektion', '').replace(' ', '').replace(' ', '')+")",

        return $data['produkt'] . $data['type'] . "-" . $data['height'] . "x" . $data['length'] . "(" . str_replace(array('sections', 'section', ' '), '', $data['sections']) . ")";


    }
    private function wrkiSku(array $data) :array
    {
//      produkt.produkt+produkt.produktdata[i].typ+"-"+produkt.produktdata[i].hojd+"x"+produkt.produktlangder[x].langd+"("+produkt.produktlangder[x].sektioner.replace('sektioner', '').replace('sektion', '').replace(' ', '').replace(' ', '')+")"
        return $result = $data['produkt'] . $data['type'] . "-" . $data['height'] . "x" . $data['length'] . "(" . str_replace(array('sections', 'section', ' '), '', $data['sections']) . ")";

    }
    private function wkkSku(array $data) :array
    {
//      produkt.produkt+produkt.produktdata[i].typ.charAt(0)+"-"+Number(produkt.produktdata[i].hojd)/10+"-"+produkt.produktlangder[x].langd;
        return $data['produkt'] . substr($data['type'], 0, 1) . "-" . ($data['height'] / 10) . "-" . $data['length'];
    }
    private function wksSku(array $data) :array
    {
//        return produkt.produkt+" "+Number(produkt.produktdata[i].hojd)/10+"-"+produkt.produktdata[i].typ+"-"+produkt.produktlangder[x].langd;
        return [$data['productName'] . " " . ($data['height'] / 10) . "-" . $data['type'] . "-" . $data['length']];

    }
    private function wrlSku(array $data) :array
    {
//        produkt.produkt+" "+Number(produkt.produktdata[i].hojd)+"/"+Number(produkt.produktlangder[x].langd)+" "+((produkt.produktdata[i].typ.includes("Dubbel")) ? "Dubbel" : "Enkel")
        return $data['produkt'] . " " . $data['height'] . "/" . $data['length'] . " " . (($data['type'] === "Dubbel") ? "Dubbel" : "Enkel");

    }
    private function wrbSku(array $data) :array
    {
//        produkt.produkt+" "+Number(produkt.produktlangder[x].langd)
        return $data['produkt'] . " " . $data['length'];
    }
    private function wktSku(array $data) :array
    {
//        var matt1 = produkt.produktdata[i].hojd.replace('ø', '');
//        var matt2 = matt1.replace('ø', '');
//        var matt3 = matt2.replace(' mm', '');
//        var matt4 = matt3.replace(' ', '');
//        var matt = matt4.replace(' ', '');
//        produkt.produktdata[i].typ+" "+matt+"-"+produkt.produktlangder[x].langd
        $matt = str_replace(array('ø', ' mm', ' '), '', $data['height']);
        return $data['type'] . " " . $matt . "-" . $data['length'];
    }
    private function wrvSku(array $data) :array
    {
//        produkt.produkt+" "+produkt.produktdata[i].typ+"-"+produkt.produktdata[i].hojd+"x"+produkt.produktlangder[x].langd,
        return $data['produkt'] . " " . $data['type'] . "-" . $data['height'] . "x" . $data['length'];
    }
    private function wrrSku(array $data) :array
    {
//        produkt.produkt+" "+produkt.produktdata[i].typ+" "+produkt.produktdata[i].hojd+"-"+produkt.produktlangder[x].langd,
        return $data['produkt'] . " " . $data['type'] . " " . $data['height'] . "-" . $data['length'];
    }
    private function wrriSku(array $data) :array
    {
//        produkt.produkt+" "+produkt.produktdata[i].typ+" "+produkt.produktdata[i].hojd+"-"+produkt.produktlangder[x].langd,
        return $data['produkt'] . " " . $data['typ'] . " " . $data['height'] . "-" . $data['length'];
    }
    private function wrrhSku(array $data) :array
    {
//        produkt.produkt+" "+produkt.produktdata[i].typ+" "+produkt.produktdata[i].hojd+"-"+produkt.produktlangder[x].langd
        return $data['produkt'] . " " . $data['type'] . " " . $data['height'] . "-" . $data['length'];;
    }
    private function wrrhiSku(array $data) :array
    {
//        produkt.produkt+" "+produkt.produktdata[i].typ+" "+produkt.produktdata[i].hojd+"-"+produkt.produktlangder[x].langd
        return $data['produkt'] . " " . $data['type'] . " " . $data['height'] . "-" . $data['length'];
    }
}
