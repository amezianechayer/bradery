"use client"
import React, {useState} from "react";
import { AiOutlineHeart } from "react-icons/ai";
type Props = {
    imageUrls:string
}


const ImageGallery = ({imageUrls}: Props) => {
    const [selectedImage, setSelectedImage] = useState<number>(0)
    const urlArray = imageUrls.split(',')
    return (
        <div className="images grid grid-cols-7">
            <div className="all-images flex flexx-col col-span-2 justify-center">
                {urlArray.map((url,index) => (
                    <div key={index} className="image relative roounded-lg">
                        <img onClick={() => setSelectedImage(index)} className={`w-[70px] h-[70px] rounded-lg mb-3 p-1 object-cover object-top ${selectedImage === index ? "border-[1px] border-purple-500":"border-[1px] border-purple-200"}`} src={url} alt={`image ${index + 1}`}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ImageGallery