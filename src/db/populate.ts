import mongoose from "mongoose";
import connectDb from "./connect";

import Instrument, { InstrumentI } from "../models/Instrument";
import Brand, { IBrand } from "../models/Brand";
import Category, { ICategory } from "../models/Category";
import Accessory, { AccessoryI } from "../models/Accessory";

const brands: IBrand[] = [];
const categories: ICategory[] = [];
const instruments: InstrumentI[] = [];
const accessories: AccessoryI[] = [];

async function populate() {
  console.log("Debug: About to connect");
  await connectDb();
  console.log("Debug: Should be connected?");
  await createBrands();
  await createCategories();
  await createInstruments();
  await createAccessories();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function brandCreate(i: number, obj: IBrand) {
  let brandDetail: IBrand = { name: obj.name };
  if (obj.logo) {
    brandDetail.logo = obj.logo;
  }
  const brand = new Brand(brandDetail);
  await brand.save();
  brands[i] = brand;
  console.log(`Added brand: ${obj.name}`);
}

async function categoryCreate(i: number, obj: ICategory) {
  const category = new Category({
    name: obj.name,
    description: obj.description,
    cover_img: obj.cover_img,
  });
  await category.save();
  categories[i] = category;
  console.log(`Added category: ${obj.name}`);
}

async function instrumentCreate(i: number, obj: InstrumentI) {
  const instrumentDetail: InstrumentI = {
    name: obj.name,
    img: obj.img,
    category: obj.category,
    price: obj.price,
    stock: obj.stock,
  };

  if (obj.description) {
    instrumentDetail.description = obj.description;
  }
  if (obj.brand) {
    instrumentDetail.brand = obj.brand;
  }
  if (obj.features) {
    instrumentDetail.features = obj.features;
  }

  const instrument = new Instrument(instrumentDetail);
  await instrument.save();

  instruments[i] = instrument;
  console.log(`Added instrument: ${obj.name}`);
}

async function accessoryCreate(i: number, obj: AccessoryI) {
  const accessoryDetail: AccessoryI = {
    name: obj.name,
    img: obj.img,
    price: obj.price,
    stock: obj.stock,
  };

  if (obj.description) {
    accessoryDetail.description = obj.description;
  }
  if (obj.related_instruments) {
    accessoryDetail.related_instruments = obj.related_instruments;
  }
  if (obj.brand) {
    accessoryDetail.brand = obj.brand;
  }
  if (obj.features) {
    accessoryDetail.features = obj.features;
  }

  const accessory = new Accessory(accessoryDetail);
  await accessory.save();

  accessories[i] = accessory;
  console.log(`Added accessory: ${obj.name}`);
}

async function createBrands() {
  console.log("Adding brands");
  await Promise.all([
    brandCreate(0, {
      name: "Premier",
      logo: "https://www.premier-percussion.com/wp-content/uploads/2022/07/PREMIER.png",
    }),
    brandCreate(1, {
      name: "Yahama",
      logo: "https://www.yamaha.com/_common2/images/logo_yamaha_waves.svg",
    }),
    brandCreate(2, {
      name: "Fender",
    }),
    brandCreate(3, {
      name: "Roland",
    }),
    brandCreate(4, {
      name: "Selmer",
      logo: "https://www.selmer.fr/cdn/shop/files/LOGO.svg?v=1677681864&width=166",
    }),
  ]);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, {
      name: "string",
      description:
        "These set of musical instruments produces sound through vibration of stretched strings. Some of the most common string instruments include: Guitar, Violin, Cello and Harp.",
      cover_img:
        "https://images.unsplash.com/photo-1605020420620-20c943cc4669?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }),
    categoryCreate(1, {
      name: "wind",
      description:
        "These instruments produce sound when air is blown through them. Some of the most common wind instruments include: Flute, Clarinet, Saxophone and Trumpet.",
      cover_img:
        "https://images.pexels.com/photos/45243/saxophone-music-gold-gloss-45243.jpeg?auto=compress&cs=tinysrgb&w=600",
    }),
    categoryCreate(2, {
      name: "percussion",
      description:
        "These instruments produce sound when they are struck. Some of the most common percussion instruments include: Drums, Cymbals, Tambourine and Piano.",
      cover_img:
        "https://images.pexels.com/photos/1327430/pexels-photo-1327430.jpeg?auto=compress&cs=tinysrgb&w=600",
    }),
  ]);
}

