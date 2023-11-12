"use client";
import React, {useState, useEffect} from "react";
import { BsSliders2Vertical, BsChevronUp } from "react-icons/bs";
import axios from "axios"


type Props = {}

function Filter({}: Props) {
    const [showFilter, setShowFilter] = useState<boolean>(false)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedSize, setSelectedSize] = useState<string[]>([])
    const [allHexValues, setHexValues] = useState<string[]>([])
    const [selectedHexValues, setSelectedHexValues] = useState<string[]>([])
    const [price, setPrice] = useState ({
        min:0,
        max:100
    }) 

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.name ==="min" ? parseInt(e.target.value) : e.target.value;
        setPrice({
            ...price,
            [e.target.name]: value
        })
    }
    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.name ==="max" ? parseInt(e.target.value) : e.target.value;
        setPrice({
            ...price,
            [e.target.name]: value
        })
    }
    const toggleCategory = (category: string) => {
        setSelectedCategories((prevCategories) =>
            prevCategories.includes(category)
            ? prevCategories.filter((c) => c !== category):
            [...prevCategories, category]
        )
    }

    const togglesize = (size: string) => {
        setSelectedSize((prevSize) =>
            prevSize.includes(size)
            ? prevSize.filter((c) => c !== size):
            [...prevSize, size]
        )
    }

    const toggleColor = (color: string) => {
        setSelectedHexValues((prevColor) =>
            prevColor.includes(color)
            ? prevColor.filter((c) => c !== color):
            [...prevColor, color]
        )
    }

    const getAllColors = async () => {
        try{
            const response = await axios.get('/api/color');
            // console.log("Colors:", response.data);
            return response.data
        }
        catch(error){
            console.error("Error", error)
            return null
        }
    }

    useEffect(() => {
        getAllColors().then((allColors) => {
            if(allColors){
                const hexSet = new Set<string>()
                allColors.forEach((element:any) => {
                    const colors = element.color.split(',')
                    colors.forEach((color: string) => {
                        const hexValue = color.replace("#","")
                        hexSet.add(hexValue)
                    })
                })
                const uniqueHexValues: string[] = Array.from(hexSet)
                setHexValues(uniqueHexValues)
            }
        })
    }, [])

    const allHexValue = allHexValues
    return (
        <div className='relative'>
            <div className={`md:w-[250px] border-l-[0.5px] border-r-[0.5px] ${showFilter ? "max-md:w-[250px]":"w-0 max-md:invisible"}`}>
                <div className='flex items-center justify-between px-5 py-4 border-b-[0.5px]'>
                        <h1 className='text-neutral-800'>Filters</h1>
                        <BsSliders2Vertical size={20} className = 'text-neutral-600' />
                </div>
                <div className='flex flex-col py-3 pb-5 tet-sm text-neutral-600 border-b-[0.5px]'>
                    <span
                        className={`py-3 px-5 ${selectedCategories.includes('Blouses') ? "bg-purple-50":""}`}
                        onClick={() => toggleCategory('Blouses')}
                    >
                        Blouses
                    </span>
                    <span
                        className={`py-3 px-5 ${selectedCategories.includes('Shirt') ? "bg-purple-50":""}`}
                        onClick={() => toggleCategory('Shirt')}
                    >
                        Shirt
                    </span>
                    <span 
                    className={`py-3 px-5 ${selectedCategories.includes('Denim&Jeans') ? 'bg-purple-50' : ''}`}
                    onClick={() => toggleCategory('Denim&Jeans')}
                    >
                        Denim&Jeans
                    </span>
                    <span 
                        className={`py-3 px-5 ${selectedCategories.includes('Party') ? 'bg-purple-50' : ''}`}
                        onClick={() => toggleCategory('Party')}
                    >
                    Party
                    </span>
                    <span 
                        className={`py-3 px-5 ${selectedCategories.includes('Pants') ? 'bg-purple-50' : ''}`}
                        onClick={() => toggleCategory('Pants')}
                    >
                        Pants
                    </span>
                    <span 
                        className={`py-3 px-5 ${selectedCategories.includes('Skirts') ? 'bg-purple-50' : ''}`}
                        onClick={() => toggleCategory('Skirts')}
                    >
                        Skirts
                    </span>
                    <span 
                        className={`py-3 px-5 ${selectedCategories.includes('Tops&tees') ? 'bg-purple-50' : ''}`}
                        onClick={() => toggleCategory('Tops&tees')}
                    >
                        Tops&tees
                    </span>
                    <span 
                        className={`py-3 px-5 ${selectedCategories.includes('Jackets&Coats') ? 'bg-purple-50' : ''}`}
                        onClick={() => toggleCategory('Jackets&Coats')}
                    >
                        Jackets&Coats
                    </span>
                </div>
            </div>
        </div>
    )
}


export default Filter