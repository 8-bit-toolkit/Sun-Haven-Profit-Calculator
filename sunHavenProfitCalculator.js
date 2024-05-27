// import { default as crops } from './crops';

/*
 * Fix overflow month information - ex: Planting on Summer 20th and running for 30 days should show Summer AND Fall crops
 * Add "select starting currency" option as an alternative to "amount of crops"
 * Add a modifiable additional % growth speed and harvest chance to account for some items
 * Fix the www issue on cloudflare - https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-zone-apex/
 * Add renew domain to calendar for next year May 9th 2025
 * Test it a bunch (really test the shortened harvest times math and extra crop math)
 * Add support for foreign languages?
 *
 * OPTIONAL - Get rid of "update graph" button and just have stuff run every time someone changes something?
 */

window.onload = () => {
    // JSON data for crops and regions
    const cropsMap = {
        sunHaven: {
            cropsJSON: `[{"name":"Wheat","experience":7,"acquiredFrom":"General Store","seedPrice":40,"sellPrice":55,"daysToHarvest":4,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Corn","experience":9,"acquiredFrom":"General Store","seedPrice":80,"sellPrice":55,"daysToHarvest":7,"cropsPerHarvest":2,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Carrot","experience":8,"acquiredFrom":"General Store","seedPrice":80,"sellPrice":115,"daysToHarvest":6,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Rice","experience":8,"acquiredFrom":"General Store","seedPrice":90,"sellPrice":110,"daysToHarvest":5,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Potato","experience":9,"acquiredFrom":"General Store","seedPrice":100,"sellPrice":85,"daysToHarvest":5,"cropsPerHarvest":1.5,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Sugar Cane","experience":10,"acquiredFrom":"General Store","seedPrice":80,"sellPrice":100,"daysToHarvest":6,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Onion","experience":8,"acquiredFrom":"General Store","seedPrice":80,"sellPrice":115,"daysToHarvest":6,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Tomato","experience":9,"acquiredFrom":"General Store","seedPrice":80,"sellPrice":115,"daysToHarvest":6,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Greenroot","experience":6,"acquiredFrom":"General Store","seedPrice":60,"sellPrice":75,"daysToHarvest":4,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Chocoberry","experience":10,"acquiredFrom":"Farming Store","seedPrice":45,"sellPrice":12,"daysToHarvest":6,"cropsPerHarvest":3,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":false,"winter":false},{"name":"Armoranth","experience":13,"acquiredFrom":"Farming Store","seedPrice":60,"sellPrice":75,"daysToHarvest":4,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":false,"winter":false},{"name":"Guava Berry","experience":13,"acquiredFrom":"Farming Store","seedPrice":60,"sellPrice":80,"daysToHarvest":8,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":false,"summer":true,"fall":true,"winter":false},{"name":"Grape","experience":9,"acquiredFrom":"Farming Store","seedPrice":60,"sellPrice":75,"daysToHarvest":1,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Lemon","experience":8,"acquiredFrom":"Farming Store","seedPrice":60,"sellPrice":80,"daysToHarvest":6,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":false,"winter":false},{"name":"Garlic","experience":13,"acquiredFrom":"Farming Store","seedPrice":80,"sellPrice":115,"daysToHarvest":7,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":false,"summer":true,"fall":true,"winter":false},{"name":"Mango","experience":10,"acquiredFrom":"Farming Store","seedPrice":80,"sellPrice":115,"daysToHarvest":11,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":false,"summer":true,"fall":true,"winter":false},{"name":"Beet","experience":10,"acquiredFrom":"Farming Store","seedPrice":80,"sellPrice":115,"daysToHarvest":10,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":false,"summer":true,"fall":true,"winter":false},{"name":"Pineapple","experience":16,"acquiredFrom":"Farming Store","seedPrice":80,"sellPrice":90,"daysToHarvest":4,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":false,"summer":true,"fall":false,"winter":false},{"name":"Kale","experience":13,"acquiredFrom":"Farming Store","seedPrice":100,"sellPrice":150,"daysToHarvest":9,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":false,"fall":false,"winter":false},{"name":"Clover","experience":20,"acquiredFrom":"Farming Store","seedPrice":100,"sellPrice":5,"daysToHarvest":3,"cropsPerHarvest":3,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Heart Berry","experience":18,"acquiredFrom":"Farming Store","seedPrice":143,"sellPrice":190,"daysToHarvest":8,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":false,"summer":true,"fall":true,"winter":false},{"name":"Lettuce","experience":13,"acquiredFrom":"Farming Store","seedPrice":160,"sellPrice":165,"daysToHarvest":8,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":false,"fall":false,"winter":false},{"name":"Cinnaberry","experience":7,"acquiredFrom":"Farming Store","seedPrice":175,"sellPrice":220,"daysToHarvest":7,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":false,"fall":false,"winter":false},{"name":"Pepper","experience":14,"acquiredFrom":"Farming Store","seedPrice":175,"sellPrice":225,"daysToHarvest":6,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":false,"winter":false},{"name":"Green Bean","experience":3,"acquiredFrom":"Farming Store","seedPrice":200,"sellPrice":20,"daysToHarvest":12,"cropsPerHarvest":1,"regrows":true,"regrowRate":1,"spring":true,"summer":false,"fall":false,"winter":false},{"name":"Stormelon","experience":13,"acquiredFrom":"Farming Store","seedPrice":225,"sellPrice":300,"daysToHarvest":12,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":false,"winter":false},{"name":"Durian","experience":15,"acquiredFrom":"Farming Store","seedPrice":210,"sellPrice":340,"daysToHarvest":15,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":false,"summer":true,"fall":true,"winter":false},{"name":"Melon","experience":16,"acquiredFrom":"Farming Store","seedPrice":200,"sellPrice":350,"daysToHarvest":14,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":false,"summer":true,"fall":false,"winter":false},{"name":"Coffee","experience":5,"acquiredFrom":"Farming Store","seedPrice":200,"sellPrice":35,"daysToHarvest":7,"cropsPerHarvest":1,"regrows":true,"regrowRate":3,"spring":false,"summer":true,"fall":true,"winter":false},{"name":"Cotton","experience":5,"acquiredFrom":"Farming Store","seedPrice":250,"sellPrice":15,"daysToHarvest":10,"cropsPerHarvest":3,"regrows":true,"regrowRate":3,"spring":false,"summer":true,"fall":true,"winter":false},{"name":"Honeysuckle","experience":6,"acquiredFrom":"Farming Store","seedPrice":400,"sellPrice":35,"daysToHarvest":10,"cropsPerHarvest":2,"regrows":true,"regrowRate":3,"spring":false,"summer":true,"fall":true,"winter":false},{"name":"Kiwi Berry","experience":4,"acquiredFrom":"Farming Store","seedPrice":250,"sellPrice":40,"daysToHarvest":8,"cropsPerHarvest":1,"regrows":true,"regrowRate":2,"spring":true,"summer":false,"fall":false,"winter":false},{"name":"Pea","experience":5,"acquiredFrom":"Farming Store","seedPrice":300,"sellPrice":75,"daysToHarvest":12,"cropsPerHarvest":1,"regrows":true,"regrowRate":2,"spring":true,"summer":false,"fall":false,"winter":false},{"name":"Shimmeroot","experience":35,"acquiredFrom":"Farming Store","seedPrice":400,"sellPrice":525,"daysToHarvest":14,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":false,"winter":false},{"name":"Red Rose","experience":4,"acquiredFrom":"Farming Store","seedPrice":30,"sellPrice":21,"daysToHarvest":4,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Blue Rose","experience":4,"acquiredFrom":"Farming Store","seedPrice":30,"sellPrice":21,"daysToHarvest":4,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Honey Flower","experience":8,"acquiredFrom":"Farming Store","seedPrice":45,"sellPrice":32,"daysToHarvest":4,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Lavender","experience":12,"acquiredFrom":"Farming Store","seedPrice":250,"sellPrice":175,"daysToHarvest":6,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Daisy","experience":4,"acquiredFrom":"Farming Store","seedPrice":60,"sellPrice":42,"daysToHarvest":4,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Orchid","experience":6,"acquiredFrom":"Farming Store","seedPrice":60,"sellPrice":42,"daysToHarvest":5,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Tulip","experience":7,"acquiredFrom":"Farming Store","seedPrice":120,"sellPrice":84,"daysToHarvest":5,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Hibiscus","experience":7,"acquiredFrom":"Farming Store","seedPrice":120,"sellPrice":84,"daysToHarvest":5,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Sunflower","experience":12,"acquiredFrom":"Farming Store","seedPrice":250,"sellPrice":175,"daysToHarvest":6,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Lily","experience":15,"acquiredFrom":"Farming Store","seedPrice":600,"sellPrice":420,"daysToHarvest":4,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Lotus","experience":15,"acquiredFrom":"Farming Store","seedPrice":600,"sellPrice":420,"daysToHarvest":4,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Watermelon","experience":8,"acquiredFrom":"Farming Store","seedPrice":500,"sellPrice":190,"daysToHarvest":14,"cropsPerHarvest":1,"regrows":true,"regrowRate":4,"spring":true,"summer":true,"fall":false,"winter":false},{"name":"Tea Leaf","experience":6,"acquiredFrom":"Farming Store","seedPrice":25,"sellPrice":15,"daysToHarvest":4,"cropsPerHarvest":2,"regrows":false,"regrowRate":0,"spring":false,"summer":false,"fall":true,"winter":true},{"name":"Heat Fruit","experience":8,"acquiredFrom":"Farming Store","seedPrice":80,"sellPrice":90,"daysToHarvest":4,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":false,"summer":false,"fall":true,"winter":true},{"name":"Yam","experience":10,"acquiredFrom":"Farming Store","seedPrice":80,"sellPrice":120,"daysToHarvest":8,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":false,"summer":false,"fall":true,"winter":true},{"name":"Purple Eggplant","experience":10,"acquiredFrom":"Farming Store","seedPrice":80,"sellPrice":120,"daysToHarvest":4,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":false,"summer":false,"fall":true,"winter":true},{"name":"Barley","experience":8,"acquiredFrom":"Farming Store","seedPrice":90,"sellPrice":20,"daysToHarvest":6,"cropsPerHarvest":4,"regrows":false,"regrowRate":0,"spring":false,"summer":false,"fall":true,"winter":true},{"name":"Hops","experience":13,"acquiredFrom":"Farming Store","seedPrice":90,"sellPrice":25,"daysToHarvest":12,"cropsPerHarvest":4,"regrows":false,"regrowRate":0,"spring":false,"summer":false,"fall":true,"winter":false},{"name":"Soda Pop Crop","experience":13,"acquiredFrom":"Farming Store","seedPrice":100,"sellPrice":60,"daysToHarvest":7,"cropsPerHarvest":2,"regrows":false,"regrowRate":0,"spring":false,"summer":false,"fall":true,"winter":false},{"name":"Fizzy Fruit","experience":13,"acquiredFrom":"Farming Store","seedPrice":100,"sellPrice":60,"daysToHarvest":7,"cropsPerHarvest":2,"regrows":false,"regrowRate":0,"spring":false,"summer":false,"fall":true,"winter":false},{"name":"Marshmallow Bean","experience":13,"acquiredFrom":"Farming Store","seedPrice":120,"sellPrice":80,"daysToHarvest":8,"cropsPerHarvest":2,"regrows":false,"regrowRate":0,"spring":false,"summer":false,"fall":true,"winter":true},{"name":"Ghost Pepper","experience":16,"acquiredFrom":"Farming Store","seedPrice":180,"sellPrice":300,"daysToHarvest":14,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":false,"summer":false,"fall":true,"winter":true},{"name":"Butternut","experience":10,"acquiredFrom":"Farming Store","seedPrice":180,"sellPrice":40,"daysToHarvest":10,"cropsPerHarvest":4,"regrows":false,"regrowRate":0,"spring":false,"summer":false,"fall":true,"winter":true},{"name":"Pumpkin","experience":10,"acquiredFrom":"Farming Store","seedPrice":300,"sellPrice":575,"daysToHarvest":18,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":false,"summer":false,"fall":true,"winter":false},{"name":"Cranberry","experience":3,"acquiredFrom":"Farming Store","seedPrice":300,"sellPrice":40,"daysToHarvest":7,"cropsPerHarvest":1,"regrows":true,"regrowRate":2,"spring":false,"summer":false,"fall":true,"winter":false},{"name":"Brr-Nana","experience":8,"acquiredFrom":"Farming Store","seedPrice":40,"sellPrice":45,"daysToHarvest":2,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":false,"summer":false,"fall":false,"winter":true},{"name":"Turnip","experience":8,"acquiredFrom":"Farming Store","seedPrice":60,"sellPrice":80,"daysToHarvest":6,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":false,"summer":false,"fall":true,"winter":true},{"name":"Hexagon Berry","experience":15,"acquiredFrom":"Farming Store","seedPrice":100,"sellPrice":125,"daysToHarvest":6,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":false,"summer":false,"fall":false,"winter":true},{"name":"Star Fruit","experience":13,"acquiredFrom":"Farming Store","seedPrice":100,"sellPrice":190,"daysToHarvest":10,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":false,"summer":false,"fall":false,"winter":true},{"name":"Blue Moon Fruit","experience":15,"acquiredFrom":"Farming Store","seedPrice":100,"sellPrice":145,"daysToHarvest":14,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":false,"summer":false,"fall":false,"winter":true},{"name":"Snow Ball","experience":13,"acquiredFrom":"Farming Store","seedPrice":130,"sellPrice":190,"daysToHarvest":10,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":false,"summer":false,"fall":false,"winter":true},{"name":"Blizzard Berry","experience":8,"acquiredFrom":"Farming Store","seedPrice":130,"sellPrice":175,"daysToHarvest":13,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":false,"summer":false,"fall":false,"winter":true},{"name":"Snow Pea","experience":10,"acquiredFrom":"Farming Store","seedPrice":150,"sellPrice":200,"daysToHarvest":7,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":false,"summer":false,"fall":false,"winter":true},{"name":"Balloon Fruit","experience":9,"acquiredFrom":"Farming Store","seedPrice":160,"sellPrice":215,"daysToHarvest":8,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":false,"summer":false,"fall":false,"winter":true},{"name":"Candy Cane","experience":7,"acquiredFrom":"Farming Store","seedPrice":300,"sellPrice":40,"daysToHarvest":3,"cropsPerHarvest":1,"regrows":true,"regrowRate":2,"spring":false,"summer":false,"fall":false,"winter":true},{"name":"Pythagorean Berry","experience":16,"acquiredFrom":"Farming Store","seedPrice":345,"sellPrice":512,"daysToHarvest":13,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":false,"summer":false,"fall":false,"winter":true}]`,
            currency: 'Coins',
        },
        nelvari: {
            cropsJSON: `[{"name":"Acorn","experience":9,"acquiredFrom":"Nel'Vari General Store","seedPrice":4,"sellPrice":7,"daysToHarvest":4,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Cat Tail","experience":22,"acquiredFrom":"Nel'Vari General Store","seedPrice":20,"sellPrice":10,"daysToHarvest":7,"cropsPerHarvest":3,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Dragon Fruit","experience":32,"acquiredFrom":"Nel'Vari General Store","seedPrice":30,"sellPrice":20,"daysToHarvest":5,"cropsPerHarvest":2,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Fire Fruit","experience":13,"acquiredFrom":"Nel'Vari General Store","seedPrice":10,"sellPrice":8,"daysToHarvest":6,"cropsPerHarvest":2,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Indiglow","experience":22,"acquiredFrom":"Nel'Vari General Store","seedPrice":20,"sellPrice":29,"daysToHarvest":6,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Mana Gem","experience":28,"acquiredFrom":"Nel'Vari General Store","seedPrice":25,"sellPrice":13,"daysToHarvest":8,"cropsPerHarvest":3,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Rock Fruit","experience":13,"acquiredFrom":"Nel'Vari General Store","seedPrice":10,"sellPrice":5,"daysToHarvest":6,"cropsPerHarvest":2,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Shiiwalki Mushroom","experience":14,"acquiredFrom":"Nel'Vari General Store","seedPrice":14,"sellPrice":10,"daysToHarvest":5,"cropsPerHarvest":2,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Walk Choy","experience":14,"acquiredFrom":"Nel'Vari General Store","seedPrice":14,"sellPrice":9,"daysToHarvest":3,"cropsPerHarvest":2,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Water Fruit","experience":13,"acquiredFrom":"Nel'Vari General Store","seedPrice":10,"sellPrice":10,"daysToHarvest":6,"cropsPerHarvest":2,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Wind Chime","experience":12,"acquiredFrom":"Nel'Vari General Store","seedPrice":8,"sellPrice":14,"daysToHarvest":7,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true}]`,
            currency: 'Mana-Orbs',
        },
        withergate: {
            cropsJSON: `[{"name":"Demon Orb","experience":16,"acquiredFrom":"Christine's Seed Stall","seedPrice":17,"sellPrice":24,"daysToHarvest":3,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Eggplant","experience":13,"acquiredFrom":"Christine's Seed Stall","seedPrice":13,"sellPrice":18,"daysToHarvest":4,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Kraken Kale","experience":6,"acquiredFrom":"Christine's Seed Stall","seedPrice":3,"sellPrice":6,"daysToHarvest":4,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Moonplant","experience":11,"acquiredFrom":"Christine's Seed Stall","seedPrice":6,"sellPrice":11,"daysToHarvest":6,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Razorstalk","experience":8,"acquiredFrom":"Christine's Seed Stall","seedPrice":4,"sellPrice":9,"daysToHarvest":6,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Snappy Plant","experience":16,"acquiredFrom":"Christine's Seed Stall","seedPrice":13,"sellPrice":22,"daysToHarvest":7,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Suckerstem","experience":10,"acquiredFrom":"Christine's Seed Stall","seedPrice":10,"sellPrice":18,"daysToHarvest":6,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true},{"name":"Tombmelon","experience":9,"acquiredFrom":"Christine's Seed Stall","seedPrice":8,"sellPrice":10,"daysToHarvest":3,"cropsPerHarvest":1,"regrows":false,"regrowRate":0,"spring":true,"summer":true,"fall":true,"winter":true}]`,
            currency: 'Tickets',
        },
    };

    // DOM elements
    const $configsForm = document.getElementsByClassName('configs-form')[0];
    const $cropsRegion = document.getElementsByClassName('crops-region-select')[0];
    const $plantingDay = document.getElementsByClassName('planting-day-select')[0];
    const $plantingSeason = document.getElementsByClassName('planting-season-select')[0];
    const $amountOfDays = document.getElementsByClassName('days-amount-input')[0];
    const $amountOfDaysMaxText = document.getElementsByClassName('days-amount-maximum')[0];
    const $amountOfCrops = document.getElementsByClassName('crops-amount-input')[0];
    const $fertilizer = document.getElementsByClassName('fertilizer-select')[0];
    const $fireTotem = document.getElementsByClassName('fire-fertilizer-totem-input')[0];
    const $springTotem = document.getElementsByClassName('spring-totem-input')[0];
    const $farmingTotem = document.getElementsByClassName('farming-totem-input')[0];
    const $tillerTipInput = document.getElementsByClassName('tiller-tip')[0];
    const $tillerTipLevel = document.getElementsByClassName('tiller-tip-select')[0];
    const $propagationLevel = document.getElementsByClassName('propagation-select')[0];
    const $fertileLandLevel = document.getElementsByClassName('fertile-land-select')[0];
    const $ignoreInputs = document.getElementsByClassName('ignore')[0];
    const $ignoreSeasons = document.getElementsByClassName('ignore-seasons-input')[0];
    const $ignoreGrapes = document.getElementsByClassName('ignore-grapes-input')[0];
    const $sortSelect = document.getElementsByClassName('sort-select')[0];
    const $submitButton = document.getElementsByClassName('submit-button')[0];
    const $grid = document.getElementById('my_dataviz');
    const $disclaimers = document.getElementsByClassName('disclaimers-container')[0];
    const $graphSortContainer = document.getElementsByClassName('graph-sort-container')[0];

    // state variables
    let currentGrid = 'totalProfit';
    let currentRegion = 'sunHaven';

    // set the dimensions and margins of the graph
    const margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 1140 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("position", "relative")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // X axis
    const x = d3.scaleBand()
        .range([ 0, width ])
        .padding(0.2);
    const xAxis = svg.append("g")
        .attr("transform", `translate(0, ${height})`);

    // Add Y axis
    const y = d3.scaleLinear()
        .range([ height, 0]);
    const yAxis = svg.append("g")
        .attr("class", "myYaxis");

    // create a tooltip
    const tooltip = d3.select("#my_dataviz")
        .append("div")
        .attr("class", "graph-tooltip")
        .style("position", "absolute")
        .style("opacity", 0)
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px");

    /*
     * @param {Event} e - The DOM event for this mouseOver
     * @param {Object} d - The crop represented by the bar being hovered over
     */
    const mouseover = (e,d) => {
        const totalProfit = Math.round(d.totalProfit * 100) / 100;
        const roi = Math.round(d.roi * 100) / 100;
        const dailyROI = Math.round(d.dailyROI * 100) / 100;

        // Display harvest information differently for crops that regrow
        const harvestInfo = d.regrows ? `
            <tr>
                <th scope="row" class="graph-tooltip__table__label">First Harvest:</th>
                <td class="graph-tooltip__table__data">${d.firstHarvest} Days</td>
            </tr>
            <tr>
                <th scope="row" class="graph-tooltip__table__label">Regrows After:</th>
                <td class="graph-tooltip__table__data">${d.regrowRate} Day${d.regrowRate === 1 ? '' : 's'}</td>
            </tr>` :
            `<tr>
                <th scope="row" class="graph-tooltip__table__label">Ready To Harvest Every:</th>
                <td class="graph-tooltip__table__data">${d.firstHarvest} Days</td>
            </tr>`;

        // Only display season information for sun haven crops
        const seasonsMap = ['spring','summer','fall','winter'];
        let seasonsInfo = ``;
        if($cropsRegion.value === 'sunHaven'){
            const seasonsArray = seasonsMap.map(season => {
                return `<tr>
                    <th scope="row" class="graph-tooltip__table__label">Grows In ${season.charAt(0).toUpperCase() + season.slice(1)}</th>
                    <td class="graph-tooltip__table__data">${d[season].toString().charAt(0).toUpperCase() + d[season].toString().slice(1)}</td>
                </tr>`;
            });
            seasonsInfo = `${seasonsArray.join('')}`;
        }
        tooltip
            .html(`
                    <img class="graph-tooltip__crop-image" src="./images/crops/${d.name.replaceAll(' ','-')}.png" />
                    <p class="graph-tooltip__label">${d.name}</p>
                    <table class="graph-tooltip__table">
                        <tbody>
                            <tr>
                                <th scope="row" class="graph-tooltip__table__label">Total Profit:</th>
                                <td class="graph-tooltip__table__data graph-tooltip__table__data-currency"><span class="${totalProfit >= 0 ? 'posProfit' : 'negProfit'}">${totalProfit}</span><img class="graph-tooltip__currency" src="./images/assets/${cropsMap[currentRegion].currency}.png" /></td>
                            </tr>
                            <tr>
                                <th scope="row" class="graph-tooltip__table__label">ROI:</th>
                                <td class="graph-tooltip__table__data graph-tooltip__table__data"><span class="${roi >= 0 ? 'posProfit' : 'negProfit'}">${roi}%</span></td>
                            </tr>
                            <tr>
                                <th scope="row" class="graph-tooltip__table__label">Daily ROI:</th>
                                <td class="graph-tooltip__table__data graph-tooltip__table__data"><span class="${dailyROI >= 0 ? 'posProfit' : 'negProfit'}">${dailyROI}%</span></td>
                            </tr>
                            <tr>
                                <th scope="row" class="graph-tooltip__table__label">Farming Experience:</th>
                                <td class="graph-tooltip__table__data">${d.experienceGained}</td>
                            </tr>
                            ${harvestInfo}
                            <tr>
                                <th scope="row" class="graph-tooltip__table__label">Total Harvests:</th>
                                <td class="graph-tooltip__table__data">${d.harvests}</td>
                            </tr>
                            <tr>
                                <th scope="row" class="graph-tooltip__table__label">Unused days after last harvest:</th>
                                <td class="graph-tooltip__table__data">${d.leftoverDays}</td>
                            </tr>
                            <tr>
                                <th scope="row" class="graph-tooltip__table__label">Total Crops Harvested:</th>
                                <td class="graph-tooltip__table__data">${Math.round(d.numberOfCropsHarvested * 100) / 100}</td>
                            </tr>
                            <tr>
                                <th scope="row" class="graph-tooltip__table__label">Total Sales:</th>
                                <td class="graph-tooltip__table__data">${Math.round(d.grossSales * 100) / 100}</td>
                            </tr>
                            <tr>
                                <th scope="row" class="graph-tooltip__table__label">Total Seed Cost:</th>
                                <td class="graph-tooltip__table__data">${d.costOfSeeds}</td>
                            </tr>
                            <tr>
                                <th scope="row" class="graph-tooltip__table__label">Seeds Acquired From:</th>
                                <td class="graph-tooltip__table__data">${d.acquiredFrom}</td>
                            </tr>
                            ${seasonsInfo}
                        </tbody>
                    </table>
                `)
            .style("opacity", "1")
            .style("background-color", "rgba(0,0,0,0.8)")
            .style("color", "white")
            .style("border", "2px solid black")
            .style("display", 'block');

        // Reduce opacity of all bars to 0.2
        d3.selectAll("rect").style("opacity", 0.2);

        // Highlight this bar
        e.currentTarget.style.opacity = 1;
    };

    /*
     * @param {Event} e - The DOM event for this mouseOver
     * Ensure the tooltip follows the mouse when a user moves it
     */
    const mousemove = (e) => {
        const leftOffset = e.offsetX >= ($grid.clientWidth / 2) ? (e.offsetX - tooltip._groups[0][0].clientWidth - 20) : (e.offsetX + 20);
        tooltip.style("left",`${leftOffset}px`).style("top",`${e.offsetY}px`);
    };

    /*
     * After a user mouses off of a bar, hide the tooltip and restore opacity to all bars
     */
    const mouseleave = () => {
        tooltip.style("display", "none");
        d3.selectAll("rect").style("opacity", 1);
    };

    /*
     * @param {Number} amount - The amount being represented by this bar in the bar chart
     * @param {Number} highest - The largest number in this bar chart
     * @return {String} - The intended color for this bar in the bar chart
     */
    const determineBarColor = (amount, highest) => {
        if(amount <= 0) {
            return 'red';
        }
        if(amount === highest){
            return 'green';
        }
        if(amount <= (highest/2)){
            return 'orange';
        }
        if(amount > (highest/2)) {
            return 'gold';
        }
    }

    /*
     * @param {Array} newData - The crops data to be displayed on this bar chart
     * @param {String} yProperty - The attribute reference for the value to be displayed in this bar chart
     */
    const updateTheGraph = (newData, yProperty) => {

        const newBarValues = newData.map(crop => crop[yProperty]);
        const highestAmount = Math.max(...newBarValues);
        const lowestAmount = Math.min(...newBarValues);
        const slightlyAboveHighestAmount = highestAmount > 0 ? highestAmount * 1.1 : highestAmount * 0.9;
        const slightlyBelowLowestAmount = lowestAmount > 0 ? lowestAmount * .9 : lowestAmount * 1.1;
        const newHighestAmount = Math.round((slightlyAboveHighestAmount) * 100) / 100;
        let newLowestAmount = Math.round((slightlyBelowLowestAmount) * 100) / 100;

        // If the lowest amount in the dataset is 0, manually lower it a tiny bit to allow that that bar to show
        newLowestAmount = (lowestAmount === 0 && newLowestAmount === 0) ? newLowestAmount - 1 : newLowestAmount;

        // update the X axis
        x.domain(newData.map(crop => crop.name));
        xAxis.transition()
            .duration(500)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // update the Y axis
        y.domain([Math.min(newLowestAmount, 0), newHighestAmount ]);
        yAxis.transition().duration(500).call(d3.axisLeft(y));

        // retrieve all currently existing bars
        svg.selectAll("rect")
            .data(newData) // apply the new data to the existing bars
            .join("rect")// .enter().append("rect");
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
            .transition()
            .duration(500)
            .attr("x", d => x(d.name))
            .attr("y", d => y(d[yProperty]))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d[yProperty]))
            .attr('class', d => d.name.replace(/\s/g, '-'))
            .attr("fill", d => determineBarColor(d[yProperty],(highestAmount)));

    };

    /*
     * @param {Object} crop - The crop being currently evaluated
     * disqualify some crops due to not enough time
     * @return {Number} - The number of growing days that are valid for this crop
     */
    const calculateNumberOfGrowingDays = (crop) => {
        const plantingSeason = Number($plantingSeason.value); // 0 = spring, 1 = summer, 2 = fall, 3 = winter
        const plantingDay = Number($plantingDay.value);
        const amountOfDays = Number($amountOfDays.value);
        const seasonMap = ['spring', 'summer', 'fall', 'winter'];
        const canBePlantedInCurrentSeason = crop[seasonMap[plantingSeason]];

        let numberOfDaysRemainingThisSeason = 28 - plantingDay;

        if (numberOfDaysRemainingThisSeason > amountOfDays) {
            /*
             * If the time will not leave this season, and the crop CAN be planted in this season, then the growing days
             * is just the amount of time entered.
             *
             * If the time will not leave this season, and the crop CANNOT be planted in this season, then the growing
             * days is 0.
             */
            return canBePlantedInCurrentSeason ? amountOfDays : 0;
        }

        // the days for this season have been considered.
        let numberOfDaysConsidered = numberOfDaysRemainingThisSeason;

        /*
         * if the crop CAN be grown this season, initialize the number of growing days to the days remaining, if not
         * initialize it to -1 to account for the 1 day of "no growth" spent entering the season when it can grow
         */
        let numberOfGrowingDays = canBePlantedInCurrentSeason ? numberOfDaysRemainingThisSeason : -1;

        /*
         * @param {String} seasonToBeTested - the current season to check if this crop can be grown
         * @return {Boolean} - Does nothing but terminate the recursive season checking
         */
        const testSeason = (seasonToBeTested) => {
            const daysRemaining = amountOfDays - numberOfDaysConsidered;

            // Add the days considered for this month
            numberOfDaysConsidered += Math.min(daysRemaining, 28);

            // if the crop will grow in this season
            if (crop[seasonMap[seasonToBeTested]]) {
                // add either the full month, or as much of it as the calculator will run for
                numberOfGrowingDays += Math.min(daysRemaining, 28);
            } else if(numberOfGrowingDays > 0) {
                // the crop will not grow in this season, and has already had a period of growth on in the calculation
                return false;
            }
            // if we will cross into another month, test it. Otherwise, quit here
            if (daysRemaining > 28) {
                testSeason((seasonToBeTested + 1) % 4);
            } else {
                return false;
            }
        }

        // check how many months this crop can be grown starting with next month
        testSeason((plantingSeason + 1) % 4);
        return numberOfGrowingDays;
    };

    /*
     * @param {Object} crop - The crop being currently evaluated
     * @param {Number} numberOfGrowingDays - The amount of days this calculation will run for
     * @return {Number} - The amount of days until the first harvest for this crop
     */
    const calculateFirstHarvest = (crop, numberOfGrowingDays) => {
        // the time until the crop is ready for harvest
        let firstHarvest = crop.daysToHarvest;

        // the various types of fertilizers and totems that could affect the growth rate
        const fertilizerMap = {
            none: 0,
            simpleFire: 0.3,
            simpleMagic: 0.3,
            advFire: 0.5,
            advMagic: 0.5,
        };
        const fertilizerModifier = fertilizerMap[$fertilizer.value] || 0;
        const totemModifier = $fireTotem.checked ? 0.15 : 0;

        // TODO - determine if totems and fertilizers can overlap or if it just takes the best one
        firstHarvest = Math.ceil(crop.daysToHarvest / (1 + fertilizerModifier + totemModifier));

        // if there is not enough time for this crop to be harvested a single time, return 0
        return firstHarvest > numberOfGrowingDays ? 0 : firstHarvest;
    };

    /*
     * @param {Object} crop - The crop being currently evaluated
     * @param {Number} firstHarvest - The amount of days until the first harvest for this crop
     * @param {Number} numberOfGrowingDays - The amount of days this calculation will run for
     * @return {Object} - The number of harvests possible for this crop during this calculation period and the number of
     * leftover unused days
     */
    const calculateNumberOfHarvests = (crop, firstHarvest, numberOfGrowingDays) => {
        // if the crop regrows, be sure to account for the first initial longer harvest
        if(crop.regrows){
            return {
                leftoverDays:(numberOfGrowingDays - firstHarvest) % crop.regrowRate,
                numberOfHarvests: Math.floor(1 +((numberOfGrowingDays - firstHarvest) / crop.regrowRate)),
            }
        }

        return {
            leftoverDays: numberOfGrowingDays % firstHarvest,
            numberOfHarvests: Math.floor(numberOfGrowingDays / firstHarvest),
        };
    };

    /*
     * @param {Object} crop - The crop being currently evaluated
     * @param {Number} numberOfHarvests - The amount of times this crop will be harvested
     * @param {Number} numberOfCrops - The amount of crops this calculator assumes will be planted
     * @return {Number} - The number of crops the player will receive from the harvests
     */
    const calculateNumberOfCropsHarvested = (crop, numberOfHarvests, numberOfCrops) => {
        // the various types of fertilizers and totems that could affect the amount of harvested crops
        const fertilizerMap = {
            none: 0,
            simpleEarth: 0.15,
            simpleMagic: 0.15,
            advEarth: 0.25,
            advMagic: 0.25,
        };
        const fertilizerModifier = fertilizerMap[$fertilizer.value] || 0;
        const totemModifier = $springTotem.checked ? 0.04 : 0;
        const propagationModifier = Number($propagationLevel.value);
        const fertileLandModifier = $fertilizer.value !== 'none' ? Number($fertileLandLevel.value) : 0;

        const totalChanceToGetExtraRegrowCrop = propagationModifier; //  + fertileLandModifier;
        const totalChanceToGetExtraCrop = fertilizerModifier + totemModifier + propagationModifier + fertileLandModifier;

        const normalCrops = (crop.cropsPerHarvest * numberOfHarvests);
        let extraCrops;
        if(crop.regrows){
            // if a crop regrows, only apply some modifiers to the INITIAL harvest, then others to regrow harvests
            extraCrops = totalChanceToGetExtraCrop + ((numberOfHarvests-1) *  totalChanceToGetExtraRegrowCrop);
        } else {
            extraCrops = (totalChanceToGetExtraCrop * numberOfHarvests);
        }

        return (numberOfCrops * (normalCrops + extraCrops));
    };

    /*
     * @param {Object} crop - The crop being currently evaluated
     * @param {Number} numberOfHarvests - The amount of times this crop will be harvested
     * @return {Number} - The total amount of farming xp gained for this crop
     */
    const calculateAmountOfXP = (crop, numberOfHarvests) => {
        const totemModifier = $farmingTotem.checked ? 2 : 0;
        return (crop.experience + totemModifier) * numberOfHarvests;
    };

    /*
     * @param {Object} crop - The crop being currently evaluated
     * @param {Number} numberOfCropsHarvested - The amount of this crop that will have been harvested
     * @return {Number} - The total amount of currency acquired from selling this crop
     */
    const calculateGrossSales = (crop, numberOfCropsHarvested) => {
        const salesFromCrops = (numberOfCropsHarvested * crop.sellPrice);
        const salesFromTillersTip = currentRegion === 'sunHaven' ? (numberOfCropsHarvested * Number($tillerTipLevel.value)) : 0;
        return (salesFromCrops + salesFromTillersTip);
    };

    /*
     * @param {Object} crop - The crop being currently evaluated
     * @param {Number} numberOfHarvests - The amount of times this crop will be harvested
     * @param {Number} numberOfCrops - The amount of crops this calculator assumes will be planted
     * @return {Number} - The total cost spent on seeds for this crop
     */
    const calculateCostOfSeeds = (crop, numberOfHarvests, numberOfCrops) => {
        if(crop.regrows){
            return (crop.seedPrice * numberOfCrops);
        }
        return ((crop.seedPrice * numberOfCrops) * numberOfHarvests);
    }

    /*
     * The daily "return on investment" of each crop, distinct from profit, useful for when you're starting out
     * @param {Object} crop - The crop being currently evaluated
     * @param {Number} firstHarvest - The amount of days until the first harvest for this crop
     * @param {Number} numberOfGrowingDays - The amount of days this calculation will run for
     * @param {Number} leftoverDays - The amount of unused days this crop will not need
     * @param {Number} grossSales - The total amount of currency acquired from selling this crop
     * @param {Number} costOfSeeds - The total cost spent on seeds for this crop
     * @param {Number} totalProfit - The total amount of currency profited from the selling of this crop
     * @returns {Object} - The ROI and Daily ROI for this crop
     */
    const calculateROI = (crop, firstHarvest, numberOfGrowingDays, leftoverDays, grossSales, costOfSeeds, totalProfit) => {
        const roi =  ((grossSales / costOfSeeds) * 100) - 100;
        /*
         * only calculate daily ROI for the USED days of the calculators runtime. Otherwise, you could see a less
         * accurate daily ROI if there are unused days left for a specific crop
         */
        return {
            roi: roi,
            dailyROI: (totalProfit / (Number($amountOfDays.value) - leftoverDays)) / Number($amountOfCrops.value),
        };
    };

    /*
     * @param {Array} cropsList - The crops list after profit calculations have been performed
     * @param {String} sortingProperty - The attribute reference for the value to be displayed in this bar chart
     */
    const sortCropsListAndUpdateGrid = (cropsList, sortingProperty) => {
        cropsList.sort((aCrop, bCrop) => {
            const difference = bCrop[sortingProperty] - aCrop[sortingProperty];
            // if two crops have the same value, sort them alphabetically
            if(difference === 0){
                return aCrop.name.localeCompare(bCrop.name);
            }
            return difference;
        });
        updateTheGraph(cropsList, sortingProperty);
    };

    /*
     * Toggle the visibility of the graph and various other related labels and inputs
     * @param {Boolean} visible - the desired visibility of the graph and other inputs
     */
    const toggleGraphVisibility = (visible) => {
        $disclaimers.style.display = visible ? 'block' : 'none';
        $graphSortContainer.style.display = visible ? 'block' : 'none';
        $grid.style.display = visible ? 'inline-block' : 'none';
        $submitButton.textContent = visible ? 'Update Graph' : 'Generate Graph';
        // reset the grid to profits by default when hiding it by switching regions (currently the only way to hide it)
        currentGrid = visible ? currentGrid : 'totalProfit';
    };

    /*
     * When the crops region is changed hide the grid and remove/add various fields based on the region selected
     */
    $cropsRegion.onchange = () => {
        // set the region properly
        currentRegion = $cropsRegion.value;

        // hide the grid and related fields and labels
        toggleGraphVisibility(false);

        if(currentRegion === 'sunHaven'){
            // show sun haven-specific inputs
            $tillerTipInput.style.display = 'block';
            $ignoreInputs.style.display = 'block';
            $amountOfDaysMaxText.style.display = 'block';
            $amountOfDays.value = 0;
            $amountOfDays.max = 111;
        } else {
            // hide and clear sun haven-specific inputs
            $tillerTipInput.style.display = 'none';
            $ignoreInputs.style.display = 'none';
            $amountOfDaysMaxText.style.display = 'none';
            $tillerTipLevel.value = '0';
            $amountOfDays.value = 0;
            $amountOfDays.max = 999;
            $ignoreSeasons.checked = false;
            $ignoreGrapes.checked = false;
        }
    };

    /*
     * When the "Ignore Seasons" checkbox is checked, change the "amount of days" input's maximum
     */
    $ignoreSeasons.onchange = () => {
        $amountOfDays.value = 0;
        if($ignoreSeasons.checked) {
            $amountOfDaysMaxText.style.display = 'none';
            $amountOfDays.max = 999;
        } else {
            $amountOfDaysMaxText.style.display = 'block';
            $amountOfDays.max = 111;
        }
    };

    /*
     * When the "Update Graph" button is clicked
     */
    $submitButton.onclick = (event) => {
        if (!$configsForm.checkValidity()) {
            $configsForm.reportValidity()
        } else {
            event.preventDefault();

            // show the grid and related fields and labels
            toggleGraphVisibility(true);

            // iterate through each crop
            let cropsListAfterMath = JSON.parse(cropsMap[currentRegion].cropsJSON).map(crop => {
                const numberOfGrowingDays = $ignoreSeasons.checked ? Number($amountOfDays.value) : calculateNumberOfGrowingDays(crop);
                if (numberOfGrowingDays === 0){
                    return {
                        invalid: true,
                    };
                }
                const firstHarvest = calculateFirstHarvest(crop, numberOfGrowingDays);
                if (firstHarvest === 0) {
                    return {
                        invalid: true,
                    };
                }
                const { numberOfHarvests, leftoverDays } = calculateNumberOfHarvests(crop, firstHarvest, numberOfGrowingDays);
                const experience = calculateAmountOfXP(crop, numberOfHarvests);
                const numberOfCropsHarvested = calculateNumberOfCropsHarvested(crop, numberOfHarvests, Number($amountOfCrops.value));
                const grossSales = calculateGrossSales(crop, numberOfCropsHarvested);
                const costOfSeeds = calculateCostOfSeeds(crop,numberOfHarvests,Number($amountOfCrops.value));
                const totalProfit = grossSales - costOfSeeds;
                const { roi, dailyROI } = calculateROI(crop, firstHarvest, numberOfGrowingDays, leftoverDays, grossSales, costOfSeeds, totalProfit);
                return {
                    name: crop.name,
                    regrows: crop.regrows,
                    regrowRate: crop.regrowRate,
                    acquiredFrom: crop.acquiredFrom,
                    spring: crop.spring,
                    summer: crop.summer,
                    fall: crop.fall,
                    winter: crop.winter,
                    growingDays: numberOfGrowingDays,
                    firstHarvest,
                    harvests: numberOfHarvests,
                    experienceGained: experience,
                    numberOfCropsHarvested,
                    grossSales,
                    costOfSeeds,
                    leftoverDays,
                    roi,
                    dailyROI,
                    totalProfit,
                };
            });

            // if the user specifies, remove grapes. Will never run for nelvari or withergate regions
            if($ignoreGrapes.checked){
                cropsListAfterMath = cropsListAfterMath.filter(crop => crop.name !== 'Grape');
            }

            // remove any crops that are not supported in this month or will not get a single harvest
            cropsListAfterMath = cropsListAfterMath.filter(crop => crop.invalid !== true );

            sortCropsListAndUpdateGrid(cropsListAfterMath, currentGrid);

            $sortSelect.onchange = (event) => {
                event.preventDefault();
                currentGrid = $sortSelect.value;
                sortCropsListAndUpdateGrid(cropsListAfterMath, currentGrid);
            }
        }
    };
};