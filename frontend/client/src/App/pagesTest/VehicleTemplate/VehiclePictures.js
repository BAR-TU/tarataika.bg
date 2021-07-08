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
       getPictures(props.listingid);
       setCurrentPicture(pictures[0]);
    }, []);

    const getPictures = (listingid) => {
        axios.get('/api/pictures/retrieve', {params: {
            listingid: listingid
        }})
        .then((res) => {
            let arr = [];
            
            for(let i = 0; i < res.data.length; i++){
                var blob = new Blob( [ res.data[i].img ], { type: "image/jpeg" } );
                arr.push(blob);
            }
            setPictures(arr);
        });
    }

    let picture = {
        id: 'a',
        blob: 'a'
    }
    return(
        <div className="carousel">
        <div className="carouselInner"
        style={{backgroundImage: `url(${currentPicture})`}}>
            <div
            className="left"
            onClick={() => {
                indexPic - 1 > 0 && setCurrentPicture(URL.createObjectURL(pictures[indexPic - 2]))
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
                 indexPic < pictures.length && setCurrentPicture(URL.createObjectURL(pictures[indexPic]))
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
