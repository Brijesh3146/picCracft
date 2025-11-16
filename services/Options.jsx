
import { Home, Folder,  LayoutDashboard, WalletCards, LayoutTemplate, ShapesIcon, Image, Type, Sparkle, Settings, Component, Palette, Square, Minus, Blend, SquareRoundCorner, Trash, BookType } from "lucide-react";
import BackgroundSetting from "./Components/BackgroundSetting";
import AddImageSetting from "./Components/AddImageSetting";
import Elements from "./Components/Elements";
import FillColor from "./Sharable/FillColor";
import BorderColor from "./Sharable/BorderColor";
import BorderRadius from "./Sharable/BorderRadius";
import BorderWidth from "./Sharable/BorderWidth";
import Opacity from "./Sharable/Opacity";
import AITransformationSetting from "./Components/AITransformationSetting";
import TextSettings from "./Components/TextSettings";
import FontFamily from "./Sharable/FontFamily";
import TemplatesList from "./Components/TemplatesList";

export const WorkspaceMenu=[
     {
        name:'Home',
        icon:Home,
        path:'/workspace'
     },
     {
        name:'Projects',
        icon:Folder,
        path:'/workspace/projects'
     },
     {
        name:'Templates',
        icon:LayoutDashboard,
        path:'/workspace/templates'
     },
     {
        name:'Billing',
        icon:WalletCards,
        path:'/workspace/billing'
     },
]

export const canvasSizeOptions=[
    {
        name:'Instagram Post',
        width:500,
        height:500,
        icon:'/insta.png'
    },
    {
        name:'Instagram Story',
        width:1080,
        height:1600,
        icon:'/insta.png'
    },
    {
        name:'YouTube Thumbnail',
        width:1280,
        height:720,
        icon:'/youtube.png'
    },
    {
        name:'YouTube Banner',
        width:1600,
        height:900,
        icon:'/youtube.png'
    },
    {
        name:'YouTube Post',
        width:1200,
        height:1200,
        icon:'/youtube.png'
    },
     {
        name:'PowerPoint Slide',
        width:1920,
        height:1080,
        icon:'/ppt.png'
    },
    {
        name:'Facebook Post',
        width:1200,
        height:630,
        icon:'/facebook.png'
    },
    {
        name:'Twitter Post',
        width:1600,
        height:900,
        icon:'/twit.png'
    },
     {
        name:'LinkedIn Post',
        width:1200,
        height:627,
        icon:'/linkedin.png'
    },
     {
        name:'pinterest Pins',
        width:1000,
        height:1500,
        icon:'/pintrest.png'
    },
];

export const sideBarMenu = [
    {
        name:'Templates',
        desc:'Select Prebuild Templates',
        icon:LayoutTemplate,
        component:<TemplatesList/>
    },
    {
        name:'Elements',
        desc:'Select Shapes and Stickers',
        icon:ShapesIcon,
        component:<Elements/>
    },
    {
        name:'Images',
        desc:'Add Image or Upload your own',
        icon: Image,
        component:<AddImageSetting/>
    },
    {
        name:'Text',
        desc:'Add Text and Headings',
        icon:Type,
        component:<TextSettings/>
    },
    {
        name:'AI',
        desc:'More AI features to enhance your design',
        icon:Sparkle,
        component:<AITransformationSetting/>
    },
    {
        name:'Background',
        desc:'Change Canvas Background',
        icon:Component,
        component:<BackgroundSetting/>
    },
    {
        name:'Settings',
        desc:'Update Canvas Size and background',
        icon:Settings
    },
]

export const ShapeList = [
    {
        name:'Circle',
        icon:'/circle.png'
    },
    {
        name:'Square',
        icon:'/square.png'
    },
    {
        name:'Tringle',
        icon:'/tringle.png'
    },
    {
        name:'Line',
        icon:'/line.png'
    },

]

export const shapesSettingList = [
    {
        name:'Fill',
        icon:Palette,
        component:<FillColor/>
    },
    {
        name:'Stroke Color',
        icon:Square,
        component:<BorderColor/>
    },
    {
        name:'Stroke Width',
        icon:Minus,
        component:<BorderWidth/>
    },
    {
        name:'Opacity',
        icon:Blend,
        component:<Opacity/>
    },
    {
        name:'Rounded Corner',
        icon:SquareRoundCorner,
        component:<BorderRadius/>
    },
   
]

