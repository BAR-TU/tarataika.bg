import React from "react";
import { Helmet } from 'react-helmet';
import { SearchButton } from './SearchButton';

class Home extends React.Component {
    constructor (props) {
        super(props);
        
        this.state = {
            category_value: 'Коли',
            make_value: '',
            categories: [],
            button_value: 'Подробно търсене',
            makes: [],
            models: [],
            model_value: '',
            engines: [],
            engine_value: '',
            gearboxes: [],
            gearbox_value: '',
            locations: [],
            location_value: '',
            maxPrice_value: '',
            minPrice_value: '',
            power_value: '',
            mileage_value: '',
            minYear_value: '',
            maxYear_value: '',
            elWindows: '',
            airConditioning: '',
            servo: '',
            alarm: '',
            fourwheel: '',
            bluetooth: '',
            boardcomputer: '',
            navigation: '',
            rainsensor: '',
            seatheater: ''

        }
    }

    changeCategory = (event) => {
        this.setState({category_value: event.target.value});
        var box = document.getElementsByClassName("searchbox");

        if (box[0].style.maxHeight !== "200px")
            this.setState({button_value: "Съкратено търсене"});

        let a = this.state.categories;

        for (let i = 0; i < a.length; i++) {
            if (a[i].vehicle_category === event.target.value) {
                this.setState({ models: []});
                this.setState({ model_value: "---"});
                this.setState({ makes: a[i].makes});
                break;
            }
        }
    }

    getCategories = () => {
        fetch('/api/vehicle-categories')
        .then(res => res.json())
        .then(categories => {
            this.setState({ categories });
        })
        .then(() => {
            let a = this.state.categories;
            this.setState({ models: []});
            this.setState({ model_value: "---"});
            for (let i = 0; i < a.length; i++) {
                if (a[i].vehicle_category === this.state.category_value) {
                    this.setState({ makes: a[i].makes});
                    break;
                }
            }
        });

        this.getEngines();
        this.getGearboxes();
        this.getLocations();
        this.loadSearchbox();
    }

  getModels= (event) => {
        this.setState({ make_value: event.target.value });
        let query = 'api/models/category/';
        let a = this.state.categories;
        let categoryId = '';

        for (let i = 0; i < a.length; i++) {
            if (a[i].vehicle_category === this.state.category_value) {
                categoryId = a[i].vehicle_category_id;
                break;
            }
        }

        if (event.target.value !== "---") {
            const selection = this.state.makes.find(make => make.make === event.target.value);

            query += categoryId + "/" + selection.make_id;

            fetch(query)
            .then(res => res.json())
            .then(models => {
                this.setState({ models });
            });
        } else {
            this.setState({models: []});
        }
    }

    getEngines = () => {
        fetch('/api/engines/')
        .then(res => res.json())
        .then(engines => {
            this.setState({ engines });
        })
    }
    
    getGearboxes = () => {
        fetch('/api/gearboxes/')
        .then(res => res.json())
        .then(gearboxes => {
            this.setState({ gearboxes });
        })
    }
    
    getLocations = () => {
        fetch('/api/locations/')
        .then(res => res.json())
        .then(locations => {
            this.setState({ locations });
        })
    }

    loadSearchbox = () => {
        var selected = document.getElementsByClassName("selected");
        selected[0].className = "";
        var toSelect = document.getElementById("home");
        toSelect.className = "selected";
        
        var box = document.getElementsByClassName("searchbox");
        var button = document.getElementsByClassName("detailedsearch");
        var topVip = document.getElementsByClassName("recentsearch");
        var tests = document.querySelectorAll(".test");
        
        box[0].style.maxHeight = 200 + "px";

        button[0].addEventListener("click", function() {

            if (box[0].style.maxHeight !== "200px") {
                box[0].style.maxHeight = 200 + "px";
                button[0].style.marginTop = 0 + "px";
            
                for (let i = 0; i < tests.length; i++) {
                    tests[i].style.display = "none";
                }
            
                setTimeout(function() {
                    topVip[0].style.visibility = "visible";
                }, 500);
                button[0].value = "Подробно търсене";
            } else {
                topVip[0].style.visibility = "hidden";
            
                for (let i = 0; i < tests.length; i++) {
                    tests[i].style.display = "inline";
                }
            
                box[0].style.maxHeight = 600 + "px";
                button[0].style.marginTop = 360 + "px";
                button[0].value = "Съкратено търсене";
            }
        });
    }

    changeMaxPrice = (event) => {
        this.setState({ maxPrice_value: event.target.value });
    }

    changeMinPrice = (event) => {
        this.setState({ minPrice_value: event.target.value });
    }

    changeMinYear = (event) => {
        this.setState({ minYear_value: event.target.value });
    }

    changeEngine = (event) => {
        this.setState({ engine_value: event.target.value });
    }

    changePower = (event) => {
        this.setState({ power_value: event.target.value });
    }

    changeMileage = (event) => {
        this.setState({ mileage_value: event.target.value });
    }

