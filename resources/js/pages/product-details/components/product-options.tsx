import { ProductItem } from '@/types/product'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function ProductOptions({ product , selectedAttributes ,setSelectedAttributes,setSelectedVariant,selectedVariant,errors,setErrors}: any) {
   
    const handleSelectAttribute = (attributeId: number, valueId: number) => {
        const updated = {
            ...selectedAttributes,
            [attributeId]: valueId,
        }
        setSelectedAttributes(updated)
        setErrors((updated:any)=> updated.filter((id:any) => id !== attributeId))

    }

    useEffect(() => {
        findVariant(selectedAttributes)
    }, [selectedAttributes])

    const findVariant = (selected: any) => {
        if (Object.keys(selected).length !== product.attributes.length) {
            setSelectedVariant(null)
            return
        }
        const variant = product?.variants?.find((variant:any) => {
            return variant.attribute_values.every((value:any) => {
                return selectedAttributes[value.attribute_id] === value.id
            })
        })
        setSelectedVariant(variant ?? null)
    }

    return (
        <div>
            
            {product?.attributes?.map((attr: any) => (
                <div key={attr.id} className='mb-3'>
                    <h5 className={`text-bold text-xs mb-2 ${errors.some((error:any) => error.id === attr.id) ? 'text-red-600':''} `}>{attr.name_en}</h5>
                    <div className='flex gap-4'>
                        {attr.values.map((value: any) => {
                            const isSelected = selectedAttributes[attr.id] === value.id;
                            return (
                                <button
                                    onClick={() => handleSelectAttribute(attr.id, value.id)}
                                    className={`p-2 border w-18 hover:pointer ${isSelected ? 'bg-primary text-white' : ' bg-gray-100'}`}>{value.value}</button>
                            )
                        })}
                    </div>

                    {/* {errors} */}
                </div>
            ))}
           
        </div>
    )
}