export const AITransformationSettings = [
    {
        name:'Background Remove',
        command:'e-bgremove',
        image:'/backgroundRemove.jpg'
    },
    {
        name:'Change Background',
        command:'e-changebg-prompt-snow',
        image:'/changeBackground.jpg'
    },
    {
        name:'Generative Fill',
        command:'e-genfill,w-1000,h-960,cm-pad_resize',
        image:'/genrativeFill.jpg'
    },
    {
        name:'AI Drop Shadow',
        command:'e-dropshadow',
        image:'/dropShadow.jpg'
    },
    {
        name:'UpScale',
        command:'e-upscale',
        image:'/upscale.jpg'
    },
    {
        name:'Smart Crop',
        command:'fo-auto',
        image:'/crop.jpg'
    },
    {
        name:'Contrast',
        command:'e-contrast',
        image:'/contrast.jpg'
    },
    {
        name:'GrayScale',
        command:'e-grayscale',
        image:'/grayscale.jpg'
    },
    {
        name:'Blur',
        command:'e-blur',
        image:'/blur.jpg'
    },
    {
        name:'Flip',
        command:'e-flip',
        image:'/flip.jpg'
    },
]

export const TextSettingsList = [
    {
        name:'Fill',
        icon:Palette,
        component:<FillColor/>
    },
    {
        name:'Stroke Color',
        icon:Square,
        component:<BorderColor/>
    },
    {
        name:'Stroke Width',
        icon:Minus,
        component:<BorderWidth/>
    },
    {
        name:'Font',
        icon:BookType,
        component:<FontFamily/>
    },
]

export const FontFamilyList = [
    "Arial",
    "Arial Black",
    "Verdana",
    "Helvetica",
    "Tahoma",
    "Trebuchet MS",
    "Times New Roman",
    "Georgia",
    "Garamond",
    "Courier New",
    "Brush Script MT",
    "Palatino",
    "Bookman",
    "Comic Sans Ms",
    "Impact",
    "Lucida Sans Unicode",
    "Geneva",
    "Lucida Console",
]

export const StickerList = [
    'https://cdn-icons-png.flaticon.com/256/5968/5968764.png',
    'https://cdn-icons-png.flaticon.com/256/428/428094.png',
    'https://cdn-icons-png.flaticon.com/256/2111/2111463.png',
    'https://cdn-icons-png.flaticon.com/256/1384/1384060.png',
    'https://cdn-icons-png.flaticon.com/256/733/733585.png',
    'https://cdn-icons-png.flaticon.com/256/2111/2111646.png',
    'https://cdn-icons-png.flaticon.com/256/4494/4494477.png',
    'https://cdn-icons-png.flaticon.com/256/281/281764.png',
    'https://cdn-icons-png.flaticon.com/256/1409/1409941.png',
    'https://cdn-icons-png.flaticon.com/256/10851/10851235.png',
    'https://cdn-icons-png.flaticon.com/256/520/520460.png',
    'https://cdn-icons-png.flaticon.com/256/1791/1791311.png',
    'https://cdn-icons-png.flaticon.com/256/1791/1791320.png',
    'https://cdn-icons-png.flaticon.com/256/1791/1791292.png',
    'https://cdn-icons-png.flaticon.com/256/1791/1791355.png',
    'https://cdn-icons-png.flaticon.com/256/1791/1791307.png',
    'https://cdn-icons-png.flaticon.com/256/7996/7996409.png',
    'https://cdn-icons-png.flaticon.com/256/8760/8760748.png',
    'https://cdn-icons-png.flaticon.com/256/5171/5171530.png',
    'https://cdn-icons-png.flaticon.com/256/5175/5175169.png',,
    'https://cdn-icons-png.flaticon.com/256/7096/7096435.png',
    'https://cdn-icons-png.flaticon.com/256/346/346167.png',
    'https://cdn-icons-png.flaticon.com/256/1776/1776968.png',
    'https://cdn-icons-png.flaticon.com/256/1497/1497177.png',
    'https://cdn-icons-png.flaticon.com/256/2517/2517029.png',
    'https://cdn-icons-png.flaticon.com/256/2276/2276906.png',
    'https://cdn-icons-png.flaticon.com/256/6604/6604292.png',
    'https://cdn-icons-png.flaticon.com/256/6010/6010131.png',
    'https://cdn-icons-png.flaticon.com/256/11167/11167978.png',
    'https://cdn-icons-png.flaticon.com/256/11145/11145432.png',
    'https://cdn-icons-png.flaticon.com/256/7645/7645528.png',
    'https://cdn-icons-png.flaticon.com/256/16116/16116383.png',
    'https://cdn-icons-png.flaticon.com/256/639/639373.png',
   
]