    changeMaxYear = (event) => {
        this.setState({ maxYear_value: event.target.value });
    }

    changeGearbox = (event) => {
        this.setState({ gearbox_value: event.target.value });
    }

    changeModel = (event) => {
        this.setState({ model_value: event.target.value });
    }

    changeLocation = (event) => {
        this.setState({location_value: event.target.value });
    }

    changeElWindows = (event) => {
        this.setState({ elWindows: event.target.value });
    }

    changeAirConditioning = (event) => {
        this.setState({ airConditioning: event.target.value });
    }

    changeServo = (event) => {
        this.setState({ servo: event.target.value });
    }

    changeAlarm = (event) => {
        this.setState({ alarm: event.target.value });
    }

    changeFourWheel = (event) => {
        this.setState({ fourwheel: event.target.value });
    }

    changeBluetooth = (event) => {
        this.setState({ bluetooth: event.target.value });
    }

    changeBoardComputer = (event) => {
        this.setState({ boardcomputer: event.target.value });
    }

    changeNavigation = (event) => {
        this.setState({ navigation: event.target.value });
    }

    changeRainSensor = (event) => {
        this.setState({ rainsensor: event.target.value });
    }

    changeSeatHeater = (event) => {
        this.setState({ seatheater: event.target.value });
    }

    componentDidMount() {
        this.getCategories();
    }

