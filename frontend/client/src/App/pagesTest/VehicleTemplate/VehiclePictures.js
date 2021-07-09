import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core";
import "./../publish/publish.css"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import axios from 'axios';

const useStyles = makeStyles({
    carouselPublish: {
        width: "100%",
        marginTop: "80px",
        height: "565px",
        backgroundColor: "black",
        display: "inline-block",
        position:"absolute",
        verticalAlign: "middle",
        borderRadius: "15px",
        overflow: "hidden",
        left: "0",
      }
  });

function VehiclePictures(props) {
    const [currentPicture, setCurrentPicture] = useState('');
    const [pictures, setPictures] = useState([]);
    const [indexPic, setIndexPic] = useState(0);
    const classes = useStyles();

    useEffect(() => {
       getPictures(props.listingid)
    }, []);

    const getPictures = (listingid) => {
        axios.get('/api/pictures/retrieve', {params: {
            listingid: listingid
        }})
        .then((res) => {
            let arr = [];
            if (res.data.length > 0) {
                for(let i = 0; i < res.data.length; i++){

                    let z = Buffer.from(res.data[i].img.data, 'base64').toString();
                    z = z.substring(2);

                    let base64Flag = 'data:image/jpeg;base64,';

                    let url = base64Flag + z;
                    arr.push(url);

                }
                setPictures(arr);
                setCurrentPicture(arr[0]);
            } else {
                setCurrentPicture("https://c4.wallpaperflare.com/wallpaper/631/410/389/car-vehicle-dmitry-strukov-drift-monster-wallpaper-preview.jpg");
            }
        });
    }

    return(
        <div className={classes.carouselPublish}>
            <img src={currentPicture} alt="The mighty Lada"></img>
        <div className="carouselInnerPublish"
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
