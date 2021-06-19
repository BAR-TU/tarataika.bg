import React from "react";
import { Helmet } from 'react-helmet';

class Home extends React.Component {
    constructor (props) {
        super(props);
        
        this.state = {
            category_value: 'Коли',
            make_value: '',
            categories: [],
            button_value: 'Подробно търсене',
            makes: [],
            models: []
        }
    }


    changeCategory = (event) => {
        this.setState({category_value: event.target.value});
        var box = document.getElementsByClassName("searchbox");

        if (box[0].style.maxHeight !== "200px")
            this.setState({button_value: "Съкратено търсене"});

        let a = this.state.categories;

        for (let i = 0; i < a.length; i++) {
            if (a[i].vehicle_category === event.target.value) {
                this.setState({ makes: a[i].makes});
                break;
            }
        }
    }

    getCategories = () => {
        fetch('/api/vehicle-categories')
        .then(res => res.json())
        .then(categories => {
            this.setState({ categories });
        })
        .then(() => {
            let a = this.state.categories;

            for (let i = 0; i < a.length; i++) {
                if (a[i].vehicle_category === this.state.category_value) {
                    this.setState({ makes: a[i].makes});
                    break;
                }
            }
        })

        this.loadSearchbox();
    }

  getModels= (event) => {
        this.setState({make_value: event.target.value});
        let query = 'api/models/category/';
        let a = this.state.categories;
        let categoryId = '';

        for (let i = 0; i < a.length; i++) {
            if (a[i].vehicle_category === this.state.category_value) {
                categoryId = a[i].vehicle_category_id;
                break;
            }
        }

        const selection = this.state.makes.find(make => make.make === event.target.value);

        query += categoryId + "/" + selection.make_id;

        fetch(query)
        .then(res => res.json())
        .then(models => {
            this.setState({ models });
        })
    }

    loadSearchbox = () => {
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
                button[0].value = "Подробно търсене";
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

    componentDidMount() {
        this.getCategories();
    }

    render() {
        const { categories } = this.state;
        const { button_value } = this.state;
        const { makes } = this.state;
        const { models } = this.state;
    return (     
        <main>
            <Helmet>
                <meta charset="utf-8"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap" rel="stylesheet"/>
                <title>
                    tarataika.bg
                </title>
            </Helmet>
                <section className="searchbox">
                    <header className="searchboxheading"><h2>Търсачка</h2></header>
                    <form action="">
                        <label for="carcategory" id="categorylabel">Категория</label>
                        <select id="carcategory" name="category" onChange={ this.changeCategory } value={ this.state.category_value }>
                            {categories.map((item) => {
                                return(
                                    <option key={ item.vehicle_category_id } value={ item.vehicle_category }>Търси { item.vehicle_category.toLowerCase() }</option>
                                  );
                                })
                            }
                        </select>
                        
                        
                        <label for="carmake" id="carmakelabel">Марка</label>
                        <select id="carmake" name="carmake" onChange={ this.getModels } value={ this.state.make_value }>
                            <option key='0' value="none">---</option>
                            {makes.map((make) => {
                                return(
                                    <option key={ make.make_id } value={ make.make }>{ make.make }</option>
                                  );
                                })
                            }
                        </select>
        
                        <label for="carmodel" id="carmodellabel">Модел</label>
                        <select id="carmodel" name="carmodel" placeholder="Модел">
                            <option key='0' value="none">---</option>
                            {models.map((model) => {
                                return(
                                    <option key={ model.model_id } value={ model.model }>{ model.model }</option>
                                  );
                                })
                            }
                        </select>
                        
                        <label for="priceholder" id="priceholderlabel">Цена</label>
                        <input type="text" id="priceholder" name="price" placeholder="Макс. цена (лв.)"></input>
        
                        <label for="yearholder" id="yearholderlabel">Година</label>
                        <input type="text" id="yearholder" name="year" placeholder="Година на производство"></input>
        
                        <input className="test" type="text" name="price" placeholder="Макс. цена (лв.)"></input>
                        <input className="test" type="text" name="price" placeholder="Макс. цена (лв.)"></input>
                        <input className="test" type="text" name="price" placeholder="Макс. цена (лв.)"></input>
                        <input className="test" type="text" name="price" placeholder="Макс. цена (лв.)"></input>
                        
                        <input type="button" className="detailedsearch" value={button_value}></input>
        
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