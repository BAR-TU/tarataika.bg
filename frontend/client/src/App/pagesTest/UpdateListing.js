import React, { useEffect, useState } from 'react';
import PublishButton from './PublishButton';
import './publish/publish.css';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateListing() {
    const { id } = useParams();
    
    const [initialData, setData] = useState({
        category: '',
        make: '',
        model: '',
        price: '',
        year: '',
        engine: '',
        power: '',
        mileage: '',
        gearbox: '',
        location: '',
        ecategory: '',
        color: '',
        extras: [],
        info: ''
    })

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
        blob: 'a',
        url: 'a',
        type: 'a'
    }

    useEffect(() => {
        var selected = document.getElementsByClassName("selected");
        selected[0].className = "";
        var toSelect = document.getElementById("account");
        toSelect.className = "selected";


        getCategories();
        getPaints();
        getECategories();
        getEngines();
        getGearboxes();
        getLocations();

        getCurrListingInfo(id);
        
    }, []);

    const getInitialModels= (data) => {
        setMakeValue(data.make.make);
        let query = '/api/models/category/';
        let categoryId = data.vehicle_category.vehicle_category_id;

        if (data.make.make !== "---") {

            query += categoryId + "/" + data.make.make_id;

            fetch(query)
            .then(res => res.json())
            .then(models => {
                setModels( models );
            });
        } else {
            setModels([]);
        }
    }

    async function getCurrListingInfo(id) {
        let query = '/api/listings/';
        query += id;
        await axios.get(query).then((res) => {
            for (let i = 0; i < res.data.extras.length; i++) {
                switch(res.data.extras[i].extra) {
                    case "elWindows":
                        setElWindows("checked");
                        break;
                    case "airConditioning":
                        setAirConditioning("checked");
                        break;
                    case "servo":
                        setServo("checked");
                        break;
                    case "alarm":
                        setAlarm("checked");
                        break;
                    case "fourwheel":
                        setFourwheel("checked");
                        break;
                    case "bluetooth":
                        setBluetooth("checked");
                        break;
                    case "boardcomputer":
                        setBoardcomputer("checked");
                        break;
                    case "navigation":
                        setNavigation("checked");
                        break;
                    case "rainsensor":
                        setRainsensor("checked");
                        break;
                    case "seatheater":
                        setSeatheater("checked");
                        break;
                    default:
                        break;
                }
            }

            setData(res.data);

            setMakeValue(res.data.make.make);
            setModelValue(res.data.model.model);
            getInitialModels(res.data);
            setPriceValue(res.data.price);
            setYearValue(res.data.first_registration);
            setEngineValue(res.data.engine.type);
            setPowerValue(res.data.power);
            setMileage(res.data.mileage);
            setGearboxValue(res.data.gearbox.type);
            setLocationsValue(res.data.location.location);
            setEcategoryValue(res.data.ecategory.category);
            setPaintValue(res.data.paint.paint);
            setCurrentPicture("https://c4.wallpaperflare.com/wallpaper/631/410/389/car-vehicle-dmitry-strukov-drift-monster-wallpaper-preview.jpg");
            

            setInfo(res.data.info);
        })
    }

    const fileSelectedHandler = event => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        let url1;
        reader.onload = function () {
            for(let i = 0; i < 100; i++){
                if(reader.result[i] === ','){
                    url1 = reader.result.substring(i+1);
                    break;
                }
            }

            picture = {
                id: pictures.length,
                blob: event.target.files[0],
                url: url1,
                type: event.target.files[0].type
            }
        };
    }

    const fileUploadHandler = () => {
        if(picture.id !== 'a' && picture.blob !== undefined){
            
            pictures.push(picture);
            handlePictureChange();
            setPictures(pictures);
            setIndexPic(pictures.length-1);
            }
            picture = {
                id: 'a',
                blob: 'a',
                url: 'a',
                type: 'a'
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
                        setMakeValue(initialData.make.make);
                        setModelValue(initialData.model.model);
                        break;
                    }
            }
            });
        }

        const getModels= (event) => {
            setMakeValue(event.target.value);
            let query = '/api/models/category/';
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
            if (elWindows === "checked") {
                setSeatheater("");
            } else {
                setSeatheater("checked");
            }
        }

        const changeAirConditioning = () => {
            if (airConditioning === "checked") {
                setAirConditioning("");
            } else {
                setAirConditioning("checked");
            }
        }

        const changeServo = () => {
            if (servo === "checked") {
                setServo("");
            } else {
                setServo("checked");
            }
        }

        const changeAlarm = () => {
            if (alarm === "checked") {
                setAlarm("");
            } else {
                setAlarm("checked");
            }
        }

        const changeFourWheel = () => {
            if (fourwheel === "checked") {
                setFourwheel("");
            } else {
                setFourwheel("checked");
            }
        }

        const changeBluetooth = () => {
            if (bluetooth === "checked") {
                setBluetooth("");
            } else {
                setBluetooth("checked");
            }
        }

        const changeBoardComputer = () => {
            if (boardcomputer === "checked") {
                setBoardcomputer("");
            } else {
                setBoardcomputer("checked");
            }
        }

        const changeNavigation = () => {
            if (navigation === "checked") {
                setNavigation("");
            } else {
                setNavigation("checked");
            }
        }

        const changeRainSensor = () => {
            if (rainsensor === "checked") {
                setRainsensor("");
            } else {
                setRainsensor("checked");
            }
        }

        const changeSeatHeater = () => {
            if (seatheater === "checked") {
                setSeatheater("");
            } else {
                setSeatheater("checked");
            }
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
            if(indexPic > 0 && typeof(currentPicture) !== ""){
                pictures.splice(indexPic -1, 1)
                setIndexPic(indexPic => 0);
                console.log(indexPic);
                if(pictures.length > 0){
                    setCurrentPicture(URL.createObjectURL(pictures[0].blob));
                }
                else {
                    setCurrentPicture("https://c4.wallpaperflare.com/wallpaper/631/410/389/car-vehicle-dmitry-strukov-drift-monster-wallpaper-preview.jpg");
                }
            } else {
                alert("Няма снимка за изтриване!");
            }
        }

    return(
    <main className="publishMain">

            <header><h2 className="titlePub">Редактирай</h2></header>
            
            <section className="publishbox">

                    <form action="">
                    <div className="row1">
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
                                if (make.make === initialData.make.make) {
                                    return(
                                        <option selected key={ make.make_id } value={ make.make }>{ make.make }</option>
                                      );
                                } else {
                                return(
                                    <option key={ make.make_id } value={ make.make }>{ make.make }</option>
                                  );
                                }
                                })
                            }
                        </select>
        
                        <label for="carmodel" id="carmodellabel">Модел:</label>
                        <select id="carmodel" name="carmodel" placeholder="Модел" onChange={ changeModel } value={ model_value }>
                            <option key='0' value="---">---</option>
                            {models.map((model) => {
                                if (model.model === initialData.model.model) {
                                    return(
                                        <option selected key={ model.model_id } value={ model.model }>{ model.model }</option>
                                      );
                                } else {
                                return(
                                    <option key={ model.model_id } value={ model.model }>{ model.model }</option>
                                  );
                                }
                                })
                            }
                        </select>
                        
                        <label for="priceholder" id="priceholderlabel">Цена:</label>
                        <input type="text" value={price_value} id="priceholder" name="price" placeholder="Цена (лв.)" onChange={ changePrice } onKeyPress={ inputNums }></input>
        
                        <label for="yearholder" id="yearholderlabel">Година:</label>
                        <input type="text" value={year_value} id="yearholder" name="year" placeholder="Година на производство" onChange={ changeYear } onKeyPress={ inputNums }></input>
                    </div>

                    <div className="row2">
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
                        <input   type="text" value={power} id="powerholder" name="power" placeholder="Мин. мощност" onChange={ changePower } onKeyPress={ inputNums }></input>

                        <label   for="kmrange" id="rangelabel">Пробег (в км):</label>
                        <input   type="text" value={mileage} id="rangeholder" name="kmrange" placeholder="Макс. пробег" onChange={ changeMileage } onKeyPress={ inputNums }></input>
                    </div>

                    <div className="row3">
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
                    </div>

                    <div className="extrasComponent">

                    <div className="extrasheading"><b>Допълнителни екстри:</b></div>
                        <label className=""  for="elWindows" id="electricWindowslabel">Eл. стъкла</label>
                        <input   type="checkbox" checked={elWindows} id="electricWindowsholder" name="elWindows" onClick={ changeElWindows }/>

                        <label   for="airConditioning" id="airConditioninglabel">Климатик</label>
                        <input   type="checkbox" checked={airConditioning} id="airConditioningholder" name="airConditioning" onClick={ changeAirConditioning }/>

                        <label   for="servo" id="servolabel">Серво усилвател</label>
                        <input   type="checkbox" checked={servo} id="servoholder" name="servo" onClick={ changeServo }/>

                        <label   for="alarm" id="alarmlabel">Аларма</label>
                        <input   type="checkbox" checked={alarm} id="alarmholder" name="alarm" onClick={ changeAlarm }/>

                        <label   for="fourwheel" id="fourwheellabel">4x4</label>
                        <input   type="checkbox"checked={fourwheel}  id="fourwheelholder" name="fourwheel" onClick={ changeFourWheel }/>

                        <label   for="bluetooth" id="bluetoothlabel">Bluetooth</label>
                        <input   type="checkbox"checked={bluetooth}  id="bluetoothholder" name="bluetooth" onClick={ changeBluetooth }/>

                        <label   for="boardcomputer" id="boardcomputerlabel">Бордкомпютър</label>
                        <input   type="checkbox"checked={boardcomputer}  id="boardcomputerholder" name="boardcomputer" onClick={ changeBoardComputer }/>

                        <label   for="navigation" id="navigationlabel">Навигация</label>
                        <input   type="checkbox" checked={navigation} id="navigationholder" name="navigation" onClick={ changeNavigation }/>

                        <label   for="rainsensor" id="rainsensorlabel">Сензор за дъжд</label>
                        <input   type="checkbox" checked={rainsensor} id="rainsensorholder" name="rainsensor" onClick={ changeRainSensor }/>

                        <label   for="seatheater" id="seatheaterlabel">Подгрев на седалките</label>
                        <input   type="checkbox"  checked={seatheater} id="seatheaterholder" name="seatheater" onClick={ changeSeatHeater }/>
                    </div>
                        <label   for="info" id="infolabel"><b>Описание</b></label>
                        <input  className="infoholder" value={info} type="text" id="infoholder" name="info" onChange={ getInfo }></input>

                        
                    </form>
                </section>

        <div className="picturesDiv">

            <div className="uploadImage">
                    <div className="uploadImageInner">
                    <input id="file" type="file" onChange={fileSelectedHandler} />
                    <label for="file">Качете нови снимки</label>
                    </div>
                    <button className="uploadPic"onClick={fileUploadHandler}>Качи</button>
            </div>

            <div className="carouselPublish">
                <div className="carouselInnerPublish"
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
            <button className="removeButton" onClick={removeSelectedPicture}>Премахни</button>

            <PublishButton id={id} update='true' category={ category_value} make={ make_value} model={ model_value}
                        price={ price_value} year={ year_value} engine={ engine_value} power={ power }
                        mileage={ mileage } gearbox={ gearbox_value}
                        location={ locations_value } elWindows={ elWindows} airConditioning={ airConditioning} servo={ servo }
                        alarm={ alarm } fourwheel={ fourwheel } bluetooth={ bluetooth } boardcomputer={ boardcomputer } 
                        navigation={ navigation } rainsensor={ rainsensor } seatheater={ seatheater } ecategory={ ecategory_value }
                        paint={ paint_value } info={ info } pictures={ pictures }/>
                        
        </div>
    
    </main>
    );
}

export default UpdateListing;