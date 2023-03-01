
import React from 'react';
import axios from 'axios';
import Header from './Header';
import {BrowserRouter, NavLink, Link, Route, Switch} from 'react-router-dom';
import Select from 'react-select';
import Stepper from './Stepper';
import Grundval from './Grundval';
import Loader from 'react-loader-spinner';

class Effekt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            effekt:{
                framledning:55,
                returledning: 45,
                rumstemp: 20,
            },
            minlangd:null,
            maxlangd:null,
            minhojd:null,
            maxhojd:null,
            show:false,
            loading:true,
            produkter:[],
            valdprodukt: [],
            produkt:[],
            dim:{
                under:5,
                over:15,
            },
            onskadeffekt: null,
            produkterskapade:[],
            produktgrupper:[
                {
                    value:'Radiatorer',
                    label:'Radiatorer'
                },
                {
                    value:'Konvektorer',
                    label:'Konvektorer'
                },
                {
                    value:'Handdukstorkar',
                    label:'Handdukstorkar'
                }
            ]
        }
    }

    componentDidMount() {

        this.fetchProdukter();

    }

    fetchProdukter() {

        axios.get('https://effektkalkylator.wattheating.se/api/produkterhelaeffekt.json')
            .then((response) => {
                // handle success
                var prods = [];
                for (var i = 0; i < response.data.produkter.length; i++) {
                    console.log(response.data.produkter[i].produkt);
                    if (response.data.produkter[i].produkt != 'WSF') { //Exkludera WSF
                        prods.push(response.data.produkter[i]);
                    }
                }
                this.setState({produkter:prods, samtligaprodukter:prods});
                /*
                console.log('produkter', this.state.produkter);
                for (var i=0; i < this.state.produkter.length; i++){
                  var label = this.state.produkter[i].label;
                  var value = this.state.produkter[i].value;
                  var imgLank = "https://www.wattheating.se/uploads/"+value+".jpg";
                  this.state.produkter[i].label = <div><img src={imgLank} width="40px" height="40px" style={{marginRight:10, borderRadius:40}} /> {label}</div>;
                }
                */
            })
            .catch((error) =>  {
                // handle error
                console.log(error);
            })
            .then(() => {
                // always executed
                this.setState({
                    loading:false,
                })
            });

    }

    fetchProdukt(produkt) {

        axios.get('https://effektkalkylator.wattheating.se/produkt/'+produkt+'.json')
            .then((response) => {
                // handle success
                this.setState({produkt:response.data.produkt});
                console.log('produkt', this.state.produkt);
                this.skapaProdukter(this.state.produkt[0]);
            })
            .catch((error) =>  {
                // handle error
                console.log(error);
            })
            .then(() => {
                // always executed
                this.setState({
                    loading:false,
                })
            });

    }

    skapaProdukter(produkt) {
        var produkterSkapade = [];

        for (var i=0; i < produkt.produktdata.length; i++){

            var nVarde = produkt.produktdata[i].n

            if (nVarde > 0){
                var deltaupp = Math.pow(this.state.deltan,nVarde);
            }else{
                var deltaupp = 0;
            }
            if (this.state.produktgrupp.value == "Handdukstorkar"){
                var totaleffekt = (produkt.produktdata[i].wm * deltaupp) * (produkt.produktdata[i].typ / 1000);
                var nyProdukt = {
                    effekt: Math.round(totaleffekt),
                    typ: produkt.produktdata[i].typ,
                    hojd: produkt.produktdata[i].hojd,
                    //langd: produkt.produktlangder[x].langd,
                    benamning: produkt.produkt+" "+produkt.produktdata[i].hojd+" X "+produkt.produktdata[i].typ,
                    produkt:produkt.produkt,
                }
                //this.state.produktbenamning = this.state.valdprodukt+" "+this.state.effekt.hojd.value+" X "+this.state.effekt.effektgrupp.value;
                produkterSkapade.push(nyProdukt)

            }else{


                for (var x=0; x < produkt.produktlangder.length; x++){
                    var totaleffekt = (produkt.produktdata[i].wm * deltaupp) * (produkt.produktlangder[x].langd / 1000);

                    if (produkt.produkt == "WRK"){
                        var laggTillProdukt = true;
                        /*console.log('WRK', produkt.produktlangder[x].langd);
                        var langd1 = produkt.produktlangder[x].langd.replace('sektioner', '');
                        var langd2 = langd1.replace(' ', '');
                        var langd = langd2.replace(' ', '');*/

                        var nyProdukt = {
                            effekt: Math.round(totaleffekt),
                            typ: produkt.produktdata[i].typ,
                            hojd: produkt.produktdata[i].hojd,
                            langd: produkt.produktlangder[x].langd,
                            benamning: produkt.produkt+produkt.produktdata[i].typ+"-"+produkt.produktdata[i].hojd+"x"+produkt.produktlangder[x].langd+"("+produkt.produktlangder[x].sektioner.replace('sektioner', '').replace('sektion', '').replace(' ', '').replace(' ', '')+")",
                            produkt:produkt.produkt,
                        }

                    }else if (produkt.produkt == "WRKI"){
                        var laggTillProdukt = true;
                        /*console.log('WRK', produkt.produktlangder[x].langd);
                        var langd1 = produkt.produktlangder[x].langd.replace('sektioner', '');
                        var langd2 = langd1.replace(' ', '');
                        var langd = langd2.replace(' ', '');*/

                        var nyProdukt = {
                            effekt: Math.round(totaleffekt),
                            typ: produkt.produktdata[i].typ,
                            hojd: produkt.produktdata[i].hojd,
                            langd: produkt.produktlangder[x].langd,
                            benamning: produkt.produkt+produkt.produktdata[i].typ+"-"+produkt.produktdata[i].hojd+"x"+produkt.produktlangder[x].langd+"("+produkt.produktlangder[x].sektioner.replace('sektioner', '').replace('sektion', '').replace(' ', '').replace(' ', '')+")",
                            produkt:produkt.produkt,
                        }

                    }else if (produkt.produkt == "WKK"){
                        var laggTillProdukt = true;
                        var nyProdukt = {
                            effekt: Math.round(totaleffekt),
                            typ: produkt.produktdata[i].typ,
                            hojd: produkt.produktdata[i].hojd,
                            langd: produkt.produktlangder[x].langd,
                            benamning: produkt.produkt+produkt.produktdata[i].typ.charAt(0)+"-"+Number(produkt.produktdata[i].hojd)/10+"-"+produkt.produktlangder[x].langd,
                            produkt:produkt.produkt,
                        }


                    }else if (produkt.produkt == "WKS" || produkt.produkt == "WKH" || produkt.produkt == "WKI" || produkt.produkt == "WKL"){
                        var laggTillProdukt = true;
                        var nyProdukt = {
                            effekt: Math.round(totaleffekt),
                            typ: produkt.produktdata[i].typ,
                            hojd: produkt.produktdata[i].hojd,
                            langd: produkt.produktlangder[x].langd,
                            benamning: produkt.produkt+" "+Number(produkt.produktdata[i].hojd)/10+"-"+produkt.produktdata[i].typ+"-"+produkt.produktlangder[x].langd,
                            produkt:produkt.produkt,
                        }

                    }else if (produkt.produkt == "WRL"){
                        var laggTillProdukt = true;
                        var nyProdukt = {
                            effekt: Math.round(totaleffekt),
                            typ: produkt.produktdata[i].typ,
                            hojd: produkt.produktdata[i].hojd,
                            langd: produkt.produktlangder[x].langd,
                            benamning: produkt.produkt+" "+Number(produkt.produktdata[i].hojd)+"/"+Number(produkt.produktlangder[x].langd)+" "+((produkt.produktdata[i].typ.includes("Dubbel")) ? "Dubbel" : "Enkel"),
                            produkt:produkt.produkt,
                        }


                    }else if (produkt.produkt == "WRB"){
                        var laggTillProdukt = true;
                        var nyProdukt = {
                            effekt: Math.round(totaleffekt),
                            typ: produkt.produktdata[i].typ,
                            hojd: produkt.produktdata[i].hojd,
                            langd: produkt.produktlangder[x].langd,
                            benamning: produkt.produkt+" "+Number(produkt.produktlangder[x].langd),
                            produkt:produkt.produkt,
                        }


                    }else if (produkt.produkt == "WKT"){
                        var laggTillProdukt = true;
                        var matt1 = produkt.produktdata[i].hojd.replace('ø', '');
                        var matt2 = matt1.replace('ø', '');
                        var matt3 = matt2.replace(' mm', '');
                        var matt4 = matt3.replace(' ', '');
                        var matt = matt4.replace(' ', '');

                        var nyProdukt = {
                            effekt: Math.round(totaleffekt),
                            typ: produkt.produktdata[i].typ,
                            hojd: produkt.produktdata[i].hojd,
                            langd: produkt.produktlangder[x].langd,
                            benamning: produkt.produktdata[i].typ+" "+matt+"-"+produkt.produktlangder[x].langd,
                            produkt:produkt.produkt,
                        }


                    }else if (produkt.produkt == "WRV"){
                        var laggTillProdukt = true;
                        var nyProdukt = {
                            effekt: Math.round(totaleffekt),
                            typ: produkt.produktdata[i].typ,
                            hojd: produkt.produktdata[i].hojd,
                            langd: produkt.produktlangder[x].langd,
                            benamning: produkt.produkt+" "+produkt.produktdata[i].typ+"-"+produkt.produktdata[i].hojd+"x"+produkt.produktlangder[x].langd,
                            produkt:produkt.produkt,
                        }


                    }else if (produkt.produkt == "WRR"){
                        var laggTillProdukt = true;
                        var nyProdukt = {
                            effekt: Math.round(totaleffekt),
                            typ: produkt.produktdata[i].typ,
                            hojd: produkt.produktdata[i].hojd,
                            langd: produkt.produktlangder[x].langd,
                            benamning: produkt.produkt+" "+produkt.produktdata[i].typ+" "+produkt.produktdata[i].hojd+"-"+produkt.produktlangder[x].langd,
                            produkt:produkt.produkt,
                        }

                    }else if (produkt.produkt == "WRRI"){
                        var laggTillProdukt = true;
                        var nyProdukt = {
                            effekt: Math.round(totaleffekt),
                            typ: produkt.produktdata[i].typ,
                            hojd: produkt.produktdata[i].hojd,
                            langd: produkt.produktlangder[x].langd,
                            benamning: produkt.produkt+" "+produkt.produktdata[i].typ+" "+produkt.produktdata[i].hojd+"-"+produkt.produktlangder[x].langd,
                            produkt:produkt.produkt,
                        }

                    }else if (produkt.produkt == "WRRH"){
                        var laggTillProdukt = true;
                        var nyProdukt = {
                            effekt: Math.round(totaleffekt),
                            typ: produkt.produktdata[i].typ,
                            hojd: produkt.produktdata[i].hojd,
                            langd: produkt.produktlangder[x].langd,
                            benamning: produkt.produkt+" "+produkt.produktdata[i].typ+" "+produkt.produktdata[i].hojd+"-"+produkt.produktlangder[x].langd,
                            produkt:produkt.produkt,
                        }

                    }else if (produkt.produkt == "WRRHI"){
                        var laggTillProdukt = true;
                        var nyProdukt = {
                            effekt: Math.round(totaleffekt),
                            typ: produkt.produktdata[i].typ,
                            hojd: produkt.produktdata[i].hojd,
                            langd: produkt.produktlangder[x].langd,
                            benamning: produkt.produkt+" "+produkt.produktdata[i].typ+" "+produkt.produktdata[i].hojd+"-"+produkt.produktlangder[x].langd,
                            produkt:produkt.produkt,
                        }

                    }else{
                        var laggTillProdukt = true;
                        if (produkt.produkt == "WRS" || produkt.produkt == "WRI" || produkt.produkt == "WRP" || produkt.produkt == "WRPI" || produkt.produkt == "WRH" || produkt.produkt == "WRHI" || produkt.produkt == "WR4"){

                            if (produkt.produktdata[i].hojd == "900"){

                                if (produkt.produktlangder[x].langd < 1700){
                                    var nyProdukt = {
                                        effekt: Math.round(totaleffekt),
                                        typ: produkt.produktdata[i].typ,
                                        hojd: produkt.produktdata[i].hojd,
                                        langd: produkt.produktlangder[x].langd,
                                        benamning: ((produkt.produktlangder[x].langd < 1000) ? produkt.produkt+" "+produkt.produktdata[i].typ+"-"+produkt.produktdata[i].hojd.charAt(0)+"0"+Number(produkt.produktlangder[x].langd)/100 : produkt.produkt+" "+produkt.produktdata[i].typ+"-"+produkt.produktdata[i].hojd.charAt(0)+Number(produkt.produktlangder[x].langd)/100),
                                        produkt:produkt.produkt,
                                    }
                                }else{
                                    var nyProdukt = null;
                                    var laggTillProdukt = false;
                                }
                            }else{
                                var nyProdukt = {
                                    effekt: Math.round(totaleffekt),
                                    typ: produkt.produktdata[i].typ,
                                    hojd: produkt.produktdata[i].hojd,
                                    langd: produkt.produktlangder[x].langd,
                                    benamning: ((produkt.produktlangder[x].langd < 1000) ? produkt.produkt+" "+produkt.produktdata[i].typ+"-"+produkt.produktdata[i].hojd.charAt(0)+"0"+Number(produkt.produktlangder[x].langd)/100 : produkt.produkt+" "+produkt.produktdata[i].typ+"-"+produkt.produktdata[i].hojd.charAt(0)+Number(produkt.produktlangder[x].langd)/100),
                                    produkt:produkt.produkt,
                                }
                            }
                        }else{
                            var laggTillProdukt = true;
                            console.log('hej');
                            var nyProdukt = {
                                effekt: Math.round(totaleffekt),
                                typ: produkt.produktdata[i].typ,
                                hojd: produkt.produktdata[i].hojd,
                                langd: produkt.produktlangder[x].langd,
                                benamning: ((produkt.produktlangder[x].langd < 1000) ? produkt.produkt+" "+produkt.produktdata[i].typ+"-"+produkt.produktdata[i].hojd.charAt(0)+"0"+Number(produkt.produktlangder[x].langd)/100 : produkt.produkt+" "+produkt.produktdata[i].typ+"-"+produkt.produktdata[i].hojd.charAt(0)+Number(produkt.produktlangder[x].langd)/100),
                                produkt:produkt.produkt,
                            }

                        }
                        /*var nyProdukt = {
                          effekt: Math.round(totaleffekt),
                          typ: produkt.produktdata[i].typ,
                          hojd: produkt.produktdata[i].hojd,
                          langd: produkt.produktlangder[x].langd,
                          benamning: ((produkt.produktlangder[x].langd < 1000) ? produkt.produkt+" "+produkt.produktdata[i].typ+"-"+produkt.produktdata[i].hojd.charAt(0)+"0"+Number(produkt.produktlangder[x].langd)/100 : produkt.produkt+" "+produkt.produktdata[i].typ+"-"+produkt.produktdata[i].hojd.charAt(0)+Number(produkt.produktlangder[x].langd)/100),
                          produkt:produkt.produkt,
                        } */
                    }
                    if (laggTillProdukt){
                        produkterSkapade.push(nyProdukt)
                    }
                }

            }

        }
        if (this.state.onskadeffekt){
            var underDim1 = 100-Number(this.state.dim.under);
            var overDim1 = 100+Number(this.state.dim.over);
            var underDim = underDim1/100;
            var overDim = overDim1/100;
            this.state.produkterskapade = produkterSkapade.filter((prod) => prod.effekt >= this.state.onskadeffekt*underDim && prod.effekt <= this.state.onskadeffekt*overDim);
        }else{
            this.state.produkterskapade = produkterSkapade;
        }
        if (this.state.minhojd){
            this.state.produkterskapade = this.state.produkterskapade.filter((prod) => Number(prod.hojd) >= this.state.minhojd);
        }
        if (this.state.maxhojd){
            this.state.produkterskapade = this.state.produkterskapade.filter((prod) => Number(prod.hojd) <= this.state.maxhojd);
        }
        if (this.state.minlangd){
            this.state.produkterskapade = this.state.produkterskapade.filter((prod) => prod.langd >= this.state.minlangd);
        }
        if (this.state.maxlangd){
            this.state.produkterskapade = this.state.produkterskapade.filter((prod) => prod.langd <= this.state.maxlangd);
        }
        this.setState({
            produkterskapade: this.state.produkterskapade,
        })
        console.log('produkterSkapade', produkterSkapade);
    }




    changeValue(field, event){
        this.state.effekt[field] = event.target.value;

        this.setState({
            effekt:this.state.effekt,
            effektandring: true,
        });

        //this.state.deltat = (Number(this.state.effekt.framledning) + Number(this.state.effekt.returledning))/2-Number(this.state.effekt.rumstemp);
        this.state.deltat = (Number(this.state.effekt.framledning) - Number(this.state.effekt.returledning))/Math.log((Number(this.state.effekt.framledning) - Number(this.state.effekt.rumstemp))/(Number(this.state.effekt.returledning) - Number(this.state.effekt.rumstemp)));
        this.state.deltan = this.state.deltat/49.83;

        if (this.state.produkt.length > 0){
            this.skapaProdukter(this.state.produkt[0]);
        }

    }

    changeOnskadEffekt(event) {
        this.state.onskadeffekt = event.target.value;
        this.setState({
            onskadeffekt: this.state.onskadeffekt,
        })
        this.skapaProdukter(this.state.produkt[0]);
    }

    changeMinMaxhojd(field, event) {
        if (field == "min"){
            this.state.minhojd = event.target.value;
            this.setState({
                minhojd:this.state.minhojd
            });
        }else if (field == "max"){
            this.state.maxhojd = event.target.value;
            this.setState({
                maxhojd:this.state.maxhojd
            });
        }
        this.skapaProdukter(this.state.produkt[0]);
    }

    changeMinMaxlangd(field, event) {
        if (field == "min"){
            this.state.minlangd = event.target.value;
            this.setState({
                minlangd:this.state.minlangd
            });
        }else if (field == "max"){
            this.state.maxlangd = event.target.value;
            this.setState({
                maxlangd:this.state.maxlangd
            });

        }
        this.skapaProdukter(this.state.produkt[0]);
    }

    changeOnskadDim(field, event) {
        this.state.dim[field] = event.target.value;

        this.setState({
            dim:this.state.dim,
        });
        this.skapaProdukter(this.state.produkt[0]);
    }

    changeValueSelect(field, event) {

        if (field == "produktgrupp"){
            if (event){
                this.setState({
                    produktgrupp:{
                        value:event.value,
                        label:event.value,
                    },
                    valdprodukt:[],
                    produkt:[],
                    produkterskapade:[],
                    minlangd: null,
                    maxlangd: null,
                    minhojd: null,
                    maxhojd: null,
                    produkter:this.state.samtligaprodukter.filter((prod) => prod.produktgrupp == event.value),
                });
            }else{
                this.setState({
                    produktgrupp:null,
                    valdprodukt:[],
                    minlangd: null,
                    maxlangd: null,
                    minhojd: null,
                    maxhojd: null,
                    produkt:[],
                    produkterskapade:[],
                });

            }
            this.state.produkterskapade = [];
        }

        if (field == "produkt"){
            if (event){
                this.setState({
                    valdprodukt:{
                        value:event.value,
                        label:event.label,
                    },
                });
                this.fetchProdukt(event.value);
            }
        }


    }

    nollstall() {
        //this.changeValueSelect('effektgrupp');
        this.state.effekt = {
            framledning: 55,
            returledning: 45,
            rumstemp: 20,
        };
        this.state.dim = {
            over:15,
            under: 5
        };
        this.setState({
            produktgrupp:null,
            valdprodukt:[],
            minlangd: null,
            maxlangd: null,
            minhojd: null,
            maxhojd: null,
            produkt:[],
            onskadeffekt:null,
            dim:this.state.dim,
            produkterskapade:[],
            effekt:this.state.effekt,
        })


    }

    render() {
        if (this.state.produkt.length < 1){
            //this.state.deltat = (Number(this.state.effekt.framledning) + Number(this.state.effekt.returledning))/2-Number(this.state.effekt.rumstemp);
            this.state.deltat = (Number(this.state.effekt.framledning) - Number(this.state.effekt.returledning))/Math.log((Number(this.state.effekt.framledning) - Number(this.state.effekt.rumstemp))/(Number(this.state.effekt.returledning) - Number(this.state.effekt.rumstemp)));
            this.state.deltan = this.state.deltat/49.83;
        }

        return (
            <div className="fulleffekt">
                <Header onReset={this.nollstall.bind(this)} vaxlaVy={this.props.vaxlaVy} vy={"Effekt"} />

                {((this.state.loading) ?
                    <div style={{width: '100%',height:'100%', backgroundColor:'rgba(0,0,0,0.7)', position:'fixed', top:0, left:0, zIndex:'10000', display:'none'}}>
                        <div style={{width:'80px', marginLeft:'-40px', position:'relative', top:'40vh', left:'50%'}}>
                            <Loader type="Watch" color="#01c0c8" height={80} width={80} />
                        </div>
                    </div>
                    :null)}

                <div className="row">
                    <div className="col-sm-6">
                        <Grundval
                            framledning={this.state.effekt.framledning}
                            onChangeFramledning={this.changeValue.bind(this, 'framledning')}
                            returledning={this.state.effekt.returledning}
                            onChangeReturledning={this.changeValue.bind(this, 'returledning')}
                            rumstemp={this.state.effekt.rumstemp}
                            onChangeRumstemp={this.changeValue.bind(this, 'rumstemp')}
                            produktgrupper={this.state.produktgrupper}
                            produktgrupp={this.state.produktgrupp}
                            onChangeProductGrupp={this.changeValueSelect.bind(this, 'produktgrupp')}
                            produkter={this.state.produkter}
                            produkt={this.state.valdprodukt}
                            onChangeProduct={this.changeValueSelect.bind(this, 'produkt')}
                        />

                        {((this.state.produktgrupp) ?

                            <div>

                                <div className="row" style={{marginTop:15}}>
                                    <div className="col-sm-6">
                                        <label className="egenlabel" for="onskadeffekt">Välj önskad effekt (W)</label><br/>
                                        <Stepper min={10} max={4000} id="onskadeffekt" value={this.state.onskadeffekt} onChange={this.changeOnskadEffekt.bind(this)} />
                                    </div>
                                </div>

                                {((this.state.onskadeffekt) ?
                                    <div className="row" style={{marginTop:15}}>

                                        <div className="col-sm-6">
                                            <label className="egenlabel">Underdim (%)</label><br/>
                                            <Stepper min={0} max={100} id="under" value={this.state.dim.under} onChange={this.changeOnskadDim.bind(this, 'under')} />
                                        </div>
                                        <div className="col-sm-6">
                                            <label className="egenlabel">Överdim (%)</label><br/>
                                            <Stepper min={0} max={100} id="over" value={this.state.dim.over} onChange={this.changeOnskadDim.bind(this, 'over')} />
                                        </div>
                                    </div>
                                    :null)}


                                {((this.state.produktgrupp && this.state.produktgrupp.value == "Handdukstorkar") ?
                                        null
                                        :
                                        <div>
                                            <div className="row" style={{marginTop:15}}>

                                                <div className="col-sm-6">
                                                    <label className="egenlabel">Minhöjd (mm)</label><br/>
                                                    <Stepper min={0} max={5000} id="minh" value={this.state.minhojd} onChange={this.changeMinMaxhojd.bind(this, 'min')} />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="egenlabel">Maxhöjd (mm)</label><br/>
                                                    <Stepper min={0} max={5000} id="maxh" value={this.state.maxhojd} onChange={this.changeMinMaxhojd.bind(this, 'max')} />
                                                </div>
                                            </div>

                                            <div className="row" style={{marginTop:15}}>

                                                <div className="col-sm-6">
                                                    <label className="egenlabel">Minlängd (mm)</label><br/>
                                                    <Stepper min={0} max={5000} id="minl" value={this.state.minlangd} onChange={this.changeMinMaxlangd.bind(this, 'min')} />
                                                </div>
                                                <div className="col-sm-6">
                                                    <label className="egenlabel">Maxlängd (mm)</label><br/>
                                                    <Stepper min={0} max={5000} id="maxl" value={this.state.maxlangd} onChange={this.changeMinMaxlangd.bind(this, 'max')} />
                                                </div>
                                            </div>
                                        </div>
                                )}

                            </div>
                            :null)}

                        <div className="row" style={{marginTop:15}}>
                            <div className="col-sm-12" style={{textAlign:'right'}}>
                                <a onClick={this.nollstall.bind(this)} style={{cursor:'pointer', fontSize:14, fontWeight:600, display:'block', marginTop:10}}>NOLLSTÄLL</a>
                            </div>
                        </div>

                    </div>

                    <div className="col-sm-6">

                        {((this.state.produktgrupp && this.state.produktgrupp.value == "Handdukstorkar") ?
                                <div className="row" style={{margin:0,paddingTop:6, paddingBottom:6, fontSize:13,}}>
                                    <div className="col-sm-4" style={{textOverflow: 'ellipsis'}}><label style={{margin:0}}>Produktbenämning</label></div>
                                    <div className="col-sm-3"><label style={{margin:0}}>Typ</label></div>
                                    <div className="col-sm-3"><label style={{margin:0}}>Höjd</label></div>
                                    <div className="col-sm-2"><label style={{margin:0}}>Effekt</label></div>
                                </div>
                                :
                                <div className="row" style={{margin:0,paddingTop:6, paddingBottom:6, fontSize:13,}}>
                                    <div className="col-sm-4" style={{textOverflow: 'ellipsis'}}><label style={{margin:0}}>Produktbenämning</label></div>
                                    <div className="col-sm-2"><label style={{margin:0}}>Typ</label></div>
                                    <div className="col-sm-2"><label style={{margin:0}}>Höjd</label></div>
                                    <div className="col-sm-2"><label style={{margin:0}}>Längd</label></div>
                                    <div className="col-sm-2"><label style={{margin:0}}>Effekt</label></div>
                                </div>
                        )}



                        <div>

                            {this.state.produkterskapade.map((produkt, key) => {
                                var stylen = {
                                    borderTop:'1px solid #eee',
                                    paddingTop:15,
                                    paddingBottom:15,
                                    margin:0,
                                    cursor:'pointer'
                                }


                                return (
                                    <div>
                                        {((this.state.produktgrupp && this.state.produktgrupp.value == "Handdukstorkar") ?
                                                <div style={stylen} className="row hovereffekt" key={key}>
                                                    <div className="col-sm-4">
                                                        <a style={{color:'inherit'}} href={'https://www.wattheating.se/'+this.state.produktgrupp.label+'/'+produkt.produkt} className="bluewhite" target="_blank">{produkt.benamning}</a>
                                                    </div>
                                                    <div className="col-sm-3">{produkt.typ}</div>
                                                    <div className="col-sm-3">{produkt.hojd}</div>
                                                    <div className="col-sm-2">{produkt.effekt}</div>
                                                </div>
                                                :
                                                <div style={stylen} className="row hovereffekt" key={key}>
                                                    <div className="col-sm-4">
                                                        <a style={{color:'inherit'}}  href={'https://www.wattheating.se/'+this.state.produktgrupp.label+'/'+produkt.produkt} className="bluewhite" target="_blank">{produkt.benamning}</a>
                                                    </div>
                                                    <div className="col-sm-2">{produkt.typ}</div>
                                                    <div className="col-sm-2">{produkt.hojd}</div>
                                                    <div className="col-sm-2">{produkt.langd}</div>
                                                    <div className="col-sm-2">{produkt.effekt}</div>
                                                </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </div>


        );
    }
}
export default Effekt;
