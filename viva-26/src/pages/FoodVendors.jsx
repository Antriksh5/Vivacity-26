import React from 'react';
import '../styles/PastArtist.css';
import { PastArtist, EventLanding } from '../utils/cloudinaryUrls';
import VendorStamp from '../components/VendorStamp';

const FoodVendors = () => {
    const vendors = [
        // {
        //     id: 1,
        //     name: "BEEPOPS",
        //     description: "Fuel your festival vibes with nutritious and delicious PROTEIN BARs.",
        //     websiteUrl: "#",
        //     color1: '#D91472',
        //     color2: '#FBC43F',
        // },
        // {
        //     id: 2,
        //     name: "BELGIAN WAFFLE",
        //     description: "Indulge in classic, crispy WAFFLEs with premium toppings.",
        //     websiteUrl: "#",
        //     color1: '#F75D02',
        //     color2: '#FBC43F',
        // },
        // {
        //     id: 3,
        //     name: "BEVERAGES BY FRYGUY",
        //     description: "Refresh yourself with cool MOCKTAILS & SHAKES.",
        //     websiteUrl: "#",
        //     color1: '#00CA91',
        //     color2: '#FBC43F',
        // },
        // {
        //     id: 4,
        //     name: "BLONDIES",
        //     description: "CHEESECAKE, STRAWBERRY CHOCOLATE, BLONDIES, CHOCOLATE TRUFFLE CAKE.",
        //     websiteUrl: "#",
        //     color1: '#D91472',
        //     color2: '#FBC43F',
        // },
        {
            id: 5,
            name: "BUTTER BEANS",
            description: "The perfect combination of BROWNIE+COOKIES.",
            websiteUrl: "https://build-elv2j5xf.tediux.com",
            color1: '#F75D02',
            color2: '#FBC43F',
        },
        // {
        //     id: 6,
        //     name: "CHAAT KA CHASKA",
        //     description: "Enjoy the explosion of tangy and spicy flavors with authentic Chaat.",
        //     websiteUrl: "#",
        //     color1: '#00CA91',
        //     color2: '#FBC43F',
        // },
        // {
        //     id: 7,
        //     name: "CRISPY CHICKEN CO.",
        //     description: "Crunchy, juicy, and irresistible NON VEG STARTERS.",
        //     websiteUrl: "#",
        //     color1: '#D91472',
        //     color2: '#FBC43F',
        // },
        // {
        //     id: 8,
        //     name: "FRIEND CHIPS",
        //     description: "Perfectly Fried Chips, the ultimate snack companion.",
        //     websiteUrl: "#",
        //     color1: '#F75D02',
        //     color2: '#FBC43F',
        // },
        // {
        //     id: 9,
        //     name: "HOME PIZZA",
        //     description: "Comfort food at its best with PIZZA AND NACHOS.",
        //     websiteUrl: "#",
        //     color1: '#00CA91',
        //     color2: '#FBC43F',
        // },
        // {
        //     id: 10,
        //     name: "ICE CREAM MEWAR",
        //     description: "Cool down with rich, creamy, and delightful Ice Cream.",
        //     websiteUrl: "#",
        //     color1: '#D91472',
        //     color2: '#FBC43F',
        // },
        // {
        //     id: 11,
        //     name: "ICHIRAKU RAMEN",
        //     description: "Slurp your way to happiness with warm, authentic RAMEN bowls.",
        //     websiteUrl: "#",
        //     color1: '#F75D02',
        //     color2: '#FBC43F',
        // },
        // {
        //     id: 12,
        //     name: "KAFIEN",
        //     description: "COFEEE MAGGI PASTRY AND CROSSIANT for your cravings.",
        //     websiteUrl: "#",
        //     color1: '#00CA91',
        //     color2: '#FBC43F',
        // },
        // {
        //     id: 13,
        //     name: "LOVE MOMOS",
        //     description: "Steaming hot CHINESE AND MOMOS delights.",
        //     websiteUrl: "#",
        //     color1: '#D91472',
        //     color2: '#FBC43F',
        // },
        {
            id: 14,
            name: "MAINSTREET CHURROS",
            description: "Sweet crunchy churros paired with BOBA TEA + SOFT TOY.",
            websiteUrl: "#",
            color1: '#F75D02',
            color2: '#FBC43F',
        },
        // {
        //     id: 15,
        //     name: "PANDAR PURI",
        //     description: "Classic tea-time favorites: chai, maska bun, sandwich.",
        //     websiteUrl: "#",
        //     color1: '#00CA91',
        //     color2: '#FBC43F',
        // },
        // {
        //     id: 16,
        //     name: "SALAD NATION",
        //     description: "Healthy yet tasty Salad Sliders Rice Bowls.",
        //     websiteUrl: "#",
        //     color1: '#D91472',
        //     color2: '#FBC43F',
        // },
        // {
        //     id: 17,
        //     name: "SHAWARMA TIMES",
        //     description: "Savor the taste of perfectly roasted SHAWARMA.",
        //     websiteUrl: "#",
        //     color1: '#F75D02',
        //     color2: '#FBC43F',
        // },
        // {
        //     id: 18,
        //     name: "TEEKHA GAON",
        //     description: "Authentic, spicy, and satisfying NON VEG MAIN COURSE.",
        //     websiteUrl: "#",
        //     color1: '#00CA91',
        //     color2: '#FBC43F',
        // },
    ];



    return (
        <div
            className="w-full min-h-screen overflow-y-auto overflow-x-hidden relative"
        >
            {/* Fixed Background Image */}
            <div className="fixed inset-0 z-0">
                <img
                    src={EventLanding.Background}
                    alt="Background"
                    className="w-full h-full object-cover"
                />
            </div>


            {/* Content Container */}
            <div className="relative z-10 flex flex-col w-full min-h-screen pt-5 pb-20 px-4">

                {/* Page Title */}
                <div className="w-full flex justify-center mb-12 shrink-0">
                    <h1
                        className="rumble-brave text-5xl sm:text-6xl md:text-8xl text-center tracking-wider"
                        style={{
                            color: '#FFAB00',
                            textShadow: '3px 3px 0px #000000'
                        }}
                    >
                        FOOD STALLS
                    </h1>
                </div>

                {/* Vendors Grid - Max 3 cols per row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto w-full pb-10 px-4">
                    {vendors.map((vendor) => (
                        <div key={vendor.id} className="transform hover:scale-105 transition-transform duration-300">
                            {/* Passing transparent as background since we use CSS masks */}
                            <VendorStamp {...vendor} backgroundColor="transparent" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FoodVendors;
