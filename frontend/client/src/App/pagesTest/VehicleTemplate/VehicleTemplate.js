import React from "react";
import VehiclePictures from "./VehiclePictures";
import "./VehicleTemplate.css";
import {FaCheck} from "react-icons/fa";
import {IconContext} from "react-icons";
import { withRouter } from 'react-router-dom';
import axios from "axios";

function VipStatus(props) {
    if(props.vip_status){
        return <div className="vipstatus"></div>;
    }
    else{
        return <div></div>
    }
}

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
                ecategory: '',
                extras: [{extra: ''}],
                user: { username: '', phone_number: '', email: ''}
            }
        }
    }

    async componentDidMount() {
        var selected = document.getElementsByClassName("selected");
        selected[0].className = "";
        var toSelect = document.getElementById("searchresults");
        toSelect.className = "selected";
        
        // let sliderImages = document.querySelectorAll('.imagebox'),
        // arrowLeft = document.querySelector('#arrow-left'),
        // arrowRight = document.querySelector('#arrow-right'),
        // current = 0;

        // //Clear all images
        // function reset(){
        //     for(let i = 0; i < sliderImages.length; i++){
        //         sliderImages[i].style.display = 'none';
        //     }
        // }

        // //Initialize slider
        // function startSlide(){
        //     reset();

        //     sliderImages[0].style.display = 'block';
        // }

        // //Show Previous
        // function slideLeft(){
        //     reset();
        //     sliderImages[current - 1].style.display = 'block';
        //     current--;
        // }

        // //Show Next
        // function slideRight(){
        //     reset();
        //     sliderImages[current + 1].style.display = 'block';
        //     current++;
        // }

        // //Left arrow click
        // arrowLeft.addEventListener('click', function(){
        //     if(current === 0){
        //         current = sliderImages.length;
        //     }
        //     slideLeft();
        // });

        // //Right arrow click
        // arrowRight.addEventListener('click', function(){
        //     if(current === sliderImages.length - 1){
        //         current = -1;
        //     }
        //     slideRight();
        // });

        // startSlide();
        await this.getListing();
        this.updateViews();
    }

    updateViews = () => {
        let visited = [];
        if (sessionStorage.getItem('viewsUpdated'))
            visited = JSON.parse(sessionStorage.getItem('viewsUpdated'));

        if (!visited.includes(this.props.location.state.id)) {
            let newViews = parseInt(this.state.details.views)
            newViews++;
            axios.put('/api/listings/updateViews/', null, {
                params: {
                    views: newViews,
                    id: this.props.location.state.id 
                }
            });

            visited.push(this.props.location.state.id);
        }

        sessionStorage.setItem('viewsUpdated', JSON.stringify(visited));

        this.updateRecentlyViewed();
    }

    updateRecentlyViewed = () => {
        let recentlyVisited = [];
        let adId = this.props.location.state.id;
        
        if (localStorage.getItem('recentlyVisited')) {
            recentlyVisited = JSON.parse(localStorage.getItem('recentlyVisited'));
            recentlyVisited.reverse();
        }

        if (recentlyVisited.length >= 10) {
            recentlyVisited.shift();
            if (recentlyVisited.includes(adId)) {
                let index = recentlyVisited.findIndex(lis => lis === adId);
                recentlyVisited.splice(index, 1);
            }
            recentlyVisited.push(adId);
        } else {
            if (recentlyVisited.includes(adId)) {
                let index = recentlyVisited.findIndex(lis => lis === adId);
                recentlyVisited.splice(index, 1);
            }
            recentlyVisited.push(adId);
        }

        recentlyVisited.reverse();
        
        localStorage.setItem('recentlyVisited', JSON.stringify(recentlyVisited));
    }

    async getListing() {
        let query = '/api/listings/';
        query += this.props.location.state.id;
        await fetch(query)
        .then(res => res.json())
        .then(details => {
            for(let i = 0; i < details.extras.length; i++){
                switch(details.extras[i].extra){
                    case 'airConditioning':
                        details.extras[i].extra = '????????????????'
                        break;
                    case 'servo':
                        details.extras[i].extra = '??????????'
                        break;
                    case 'elWindows':
                        details.extras[i].extra = '????. ????????????'
                        break;
                    case 'alarm':
                        details.extras[i].extra = '????????????'
                        break;
                    case 'fourwheel':
                        details.extras[i].extra = '4??4'
                        break;
                    case 'bluetooth':
                        details.extras[i].extra = 'Bluetooth'
                        break;
                    case 'boardcomputer':
                        details.extras[i].extra = '?????????????? ????????????????'
                        break;
                    case 'navigation':
                        details.extras[i].extra = '??????????????????'
                        break;
                    case 'rainsensor':
                        details.extras[i].extra = '???????????? ???? ????????'
                        break;
                    case 'seatheater':
                        details.extras[i].extra = '?????????????? ???? ??????????????????'
                        break;
                    default:
                        break;
                }
            }
            this.setState({ details });
        });
    }

    render() {
        const {details} = this.state;

    return (
        <main>
            <VehiclePictures listingid={this.props.location.state.id} />
                    <section>
                    <p className="vehicleMakeModel"><strong>{details.make.make} {details.model.model}</strong></p>
                    <ul className="cardescription">
                        <li className="builddate">???????????? ???? ????????????????????????</li>
                        <li className="engine">?????? ????????????????</li>
                        <li className="horsepower">??????????????</li>
                        <li className="eurostandart">????????????????????????</li>
                        <li className="gearbox">?????????????????? ??????????</li>
                        <li className="category">??????????????????</li>
                        <li className="mileage">????????????</li>
                        <li className="color">????????</li>
                    </ul>
                    <ul className="cardescription">
                        <li className="datainput">{details.first_registration}</li>
                        <li className="datainput">{details.engine.type}</li>
                        <li className="datainput" >{details.power} ??.??.</li>
                        <li className="datainput" style={{marginTop: '15px'}}>{details.ecategory.category}</li>
                        <li className="datainput" style={{marginTop: '21px'}}>{details.gearbox.type}</li>
                        <li className="datainput">{details.vehicle_category.vehicle_category}</li>
                        <li className="datainput"style={{marginTop: '18px'}}>{details.mileage} ????</li>
                        <li className="datainput" style={{marginTop: '18px'}}>{details.paint.paint}</li>
                    </ul>
                    </section>
                <div className="map" >
                    <iframe title="map" src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11729.056516477996!2d${details.location.coordinates.split(' ')[1]}!3d${ details.location.coordinates.split(' ')[0]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbg!4v1624215359596!5m2!1sen!2sbg` } width="1190" height="750" style={{borderRadius: '10px'}} allowFullScreen="" loading="lazy"></iframe>
                </div>
                <div className="pricetag"><b>????????:</b> { details.price }????.</div>
                <VipStatus vip_status={ details.vip_status }/>

                <div className="vehicleinfo" style={{textAlign: 'center', fontSize: '28px'}}> <b>????????????????:</b>
                    <div style={{textAlign: 'left', fontSize: '22px'}}>{details.info}</div>
                    </div>


                <div className="userinfo">{details.user.username}<br/>{details.user.phone_number}<br/>{details.user.email}</div>
                
                <div className="vehicleExtras" style={{textAlign: 'center', fontSize: '28px'}}> <b>????????????:</b> 
                    <div className="extrasContainer" style={{textAlign: 'left', fontSize: '22px'}}>
                        
                        {details.extras.map(extra => (
                        <div key={ extra.extra_id } value={ extra.extra }> 
                            <IconContext.Provider value={{style: {fontSize: '15px', color: 'rgb(0,204,0)'}}}><FaCheck /></IconContext.Provider>
                            {extra.extra}
                        </div>
                    
                ))}
                </div>
                </div>

                <div className="viewsCounter">????????????????????: { details.views }</div>
        </main>
    );
    }
}

export default withRouter(VehicleTemplate);