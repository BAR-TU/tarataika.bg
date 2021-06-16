import React from "react";

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
            <div className="wrap">
                    <section className="imagebox image1">
                        <div className="currentimage"></div>
                        <span>Снимка 1</span>
                    </section>
                    <section className="imagebox image2">
                        <div className="currentimage"></div>
                        <span>Снимка 2</span>
                    </section>
                    <section className="imagebox image3">
                        <div className="currentimage"></div>
                        <span>Снимка 3</span>
                    </section>

                    <div id="arrow-left" className="arrow"></div>
                    <div id="arrow-right" className="arrow"></div>

            </div>
                    <section>
                    <p className="vehiclebasicinfo"><strong>Honda CRF 450</strong></p>
                    <ul className="cardescription">
                        <li className="builddate">Дата на производство</li>
                        <li className="datainput">02/03/2010</li>
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