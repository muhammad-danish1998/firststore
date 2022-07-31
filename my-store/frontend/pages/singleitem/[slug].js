
import React, { useEffect, useState } from 'react'
import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/solid'
import { HeartIcon, MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
let domain = 'http://localhost:1337'

const product = {
    name: 'Zip Tote Basket',
    price: '$140',
    rating: 4,
    images: [
        {
            id: 1,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
        },
        // More images...
    ],
    colors: [
        { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
        { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
        { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
    ],
    description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
    details: [
        {
            name: 'Features',
            items: [
                'Multiple strap configurations',
                'Spacious interior with top zip',
                'Leather handle and tabs',
                'Interior dividers',
                'Stainless strap loops',
                'Double stitched construction',
                'Water-resistant',
            ],
        },
        // More sections...
    ],
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Slug({product2, addToCart}) {

    const router = useRouter()
    const { slug } = router.query
    console.log("slllllllllll", slug);
    const [productData, setProductData] = useState([]);
    const getData = async () => {
        if (slug) {
            let res = await fetch(`http://localhost:1337/api/products?filters[slug]=${slug}&populate=*`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer b7ba811a27473392d005c09418df33edf9f09b21ab621eacdb3238f81cd1214279ce6bf0cc8c16a8e1a1c6c99650525c8e28f5a9e717d49ffe5b59f9c129a443430fbc36e9a790e23815dceed27e9e04575d5044eeb190fac3014f7e653f83902134200e187321e9e9e1283b9c702db1a2161a22902e66f3ec079db7e234a3d2',
                }
            });
            let products = await res.json();
            setProductData(products.data[0]?.attributes)
            console.log("product data ==========>", products.data);
        }

    }

    useEffect(() => {
        getData();
    }, [slug])


    const [selectedColor, setSelectedColor] = useState(product.colors[0])

    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                    {/* Image gallery */}
                    <Tab.Group as="div" className="flex flex-col-reverse">
                        {/* Image selector */}
                        <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                            <Tab.List className="grid grid-cols-4 gap-6">
                               
                                    <Tab
                                        
                                        className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                                    >
                                        {({ selected }) => (
                                            <>
                                                {/* <span className="sr-only">{image.name}</span> */}
                                                <span className="absolute inset-0 rounded-md overflow-hidden">
                                                    <img src={productData.image && domain + productData?.image.data.attributes.url} alt="" className="w-full h-full object-center object-cover" />
                                                </span>
                                                <span
                                                    className={classNames(
                                                        selected ? 'ring-indigo-500' : 'ring-transparent',
                                                        'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </>
                                        )}
                                    </Tab>
                                
                            </Tab.List>
                        </div>

                        <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
                            {product.images.map((image) => (
                                <Tab.Panel key={image.id}>
                                    <img
                                        src={productData.image && domain + productData?.image.data.attributes.url}
                                        alt={image.alt}
                                        className="w-full h-full object-center object-cover sm:rounded-lg"
                                    />

                                </Tab.Panel>
                            ))}
                        </Tab.Panels>
                    </Tab.Group>

                    {/* Product info */}
                    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{productData?.title}</h1>

                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl text-gray-900">$ {productData?.price}</p>
                        </div>

                        {/* Reviews */}
                        <div className="mt-3">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                product.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{product.rating} out of 5 stars</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>

                            <div
                                className="text-base text-gray-700 space-y-6"
                                dangerouslySetInnerHTML={{ __html: productData?.description }}
                            />
                        </div>

                        <form className="mt-6">
                            {/* Colors */}
                            <div>
                                <h3 className="text-sm text-gray-600">Color</h3>

                                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                                    <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                    <span className="flex items-center space-x-3">
                                        {product.colors.map((color) => (
                                            <RadioGroup.Option
                                                key={color.name}
                                                value={color}
                                                className={({ active, checked }) =>
                                                    classNames(
                                                        color.selectedColor,
                                                        active && checked ? 'ring ring-offset-1' : '',
                                                        !active && checked ? 'ring-2' : '',
                                                        '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                                                    )
                                                }
                                            >
                                                <RadioGroup.Label as="span" className="sr-only">
                                                    {color.name}
                                                </RadioGroup.Label>
                                                <span
                                                    aria-hidden="true"
                                                    className={classNames(
                                                        color.bgColor,
                                                        'h-8 w-8 border border-black border-opacity-10 rounded-full'
                                                    )}
                                                />
                                            </RadioGroup.Option>
                                        ))}
                                    </span>
                                </RadioGroup>
                            </div>

                            <div className="mt-10 flex sm:flex-col1">

                                <button
                                    type="button"
                                    onClick={()=>{addToCart(slug, 1,productData?.price)}}
                                    className="mt-3 w-full px-4 py-2 border border-transparent text-base font-medium  text-white bg-gray-800 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-3  sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
                                >
                                    Add to Cart
                                </button>
                                <button
                                 onClick={()=>{router.push('/checkout')}} 
                                   type="button"
                                    className="mt-3 mx-4 w-full px-4 py-2 border border-transparent text-base font-medium  text-white bg-gray-800 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-3  sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
                                >
                                    Checkout
                                </button>
                                <button
                                    type="button"
                                    className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                                >
                                    <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                    <span className="sr-only">Add to favorites</span>
                                </button>

                            </div>
                        </form>

                        <section aria-labelledby="details-heading" className="mt-12">
                            <h2 id="details-heading" className="sr-only">
                                Additional details
                            </h2>

                            <div className="border-t divide-y divide-gray-200">
                                {product.details.map((detail) => (
                                    <Disclosure as="div" key={detail.name}>
                                        {({ open }) => (
                                            <>
                                                <h3>
                                                    <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                                                        <span
                                                            className={classNames(open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium')}
                                                        >
                                                            {detail.name}
                                                        </span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusSmIcon
                                                                    className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <PlusSmIcon
                                                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel as="div" className="pb-6 prose prose-sm">
                                                    <ul role="list">
                                                        {detail.items.map((item) => (
                                                            <li key={item}>{item}</li>
                                                        ))}
                                                    </ul>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
