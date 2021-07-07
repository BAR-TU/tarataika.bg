import React, { useEffect, useState } from 'react';
import PublishButton from '../PublishButton';
import './publish.css';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
function Publish() {

    const [selectedFile, setSelectedFile] = useState();
    const [category_value, setCategoryValue] = useState('Коли');
    const [make_value, setMakeValue] = useState('');
    const [categories, setCategories] = useState([]);
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [model_value, setModelValue] = useState('');
    const [engines, setEngines] = useState([]);
    const [engine_value, setEngineValue] = useState('');
    const [gearboxes, setGearboxes] = useState([]);
    const [gearbox_value, setGearboxValue] = useState('');
    const [locations, setLocations] = useState([]);
    const [locations_value, setLocationsValue] = useState('');
    const [price_value, setPriceValue] = useState('');
    const [year_value, setYearValue] = useState('');
    const [ecategories, setEcategories] = useState([]);
    const [ecategory_value, setEcategoryValue] = useState('');
    const [paints, setPaints] = useState([]);
    const [paint_value, setPaintValue] = useState('');
    const [power, setPowerValue] = useState('');
    const [mileage, setMileage] = useState('');
    const [info, setInfo] = useState('');

    const [elWindows, setElWindows] = useState('');
    const [airConditioning, setAirConditioning] = useState('');
    const [servo, setServo] = useState('');
    const [alarm, setAlarm] = useState('');
    const [fourwheel, setFourwheel] = useState('');
    const [bluetooth, setBluetooth] = useState('');
    const [boardcomputer, setBoardcomputer] = useState('');
    const [navigation, setNavigation] = useState('');
    const [rainsensor, setRainsensor] = useState('');
    const [seatheater, setSeatheater] = useState('');

    const [currentPicture, setCurrentPicture] = useState('');
    const [pictures, setPictures] = useState([]);
    const [indexPic, setIndexPic] = useState(0);

    let picture = {
        id: 'a',
        blob: 'a'
    }


    useEffect(() => {
        var selected = document.getElementsByClassName("selected");
        selected[0].className = "";
        var toSelect = document.getElementById("publish");
        toSelect.className = "selected";

        getCategories();
        getPaints();
        getECategories();
        getEngines();
        getGearboxes();
        getLocations();
    }, []);

    const fileSelectedHandler = event => {

        picture = {
            id: pictures.length,
            blob: event.target.files[0]
        }
    }

    const fileUploadHandler = () => {
        if(picture.id !== 'a' && picture.blob !== undefined){
            
        pictures.push(picture);
        handlePictureChange();
        setIndexPic(indexPic+1);
        console.log(indexPic);
        }
        picture = {
            id: 'a',
            blob: 'a'
        }
    }


        const changeCategory = (event) => {
            setCategoryValue(event.target.value);

            let a = categories;

            for (let i = 0; i < a.length; i++) {
                if (a[i].vehicle_category === event.target.value) {
                    setModels([]);
                    setModelValue("---");
                    setMakeValue("---");
                    setMakes(a[i].makes);
                    break;
                }
            }
        }

        const getCategories = () => {
            fetch('/api/vehicle-categories')
            .then(res => res.json())
            .then(categories => {
                setCategories( categories );
                let a = categories;
                setModels([]);
                setModelValue("---");
                for (let i = 0; i < a.length; i++) {
                    if (a[i].vehicle_category === category_value) {
                        setMakes(a[i].makes);
                        break;
                    }
            }
            });
        }

        const getModels= (event) => {
            setMakeValue(event.target.value);
            let query = 'api/models/category/';
            let a = categories;
            let categoryId = '';

            for (let i = 0; i < a.length; i++) {
                if (a[i].vehicle_category === category_value) {
                    categoryId = a[i].vehicle_category_id;
                    break;
                }
            }

            if (event.target.value !== "---") {
                const selection = makes.find(make => make.make === event.target.value);

                query += categoryId + "/" + selection.make_id;

                fetch(query)
                .then(res => res.json())
                .then(models => {
                    setModels( models );
                });
            } else {
                setModels([]);
            }
        }

        const getEngines = () => {
            fetch('/api/engines/')
            .then(res => res.json())
            .then(engines => {
                setEngines( engines );
            })
        }
        
        const getGearboxes = () => {
            fetch('/api/gearboxes/')
            .then(res => res.json())
            .then(gearboxes => {
                setGearboxes( gearboxes );
            })
        }
        
        const getLocations = () => {
            fetch('/api/locations/')
            .then(res => res.json())
            .then(locations => {
                setLocations(locations);
            })
        }

        const getECategories = () => {
            fetch('/api/eurocategories/')
            .then(res => res.json())
            .then(ecategories => {
                setEcategories( ecategories );
            })
        }

        const getPaints = () => {
            fetch('/api/paints/')
            .then(res => res.json())
            .then(paints => {
                setPaints( paints );
            })
        }

        const changeYear = (event) => {
            setYearValue(event.target.value);
        }

        const changePrice = (event) => {
           setPriceValue(event.target.value);
        }

        const changeEngine = (event) => {
           setEngineValue(event.target.value);
        }

        const changePower = (event) => {
            setPowerValue(event.target.value);
        }

        const changeMileage = (event) => {
            setMileage(event.target.value);
        }

        const changeGearbox = (event) => {
            setGearboxValue(event.target.value);
        }

        const changeModel = (event) => {
            setModelValue(event.target.value);
        }

        const changeLocation = (event) => {
            setLocationsValue(event.target.value);
        }

        const changeEcategory = (event) => {
            setEcategoryValue(event.target.value);
        }

        const changePaint = (event) => {
            setPaintValue(event.target.value);
        }

        const changeElWindows = (event) => {
            setElWindows(event.target.value);
        }

        const changeAirConditioning = (event) => {
            setAirConditioning(event.target.value);
        }

        const changeServo = (event) => {
            setServo(event.target.value);
        }

        const changeAlarm = (event) => {
            setAlarm(event.target.value);
        }

        const changeFourWheel = (event) => {
            setFourwheel(event.target.value);
        }

        const changeBluetooth = (event) => {
            setBluetooth(event.target.value);
        }

        const changeBoardComputer = (event) => {
            setBoardcomputer(event.target.value);
        }

        const changeNavigation = (event) => {
            setNavigation(event.target.value);
        }

        const changeRainSensor = (event) => {
            setRainsensor(event.target.value);
        }

        const changeSeatHeater = (event) => {
            setSeatheater(event.target.value);
        }
        
        const getInfo = (event) => {
            setInfo(event.target.value);
        }

        const inputNums = (event) => {
            if ((event.which >= 48 && event.which <= 57)) {
                return (event.which >= 48 && event.which <= 57);
            } else {
                event.preventDefault();
            }
        }

        const handlePictureChange = () => {
            if(pictures.length > 0){
                setCurrentPicture(URL.createObjectURL(pictures[indexPic].blob))
            }
        }

        const removeSelectedPicture = () => {
            alert("Няма снимка за изтриване!");
            console.log(indexPic)
            if(indexPic => 0 && typeof(currentPicture) !== 'undefined'){
                console.log();
            } else {
                alert("Няма снимка за изтриване!");
            }
        }

    return(
    <main className="publishMain">

            <header><h2 className="titlePub">Публикация</h2></header>

            
            <section className="box">

                    <form action="">
                        <label for="carcategory" id="categorylabel">Категория:</label>
                        <select id="carcategory" name="category" onChange={ changeCategory } value={ category_value }>
                            {categories.map((item) => {
                                return(
                                    <option key={ item.vehicle_category_id } value={ item.vehicle_category }>Търси { item.vehicle_category.toLowerCase() }</option>
                                  );
                                })
                            }
                        </select>
                        
                        
                        <label for="carmake" id="carmakelabel">Марка:</label>
                        <select id="carmake" name="carmake" onChange={ getModels } value={ make_value }>
                            <option key='0' value="---">---</option>
                            {makes.map((make) => {
                                return(
                                    <option key={ make.make_id } value={ make.make }>{ make.make }</option>
                                  );
                                })
                            }
                        </select>
        
                        <label for="carmodel" id="carmodellabel">Модел:</label>
                        <select id="carmodel" name="carmodel" placeholder="Модел" onChange={ changeModel } value={ model_value }>
                            <option key='0' value="---">---</option>
                            {models.map((model) => {
                                return(
                                    <option key={ model.model_id } value={ model.model }>{ model.model }</option>
                                  );
                                })
                            }
                        </select>
                        
                        <label for="priceholder" id="priceholderlabel">Цена:</label>
                        <input type="text" id="priceholder" name="price" placeholder="Цена (лв.)" onChange={ changePrice } onKeyPress={ inputNums }></input>
        
                        <label for="yearholder" id="yearholderlabel">Година:</label>
                        <input type="text" id="yearholder" name="year" placeholder="Година на производство" onChange={ changeYear } onKeyPress={ inputNums }></input>
        
                        <label   for="engineholder" id="enginelabel">Двигател:</label>
                        <select   id="engineholder" placeholder="Двигател" name="engine" onChange={ changeEngine } value={ engine_value }>
                            <option key='0' value="---">---</option>
                            {engines.map((engine) => {
                                return(
                                    <option key={ engine.id } value={ engine.type }>{ engine.type }</option>
                                  );
                                })
                            }
                        </select>
                        
                        <label   for="power" id="powerlabel">Мощност:</label>
                        <input   type="text" id="powerholder" name="power" placeholder="Мин. мощност" onChange={ changePower } onKeyPress={ inputNums }></input>

                        <label   for="kmrange" id="rangelabel">Пробег (в км):</label>
                        <input   type="text" id="rangeholder" name="kmrange" placeholder="Макс. пробег" onChange={ changeMileage } onKeyPress={ inputNums }></input>


                        <label   for="gearboxholder" id="gearboxlabel">Скоростна кутия:</label>
                        <select   id="gearboxholder" placeholder="Скоростна кутия" name="gearbox" onChange={ changeGearbox } value={ gearbox_value }>
                            <option key='0' value="---">---</option>
                            {gearboxes.map((gearbox) => {
                                return(
                                    <option key={ gearbox.id } value={ gearbox.type }>{ gearbox.type }</option>
                                  );
                                })
                            }
                        </select>

                        <label   for="locationholder" id="locationlabel">Локация:</label>
                        <select   id="locationholder" name="location" onChange={ changeLocation } value={ locations_value }>
                            <option key='0' value="---">---</option>
                            {locations.map((location) => {
                                return(
                                    <option key={ location.id } value={ location.location }>{ location.location }</option>
                                  );
                                })
                            }
                        </select>

                        <label   for="ecategory" id="ecategorylabel">Евро категория:</label>
                        <select   id="ecategoryholder" name="ecategory" onChange={ changeEcategory } value={ ecategory_value }>
                            <option key='0' value="---">---</option>
                            {ecategories.map((ecategory) => {
                                return(
                                    <option key={ ecategory.id } value={ ecategory.category }>{ ecategory.category }</option>
                                  );
                                })
                            }
                        </select>
                        
                        <label   for="paint" id="paintlabel">Цвят:</label>
                        <select   id="paintholder" name="paint" onChange={ changePaint } value={ paint_value }>
                            <option key='0' value="---">---</option>
                            {paints.map((paint) => {
                                return(
                                    <option key={ paint.id } value={ paint.paint }>{ paint.paint }</option>
                                  );
                                })
                            }
                        </select>
                        
                        <div  ><div className="extrasheading">Допълнителни екстри:</div></div>
                        <label class=""  for="elWindows" id="electricWindowslabel">Eл. стъкла</label>
                        <input   type="checkbox" id="electricWindowsholder" name="elWindows" onChange={ changeElWindows }/>

                        <label   for="airConditioning" id="airConditioninglabel">Климатик</label>
                        <input   type="checkbox" id="airConditioningholder" name="airConditioning" onChange={ changeAirConditioning }/>

                        <label   for="servo" id="servolabel">Серво усилвател</label>
                        <input   type="checkbox" id="servoholder" name="servo" onChange={ changeServo }/>

                        <label   for="alarm" id="alarmlabel">Аларма</label>
                        <input   type="checkbox" id="alarmholder" name="alarm" onChange={ changeAlarm }/>

                        <label   for="fourwheel" id="fourwheellabel">4x4</label>
                        <input   type="checkbox" id="fourwheelholder" name="fourwheel" onChange={ changeFourWheel }/>

                        <label   for="bluetooth" id="bluetoothlabel">Bluetooth</label>
                        <input   type="checkbox" id="bluetoothholder" name="bluetooth" onChange={ changeBluetooth }/>

                        <label   for="boardcomputer" id="boardcomputerlabel">Бордкомпютър</label>
                        <input   type="checkbox" id="boardcomputerholder" name="boardcomputer" onChange={ changeBoardComputer }/>

                        <label   for="navigation" id="navigationlabel">Навигация</label>
                        <input   type="checkbox" id="navigationholder" name="navigation" onChange={ changeNavigation }/>

                        <label   for="rainsensor" id="rainsensorlabel">Сензор за дъжд</label>
                        <input   type="checkbox" id="rainsensorholder" name="rainsensor" onChange={ changeRainSensor }/>

                        <label   for="seatheater" id="seatheaterlabel">Подгрев на седалките</label>
                        <input   type="checkbox" id="seatheaterholder" name="seatheater" onChange={ changeSeatHeater }/>
                        
                        <label   for="info" id="infolabel">Описание:</label>
                        <input  class="infoholder" type="text" id="infoholder" name="info" onChange={ getInfo } style={{height: "200px", width: "200px", textAlign: "left", textOverflow: "scroll"}}></input>

                        <PublishButton category={ category_value} make={ make_value} model={ model_value}
                        price={ price_value} year={ year_value} engine={ engine_value} power={ power }
                        mileage={ mileage } gearbox={ gearbox_value}
                        location={ locations_value } elWindows={ elWindows} airConditioning={ airConditioning} servo={ servo }
                        alarm={ alarm } fourwheel={ fourwheel } bluetooth={ bluetooth } boardcomputer={ boardcomputer } 
                        navigation={ navigation } rainsensor={ rainsensor } seatheater={ seatheater } ecategory={ ecategory_value }
                        paint={ paint_value } info={ info } pictures={ pictures }/>
                        
                    </form>
                </section>

                <div className="uploadImage">
            <input type="file" onChange={fileSelectedHandler} style={{height: "200px"}} />
            <button onClick={fileUploadHandler} style={{height: "20px"}}>Качи</button>

            <div className="carousel">
                <div className="carouselInner"
                style={{backgroundImage: `url(${currentPicture})`}}>
                    <div
                    className="left"
                    onClick={() => {
                        indexPic - 1 > 0 && setCurrentPicture(URL.createObjectURL(pictures[indexPic - 2].blob))
                        if(typeof(pictures[indexPic - 2]) !== 'undefined' && pictures[indexPic - 2] !== null){
                            setIndexPic(indexPic-1)
                        }
                        
                    }}
                    >
                    <ArrowBackIosIcon style={{ fontSize: 30 }} />
                    </div>

                    <div className="center"></div>

                    <div
                    className="right"
                    onClick={() => {
                         indexPic < pictures.length && setCurrentPicture(URL.createObjectURL(pictures[indexPic].blob))
                         if( typeof(pictures[indexPic]) !== 'undefined' && pictures[indexPic] !== null ){
                            setIndexPic(indexPic+1)
                        }
                        
                    }}
                    >
                    <ArrowForwardIosIcon style={{ fontSize: 30 }} />
                    </div>
                </div>
            </div>
            <button className="removeButton" style={{height: '20px' }} onClick={removeSelectedPicture}>Премахни</button>
            </div>
            
    </main>
    );
}

export default Publish;