import React from "react";

class Home extends React.Component {
    componentDidMount() {
        var selected = document.getElementsByClassName("selected");
        selected[0].className = "";
        var toSelect = document.getElementById("home");
        toSelect.className = "selected";
        
        var box = document.getElementsByClassName("searchbox");
        var button = document.getElementsByClassName("detailedsearch");
        var topVip = document.getElementsByClassName("recentsearch");
        var tests = document.querySelectorAll(".test");

        box[0].style.maxHeight = 200 + "px";
        button[0].addEventListener("click", function() {

            if (box[0].style.maxHeight !== "200px") {
                box[0].style.maxHeight = 200 + "px";
                button[0].style.marginTop = 0 + "px";
            
                for (let i = 0; i < tests.length; i++) {
                    tests[i].style.display = "none";
                }
            
                setTimeout(function() {
                    topVip[0].style.visibility = "visible";
                }, 500);
                button[0].value = "Подробно търсене"
            } else {
                topVip[0].style.visibility = "hidden";
            
                for (let i = 0; i < tests.length; i++) {
                    tests[i].style.display = "inline";
                }
            
                box[0].style.maxHeight = 600 + "px";
                button[0].style.marginTop = 360 + "px";
                button[0].value = "Съкратено търсене";
            }
        });
    }
    render() {
    return (
        <main>
            <section className="searchbox">
                <header className="searchboxheading"><h2>Търсачка</h2></header>
                <form action="">
                    <label for="carcategory" id="categorylabel">Категория</label>
                    <select id="carcategory" name="category">
                        <option value="cars">Търси коли</option>
                        <option value="motorcycles">Търси мотоциклети</option>
                        <option value="motorhomes">Търси каравани</option>
                        <option value="trucks">Търси камьони</option>
                    </select>
                    
                    <label for="carmake" id="carmakelabel">Марка</label>
                    <select id="carmake" name="carmake">
                        <option value="BMW">BMW</option>
                        <option value="Mercedes-Benz">Mercedes-Benz</option>
                        <option value="Audi">Audi</option>
                        <option value="Volkswagen">Volkswagen</option>
                    </select>

                    <label for="carmodel" id="carmodellabel">Модел</label>
                    <input type="text" id="carmodel" name="carmodel" placeholder="Модел"></input>
                    
                    <label for="priceholder" id="priceholderlabel">Цена</label>
                    <input type="text" id="priceholder" name="price" placeholder="Макс. цена (лв.)"></input>

                    <label for="yearholder" id="yearholderlabel">Година</label>
                    <input type="text" id="yearholder" name="year" placeholder="Година на производство"></input>

                    <input className="test" type="text" name="price" placeholder="Макс. цена (лв.)"></input>
                    <input className="test" type="text" name="price" placeholder="Макс. цена (лв.)"></input>
                    <input className="test" type="text" name="price" placeholder="Макс. цена (лв.)"></input>
                    <input className="test" type="text" name="price" placeholder="Макс. цена (лв.)"></input>

                    <input type="button" className="detailedsearch" value="Подробно търсене" onClick={this.Expand}></input>

                    <input type="submit" value="Търси" id="submit"></input>
                </form>
            </section>
            <section className="mostlyviewed">
                <header><h2 className="mostlyviewedheading">Най-посещавани</h2></header>
                <div className="container"></div>
                <div className="container"></div>
                <div className="container"></div>
                <div className="container"></div>
                <div className="container"></div>
                <div className="container"></div>
                <div className="container"></div>
                <div className="container"></div>
                <div className="container"></div>
                <div className="container"></div>
            </section>
            <section className="recentsearch">
                <header><h2 className="recentsheading">Скорошни търсения</h2></header>
                <div className="ad"></div>
                <div className="ad"></div>
                <div className="ad"></div>
                <div className="ad"></div>
                <div className="ad"></div>
                <div className="ad"></div>
            </section>
            <section className="ads">
                <div className="ad"></div>
                <div className="ad"></div>
                <div className="ad"></div>
                <div className="ad"></div>
                <div className="ad"></div>
                <div className="ad"></div>
                <div className="ad"></div>
            </section>
        </main>
    );
    }
}

export default Home;