    render() {
        const { categories } = this.state;
        const { button_value } = this.state;
        const { makes } = this.state;
        const { models } = this.state;
        const { engines } = this.state;
        const { gearboxes } = this.state;
        const { locations } = this.state;
    return (     
        <main>
            <Helmet>
                <meta charset="utf-8"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap" rel="stylesheet"/>
                <title>
                    tarataika.bg
                </title>
            </Helmet>
                <section className="searchbox">
                    <header className="searchboxheading"><h2>Търсачка</h2></header>
                    <form action="">
                        <label for="carcategory" id="categorylabel">Категория:</label>
                        <select id="carcategory" name="category" onChange={ this.changeCategory } value={ this.state.category_value }>
                            {categories.map((item) => {
                                return(
                                    <option key={ item.vehicle_category_id } value={ item.vehicle_category }>Търси { item.vehicle_category.toLowerCase() }</option>
                                  );
                                })
                            }
                        </select>
                        
                        
                        <label for="carmake" id="carmakelabel">Марка:</label>
                        <select id="carmake" name="carmake" onChange={ this.getModels } value={ this.state.make_value }>
                            <option key='0' value="---">---</option>
                            {makes.map((make) => {
                                return(
                                    <option key={ make.make_id } value={ make.make }>{ make.make }</option>
                                  );
                                })
                            }
                        </select>
        
                        <label for="carmodel" id="carmodellabel">Модел:</label>
                        <select id="carmodel" name="carmodel" placeholder="Модел" onChange={ this.changeModel } value={ this.state.model_value }>
                            <option key='0' value="---">---</option>
                            {models.map((model) => {
                                return(
                                    <option key={ model.model_id } value={ model.model }>{ model.model }</option>
                                  );
                                })
                            }
                        </select>
                        
                        <label for="priceholder" id="priceholderlabel">Цена (до):</label>
                        <input type="text" id="priceholder" name="price" placeholder="Макс. цена (лв.)" onChange={ this.changeMaxPrice }></input>
        
                        <label for="yearholder" id="yearholderlabel">Година (от):</label>
                        <input type="text" id="yearholder" name="year" placeholder="Година на производство" onChange={ this.changeMinYear }></input>
        
                        <label class="test" for="engineholder" id="enginelabel">Двигател:</label>
                        <select class="test" id="engineholder" placeholder="Двигател" name="engine" onChange={ this.changeEngine } value={ this.state.engine_value }>
                            <option key='0' value="---">---</option>
                            {engines.map((engine) => {
                                return(
                                    <option key={ engine.id } value={ engine.type }>{ engine.type }</option>
                                  );
                                })
                            }
                        </select>
                        
                        <label class="test" for="power" id="powerlabel">Мощност:</label>
                        <input class="test" type="text" id="powerholder" name="power" placeholder="Мин. мощност" onChange={ this.changePower }></input>

                        <label class="test" for="kmrange" id="rangelabel">Пробег (в км):</label>
                        <input class="test" type="text" id="rangeholder" name="kmrange" placeholder="Макс. пробег" onChange={ this.changeMileage }></input>

                        <label class="test" for="minprice" id="minpricelabel">Цена (от):</label>
                        <input class="test" type="text" id="minpriceholder" name="minprice" placeholder="Мин. цена (лв.)" onChange={ this.changeMinPrice }></input>


                        <label class="test" for="maxyear" id="maxyearlabel">Година (до):</label>
                        <input class="test" type="text" id="maxyearholder" name="maxyear" placeholder="Година на производство" onChange={ this.changeMaxYear }></input>

                        <label class="test" for="gearboxholder" id="gearboxlabel">Скоростна кутия:</label>
                        <select class="test" id="gearboxholder" placeholder="Скоростна кутия" name="gearbox" onChange={ this.changeGearbox } value={ this.state.gearbox_value }>
                            <option key='0' value="---">---</option>
                            {gearboxes.map((gearbox) => {
                                return(
                                    <option key={ gearbox.id } value={ gearbox.type }>{ gearbox.type }</option>
                                  );
                                })
                            }
                        </select>

                        <label class="test" for="locationholder" id="locationlabel">Локация:</label>
                        <select class="test" id="locationholder" name="location" onChange={ this.changeLocation } value={ this.state.location_value }>
                            <option key='0' value="---">---</option>
                            {locations.map((location) => {
                                return(
                                    <option key={ location.id } value={ location.location }>{ location.location }</option>
                                  );
                                })
                            }
                        </select>
                        
                        <div class="test"><div className="extrasheading">Допълнителни екстри:</div></div>
                        <label class="test" for="elWindows" id="electricWindowslabel">Eл. стъкла</label>
                        <input class="test" type="checkbox" id="electricWindowsholder" name="elWindows" onChange={ this.changeElWindows }/>

                        <label class="test" for="airConditioning" id="airConditioninglabel">Климатик</label>
                        <input class="test" type="checkbox" id="airConditioningholder" name="airConditioning" onChange={ this.changeAirConditioning }/>

                        <label class="test" for="servo" id="servolabel">Серво усилвател</label>
                        <input class="test" type="checkbox" id="servoholder" name="servo" onChange={ this.changeServo }/>

                        <label class="test" for="alarm" id="alarmlabel">Аларма</label>
                        <input class="test" type="checkbox" id="alarmholder" name="alarm" onChange={ this.changeAlarm }/>

                        <label class="test" for="fourwheel" id="fourwheellabel">4x4</label>
                        <input class="test" type="checkbox" id="fourwheelholder" name="fourwheel" onChange={ this.changeFourWheel }/>

                        <label class="test" for="bluetooth" id="bluetoothlabel">Bluetooth</label>
                        <input class="test" type="checkbox" id="bluetoothholder" name="bluetooth" onChange={ this.changeBluetooth }/>

                        <label class="test" for="boardcomputer" id="boardcomputerlabel">Бордкомпютър</label>
                        <input class="test" type="checkbox" id="boardcomputerholder" name="boardcomputer" onChange={ this.changeBoardComputer }/>

                        <label class="test" for="navigation" id="navigationlabel">Навигация</label>
                        <input class="test" type="checkbox" id="navigationholder" name="navigation" onChange={ this.changeNavigation }/>

                        <label class="test" for="rainsensor" id="rainsensorlabel">Сензор за дъжд</label>
                        <input class="test" type="checkbox" id="rainsensorholder" name="rainsensor" onChange={ this.changeRainSensor }/>

                        <label class="test" for="seatheater" id="seatheaterlabel">Подгрев на седалките</label>
                        <input class="test" type="checkbox" id="seatheaterholder" name="seatheater" onChange={ this.changeSeatHeater }/>
                        
                        <input type="button" className="detailedsearch" value={button_value}></input>
        
                        <SearchButton category={this.state.category_value} make={this.state.make_value} model={this.state.model_value}
                        maxPrice={this.state.maxPrice_value} minYear={this.state.minYear_value} engine={this.state.engine_value} power={this.state.power_value}
                        mileage={this.state.mileage_value} minPrice={this.state.minPrice_value} maxYear={this.state.maxYear_value} gearbox={this.state.gearbox_value}
                        location={this.state.location_value} elWindows={this.state.elWindows} airConditioning={this.state.airConditioning} servo={this.state.servo}
                        alarm={this.state.alarm} fourwheel={this.state.fourwheel} bluetooth={this.state.bluetooth} boardcomputer={this.state.boardcomputer} 
                        navigation={this.state.navigation} rainsensor={this.state.rainsensor} seatheater={this.state.seatheater}/>
                    </form>
                </section>
                <section className="mostlyviewed">
                    <header><h2 className="mostlyviewedheading">Най-посещавани</h2></header>
                    <div className="container"></div>
                    <div className="container"></div>
                    <div className="container"></div>
                    <div className="container"></div>
                    <div className="container"></div>
                    <div className="container"></div>
                    <div className="container"></div>
                    <div className="container"></div>
                    <div className="container"></div>
                    <div className="container"></div>
                </section>
                <section className="recentsearch">
                    <header><h2 className="recentsheading">Скорошни търсения</h2></header>
                    <div className="ad"></div>
                    <div className="ad"></div>
                    <div className="ad"></div>
                    <div className="ad"></div>
                    <div className="ad"></div>
                    <div className="ad"></div>
                </section>
                <section className="ads">
                    <div className="ad"></div>
                    <div className="ad"></div>
                    <div className="ad"></div>
                    <div className="ad"></div>
                    <div className="ad"></div>
                    <div className="ad"></div>
                    <div className="ad"></div>
                </section>
        </main>
    );
    }
}

export default Home;