async function createInstruments() {
  console.log("Adding instruments");
  await Promise.all([
    instrumentCreate(0, {
      name: "Grace VanderWaal Moonlight Ukulele",
      description: `Inspired by the soprano ukulele that accompanied Grace VanderWaal as she learned to play, the Grace VanderWaal Moonlight Soprano Ukulele is a marvelous introduction to this easy-to-play instrument. With its comfortable smaller body, enticing sound and stage-ready features, the Grace VanderWaal Moonlight Soprano Ukulele is the perfect partner for her music. Reflecting Grace's "Boho Chic" style, this ukulele features an elegant, stylish Navy Blue satin finish, gold sparkle rosette, gold hardware, custom floral soundhole label inspired by the album art from her debut release, Just The Beginning, and Grace's distinctive heart signature adorning the back of the headstock.`,
      img: [
        "https://www.fmicassets.com/Damroot/LgJpg/10001/0971610102_gtr_frtangle_001_rr.jpg",
      ],
      category: categories[0],
      brand: brands[2],
      price: 50,
      stock: 2,
    }),
    instrumentCreate(2, {
      name: "Drum Kit: TD-50KV2 V-Drums",
      description: `The flagship TD-50KV2 represents the pinnacle of V-Drums innovation, delivering the most complete electronic drumming experience available anywhere. Large, top-of-the-line pads and cymbals are featured throughout, including groundbreaking digital snare, ride, and hi-hat pads that bring ultra-detailed playability to the three most nuanced pieces in the kit. The next-generation TD-50X module provides unmatched tone, feel, and response, coupled with deep editing tools to fully personalize your sound and pro connectivity to take on any playing situation. If you’re looking for the ultimate in V-Drums performance, look no further than the TD-50KV2.`,
      img: [
        "https://static.roland.com/products/td-50kv2/images/td-50kv2_main.jpg",
      ],
      category: categories[2],
      brand: brands[3],
      price: 1000,
      stock: 1,
    }),
    instrumentCreate(3, {
      name: "Piano",
      img: [
        "https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg?auto=compress&cs=tinysrgb&w=600",
      ],
      category: categories[2],
      brand: brands[1],
      price: 200,
      stock: 10,
    }),
    instrumentCreate(4, {
      name: "Clarinet",
      img: [
        "https://images.unsplash.com/photo-1569791832138-fbdd9a500384?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xhcmluZXR8ZW58MHx8MHx8fDA%3D",
      ],
      category: categories[1],
      brand: brands[4],
      price: 400,
      stock: 16,
    }),
  ]);
}

async function createAccessories() {
  console.log("Adding accessories");
  await Promise.all([
    accessoryCreate(0, {
      name: "Music Stand",
      description:
        "A stand that holds your sheet music in place so you can read it easily while you play.",
      img: [
        "https://images.unsplash.com/photo-1613142659418-718b2ae6940d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjBzdGFuZHxlbnwwfHwwfHx8MA%3D%3D",
      ],
      price: 10,
      stock: 50,
      related_instruments: [instruments[3], instruments[4]],
    }),
    accessoryCreate(0, {
      name: "Reeds",
      description:
        "Thin pieces of cane or synthetic material that vibrate to produce sound in a single-reed instrument. Reeds need to be replaced regularly as they become worn.",
      img: [
        "https://media.istockphoto.com/id/1310484587/photo/saxophone-or-clarinet-mouthpiece-with-replacement-reeds-and-gold-clamp.webp?b=1&s=170667a&w=0&k=20&c=6dLQDV_w9STdI-Rx2PQuIuyeTfx8o03TfVxgYhuXZ1E=",
      ],
      related_instruments: [instruments[4]],
      price: 10,
      stock: 100,
    }),
  ]);
}

export default populate;
