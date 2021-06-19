import React from "react";
import VehiclePictures from "./VehiclePictures";
import "./VehiclePictures.css"

class VehicleTemplate extends React.Component {
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
    }
    render() {
    return (
        <main>
            <VehiclePictures/>
                    <section>
                    <p className="vehiclebasicinfo"><strong>Honda CRF 450</strong></p>
                    <ul className="cardescription">
                        <li className="builddate">Дата на производство</li>
                        <li className="datainput">02/06/2020</li>
                        <li className="engine">Тип двигател</li>
                        <li className="datainput">Бензин</li>
                        <li className="horsepower">Мощност</li>
                        <li className="datainput">64кс.</li>
                        <li className="eurostandart">Евростандарт</li>
                        <li className="datainput">Няма</li>
                        <li className="gearbox">Скоростна кутия</li>
                        <li className="datainput">Ръчна</li>
                        <li className="category">Категория</li>
                        <li className="datainput">Кросов</li>
                        <li className="mileage">Пробег</li>
                        <li className="datainput">125 456км</li>
                        <li className="color">Цвят</li>
                        <li className="datainput">Червен</li>
                    </ul>
                    </section>
                <div id="map"></div>
        </main>
    );
    }
}

export default VehicleTemplate;