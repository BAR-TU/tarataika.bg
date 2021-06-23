import React from "react";
import { useParams } from "react-router-dom";
import VehiclePictures from "./VehiclePictures";
import "./VehicleTemplate.css";
import VehicleLocation from "../VehicleLocationMap/VehicleLocation";

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
                location: {coordinates: ''},
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
                <div id="map" >
                    {console.log(details)}
                <iframe src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11729.056516477996!2d${details.location.coordinates.split(' ')[1]}!3d${details.location.coordinates.split(' ')[0]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbg!4v1624215359596!5m2!1sen!2sbg`} width="600" height="450" style={{border: 'none'}} allowfullscreen="" loading="lazy"></iframe>
                </div>
                <div className="pricetag">{details.price}</div>
                <div className="imagebox vipstatus">ViP</div>
                <div className="vehicleinfo">{details.info}</div>
                <div className="userinfo">UserInfoPlaceHolder</div>


        </main>
    );
    }
}

export default VehicleTemplate;