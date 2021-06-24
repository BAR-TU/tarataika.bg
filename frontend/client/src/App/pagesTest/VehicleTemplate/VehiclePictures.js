import "./VehicleTemplate.css"

const VehiclePictures = () => {
    return(
        <div className="wrap">
                    <section className="imagebox image1">
                        <div className="currentimage"></div>
                    </section>
                    <section className="imagebox image2">
                        <div className="currentimage"></div>
                    </section>
                    <section className="imagebox image3">
                        <div className="currentimage"></div>
                    </section>

                    <div id="arrow-left" className="arrow"></div>
                    <div id="arrow-right" className="arrow"></div>

            </div>
    );
}

export default VehiclePictures;
