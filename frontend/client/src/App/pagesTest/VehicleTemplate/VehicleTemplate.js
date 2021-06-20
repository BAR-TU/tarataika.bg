import React from "react";
import VehiclePictures from "./VehiclePictures";
import "./VehiclePictures.css";

class VehicleTemplate extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            details: {
                make: '',
                model: '',
                vehicle_category: '',
                price: '',
                engine: '',
                power: '',
                first_registration: '',
                mileage: '',
                user_id: '',
                gearbox: '',
                vip_status: '',
                views: '',
                location: '',
                paint: '',
                info: '',
                ecategory: ''
            }

        }
    }

    componentDidMount() {
        var selected = document.getElementsByClassName("selected");
        selected[0].className = "";
        var toSelect = document.getElementById("testcar");
        toSelect.className = "selected";
        
        let sliderImages = document.querySelectorAll('.imagebox'),
        arrowLeft = document.querySelector('#arrow-left'),
        arrowRight = document.querySelector('#arrow-right'),
        current = 0;

        //Clear all images
        function reset(){
            for(let i = 0; i < sliderImages.length; i++){
                sliderImages[i].style.display = 'none';
            }
        }

        //Initialize slider
        function startSlide(){
            reset();

            sliderImages[0].style.display = 'block';
        }

        //Show Previous
        function slideLeft(){
            reset();
            sliderImages[current - 1].style.display = 'block';
            current--;
        }

        //Show Next
        function slideRight(){
            reset();
            sliderImages[current + 1].style.display = 'block';
            current++;
        }

        //Left arrow click
        arrowLeft.addEventListener('click', function(){
            if(current === 0){
                current = sliderImages.length;
            }
            slideLeft();
        });

        //Right arrow click
        arrowRight.addEventListener('click', function(){
            if(current === sliderImages.length - 1){
                current = -1;
            }
            slideRight();
        });

        startSlide();

        this.getListing();
    }

    getListing = () => {
        fetch('/api/listings/1')
        .then(res => res.json())
        .then(details => {
            this.setState({ details });
        });
    }

    render() {

        const {details} = this.state;

    return (
        <main>
            <VehiclePictures />
                    <section>
                    <p className="vehiclebasicinfo"><strong>{details.make.make} {details.model.model}</strong></p>
                    <ul className="cardescription">
                        <li className="builddate">Дата на производство</li>
                        <li className="datainput">{details.first_registration}</li>
                        <li className="engine">Тип двигател</li>
                        <li className="datainput">{details.engine.type}</li>
                        <li className="horsepower">Мощност</li>
                        <li className="datainput">{details.power} к.с.</li>
                        <li className="eurostandart">Евростандарт</li>
                        <li className="datainput">{details.ecategory.category}</li>
                        <li className="gearbox">Скоростна кутия</li>
                        <li className="datainput">{details.gearbox.type}</li>
                        <li className="category">Категория</li>
                        <li className="datainput">{details.vehicle_category.vehicle_category}</li>
                        <li className="mileage">Пробег</li>
                        <li className="datainput">{details.mileage} км</li>
                        <li className="color">Цвят</li>
                        <li className="datainput">{details.paint.paint}</li>
                    </ul>
                    </section>
                <div id="map"></div>
        </main>
    );
    }
}

export default VehicleTemplate;