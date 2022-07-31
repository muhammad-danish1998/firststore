import React, { useEffect, useState } from 'react'
import Link from 'next/link'
let domain = 'http://localhost:1337'
const files = [
  {
    title: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
      'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  },

  // More files...
]

export default function Product() {
  const [productData, setProductData] = useState([]);
  const getData = async () => {
    let res = await fetch('http://localhost:1337/api/products?populate=*', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer b7ba811a27473392d005c09418df33edf9f09b21ab621eacdb3238f81cd1214279ce6bf0cc8c16a8e1a1c6c99650525c8e28f5a9e717d49ffe5b59f9c129a443430fbc36e9a790e23815dceed27e9e04575d5044eeb190fac3014f7e653f83902134200e187321e9e9e1283b9c702db1a2161a22902e66f3ec079db7e234a3d2',
      },
    });
    let products = await res.json();
    setProductData(products.data)

  }

  useEffect(() => {
    getData();
  }, [])
  return (
    <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 p-8 lg:p-18">
      {productData.map((item) => (
        <li key={item.source} className="relative">
          <div className="group block w-full aspect-w-7 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
            <img src={item.attributes.image.data && domain + item.attributes.image.data.attributes.url} alt="" className=" pointer-events-none group-hover:opacity-75" />
            <button type="button" className="absolute inset-0 focus:outline-none">
              <span className="sr-only">View details for {item.attributes.category}</span>
            </button>
          </div>
          <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{item.attributes.title}</p>
          <p className="block text-sm font-medium text-orange-500 pointer-events-none">category : {item.attributes.category}</p>
          <p className="block text-sm font-medium text-gray-500 pointer-events-none">{item.attributes.description}</p>
          <p className="block text-large font-bold text-orange-500 pointer-events-none">${item.attributes.price}.00</p>
          <Link href={`/singleitem/${item.attributes.slug}`}>


            <button
              type="submit"
              className="mt-3 w-full px-4 py-2 border border-transparent text-base font-medium  text-white bg-gray-800 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-3  sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
            >
              Buy Now
            </button>
          </Link>
        </li>
      ))}
    </ul>
  )
}
