// useDynamicImage.ts

import { useMemo } from 'react';
import ageIcon from '../assets/icons/age.png';
import sexIcon from '../assets/icons/sex.png';
import commentIcon from '../assets/icons/comment.png';
import cardIcon from '../assets/icons/card.png';
import cutleryIcon from '../assets/icons/cutlery.png';
import user from '../assets/icons/user.png';
import wallet from '../assets/icons/wallet.png';
import smartphone from '../assets/icons/smartphone.png';
import shoppingCartIcon from '../assets/icons/shoppingCart.png';
import lock from '../assets/icons/lock.png';
import count from '../assets/icons/count.png';
import rupee from '../assets/icons/rupee.png';
import percentage from '../assets/icons/percentage.png';
import call from '../assets/icons/call.png';
import calendar from '../assets/icons/calendar.png';
import barcode from '../assets/icons/barcode.png';
import packageIcon from '../assets/icons/package.png';



// Define a type for the images object
export type Images = {
    [key: string]: any; // You can replace `any` with the specific type of your image component
};

// Create a mapping of image names to their corresponding images
const Iimages: Images = {
    age: ageIcon,
    sex: sexIcon,
    comment: commentIcon,
    card: cardIcon,
    cutlery: cutleryIcon,
    shoppingCart: shoppingCartIcon,
    smartphone: smartphone,
    wallet: wallet,
    user: user,
    lock: lock,
    count: count,
    call: call,
    rupee: rupee,
    calendar: calendar,
    percentage: percentage,
    barcode: barcode,
    package: packageIcon,
    wrench: require('../assets/icons/wrench.png'),
};

// Accept the images object as a parameter
const useDynamicImage = (imageName: string) => {
    if (imageName) {
        const image = useMemo(() => Iimages[imageName] || null, [imageName]);
        return image;
    }
    else return null;

};

export { useDynamicImage, Iimages };
