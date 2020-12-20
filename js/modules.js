/**
 * Create bundle using:
 * `rollup index.js --file bundle.js --format iife`
 * or (with rollup.config.js): `rollup --config`
 * or (now with npm): npm run build
 */
import { MatchboxCar } from './../classes/MatchboxCar.js'
import { DinkyCar } from './../classes/DinkyCar.js'


const javalin = new MatchboxCar(
    'Matchbox',
    '0',
    'AMX Javalin',
    'MB9',
    'Superfast 1-75',
    1972,
    'England',
    'Matchbox Superfast No 9 AMX Javelin WHITE Interior MIB RARE. Model Condition: Original and Mint, Box Condition: Original and Near Mint, label on one striker side of box. No missing end or tuck in flaps.',
    []
)
javalin.add_image('https://dummyimage.com/378x370')
javalin.add_image('https://dummyimage.com/378x385')
javalin.add_image('https://dummyimage.com/378')
javalin.display('collection')

const FordGroup6 = new MatchboxCar(
    'Matchbox',
    '1',
    'Ford Group 6',
    'MB45',
    'Superfast 1-75',
    1972,
    'England',
    'Matchbox Superfast no MB 45 a Ford Group 6 in Metallic Magenta Gloss black Painted Base Light Amber Tinted windows Ivory Interior 5 Spoke Wheels',
    ['https://dummyimage.com/211x209', 'https://dummyimage.com/211', 'https://dummyimage.com/211x218']
).display('collection')

const FordGT = new MatchboxCar(
    'Matchbox',
    '2',
    'Ford G.T.',
    'MB41',
    'Superfast 1-75',
    1972,
    'England',
    '1970s. Matchbox Superfast. 41 Ford GT 40 Bronze with Black base F1.Indy.Mint in box.original. Original box is complete with all flaps.',
    []
)
FordGT.add_image('https://dummyimage.com/347')
FordGT.add_image('https://dummyimage.com/347x337')
FordGT.add_image('https://dummyimage.com/347x355')
FordGT.display('collection')

const MerryweatherMarquisFireEngine = new MatchboxCar(
    'Matchbox',
    '3',
    'Merryweather Marquis Fire Engine',
    'MB35',
    'Superfast 1-75',
    1972,
    'England',
    'One of the lights on the top side of the truck is slightly pushed down. The labels are slightly torn and one of the front wheels is slightly bent.',
    []
)
MerryweatherMarquisFireEngine.add_image('https://dummyimage.com/435x425')
MerryweatherMarquisFireEngine.add_image('https://dummyimage.com/435x437')
MerryweatherMarquisFireEngine.add_image('https://dummyimage.com/435')
MerryweatherMarquisFireEngine.display('collection')

const LotusEuropa = new MatchboxCar(
    'Matchbox',
    '4',
    'Lotus Europa',
    'MB5',
    'Superfast',
    1974,
    'England',
    'Matchbox Lesney Superfast MB 5 Lotus Europa - RARE JPS ISSUE. Condition is "Used".',
    []
)
LotusEuropa.add_image('https://dummyimage.com/316x309')
LotusEuropa.add_image('https://dummyimage.com/316')
LotusEuropa.add_image('https://dummyimage.com/316x317')
LotusEuropa.display('collection')

const ChevroletCorvette = new MatchboxCar(
    'Matchbox',
    '5',
    'Chevrolet Corvette',
    'MB62',
    'Superfast 1-75',
    1979,
    'MACAU',
    'MATCHBOX No.62 CHEVROLET CORVETTE YELLOW/PURPLE',
    []
)
ChevroletCorvette.add_image('https://dummyimage.com/232x212')
ChevroletCorvette.add_image('https://dummyimage.com/316')
ChevroletCorvette.add_image('https://dummyimage.com/316x317')
ChevroletCorvette.display('collection')

const rileySaloon = new DinkyCar(
    'Dinky',
    '6',
    'Riley Saloon',
    '40a',
    '',
    '',
    1947,
    'England',
    'Green body with green ridged hubs, "First Version" which has the tin-plate base with the axles held by cast pillars at the rear and integral castings at the front.',
    ['https://dummyimage.com/388x380', 'https://dummyimage.com/388x395', 'https://dummyimage.com/388']
).display('collection')

const foden8WheelWagon = new DinkyCar(
    'Dinky',
    '7',
    'Foden 8 Wheel Wagon',
    '501',
    '901',
    '',
    1947,
    'England',
    'This is a very scarce early issue dark grey 1st cab Foden Wagon with a red chassis and red ridged wheels and cab side flashes. This was the last colour run for this first phase of production for 1st cab wagons and would usually have no mount block for a rear tow hook and no tank slots which were both not introduced until October 1948. However a few examples at the end of this first production phase received the mount block and a small unpainted hook and this is why this model is particularly scarce. It also helps to confirm some of the known date changes of the parts. It continues to have no casting support for the chain posts underneath as this was not introduced until January 1952. There is a spare tyre mounted to the chassis by a correct silver nut and bolt. Please note that a black nut and bolt were not issued for any 1st cab model. Finally as an early release it has the black herringbone original tyres which are now hardened but have no flats and a full "20mph" transfer on the rear left wheel arch.',
    ['https://dummyimage.com/368x360', 'https://dummyimage.com/368x375', 'https://dummyimage.com/368']
).display('collection')
