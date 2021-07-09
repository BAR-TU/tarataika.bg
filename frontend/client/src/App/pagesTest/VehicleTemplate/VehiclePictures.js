import React, { useEffect, useState } from 'react';
import "./VehicleTemplate.css"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import axios from 'axios';


function VehiclePictures(props) {
    const [currentPicture, setCurrentPicture] = useState('');
    const [pictures, setPictures] = useState([]);
    const [indexPic, setIndexPic] = useState(0);

    useEffect(() => {
       getPictures(props.listingid)
    }, []);

    const getPictures = (listingid) => {
        axios.get('/api/pictures/retrieve', {params: {
            listingid: listingid
        }})
        .then((res) => {
            let arr = [];
            for(let i = 0; i < res.data.length; i++){

                let z = Buffer.from(res.data[i].img.data, 'base64').toString();
                z = z.substring(2);

                let base64Flag = 'data:image/jpeg;base64,';

                let url = base64Flag + z;
                arr.push(url);

            }
            setPictures(arr);
            setCurrentPicture(arr[0]);
        });
    }

    let picture = {
        url: 'a'
    }
    return(
        <div className="carousel">
            <img src={pictures[0]}></img>
        <div className="carouselInner"
        style={{backgroundImage: `${currentPicture ? currentPicture.url : 'https://c4.wallpaperflare.com/wallpaper/631/410/389/car-vehicle-dmitry-strukov-drift-monster-wallpaper-preview.jpg' }`}}>
            <div
            className="left"
            onClick={() => {
                indexPic - 1 > 0 && setCurrentPicture(pictures[indexPic - 2])
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
                 indexPic < pictures.length && setCurrentPicture(pictures[indexPic])
                 if( typeof(pictures[indexPic]) !== 'undefined' && pictures[indexPic] !== null ){
                    setIndexPic(indexPic+1)
                }
                
            }}
            >
            <ArrowForwardIosIcon style={{ fontSize: 30 }} />
            </div>
        </div>
        </div>
    );
}

export default VehiclePictures;
